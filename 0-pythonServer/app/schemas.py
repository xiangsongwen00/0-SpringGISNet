from __future__ import annotations

import re
import unicodedata
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


USERNAME_PATTERN = re.compile(r"^[A-Za-z0-9_\-\u3400-\u4DBF\u4E00-\u9FFF]{2,32}$")
SECURITY_QUESTIONS = {
    "primary_teacher": "我最深刻的小学老师",
    "middle_teacher": "我最深刻的初中老师",
    "alma_mater": "我的母校",
    "birthday": "我的生日",
    "family_address": "我的家庭地址",
    "favorite_food": "我最喜欢的食物",
    "first_trip_city": "我的第一个旅行地城市",
    "parents_met_town": "父母相遇的乡镇",
    "nickname": "我自己的昵称",
}


def normalize_username(value: str) -> str:
    return unicodedata.normalize("NFKC", value.strip()).casefold()


def normalize_security_answer(value: str) -> str:
    return unicodedata.normalize("NFKC", value.strip()).casefold()


class SecurityAnswerInput(BaseModel):
    model_config = ConfigDict(extra="forbid")

    question_id: str
    answer: str = Field(min_length=2, max_length=128)

    @field_validator("question_id")
    @classmethod
    def validate_question_id(cls, value: str) -> str:
        if value not in SECURITY_QUESTIONS:
            raise ValueError("安全问题不在允许列表中")
        return value

    @field_validator("answer")
    @classmethod
    def normalize_answer(cls, value: str) -> str:
        normalized = normalize_security_answer(value)
        if len(normalized) < 2:
            raise ValueError("安全问题答案至少 2 个字符")
        return normalized


class RegisterRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    username: str
    password: str = Field(min_length=10, max_length=128)
    client_type: str = Field(default="web", pattern=r"^(web|mobile_web|desktop|auth_apk)$")
    terms_accepted: Literal[True]
    privacy_accepted: Literal[True]
    age_requirement_confirmed: Literal[True]
    security_answers: list[SecurityAnswerInput] = Field(min_length=2, max_length=2)

    @model_validator(mode="after")
    def validate_distinct_security_questions(self):
        if len({item.question_id for item in self.security_answers}) != 2:
            raise ValueError("必须选择两个不同的安全问题")
        return self

    @field_validator("username")
    @classmethod
    def validate_username(cls, value: str) -> str:
        value = unicodedata.normalize("NFKC", value.strip())
        if not USERNAME_PATTERN.fullmatch(value):
            raise ValueError("用户名须为 2-32 位，仅可包含中文、字母、数字、下划线和连字符")
        return value


class LoginRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    username: str = Field(min_length=1, max_length=64)
    password: str = Field(min_length=1, max_length=128)
    client_type: str = Field(default="web", pattern=r"^(web|mobile_web|desktop|auth_apk)$")


class SecurityAnswersSetupRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    current_password: str = Field(min_length=1, max_length=128)
    security_answers: list[SecurityAnswerInput] = Field(min_length=2, max_length=2)

    @model_validator(mode="after")
    def validate_distinct_questions(self):
        if len({item.question_id for item in self.security_answers}) != 2:
            raise ValueError("必须选择两个不同的安全问题")
        return self


class RefreshRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    refresh_token: str | None = Field(default=None, min_length=32, max_length=512)


class LogoutRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    refresh_token: str | None = Field(default=None, min_length=32, max_length=512)


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    user_uuid: str
    username: str
    created_at: datetime


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str | None = None
    token_type: str = "bearer"
    expires_in: int
    user: UserResponse


class MessageResponse(BaseModel):
    message: str


class HealthResponse(BaseModel):
    status: str
    database: str
    version: str


class TerminalBindStartRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    public_key: str = Field(min_length=80, max_length=4096)
    authorization_code: str = Field(pattern=r"^[A-Za-z0-9]{8,12}$")

    @field_validator("authorization_code")
    @classmethod
    def normalize_authorization_code(cls, value: str) -> str:
        return value.upper()


class TerminalBindStartResponse(BaseModel):
    challenge_id: str
    nonce: str
    expires_at: datetime


class TerminalSessionStartRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    public_key: str = Field(min_length=80, max_length=4096)


class TerminalBindConfirmRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    challenge_id: str = Field(min_length=36, max_length=36)
    nonce: str = Field(min_length=32, max_length=256)
    signature: str = Field(min_length=64, max_length=1024)


class TerminalResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    terminal_uuid: str
    system_name: str
    display_name: str | None
    status: int
    key_version: int
    bound_at: datetime


class AuthorizationCodeCreateRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    purpose: Literal["terminal_bind", "terminal_migrate"]
    terminal_uuid: str | None = Field(default=None, min_length=36, max_length=36)
    current_password: str = Field(min_length=1, max_length=128)
    security_answers: list[SecurityAnswerInput] | None = Field(default=None, min_length=2, max_length=2)

    @model_validator(mode="after")
    def validate_distinct_verification_questions(self):
        if self.security_answers is not None and len({item.question_id for item in self.security_answers}) != 2:
            raise ValueError("必须回答两个不同的安全问题")
        return self


class AuthorizationCodeResponse(BaseModel):
    request_id: str
    code: str
    purpose: str
    expires_at: datetime
    expires_in_seconds: int = 600


class TerminalRevokeCodeCreateRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    code_type: Literal["authorization_code", "verification_code"]


class TerminalRevokeRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    method: Literal["password_security", "terminal_authorization_code", "terminal_verification_code"]
    current_password: str | None = Field(default=None, max_length=128)
    security_answers: list[SecurityAnswerInput] | None = Field(default=None, min_length=2, max_length=2)
    code: str | None = Field(default=None, min_length=6, max_length=12)

    @field_validator("code")
    @classmethod
    def normalize_revoke_code(cls, value: str | None) -> str | None:
        return value.upper() if value else None

    @model_validator(mode="after")
    def validate_revoke_credentials(self):
        if self.method == "password_security":
            if not self.current_password or not self.security_answers or len(self.security_answers) != 2:
                raise ValueError("密码安全问题撤销必须提交密码和两个答案")
        elif not self.code:
            raise ValueError("终端码撤销必须提交撤销码")
        return self


class QuickLoginConsumeRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    username: str = Field(min_length=1, max_length=64)
    code: str = Field(pattern=r"^\d{6}$")
    client_name: str = Field(default="PC 浏览器", min_length=1, max_length=64)


class QuickLoginStartResponse(BaseModel):
    request_id: str
    code: str
    expires_at: datetime
    refresh_after_seconds: int = 45


ALLOWED_LOCATION_INTERVALS = {1, 2, 5, 10, 30, 60}


class LocationPointInput(BaseModel):
    model_config = ConfigDict(extra="forbid")

    longitude: float = Field(ge=-180, le=180)
    latitude: float = Field(ge=-90, le=90)
    altitude: float | None = Field(default=None, ge=-1000, le=100000)
    accuracy: float | None = Field(default=None, ge=0, le=100000)
    speed: float | None = Field(default=None, ge=0, le=2000)
    heading: float | None = Field(default=None, ge=0, lt=360)
    recorded_at: datetime


class LocationPointsUploadRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    points: list[LocationPointInput] = Field(min_length=1, max_length=100)


class LocationUploadResponse(BaseModel):
    accepted: int
    current_recorded_at: datetime


class LocationSettingRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    write_interval_seconds: int = 2
    tracking_enabled: bool = False

    @field_validator("write_interval_seconds")
    @classmethod
    def validate_interval(cls, value: int) -> int:
        if value not in ALLOWED_LOCATION_INTERVALS:
            raise ValueError("定位写入频率仅支持 1、2、5、10、30、60 秒")
        return value


class LocationSettingResponse(BaseModel):
    write_interval_seconds: int
    tracking_enabled: bool
    allowed_intervals: list[int] = [1, 2, 5, 10, 30, 60]


class LocationPointResponse(BaseModel):
    longitude: float
    latitude: float
    altitude: float | None
    accuracy: float | None
    speed: float | None
    heading: float | None
    recorded_at: datetime
    received_at: datetime | None = None
    owner_user_uuid: str | None = None
    owner_username: str | None = None
    source: str = "terminal"


class TrackSegmentResponse(BaseModel):
    segment_id: str
    frequency_seconds: int
    started_at: datetime
    ended_at: datetime
    point_count: int
    points: list[dict[str, object]]


class TrackHistoryResponse(BaseModel):
    owner_user_uuid: str
    owner_username: str
    from_time: datetime
    to_time: datetime
    segments: list[TrackSegmentResponse]


class LocationShareCreateRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    target_username: str = Field(min_length=2, max_length=32)
    share_type: Literal["realtime", "history"]
    starts_at: datetime | None = None
    ends_at: datetime | None = None
    expires_at: datetime


class LocationShareResponse(BaseModel):
    share_id: str
    target_username: str
    share_type: str
    starts_at: datetime
    ends_at: datetime
    expires_at: datetime
    revoked_at: datetime | None = None


class SharedCurrentLocationResponse(BaseModel):
    share_id: str
    location: LocationPointResponse | None


class ApproximateLocationResponse(BaseModel):
    longitude: float
    latitude: float
    source: str
    approximate: bool = True
    label: str | None = None



