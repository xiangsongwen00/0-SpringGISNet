import {
  Viewer, ViewerError, TerrainRgbProvider,
  type BaseMapDefinition, type GlobeEngineStats, type GlobeFramePerformance
} from 'spring-and-autumn-gis';
import { EntityError, type EntityDefinition, type EntityPatch, type EntityPosition, type EntityQuery,
  type PointSymbol,type LineSymbol,type PolygonSymbol } from 'spring-and-autumn-gis';
import { createDemoRaster, createDemoTerrain, demoStyle, demoVectorFetch } from './demo-data';
import { loadDemoResources, parseDemoConfig, type DemoResources } from './demo-config';

const element = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const input = (id: string) => element<HTMLInputElement>(id);
const select = (id: string) => element<HTMLSelectElement>(id);
const home = { longitude: 106.55, latitude: 29.61, altitude: 18000000, pitch: -90, heading: 0, duration: 700 };
let viewer: Viewer | undefined;
let creating: AbortController | undefined;
let generation = 0;
let running = false;
let latestStats: GlobeEngineStats | undefined;
let latestTiming: GlobeFramePerformance | undefined;
let frames = 0, fps = 0, fpsFrames = 0, fpsStart = performance.now(), lastUi = 0;
let configured = false;
const isSmoke = new URLSearchParams(location.search).get('smoke') === '1';
let resources: DemoResources | undefined;
let entitySerial = 0;
let entitySubscription: (() => void) | undefined;
let drawSubscription:(()=>void)|undefined;
let captureFrame: (() => void) | undefined;
const log = (message: string) => {
  const target = element('log'); target.textContent = `${new Date().toLocaleTimeString()} ${message}\n${target.textContent ?? ''}`.slice(0, 6000);
};
function errorMessage(error: unknown) {
  return error instanceof ViewerError || error instanceof EntityError ? `${error.code}: ${error.message}` : error instanceof Error ? error.message : String(error);
}
function requireViewer(): Viewer {
  if (!viewer || viewer.isDestroyed) throw new Error('请先重新创建 Viewer。');
  return viewer;
}
function number(id: string, min = -Infinity, max = Infinity) {
  const value = Number(input(id).value);
  if (!input(id).value.trim() || !Number.isFinite(value) || value < min || value > max) throw new Error(`${id} 输入值无效。`);
  return value;
}
function definitions(): BaseMapDefinition[] {
  const result: BaseMapDefinition[] = isSmoke ? [
    { id: 'demo-raster', type: 'provider', provider: createDemoRaster() },
    { id: 'demo-vector-light', type: 'vector-style', style: demoStyle(false), fetcher: demoVectorFetch, symbols: true, levelOffset: -1.7 },
    { id: 'demo-vector-dark', type: 'vector-style', style: demoStyle(true), fetcher: demoVectorFetch, symbols: true, levelOffset: -1.7 }
  ] : [...(resources?.basemaps ?? [])];
  if (configured) {
    const url = input('custom-url').value.trim();
    if (url) {
      const offset = number('level-offset', -5, 0);
      result.push(select('custom-type').value === 'vector-style'
        ? { id: 'custom', type: 'vector-style', style: url, sourceId: input('source-id').value.trim() || undefined, symbols: input('symbols').checked, levelOffset: offset }
        : { id: 'custom', type: 'xyz', url, scheme: select('custom-type').value === 'tms' ? 'tms' : 'xyz', maxLevel: number('max-level', 0, 27), levelOffset: offset });
    }
  }
  return result;
}
function inspect() {
  const v = viewer;
  element('life').textContent = creating ? '正在创建配置…' : !v ? '尚无实例' : v.isDestroyed ? '已销毁（点击重新创建）' : running ? '运行中 · 持续交互' : '已暂停 · 点击 start 恢复';
  if (v && !v.isDestroyed) {
    input('terrain').checked = v.terrainEnabled; input('grid').checked = v.lodGridVisible;
    select('basemap').value = v.baseMap.id ?? 'none';
    if (element('result').dataset.status === 'ready') {
      const imagery = latestStats?.imagery;
      element('result').textContent = !v.baseMap.id ? '已移除底图；地图实例仍在' :
        imagery?.ready ? `已加载 ${imagery.ready} 个底图资源；高清覆盖继续更新` :
        imagery?.errors ? '底图请求失败，尚无图片就绪；请检查自己的 Key、配额、域名、跨域与网络' :
        'Viewer 配置已就绪；底图瓦片加载中…';
    }
  }
  element('attribution').textContent = isSmoke ? '合成测试数据 · 非真实地理数据' :
    `${resources?.attributions[v?.baseMap.id ?? ''] ?? '用户资源（请确认署名）'} · ${v?.terrainEnabled ? 'DEM: 用户授权数据' : '地形关闭'}`;
  const vector = v?.engine.imagery?.provider as { drawStats?: { worker: boolean; building: number } } | undefined;
  element('metrics').textContent = `FPS ${running ? fps : '暂停'} · 可见 ${latestStats?.selected ?? '—'} · draw ${latestTiming?.drawCalls ?? '—'} · Vector Worker ${vector?.drawStats ? (vector.drawStats.worker ? '开启' : '兼容主线程') : '不适用'}`;
  element('state').textContent = JSON.stringify({ isDestroyed: v?.isDestroyed ?? null, running,
    baseMap: v ? { id: v.baseMap.id, type: v.baseMap.type, capabilities: v.baseMap.capabilities } : null,
    terrainEnabled: v?.terrainEnabled ?? false, lodGridVisible: v?.lodGridVisible ?? false,
    basemaps: v?.getBaseMaps().map(({ id, type }) => ({ id, type })),
    entities: v && !v.isDestroyed ? { count: v.entities.length, visible: v.entities.visible,
      selectedImageState:select('entity-select').value?v.getEntityResourceState(select('entity-select').value):null,
      groundState:select('entity-select').value?v.getEntityGroundState(select('entity-select').value):null } : null, frameCallbacks: frames,
    imagery: latestStats?.imagery ? { ...latestStats.imagery, lastError: latestStats.imagery.lastError ? '请求失败；详情请检查浏览器网络面板（此处不展示含凭据的URL）' : null } : undefined,
    terrain: latestStats?.terrain, surfaceTiles: latestStats?.surfaceTiles,
    terrainSurfaceLimited: latestStats?.terrainSurfaceLimited, performance: latestTiming }, null, 2);
}
async function create(cancelImmediately = false) {
  if (!isSmoke) resources = await loadDemoResources();
  const maps = definitions(); // Validate UI before releasing the current instance.
  const demUrl = configured ? input('dem-url').value.trim() : '';
  const terrain = demUrl ? new TerrainRgbProvider({ id: 'custom-dem', urlTemplates: [demUrl],
    encoding: select('dem-encoding').value === 'terrarium' ? 'terrarium' : 'mapbox', scheme: select('dem-scheme').value === 'tms' ? 'tms' : 'xyz' }) : isSmoke ? createDemoTerrain() : resources!.terrain;
  const epoch = ++generation;
  entitySubscription?.(); entitySubscription = undefined;
  drawSubscription?.();drawSubscription=undefined;
  creating?.abort(); viewer?.destroy(); running = false;
  const controller = new AbortController(); creating = controller;
  latestStats = undefined; latestTiming = undefined; fpsFrames = 0; fpsStart = performance.now();
  element('result').textContent = '正在创建…'; inspect();
  try {
    const pending = Viewer.create('map', { basemaps: maps, baseMap: isSmoke ? 'demo-raster' : resources!.initialBaseMap, signal: controller.signal,
      terrain: { provider: terrain, enabled: input('terrain').checked }, showLodGrid: input('grid').checked,
      autoStart: input('auto-start').checked, initialView: home, pixelRatio: Math.min(devicePixelRatio, 1.5),
      lod: { minLevel: 2, maxLevel: 24, maxTiles: 180 },
      onStats: stats => { if (epoch === generation) latestStats = stats; },
      onFramePerformance: timing => {
        if (epoch !== generation) return;
        frames++; fpsFrames++; latestTiming = timing;
        captureFrame?.();
        const now = performance.now();
        if (now - fpsStart >= 500) { fps = Math.round(fpsFrames * 1000 / (now - fpsStart)); fpsFrames = 0; fpsStart = now; }
        if (now - lastUi >= 500) { lastUi = now; inspect(); }
      }
    });
    if (cancelImmediately) controller.abort();
    const created = await pending;
    if (epoch !== generation) { created.destroy(); return; }
    viewer = created; creating = undefined; running = input('auto-start').checked;
    entitySubscription = created.entities.onChange(refreshEntities); refreshEntities();
    drawSubscription=created.draw.onChange(state=>{
      element('entity-draw-state').textContent=state.error??(state.active?`绘制 ${state.type} · ${state.vertexCount} 顶点 · 拾取 ${state.pickMs.toFixed(1)}ms / CPU预览 ${state.previewMs.toFixed(1)}ms / 更新 ${state.previewFrameMs.toFixed(1)}ms`:'绘制结束，相机操作已恢复');
      if(state.lastEntityId&&!created.isDestroyed&&created.entities.has(state.lastEntityId)){select('entity-select').value=state.lastEntityId;created.selectEntity(state.lastEntityId);if(!state.active)loadEntityForm();}
    });
    element('entity-draw-state').textContent='绘制未开启';
    const names: Record<string, string> = { 'demo-raster': '合成栅格 · Provider', 'demo-vector-light': '合成 MVT · 浅色 + 注记', 'demo-vector-dark': '合成 MVT · 深色 + 注记', custom: '自定义服务' };
    select('entity-type').dataset.drawType='true';
    created.createToolbar({baseMapNames:resources?.names??names,drawContent:element('sdk-entity-editor'),onDraw:(type,options)=>startEntityDrawing(type,options.clearPrevious)});
    select('basemap').replaceChildren(...[...created.getBaseMaps().map(map => new Option(resources?.names[map.id] ?? names[map.id] ?? map.id, map.id)), new Option('无底图', 'none')]);
    element('result').textContent = 'Viewer 配置已就绪；底图瓦片加载中…'; element('result').dataset.status = 'ready';
    log('Viewer.create 成功；配置已就绪，不代表所有视口瓦片加载完成。'); inspect();
  } catch (error) {
    if (epoch !== generation) return;
    creating = undefined;
    element('result').textContent = cancelImmediately && error instanceof ViewerError && error.code === 'ABORTED' ? '初始化已取消；点击重新创建恢复地图' : errorMessage(error);
    log(errorMessage(error)); inspect();
    if (!cancelImmediately) throw error;
  }
}
const tasks = new Map<string, Promise<unknown>>();
function selectedEntity(): EntityDefinition {
  const value = requireViewer().entities.getById(select('entity-select').value);
  if (!value) throw new Error('请先选中一个对象。'); return value;
}
function entityPosition(): EntityPosition { return [number('entity-lon', -180,180),number('entity-lat',-90,90),number('entity-height',-10000,10000000)]; }
function entitySymbol(type:'point'):PointSymbol;
function entitySymbol(type:'polyline'):LineSymbol;
function entitySymbol(type:'polygon'):PolygonSymbol;
function entitySymbol(type:'point'|'polyline'|'polygon'):PointSymbol|LineSymbol|PolygonSymbol;
function entitySymbol(type:'point'|'polyline'|'polygon'):PointSymbol|LineSymbol|PolygonSymbol {
  const color=input('entity-color').value, opacity=number('entity-opacity',0,1), outlineColor=input('entity-outline').value;
  const icon=input('entity-icon-enabled').checked?{url:input('entity-icon-url').value.trim(),sourceHeading:number('entity-source-heading')}:null;
  return type === 'point' ? { color,opacity,outlineColor,icon,occlusion:select('entity-occlusion').value as 'depth'|'overlay',heading:number('entity-heading'),alignment:select('entity-alignment').value as 'map'|'screen',size:number('entity-size',1,256),outlineWidth:number('entity-width',0,64),shape:select('entity-shape').value as 'circle'|'square'|'diamond' } :
    type === 'polyline' ? {color,opacity,occlusion:select('entity-occlusion').value as 'depth'|'overlay',width:number('entity-width',0,64),texture:input('entity-texture-enabled').checked?{
      url:input('entity-texture-url').value.trim(),length:number('entity-line-period',1,2048),speed:number('entity-line-speed',-4096,4096),sourceDirection:select('entity-line-direction').value as 'left'|'right'}:null} :
    {color,opacity,outlineColor,occlusion:select('entity-occlusion').value as 'depth'|'overlay',outlineWidth:number('entity-width',0,64),fill:input('entity-fill').checked,texture:input('entity-texture-enabled').checked?{
      url:input('entity-texture-url').value.trim(),repeat:[number('entity-repeat-u',0.01,256),number('entity-repeat-v',0.01,256)] as const,
      speed:[number('entity-speed-u',-1000,1000),number('entity-speed-v',-1000,1000)] as const,rotation:number('entity-texture-rotation')}:null};
}
function entityLabel() {
  const text=input('entity-text').value;
  return text ? {text,fontSize:number('entity-font',6,96),color:input('entity-color').value,haloColor:input('entity-outline').value,occlusion:select('entity-occlusion').value as 'depth'|'overlay'} : undefined;
}
function entityPositions(type: 'polyline'|'polygon'): readonly EntityPosition[] {
  const json=input('entity-positions').value.trim(); if(json) return JSON.parse(json);
  const [lon,lat,height]=entityPosition();
  return type === 'polyline' ? [[lon-0.02,lat-0.01,height],[lon,lat,height],[lon+0.02,lat+0.01,height]] : [[lon-0.02,lat-0.02,height],[lon+0.02,lat-0.02,height],[lon+0.02,lat+0.02,height],[lon-0.02,lat+0.02,height]];
}
function addEntity() {
  const type=select('entity-type').value as EntityDefinition['type'], id=input('entity-id').value.trim() || `user-${type}-${++entitySerial}`;
  const common={id,name:input('entity-name').value,properties:{source:'interactive-demo'},label:entityLabel(),heightReference:select('entity-height-reference').value as 'absolute'|'clamp-to-ground',groundOffset:number('entity-ground-offset',0,10)};
  let definition: EntityDefinition;
  if(type==='label'){if(!common.label)throw new Error('独立标注必须填写文字。');definition={...common,type,position:entityPosition(),label:common.label};}
  else if(type==='point')definition={...common,type,position:entityPosition(),symbol:entitySymbol(type)};
  else if(type==='polyline')definition={...common,type,positions:entityPositions(type),symbol:entitySymbol(type)};
  else definition={...common,type,positions:entityPositions(type),holes:input('entity-holes').value.trim()?JSON.parse(input('entity-holes').value):[],symbol:entitySymbol(type)};
  const value=requireViewer().entities.add(definition); select('entity-select').value=value.id;loadEntityForm();
}
function refreshEntities() {
  if(!viewer || viewer.isDestroyed) return;
  const target=select('entity-select'),previous=viewer.entities.selectedId??'';
  target.replaceChildren(new Option(`对象 ${viewer.entities.length} 个 · 请选择`,''));
  for(const value of viewer.entities.values) target.add(new Option(`${value.visible ? '●' : '○'} ${value.id} · ${value.type}`,value.id));
  target.value=viewer.entities.has(previous)?previous:'';
  input('entities-visible').checked=viewer.entities.visible;
  if(target.value) element('entity-output').textContent=JSON.stringify(viewer.entities.getById(target.value),null,2);
  else element('entity-output').textContent=`集合 ${viewer.entities.length} 个对象`;
}
function loadEntityForm() {
  const value=selectedEntity(); const position='position' in value?value.position:value.positions[0];
  requireViewer().selectEntity(value.id);
  select('entity-type').value=value.type;input('entity-id').value=value.id;input('entity-name').value=value.name ?? '';
  select('entity-height-reference').value=value.heightReference??'absolute';input('entity-ground-offset').value=String(value.groundOffset??.15);
  input('entity-lon').value=String(position[0]);input('entity-lat').value=String(position[1]);input('entity-height').value=String(position[2] ?? 30);
  const s=value.type==='label'?undefined:value.symbol;
  input('entity-color').value=value.type==='label'?value.label.color ?? '#ffffff':s?.color ?? '#32e6a1';
  input('entity-outline').value=(value.type==='point'||value.type==='polygon'?value.symbol?.outlineColor:undefined) ?? value.label?.haloColor ?? '#173342';
  input('entity-opacity').value=String(s?.opacity ?? 1);
  input('entity-width').value=String(value.type==='polyline'?value.symbol?.width ?? 3:value.type==='point'||value.type==='polygon'?value.symbol?.outlineWidth ?? 2:2);
  input('entity-size').value=String(value.type==='point'?value.symbol?.size ?? 18:18);
  select('entity-shape').value=value.type==='point'?value.symbol?.shape ?? 'circle':'circle';
  const icon=value.type==='point'?value.symbol?.icon:undefined;
  input('entity-icon-enabled').checked=!!icon;input('entity-icon-url').value=icon?.url??'./mylocation_up.png';
  input('entity-heading').value=String(value.type==='point'?value.symbol?.heading??0:0);input('entity-source-heading').value=String(icon?.sourceHeading??0);
  select('entity-alignment').value=value.type==='point'?value.symbol?.alignment??'map':'map';
  const pattern=value.type==='polyline'||value.type==='polygon'?value.symbol?.texture:undefined;
  input('entity-texture-enabled').checked=!!pattern;input('entity-texture-url').value=pattern?.url??'./Qianjin_left.png';
  if(value.type==='polyline'){
    input('entity-line-period').value=String(value.symbol?.texture?.length??48);input('entity-line-speed').value=String(value.symbol?.texture?.speed??30);
    select('entity-line-direction').value=value.symbol?.texture?.sourceDirection??'left';
  }else if(value.type==='polygon'){
    input('entity-repeat-u').value=String(value.symbol?.texture?.repeat?.[0]??8);input('entity-repeat-v').value=String(value.symbol?.texture?.repeat?.[1]??4);
    input('entity-speed-u').value=String(value.symbol?.texture?.speed?.[0]??-0.15);input('entity-speed-v').value=String(value.symbol?.texture?.speed?.[1]??0);
    input('entity-texture-rotation').value=String(value.symbol?.texture?.rotation??0);
  }
  input('entity-fill').checked=value.type==='polygon'?value.symbol?.fill !== false:true;
  input('entity-text').value=value.label?.text ?? '';input('entity-font').value=String(value.label?.fontSize ?? 16);
  select('entity-occlusion').value=(value.type==='label'?value.label.occlusion:value.symbol?.occlusion??value.label?.occlusion)??'depth';
  input('entity-positions').value='positions' in value?JSON.stringify(value.positions):'';
  input('entity-holes').value=value.type==='polygon'?JSON.stringify(value.holes ?? []):'';
  element('entity-output').textContent=JSON.stringify(value,null,2);
}
function entitySamples() {
  const v=requireViewer();
  const definitions:EntityDefinition[]=[
    {id:'sample-point',type:'point',position:[106.55,29.61,1500],symbol:{color:'#ffffff',size:36,icon:{url:'./mylocation_up.png',sourceHeading:0},heading:0,alignment:'map',occlusion:'overlay'},label:{text:'业务站点',offset:[0,-36],occlusion:'overlay'},properties:{category:'station'}},
    {id:'sample-line',type:'polyline',heightReference:'clamp-to-ground',positions:[[106.52,29.6,1500],[106.55,29.61,1500],[106.59,29.62,1500]],symbol:{color:'#ffffff',width:24,texture:{url:'./Qianjin_left.png',length:48,sourceDirection:'left',speed:30}},properties:{category:'route'}},
    {id:'sample-polygon',type:'polygon',heightReference:'clamp-to-ground',positions:[[106.51,29.63,1500],[106.57,29.63,1500],[106.57,29.67,1500],[106.51,29.67,1500]],holes:[[[106.53,29.64,1500],[106.55,29.64,1500],[106.55,29.66,1500],[106.53,29.66,1500]]],symbol:{color:'#ffffff',opacity:0.5,outlineColor:'#ffffff',outlineWidth:2,texture:{url:'./Qianjin_left.png',repeat:[8,4],speed:[-0.15,0]}}},
    {id:'sample-label',type:'label',position:[106.58,29.65,1500],label:{text:'独立标注\n绝对高度 1500m',fontSize:18,backgroundColor:'#173342',offset:[0,0]}}
  ];
  for(const definition of definitions){v.entities.remove(definition.id);v.entities.add(definition);}
  select('entity-select').value='sample-point';loadEntityForm();v.flyTo({longitude:106.55,latitude:29.63,altitude:14000,pitch:-65,duration:500});
}
function bind(id: string, action: () => unknown | Promise<unknown>, event = 'click') {
  element(id).addEventListener(event, () => {
    const task = Promise.resolve().then(action).then(() => { log(id); inspect(); }, error => {
      log(`${id}: ${errorMessage(error)}`);
      if (!(error instanceof ViewerError && error.code === 'ABORTED')) element('result').textContent = errorMessage(error);
      inspect();
    });
    tasks.set(id, task);
  });
}
bind('basemap', () => requireViewer().setBaseMap(select('basemap').value === 'none' ? null : select('basemap').value), 'change');
bind('terrain', () => requireViewer().setTerrainEnabled(input('terrain').checked), 'change');
bind('grid', () => requireViewer().setLodGridVisible(input('grid').checked), 'change');
bind('clear-base', () => requireViewer().setBaseMap(null));
bind('switch-race', async () => {
  const v = requireViewer();
  const maps = v.getBaseMaps();
  if (maps.length < 2) throw new Error('需要至少两个已配置底图才能比较快速切换。');
  const first = isSmoke ? 'demo-vector-light' : maps[1].id, last = isSmoke ? 'demo-raster' : maps[0].id;
  const old = v.setBaseMap(first).catch(error => { if (!(error instanceof ViewerError && error.code === 'ABORTED')) throw error; log('较早切换已 ABORTED'); });
  await v.setBaseMap(last); await old;
  if (v.baseMap.id !== last) throw new Error('最后一次请求未生效。');
});
bind('fly', () => requireViewer().flyTo({ longitude: number('longitude', -180, 180), latitude: number('latitude', -85, 85), altitude: number('altitude', 0), pitch: number('pitch', -90, 0), heading: number('heading'), duration: number('duration', 0) }));
bind('home', () => requireViewer().flyTo(home));
bind('camera-state', () => { element('camera-output').textContent = JSON.stringify(requireViewer().getCameraViewState(), null, 2); });
bind('inspect', inspect);
bind('entity-select',loadEntityForm,'change');
bind('entity-add',addEntity);
bind('entity-samples',entitySamples);
bind('entity-update',()=>{
  const current=selectedEntity(),label=entityLabel();const patch:EntityPatch={name:input('entity-name').value,label:label ?? null,heightReference:select('entity-height-reference').value as 'absolute'|'clamp-to-ground',groundOffset:number('entity-ground-offset',0,10)};
  if('position' in current)patch.position=entityPosition();else patch.positions=entityPositions(current.type);
  if(current.type!=='label')patch.symbol=entitySymbol(current.type);
  if(current.type==='polygon')patch.holes=input('entity-holes').value.trim()?JSON.parse(input('entity-holes').value):[];
  requireViewer().entities.update(current.id,patch);loadEntityForm();
});
bind('entity-move',()=>{requireViewer().entities.move(selectedEntity().id,{longitude:number('entity-dlon'),latitude:number('entity-dlat'),height:number('entity-dheight')});loadEntityForm();});
bind('entity-toggle',()=>{const current=selectedEntity();requireViewer().entities.setVisibleById(current.id,!current.visible);});
bind('entities-visible',()=>requireViewer().entities.setVisible(input('entities-visible').checked),'change');
bind('entity-remove',()=>requireViewer().entities.remove(selectedEntity().id));
bind('entity-clear',()=>{requireViewer().entities.clear();input('entity-id').value='';});
bind('entity-retry',()=>requireViewer().retryEntityResources(selectedEntity().id));
function updateDrawStyle() {
  const type=select('entity-type').value as EntityDefinition['type'];
  requireViewer().draw.setStyle(type,{symbol:type==='label'?undefined:entitySymbol(type),label:entityLabel()??null,
    heightReference:select('entity-height-reference').value as 'absolute'|'clamp-to-ground',groundOffset:number('entity-ground-offset',0,10)});
}
function startEntityDrawing(type:EntityDefinition['type'],clearPrevious=false) {
  const v=requireViewer();select('entity-type').value=type;if(type==='label'&&!input('entity-text').value)input('entity-text').value='标注';
  if(!Object.keys(v.draw.getStyle(type)).length){select('entity-occlusion').value=type==='polyline'||type==='polygon'?'depth':'overlay';
    if(type==='polyline'||type==='polygon')select('entity-height-reference').value='clamp-to-ground';}
  if(select('entity-height-reference').value==='clamp-to-ground')select('entity-pick-mode').value='surface';
  const mode=select('entity-pick-mode').value as 'surface'|'ellipsoid'|'absolute-height';
  updateDrawStyle();v.draw.start({type,clearPrevious,name:input('entity-name').value,pick:{mode,height:mode==='absolute-height'?number('entity-height'):undefined}});
}
for(const type of ['point','polyline','polygon','label'] as const)bind(`entity-draw-${type==='polyline'?'line':type}`,()=>startEntityDrawing(type));
for(const node of Array.from(element('sdk-entity-editor').querySelectorAll<HTMLInputElement|HTMLSelectElement>('input,select')))
  if(!['entity-select','entities-visible','entity-id','entity-lon','entity-lat','entity-height','entity-positions','entity-holes','entity-query-json','entity-dlon','entity-dlat','entity-dheight'].includes(node.id))
    node.addEventListener('change',()=>{if(viewer&&!viewer.isDestroyed)try{updateDrawStyle();}catch(error){log(errorMessage(error));}});
