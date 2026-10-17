from __future__ import annotations

from datetime import datetime, timedelta, timezone
import json
import math
from urllib.parse import urlencode
from urllib.request import urlopen
from uuid import uuid4
from zoneinfo import ZoneInfo

from fastapi import APIRouter, HTTPException, Query, Request, status
from sqlalchemy import and_, or_, select, text

from ...models import CurrentLocation, LocationSetting, LocationShare, Terminal, TrackSegment, User, utc_now
from ...schemas import (
    LocationPointResponse,
    ApproximateLocationResponse,
    LocationPointsUploadRequest,
    LocationSettingRequest,
    LocationSettingResponse,
    LocationShareCreateRequest,
    LocationShareResponse,
    LocationUploadResponse,
    MessageResponse,
    SharedCurrentLocationResponse,
    TrackHistoryResponse,
    TrackSegmentResponse,
    normalize_username,
)
from ..dependencies import CurrentSession, CurrentUser, DbSession
from ...config import get_settings as get_app_settings


router = APIRouter(prefix="/locations", tags=["locations"])
SHANGHAI = ZoneInfo("Asia/Shanghai")
MAX_HISTORY = timedelta(days=3)
MAX_SEGMENT_POINTS = 1000


def outside_china(longitude: float, latitude: float) -> bool:
    return longitude < 72.004 or longitude > 137.8347 or latitude < 0.8293 or latitude > 55.8271


def gcj_delta(longitude: float, latitude: float) -> tuple[float, float]:
    x, y = longitude - 105.0, latitude - 35.0
    d_lat = -100 + 2*x + 3*y + .2*y*y + .1*x*y + .2*math.sqrt(abs(x))
    d_lon = 300 + x + 2*y + .1*x*x + .1*x*y + .1*math.sqrt(abs(x))
    d_lat += (20*math.sin(6*x*math.pi)+20*math.sin(2*x*math.pi))*2/3
    d_lat += (20*math.sin(y*math.pi)+40*math.sin(y/3*math.pi))*2/3
    d_lat += (160*math.sin(y/12*math.pi)+320*math.sin(y*math.pi/30))*2/3
    d_lon += (20*math.sin(6*x*math.pi)+20*math.sin(2*x*math.pi))*2/3
    d_lon += (20*math.sin(x*math.pi)+40*math.sin(x/3*math.pi))*2/3
    d_lon += (150*math.sin(x/12*math.pi)+300*math.sin(x/30*math.pi))*2/3
    rad_lat = latitude / 180 * math.pi
    magic = 1 - 0.006693421622965943 * math.sin(rad_lat) ** 2
    sqrt_magic = math.sqrt(magic)
    d_lat = d_lat * 180 / ((6378245 * (1 - 0.006693421622965943)) / (magic * sqrt_magic) * math.pi)
    d_lon = d_lon * 180 / (6378245 / sqrt_magic * math.cos(rad_lat) * math.pi)
    return d_lon, d_lat


def gcj_to_wgs(longitude: float, latitude: float) -> tuple[float, float]:
    if outside_china(longitude, latitude):
        return longitude, latitude
    d_lon, d_lat = gcj_delta(longitude, latitude)
    return longitude - d_lon, latitude - d_lat


def wgs_to_gcj(longitude: float, latitude: float) -> tuple[float, float]:
    if outside_china(longitude, latitude):
        return longitude, latitude
    d_lon, d_lat = gcj_delta(longitude, latitude)
    return longitude + d_lon, latitude + d_lat


def amap_request(path: str, params: dict[str, str]) -> dict[str, object]:
    key = get_app_settings().amap_web_service_key
    if not key:
        raise HTTPException(status_code=503, detail="尚未配置高德 Web 服务 Key")
    url = f"https://restapi.amap.com{path}?{urlencode({**params, 'key': key})}"
    try:
        with urlopen(url, timeout=4) as response:
            body = json.loads(response.read().decode("utf-8"))
    except Exception as exc:
        raise HTTPException(status_code=502, detail="地理编码服务暂不可用") from exc
    if body.get("status") != "1":
        raise HTTPException(status_code=502, detail="地理编码服务返回失败")
    return body


def aware(value: datetime) -> datetime:
    return value.replace(tzinfo=timezone.utc) if value.tzinfo is None else value.astimezone(timezone.utc)


def require_bound_terminal(db: DbSession, session: CurrentSession) -> Terminal:
    if session.client_type != "auth_apk" or session.terminal_id is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="只有已绑定 APK 终端可以写入位置")
    terminal = db.scalar(
        select(Terminal).where(
            Terminal.id == session.terminal_id,
            Terminal.user_id == session.user_id,
            Terminal.status == 1,
        )
    )
    if terminal is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="终端未绑定或已撤销")
    return terminal