bind('entity-draw-finish',()=>requireViewer().draw.finish());bind('entity-draw-undo',()=>requireViewer().draw.undo());bind('entity-draw-cancel',()=>requireViewer().draw.cancel());
bind('entity-query',()=>{const query=JSON.parse(input('entity-query-json').value) as EntityQuery;element('entity-output').textContent=JSON.stringify(requireViewer().entities.query(query),null,2);});
bind('entity-focus',()=>{const value=selectedEntity(),p='position' in value?value.position:value.positions[0];requireViewer().flyTo({longitude:p[0],latitude:p[1],altitude:Math.max(12000,(p[2] ?? 30)+10000),pitch:-65,duration:500});});
let pointerStart: {x:number;y:number;id:number}|undefined;
element('map').addEventListener('pointerdown',event=>{if(event.button===0)pointerStart={x:event.clientX,y:event.clientY,id:event.pointerId};});
element('map').addEventListener('pointerup',event=>{
  const start=pointerStart;pointerStart=undefined;
  if(!start||start.id!==event.pointerId||Math.hypot(event.clientX-start.x,event.clientY-start.y)>4||!viewer||viewer.isDestroyed)return;
  const rect=viewer.engine.renderer.domElement.getBoundingClientRect(),screen={x:event.clientX-rect.left,y:event.clientY-rect.top};
  const hit=viewer.pick(screen);
  const mode=select('entity-pick-mode').value as 'surface'|'ellipsoid'|'absolute-height';
  const picked=viewer.pickPositionDetailed(screen,{mode,height:mode==='absolute-height'?number('entity-height'):undefined});
  const reference=viewer.pickPositionDetailed(screen,{mode:'ellipsoid'});
  if(hit){select('entity-select').value=hit.id;loadEntityForm();log(`pick: ${hit.id}`);}
  else if(input('entity-click-add').checked&&picked){const p=picked.position;
    input('entity-lon').value=String(p.longitude);input('entity-lat').value=String(p.latitude);input('entity-height').value=String(p.height);input('entity-id').value='';select('entity-type').value='point';element('entity-add').click();}
  if(input('entity-pick-diagnostics').checked)element('entity-output').textContent=JSON.stringify({picked,referenceEllipsoid:reference?.position??null,selectedObject:hit?.id??null},null,2);
});
bind('start', () => { requireViewer().start(); running = true; fpsFrames = 0; fpsStart = performance.now(); });
bind('stop', () => { requireViewer().stop(); running = false; });
bind('destroy', () => { creating?.abort(); generation++; creating = undefined; viewer?.destroy(); running = false; element('result').textContent = '已销毁，点击重新创建恢复'; });
bind('recreate', () => create());
bind('cancel-create', () => create(true));
bind('apply-config', () => { configured = true; return create(); });
window.addEventListener('pagehide', () => { creating?.abort(); viewer?.destroy(); });
window.addEventListener('message', event => {
  if (event.origin !== location.origin || event.source !== window.parent) return;
  if (event.data?.type === 'springgis:stop') element('stop').click();
  if (event.data?.type === 'springgis:start') element('start').click();
  if (event.data?.type === 'springgis:destroy') element('destroy').click();
});
if (new URLSearchParams(location.search).has('embedded')) document.body.classList.add('embedded');