def point_dict(point) -> dict[str, object]:
    value: dict[str, object] = {
        "longitude": point.longitude,
        "latitude": point.latitude,
        "recorded_at": aware(point.recorded_at).isoformat(),
    }
    for name in ("altitude", "accuracy", "speed", "heading"):
        item = getattr(point, name)
        if item is not None:
            value[name] = item
    return value


def current_response(location: CurrentLocation, owner: User | None = None) -> LocationPointResponse:
    return LocationPointResponse(
        longitude=location.longitude,
        latitude=location.latitude,
        altitude=location.altitude,
        accuracy=location.accuracy,
        speed=location.speed,
        heading=location.heading,
        recorded_at=location.recorded_at,
        received_at=location.received_at,
        owner_user_uuid=owner.user_uuid if owner else None,
        owner_username=owner.username if owner else None,
    )


def history_response(db: DbSession, owner: User, from_time: datetime, to_time: datetime) -> TrackHistoryResponse:
    segments = db.scalars(
        select(TrackSegment)
        .where(
            TrackSegment.user_id == owner.id,
            TrackSegment.ended_at >= from_time,
            TrackSegment.started_at <= to_time,
        )
        .order_by(TrackSegment.started_at)
    ).all()
    return TrackHistoryResponse(
        owner_user_uuid=owner.user_uuid,
        owner_username=owner.username,
        from_time=from_time,
        to_time=to_time,
        segments=[
            TrackSegmentResponse(
                segment_id=item.segment_uuid,
                frequency_seconds=item.frequency_seconds,
                started_at=item.started_at,
                ended_at=item.ended_at,
                point_count=item.point_count,
                points=[
                    point for point in item.points
                    if from_time <= aware(datetime.fromisoformat(str(point["recorded_at"]))) <= to_time
                ],
            )
            for item in segments
        ],
    )


def validate_history_window(from_time: datetime, to_time: datetime) -> tuple[datetime, datetime]:
    start, end, now = aware(from_time), aware(to_time), utc_now()
    if end <= start:
        raise HTTPException(status_code=422, detail="轨迹结束时间必须晚于开始时间")
    if end - start > MAX_HISTORY:
        raise HTTPException(status_code=422, detail="单次最多查询或分享三天轨迹")
    if start < now - MAX_HISTORY - timedelta(minutes=5) or end > now + timedelta(minutes=5):
        raise HTTPException(status_code=422, detail="只支持最近三天内的历史轨迹")
    return start, end


@router.get("/settings", response_model=LocationSettingResponse)
def get_location_settings(db: DbSession, user: CurrentUser) -> LocationSettingResponse:
    setting = db.get(LocationSetting, user.id)
    return LocationSettingResponse(
        write_interval_seconds=setting.write_interval_seconds if setting else 2,
        tracking_enabled=setting.tracking_enabled if setting else False,
    )


@router.put("/settings", response_model=LocationSettingResponse)
def update_settings(payload: LocationSettingRequest, db: DbSession, user: CurrentUser) -> LocationSettingResponse:
    setting = db.get(LocationSetting, user.id)
    if setting is None:
        setting = LocationSetting(user_id=user.id)
        db.add(setting)
    setting.write_interval_seconds = payload.write_interval_seconds
    setting.tracking_enabled = payload.tracking_enabled
    db.commit()
    return LocationSettingResponse(
        write_interval_seconds=setting.write_interval_seconds,
        tracking_enabled=setting.tracking_enabled,
    )