// Automated UI smoke is opt-in. Normal demo never self-destructs or auto-switches.
async function smoke() {
  const check = (ok: unknown, message: string) => { if (!ok) throw new Error(message); };
  for (const config of [{}, { tianditu: { token: 'YOUR_KEY' }, maptiler: { key: 'YOUR_KEY' } }, { tianditu: { token: 'test-public-key' } }]) {
    let rejected = false; try { parseDemoConfig(config); } catch { rejected = true; }
    check(rejected, 'Missing/placeholder credentials or missing DEM must be rejected');
  }
  const localConfig = parseDemoConfig({ demo: { basemaps: [{ id: 'self-hosted', type: 'xyz', url: '/tiles/{z}/{x}/{y}.png' }], terrain: { urlTemplates: ['/dem/{z}/{x}/{y}.png'] } } });
  check(localConfig.initialBaseMap === 'self-hosted', 'User-owned keyless services should be supported');
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const until = async (test: () => boolean) => { for (let i = 0; i < 250; i++) { if (test()) return; await wait(20); } throw new Error('Demo readiness timed out'); };
  const click = async (id: string) => { element(id).click(); await tasks.get(id); };
  const change = async (id: string) => { element(id).dispatchEvent(new Event('change')); await tasks.get(id); };
  await until(() => (viewer?.engine.imagery?.stats.ready ?? 0) > 0);
  check(document.querySelectorAll('#map canvas').length === 1, 'Persistent canvas missing');
  await click('stop'); const frameCount = frames; await wait(100); check(frameCount === frames, 'Stop kept rendering');
  await click('start'); await until(() => frames > frameCount);
  await click('entity-samples'); check(requireViewer().entities.length===4,'Four entity types missing');
  await until(()=>['sample-point','sample-line','sample-polygon'].every(id=>requireViewer().getEntityResourceState(id)?.state==='ready'));
  const sample=requireViewer().entities.getById('sample-point');check(sample?.type==='point' && sample.label?.text==='业务站点','Entity query/label missing');
  input('entity-color').value='#ff0000';input('entity-size').value='24';await click('entity-update');
  check((requireViewer().entities.getById('sample-point') as Extract<EntityDefinition,{type:'point'}>).symbol?.size===24,'Symbol update failed');
  await click('entity-move');check((requireViewer().entities.getById('sample-point') as Extract<EntityDefinition,{type:'point'}>).position[0]>106.55,'Move failed');
  await click('entity-toggle');check(requireViewer().entities.getById('sample-point')?.visible===false,'Hide failed');await click('entity-toggle');
  input('entity-query-json').value='{"type":"polygon"}';await click('entity-query');check(element('entity-output').textContent?.includes('sample-polygon'),'Query control failed');
  await click('entity-clear');check(requireViewer().entities.length===0,'Clear failed');
  // Actual GPU colour probe: center fill, hole transparency, screen-pixel point and wide line.
  // Terrain remains off here: absolute height is tested without pretending to clamp.
  const v=requireViewer(); await v.setBaseMap(null);v.flyTo({longitude:106.55,latitude:29.61,altitude:30000,pitch:-90,heading:0,duration:0});
  const waitFrames=async()=>{const before=frames;await until(()=>frames>before+3);};await waitFrames();
  const canvas=v.engine.renderer.domElement;
  const center={x:canvas.clientWidth/2,y:canvas.clientHeight/2};
  const pixel=()=>new Promise<number[]>((resolve,reject)=>{
    const timeout=setTimeout(()=>{captureFrame=undefined;reject(new Error('GPU probe timed out'));},3000);
    captureFrame=()=>{captureFrame=undefined;clearTimeout(timeout);const gl=canvas.getContext('webgl2')!;const rgba=new Uint8Array(4);
      gl.readPixels(Math.floor(center.x*gl.drawingBufferWidth/canvas.clientWidth),Math.floor((canvas.clientHeight-center.y)*gl.drawingBufferHeight/canvas.clientHeight),1,1,gl.RGBA,gl.UNSIGNED_BYTE,rgba);resolve([...rgba]);};
  });
  const baseline=await pixel();
  v.entities.add({id:'probe-fill',type:'polygon',positions:[[106.5,29.56,1000],[106.6,29.56,1000],[106.6,29.66,1000],[106.5,29.66,1000]],symbol:{color:'#ff0000',opacity:1,outlineWidth:0}});
  await waitFrames();const filled=await pixel();check(filled[0]>180&&filled[0]>filled[1]*2,'GPU filled polygon not red');
  check(v.pick(center)?.id==='probe-fill','Screen polygon pick failed');
  v.entities.update('probe-fill',{holes:[[[106.54,29.60,1000],[106.56,29.60,1000],[106.56,29.62,1000],[106.54,29.62,1000]]]});
  await waitFrames();const hole=await pixel();check(hole.slice(0,3).every((value,i)=>Math.abs(value-baseline[i])<5),`GPU polygon hole incorrectly filled: base=${baseline.join(',')} hole=${hole.join(',')} fill=${filled.join(',')}`);
  check(v.pick(center)===null,'Hole should not select fill');v.entities.clear();
  v.entities.add({id:'probe-point',type:'point',position:[106.55,29.61,1000],symbol:{color:'#00ff00',outlineWidth:0,size:30},label:{text:'GPU label',offset:[0,-60]}});
  await waitFrames();const green=await pixel();check(green[1]>180&&green[1]>green[0]*2,'GPU point not green');check(v.pick(center)?.id==='probe-point','Point screen pick failed');
  const labelPixels=await new Promise<Uint8Array>((resolve,reject)=>{
    const timeout=setTimeout(()=>{captureFrame=undefined;reject(new Error('GPU label probe timed out'));},3000);
    captureFrame=()=>{captureFrame=undefined;clearTimeout(timeout);const gl=canvas.getContext('webgl2')!;
      const sx=gl.drawingBufferWidth/canvas.clientWidth,sy=gl.drawingBufferHeight/canvas.clientHeight,w=Math.ceil(140*sx),h=Math.ceil(40*sy),rgba=new Uint8Array(w*h*4);
      gl.readPixels(Math.floor((center.x-70)*sx),Math.floor((canvas.clientHeight-center.y+40)*sy),w,h,gl.RGBA,gl.UNSIGNED_BYTE,rgba);resolve(rgba);};
  });
  let whiteGlyph=false;for(let i=0;i<labelPixels.length;i+=4)if(labelPixels[i]>180&&labelPixels[i+1]>180&&labelPixels[i+2]>180)whiteGlyph=true;
  check(whiteGlyph,'GPU billboard label glyphs missing');
  const ground=v.pickPosition(center);check(ground&&Math.abs(ground.longitude-106.55)<0.001&&Math.abs(ground.latitude-29.61)<0.001,'Ellipsoid position pick failed');
  const geometryCount=v.engine.renderer.info.memory.geometries,textureCount=v.engine.renderer.info.memory.textures;
  for(let i=0;i<12;i++){v.entities.update('probe-point',{symbol:{size:20+i%4},label:{text:`更新 ${i}`}});await waitFrames();}
  check(v.engine.renderer.info.memory.geometries<=geometryCount+1&&v.engine.renderer.info.memory.textures<=textureCount+1,'Entity update leaked GPU resources');
  v.entities.setVisibleById('probe-point',false);await waitFrames();check(v.pick(center)===null,'Hidden entity picked');
  v.entities.clear();v.entities.add({id:'probe-line',type:'polyline',positions:[[106.5,29.61,1000],[106.6,29.61,1000]],symbol:{color:'#0000ff',width:16}});
  await waitFrames();const blue=await pixel();check(blue[2]>180&&blue[2]>blue[0]*2,'GPU wide line not blue');check(v.pick(center)?.id==='probe-line','Line pick failed');
  v.entities.clear();
  const imageCanvas=document.createElement('canvas');imageCanvas.width=8;imageCanvas.height=8;const imageContext=imageCanvas.getContext('2d')!;
  imageContext.fillStyle='#ff0000';imageContext.fillRect(0,0,8,4);imageContext.fillStyle='#0000ff';imageContext.fillRect(0,4,8,4);
  const imageUrl=imageCanvas.toDataURL();
  const sampleRegion=(x:number,y:number,width:number,height:number)=>new Promise<Uint8Array>((resolve,reject)=>{
    const timeout=setTimeout(()=>{captureFrame=undefined;reject(new Error('Texture GPU probe timed out'));},3000);
    captureFrame=()=>{captureFrame=undefined;clearTimeout(timeout);const gl=canvas.getContext('webgl2')!,sx=gl.drawingBufferWidth/canvas.clientWidth,sy=gl.drawingBufferHeight/canvas.clientHeight;
      const w=Math.ceil(width*sx),h=Math.ceil(height*sy),data=new Uint8Array(w*h*4);
      gl.readPixels(Math.floor(x*sx),Math.floor((canvas.clientHeight-y-height)*sy),w,h,gl.RGBA,gl.UNSIGNED_BYTE,data);resolve(data);};
  });
  v.entities.add({id:'probe-icon',type:'point',position:[106.55,29.61,1000],symbol:{icon:{url:imageUrl,width:64,height:64},color:'#ffffff',heading:0,alignment:'screen'}});
  await until(()=>v.getEntityResourceState('probe-icon')?.state==='ready');await waitFrames();
  const iconTop=await sampleRegion(center.x,center.y-16,1,1);check(iconTop[0]>200&&iconTop[2]<40,'Icon PNG top/bottom orientation wrong');
  const iconMemory=v.engine.renderer.info.memory.textures,iconGeometry=v.engine.renderer.info.memory.geometries;
  v.entities.update('probe-icon',{symbol:{heading:90}});await waitFrames();
  const iconRight=await sampleRegion(center.x+16,center.y,1,1);check(iconRight[0]>200&&iconRight[2]<40,'Icon clockwise heading rotation failed');
  check(v.engine.renderer.info.memory.textures===iconMemory&&v.engine.renderer.info.memory.geometries===iconGeometry,'Heading change recreated GPU resources');
  v.entities.clear();
  imageContext.fillStyle='#ff0000';imageContext.fillRect(0,0,4,8);imageContext.fillStyle='#0000ff';imageContext.fillRect(4,0,4,8);
  const flowUrl=imageCanvas.toDataURL();
  v.entities.add({id:'probe-flow',type:'polyline',positions:[[106.5,29.61,1000],[106.6,29.61,1000]],symbol:{color:'#ffffff',width:24,texture:{url:flowUrl,length:32,speed:24,sourceDirection:'left'}}});
  await until(()=>v.getEntityResourceState('probe-flow')?.state==='ready');await waitFrames();
  const flowA=await sampleRegion(center.x-40,center.y-8,80,16),flowGeometry=v.engine.renderer.info.memory.geometries;
  await wait(250);const flowB=await sampleRegion(center.x-40,center.y-8,80,16);
  check(flowA.some((value,i)=>Math.abs(value-flowB[i])>80),'Line texture did not flow');check(v.engine.renderer.info.memory.geometries===flowGeometry,'Flow rebuilt line geometry');
  v.entities.clear();
  v.entities.add({id:'probe-surface',type:'polygon',positions:[[106.5,29.56,1000],[106.6,29.56,1000],[106.6,29.66,1000],[106.5,29.66,1000]],symbol:{color:'#ffffff',opacity:0.5,outlineWidth:0,texture:{url:flowUrl,repeat:[16,16],speed:[1,0]}}});
  await until(()=>v.getEntityResourceState('probe-surface')?.state==='ready');await waitFrames();
  const surfaceA=await sampleRegion(center.x-30,center.y-30,60,60);await wait(250);const surfaceB=await sampleRegion(center.x-30,center.y-30,60,60);
  check(surfaceA.some((value,i)=>Math.abs(value-surfaceB[i])>40),'Polygon texture did not scroll');
  const transparent=await pixel();check(Math.max(...transparent.slice(0,3))<220,'Polygon texture opacity not applied');
  v.entities.clear();v.entities.add({id:'probe-failed-icon',type:'point',position:[106.55,29.61,1000],symbol:{icon:{url:'./missing-image-probe.png'}}});
  await until(()=>v.getEntityResourceState('probe-failed-icon')?.state==='error');check(v.retryEntityResources('probe-failed-icon'),'Image error retry rejected');
  await until(()=>v.getEntityResourceState('probe-failed-icon')?.state==='error');v.entities.clear();
  v.entities.clear();await v.setBaseMap('demo-raster');v.flyTo(home);
  v.flyTo({longitude:106.55,latitude:29.61,altitude:12000,pitch:-55,heading:20,duration:0});await waitFrames();
  const canvasClick=(x:number,y:number)=>{const r=canvas.getBoundingClientRect();canvas.dispatchEvent(new PointerEvent('pointerdown',{button:0,pointerId:88,clientX:r.left+r.width*x,clientY:r.top+r.height*y}));
    canvas.dispatchEvent(new PointerEvent('pointerup',{button:0,pointerId:88,clientX:r.left+r.width*x,clientY:r.top+r.height*y}));};
  await click('entity-draw-line');check(v.draw.isActive&&v.engine.controls.enabled,'Polyline drawing mode/navigation allow failed');
  canvasClick(.35,.55);canvasClick(.45,.65);await click('entity-draw-undo');check(v.draw.state.vertexCount===1,'Drawing undo failed');
  canvasClick(.45,.65);await click('entity-draw-finish');
  const drawnLine=v.entities.getById(v.draw.state.lastEntityId!);check(drawnLine?.type==='polyline'&&drawnLine.positions.length===2&&v.engine.controls.enabled,'Polyline drawing commit failed');
  await click('entity-draw-polygon');canvasClick(.30,.55);canvasClick(.42,.58);canvasClick(.32,.70);await click('entity-draw-finish');
  const drawnFace=v.entities.getById(v.draw.state.lastEntityId!);check(drawnFace?.type==='polygon'&&drawnFace.positions.length===3,'Polygon drawing commit failed');
  await click('entity-draw-line');canvasClick(.25,.65);await click('entity-draw-cancel');check(!v.draw.isActive&&v.engine.controls.enabled,'Drawing cancellation did not restore navigation');
  const tools=Array.from(document.querySelectorAll<HTMLImageElement>('#map .sag-tools img'));
  await Promise.all(tools.map(img=>img.decode()));check(tools.length===7,'Compact bundled toolbar icons missing');
  v.measure.start();canvasClick(.30,.55);canvasClick(.35,.6);check(v.draw.isActive&&v.measure.state.kind==='point'&&v.draw.state.vertexCount===2,'Continuous point measurement failed');v.measure.stop();check(!v.draw.isActive,'Point measurement stop failed');v.measure.clear();
  v.draw.start({type:'point'});canvasClick(.30,.55);canvasClick(.35,.6);check(v.draw.isActive&&v.draw.state.vertexCount===2,'Continuous marker mode failed');v.draw.stop();check(!v.draw.isActive,'Marker stop failed');
  const beforeCompass=v.engine.camera.position.clone(),projection=v.engine.camera.projectionMatrix.clone();v.orientNorthUp();
  check(v.engine.camera.position.distanceTo(beforeCompass)<1e-9&&v.engine.camera.projectionMatrix.equals(projection),'Compass moved camera or changed projection');
  v.draw.start({type:'polyline',navigation:'lock'});check(!v.engine.controls.enabled,'Explicit navigation lock missing');v.draw.cancel();check(v.engine.controls.enabled,'Lock restoration failed');
  v.measure.start('distance');canvasClick(.35,.5);canvasClick(.45,.6);const distance=v.measure.finish();
  check(distance.kind==='distance'&&distance.metres>0,'Public distance measurement failed');const measurementId=v.measure.state.entityId!;
  check(!!v.entities.getById(measurementId)?.properties?.measurementResult,'Measurement properties missing');
  v.measure.start('area');canvasClick(.35,.5);canvasClick(.45,.5);canvasClick(.40,.6);const area=v.measure.finish();
  check(area.kind==='area'&&area.squareMetres>0,'Public area measurement failed');
  const hit=v.inspectAt({x:canvas.clientWidth*.4,y:canvas.clientHeight*.55});check(!!hit.surface?.position,'Point query missing surface');
  v.measure.clear();check(!v.entities.has(measurementId),'Measurement clear did not delete owned result');
  v.entities.clear();v.flyTo(home);
  input('grid').checked = true; await change('grid'); check(requireViewer().lodGridVisible, 'Grid did not enable');
  input('terrain').checked = true; await change('terrain'); await until(() => (viewer?.engine.terrain?.stats.ready ?? 0) > 0);
  requireViewer().entities.add({id:'preserved-business',type:'point',position:[106.55,29.61,1500]});
  select('basemap').value = 'demo-vector-dark'; await change('basemap'); await until(() => (viewer?.engine.imagery?.stats.ready ?? 0) > 0);
  const vector = requireViewer().engine.imagery!.provider as { drawStats?: { worker: boolean } };
  check(requireViewer().baseMap.id === 'demo-vector-dark' && vector.drawStats?.worker, 'Vector switch/Worker failed');
  check(requireViewer().entities.has('preserved-business'), 'Base switch removed business objects');
  await until(()=>requireViewer().getPolarSurfaceState()?.north.mode==='sampled');
  const darkPolar=requireViewer().getPolarSurfaceState();check(darkPolar?.mapId==='demo-vector-dark','Polar appearance leaked from previous basemap');
  const polarPixel=async()=>{requireViewer().flyTo({longitude:0,latitude:88,altitude:30000,pitch:-90,heading:0,duration:0});await waitFrames();
    // Default framebuffer is not preserved after browser compositing. Read in
    // the render-frame callback, not an arbitrary setTimeout readiness poll.
    return new Promise<Uint8Array>(resolve=>requestAnimationFrame(()=>{const p=new Uint8Array(4),context=canvas.getContext('webgl2')!;context.readPixels(context.drawingBufferWidth/2,context.drawingBufferHeight/2,1,1,context.RGBA,context.UNSIGNED_BYTE,p);resolve(p);}));};
  const darkPixel=await polarPixel();check(darkPixel[0]<80&&darkPixel[2]<120,'Native dark-map polar GPU pixels did not match map style');
  await requireViewer().setBaseMap('demo-vector-light');await until(()=>requireViewer().getPolarSurfaceState()?.mapId==='demo-vector-light');
  check(requireViewer().getPolarSurfaceState()?.north.mode!=='fallback','Vector polar style must prepare before tile pixels');
  const lightPixel=await polarPixel();check(lightPixel[0]>180&&lightPixel[1]>180,`Native light-map polar GPU pixels did not match map style: ${Array.from(lightPixel)}; ${JSON.stringify(requireViewer().getPolarSurfaceState())}`);
  await requireViewer().setBaseMap('demo-vector-dark');await until(()=>requireViewer().getPolarSurfaceState()?.mapId==='demo-vector-dark');
  check(requireViewer().getPolarSurfaceState()?.north.mode==='sampled','Prepared native vector polar atlas was not reused');
  requireViewer().flyTo(home);await waitFrames();
  await click('camera-state'); check(element('camera-output').textContent?.includes('cameraLongitude'), 'Camera state missing');
  input('duration').value = '0'; await click('fly'); await click('home');
  await click('switch-race'); check(requireViewer().baseMap.id === 'demo-raster', 'Latest-wins failed');
  await click('clear-base'); check(requireViewer().baseMap.id === null, 'Clear failed');
  await click('destroy'); await click('destroy'); check(viewer?.isDestroyed && !document.querySelector('#map canvas'), 'Destroy failed');
  await click('cancel-create'); check(!document.querySelector('#map canvas'), 'Creation cancellation leaked');
  await click('recreate'); await until(() => (viewer?.engine.imagery?.stats.ready ?? 0) > 0);
  await wait(1000); check(document.querySelectorAll('#map canvas').length === 1 && !requireViewer().isDestroyed, 'Demo did not remain visible');
  check(document.querySelectorAll('#map .sag-tools').length===1,'Toolbar lifecycle leaked UI');
  element('result').dataset.status = 'passed'; element('result').textContent = 'PASS: installed SDK entities, icon heading/orientation, textured flowing lines and translucent scrolling polygons, GPU pixels/resources, Worker and lifecycle; persistent canvas retained';
}
void create().then(() => isSmoke ? smoke() : undefined).catch(error => {
  element('result').dataset.status = isSmoke ? 'failed' : 'blocked'; element('result').textContent = `${isSmoke ? 'FAIL' : '需配置资源'}: ${errorMessage(error)}`; log(errorMessage(error));
  element('life').textContent = '资源配置未就绪 · 尚未创建地图';
});