@router.post("/points", response_model=LocationUploadResponse, status_code=status.HTTP_201_CREATED)
def upload_points(payload: LocationPointsUploadRequest, db: DbSession, session: CurrentSession) -> LocationUploadResponse:
    terminal = require_bound_terminal(db, session)
    setting = db.get(LocationSetting, session.user_id)
    if setting is None or not setting.tracking_enabled:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="请先开启轨迹记录")

    now = utc_now()
    points = sorted(payload.points, key=lambda item: aware(item.recorded_at))
    if aware(points[0].recorded_at) < now - MAX_HISTORY or aware(points[-1].recorded_at) > now + timedelta(minutes=5):
        raise HTTPException(status_code=422, detail="位置时间超出允许范围")

    # A disconnected/mobile client must not leave a long queue of writers
    # waiting on the same trajectory segment. SET LOCAL is transaction-scoped
    # and is safe with PgBouncer transaction pooling.
    bind = db.get_bind()
    if bind.dialect.name == "postgresql":
        db.execute(text("SET LOCAL lock_timeout = '10s'"))

    accepted = 0
    segment: TrackSegment | None = None
    segment_date = None
    for point in points:
        recorded_at = aware(point.recorded_at)
        track_date = recorded_at.astimezone(SHANGHAI).date()
        needs_segment = (
            segment is None
            or segment_date != track_date
            or segment.point_count >= MAX_SEGMENT_POINTS
            or recorded_at - aware(segment.ended_at) > timedelta(minutes=5)
        )
        if needs_segment:
            # Flush only at an actual segment boundary. The old implementation
            # selected the same segment once per point; a five-minute batch at
            # 1-second sampling therefore performed about 300 redundant SELECTs.
            if segment is not None:
                db.flush()
            segment = db.scalar(
                select(TrackSegment)
                .where(
                    TrackSegment.user_id == session.user_id,
                    TrackSegment.terminal_id == terminal.id,
                    TrackSegment.track_date == track_date,
                    TrackSegment.frequency_seconds == setting.write_interval_seconds,
                    TrackSegment.point_count < MAX_SEGMENT_POINTS,
                )
                .order_by(TrackSegment.ended_at.desc())
                .with_for_update()
            )
            if segment is None or recorded_at - aware(segment.ended_at) > timedelta(minutes=5):
                segment = TrackSegment(
                    segment_uuid=str(uuid4()),
                    user_id=session.user_id,
                    terminal_id=terminal.id,
                    track_date=track_date,
                    frequency_seconds=setting.write_interval_seconds,
                    started_at=recorded_at,
                    ended_at=recorded_at,
                    point_count=0,
                    points=[],
                )
                db.add(segment)
                db.flush()
            segment_date = track_date
        segment.points = [*segment.points, point_dict(point)]
        segment.point_count = len(segment.points)
        segment.started_at = min(aware(segment.started_at), recorded_at)
        segment.ended_at = max(aware(segment.ended_at), recorded_at)
        accepted += 1

    latest = points[-1]
    current = db.get(CurrentLocation, session.user_id)
    if current is None:
        current = CurrentLocation(user_id=session.user_id, terminal_id=terminal.id)
        db.add(current)
    if current.recorded_at is None or aware(latest.recorded_at) >= aware(current.recorded_at):
        current.terminal_id = terminal.id
        for name in ("longitude", "latitude", "altitude", "accuracy", "speed", "heading"):
            setattr(current, name, getattr(latest, name))
        current.recorded_at = aware(latest.recorded_at)
        current.received_at = now
    db.commit()
    return LocationUploadResponse(accepted=accepted, current_recorded_at=current.recorded_at)


@router.get("/me/current", response_model=LocationPointResponse)
def my_current_location(db: DbSession, user: CurrentUser) -> LocationPointResponse:
    location = db.get(CurrentLocation, user.id)
    if location is None:
        raise HTTPException(status_code=404, detail="暂无终端位置")
    return current_response(location, user)


@router.get("/me/history", response_model=TrackHistoryResponse)
def my_history(
    db: DbSession,
    user: CurrentUser,
    from_time: datetime = Query(alias="from"),
    to_time: datetime = Query(alias="to"),
) -> TrackHistoryResponse:
    start, end = validate_history_window(from_time, to_time)
    return history_response(db, user, start, end)


@router.post("/shares", response_model=LocationShareResponse, status_code=status.HTTP_201_CREATED)
def create_share(payload: LocationShareCreateRequest, db: DbSession, user: CurrentUser) -> LocationShareResponse:
    target = db.scalar(select(User).where(User.username_normalized == normalize_username(payload.target_username), User.status == 1))
    if target is None:
        raise HTTPException(status_code=404, detail="共享目标用户不存在")
    if target.id == user.id:
        raise HTTPException(status_code=422, detail="不能向自己共享位置")
    now, expires = utc_now(), aware(payload.expires_at)
    if expires <= now or expires > now + MAX_HISTORY:
        raise HTTPException(status_code=422, detail="共享有效期必须在未来三天内")
    if payload.share_type == "history":
        if payload.starts_at is None or payload.ends_at is None:
            raise HTTPException(status_code=422, detail="历史共享必须指定开始和结束时间")
        start, end = validate_history_window(payload.starts_at, payload.ends_at)
    else:
        start, end = now, expires
    share = LocationShare(
        share_uuid=str(uuid4()), owner_user_id=user.id, grantee_user_id=target.id,
        share_type=payload.share_type, starts_at=start, ends_at=end, expires_at=expires,
    )
    db.add(share)
    db.commit()
    return LocationShareResponse(
        share_id=share.share_uuid, target_username=target.username, share_type=share.share_type,
        starts_at=share.starts_at, ends_at=share.ends_at, expires_at=share.expires_at,
    )


@router.get("/shares", response_model=list[LocationShareResponse])
def list_my_shares(db: DbSession, user: CurrentUser) -> list[LocationShareResponse]:
    rows = db.execute(
        select(LocationShare, User).join(User, User.id == LocationShare.grantee_user_id)
        .where(LocationShare.owner_user_id == user.id).order_by(LocationShare.created_at.desc())
    ).all()
    return [LocationShareResponse(
        share_id=share.share_uuid, target_username=target.username, share_type=share.share_type,
        starts_at=share.starts_at, ends_at=share.ends_at, expires_at=share.expires_at,
        revoked_at=share.revoked_at,
    ) for share, target in rows]


@router.delete("/shares/{share_id}", response_model=MessageResponse)
def revoke_share(share_id: str, db: DbSession, user: CurrentUser) -> MessageResponse:
    share = db.scalar(select(LocationShare).where(LocationShare.share_uuid == share_id, LocationShare.owner_user_id == user.id))
    if share is None:
        raise HTTPException(status_code=404, detail="共享授权不存在")
    share.revoked_at = utc_now()
    db.commit()
    return MessageResponse(message="位置共享已撤销")


@router.get("/shared/current", response_model=list[SharedCurrentLocationResponse])
def shared_current(db: DbSession, user: CurrentUser) -> list[SharedCurrentLocationResponse]:
    now = utc_now()
    rows = db.execute(
        select(LocationShare, User, CurrentLocation)
        .join(User, User.id == LocationShare.owner_user_id)
        .outerjoin(CurrentLocation, CurrentLocation.user_id == LocationShare.owner_user_id)
        .where(
            LocationShare.grantee_user_id == user.id,
            LocationShare.share_type == "realtime",
            LocationShare.revoked_at.is_(None),
            LocationShare.expires_at > now,
        )
    ).all()
    return [SharedCurrentLocationResponse(
        share_id=share.share_uuid,
        location=current_response(location, owner) if location else None,
    ) for share, owner, location in rows]


@router.get("/shared/{share_id}/history", response_model=TrackHistoryResponse)
def shared_history(share_id: str, db: DbSession, user: CurrentUser) -> TrackHistoryResponse:
    now = utc_now()
    row = db.execute(
        select(LocationShare, User).join(User, User.id == LocationShare.owner_user_id).where(
            LocationShare.share_uuid == share_id,
            LocationShare.grantee_user_id == user.id,
            LocationShare.share_type == "history",
            LocationShare.revoked_at.is_(None),
            LocationShare.expires_at > now,
        )
    ).first()
    if row is None:
        raise HTTPException(status_code=404, detail="历史轨迹共享不存在或已失效")
    share, owner = row
    return history_response(db, owner, aware(share.starts_at), aware(share.ends_at))


@router.get("/ip", response_model=ApproximateLocationResponse)
def ip_location(request: Request) -> ApproximateLocationResponse:
    forwarded = request.headers.get("x-forwarded-for", "").split(",")[0].strip()
    ip = forwarded or (request.client.host if request.client else "")
    if not ip or ip in {"127.0.0.1", "::1"}:
        raise HTTPException(status_code=404, detail="本地地址无法进行 IP 定位")
    body = amap_request("/v3/ip", {"ip": ip})
    rectangle = str(body.get("rectangle") or "")
    try:
        first, second = rectangle.split(";")
        lon1, lat1 = map(float, first.split(",")); lon2, lat2 = map(float, second.split(","))
        longitude, latitude = gcj_to_wgs((lon1 + lon2) / 2, (lat1 + lat2) / 2)
    except (TypeError, ValueError):
        raise HTTPException(status_code=404, detail="IP 定位没有可用坐标")
    label = "".join(str(body.get(name) or "") for name in ("province", "city")) or None
    return ApproximateLocationResponse(longitude=longitude, latitude=latitude, source="amap-ip", label=label)


@router.get("/place", response_model=ApproximateLocationResponse)
def reverse_geocode(longitude: float = Query(ge=-180, le=180), latitude: float = Query(ge=-90, le=90)) -> ApproximateLocationResponse:
    gcj_lon, gcj_lat = wgs_to_gcj(longitude, latitude)
    body = amap_request("/v3/geocode/regeo", {"location": f"{gcj_lon:.7f},{gcj_lat:.7f}", "extensions": "base"})
    regeocode = body.get("regeocode") if isinstance(body.get("regeocode"), dict) else {}
    return ApproximateLocationResponse(
        longitude=longitude, latitude=latitude, source="amap-regeocode", approximate=False,
        label=str(regeocode.get("formatted_address") or "") or None,
    )
