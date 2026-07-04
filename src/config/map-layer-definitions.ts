import type { MapLayers } from '@/types';
// boundary-ignore: isDesktopRuntime is a pure env probe with no service dependencies
import { isDesktopRuntime } from '@/services/runtime';

export type MapRenderer = 'flat' | 'globe';
export type MapVariant = 'full' | 'tech' | 'finance' | 'happy' | 'commodity' | 'energy';

const _desktop = isDesktopRuntime();

export interface LayerDefinition {
  key: keyof MapLayers;
  icon: string;
  i18nSuffix: string;
  fallbackLabel: string;
  renderers: MapRenderer[];
  premium?: 'locked' | 'enhanced';
  /**
   * When true, this layer only renders under DeckGL — neither the SVG/mobile
   * fallback in Map.ts nor the WebGL GlobeMap has a code path for its data.
   * `renderers: ['flat']` is not sufficient because `'flat'` covers both
   * DeckGL-flat and SVG-flat. Consumers (layer picker, CMD+K dispatcher)
   * must additionally gate on `isDeckGLActive()` for these layers.
   */
  deckGLOnly?: boolean;
}

export type LayerExplanationCoverage = 'curated' | 'fallback';

export interface LayerExplanation {
  key: keyof MapLayers;
  coverage: LayerExplanationCoverage;
  category: string;
  purpose: string;
  source: string;
  freshness: string;
  confidence: string;
  limitations: string[];
  related: string[];
  evidence: string[];
}

const def = (
  key: keyof MapLayers,
  icon: string,
  i18nSuffix: string,
  fallbackLabel: string,
  renderers: MapRenderer[] = ['flat', 'globe'],
  premium?: 'locked' | 'enhanced',
  deckGLOnly?: boolean,
): LayerDefinition => ({
  key, icon, i18nSuffix, fallbackLabel, renderers,
  ...(premium && { premium }),
  ...(deckGLOnly && { deckGLOnly: true }),
});

export const LAYER_REGISTRY: Record<keyof MapLayers, LayerDefinition> = {
  iranAttacks:              def('iranAttacks',              '&#127919;', 'iranAttacks',              'Iran Attacks', ['flat', 'globe'], _desktop ? 'locked' : undefined),
  hotspots:                 def('hotspots',                 '&#127919;', 'intelHotspots',            'Intel Hotspots'),
  conflicts:                def('conflicts',                '&#9876;',   'conflictZones',            'Conflict Zones'),

  bases:                    def('bases',                    '&#127963;', 'militaryBases',            'Military Bases'),
  nuclear:                  def('nuclear',                  '&#9762;',   'nuclearSites',             'Nuclear Sites'),
  irradiators:              def('irradiators',              '&#9888;',   'gammaIrradiators',         'Gamma Irradiators'),
  radiationWatch:           def('radiationWatch',           '&#9762;',   'radiationWatch',           'Radiation Watch'),
  spaceports:               def('spaceports',               '&#128640;', 'spaceports',               'Spaceports'),
  satellites:               def('satellites',               '&#128752;', 'satellites',               'Orbital Surveillance', ['flat', 'globe']),

  cables:                   def('cables',                   '&#128268;', 'underseaCables',           'Undersea Cables'),
  pipelines:                def('pipelines',                '&#128738;', 'pipelines',                'Pipelines'),
  datacenters:              def('datacenters',              '&#128421;', 'aiDataCenters',            'AI Data Centers'),
  military:                 def('military',                 '&#9992;',   'militaryActivity',         'Military Activity'),
  ais:                      def('ais',                      '&#128674;', 'shipTraffic',              'Ship Traffic'),
  tradeRoutes:              def('tradeRoutes',              '&#9875;',   'tradeRoutes',              'Trade Routes'),
  flights:                  def('flights',                  '&#9992;',   'flightDelays',             'Aviation'),
  protests:                 def('protests',                 '&#128226;', 'protests',                 'Protests'),
  ucdpEvents:               def('ucdpEvents',               '&#9876;',   'ucdpEvents',               'Armed Conflict Events'),
  displacement:             def('displacement',             '&#128101;', 'displacementFlows',        'Displacement Flows'),
  climate:                  def('climate',                  '&#127787;', 'climateAnomalies',         'Climate Anomalies'),
  weather:                  def('weather',                  '&#9928;',   'weatherAlerts',            'Weather Alerts'),
  outages:                  def('outages',                  '&#128225;', 'internetOutages',          'Internet Disruptions'),
  cyberThreats:             def('cyberThreats',             '&#128737;', 'cyberThreats',             'Cyber Threats'),
  natural:                  def('natural',                  '&#127755;', 'naturalEvents',            'Natural Events'),
  fires:                    def('fires',                    '&#128293;', 'fires',                    'Fires'),
  waterways:                def('waterways',                '&#9875;',   'strategicWaterways',       'Chokepoints'),
  economic:                 def('economic',                 '&#128176;', 'economicCenters',          'Economic Centers'),
  minerals:                 def('minerals',                 '&#128142;', 'criticalMinerals',         'Critical Minerals'),
  gpsJamming:               def('gpsJamming',               '&#128225;', 'gpsJamming',               'GPS Jamming', ['flat', 'globe'], _desktop ? 'locked' : undefined),
  ciiChoropleth:            def('ciiChoropleth',            '&#127758;', 'ciiChoropleth',            'CII Instability', ['flat'], _desktop ? 'enhanced' : undefined),
  // DeckGLMap owns the resilience choropleth; Map.ts/MapContainer strip it
  // on SVG/mobile fallback.
  resilienceScore:          def('resilienceScore',          '&#128200;', 'resilienceScore',          'Resilience', ['flat'], 'locked', true),
  dayNight:                 def('dayNight',                 '&#127763;', 'dayNight',                 'Day/Night', ['flat']),
  sanctions:                def('sanctions',                '&#128683;', 'sanctions',                'Sanctions', ['flat']),
  startupHubs:              def('startupHubs',              '&#128640;', 'startupHubs',              'Startup Hubs'),
  techHQs:                  def('techHQs',                  '&#127970;', 'techHQs',                  'Tech HQs'),
  accelerators:             def('accelerators',             '&#9889;',   'accelerators',             'Accelerators'),
  cloudRegions:             def('cloudRegions',             '&#9729;',   'cloudRegions',             'Cloud Regions'),
  techEvents:               def('techEvents',               '&#128197;', 'techEvents',               'Tech Events'),
  stockExchanges:           def('stockExchanges',           '&#127963;', 'stockExchanges',           'Stock Exchanges'),
  financialCenters:         def('financialCenters',         '&#128176;', 'financialCenters',         'Financial Centers'),
  centralBanks:             def('centralBanks',             '&#127974;', 'centralBanks',             'Central Banks'),
  commodityHubs:            def('commodityHubs',            '&#128230;', 'commodityHubs',            'Commodity Hubs'),
  gulfInvestments:          def('gulfInvestments',          '&#127760;', 'gulfInvestments',          'GCC Investments'),
  positiveEvents:           def('positiveEvents',           '&#127775;', 'positiveEvents',           'Positive Events'),
  kindness:                 def('kindness',                 '&#128154;', 'kindness',                 'Acts of Kindness'),
  happiness:                def('happiness',                '&#128522;', 'happiness',                'World Happiness'),
  speciesRecovery:          def('speciesRecovery',          '&#128062;', 'speciesRecovery',          'Species Recovery'),
  renewableInstallations:   def('renewableInstallations',   '&#9889;',   'renewableInstallations',   'Clean Energy'),
  miningSites:              def('miningSites',              '&#128301;', 'miningSites',              'Mining Sites'),
  processingPlants:         def('processingPlants',         '&#127981;', 'processingPlants',         'Processing Plants'),
  commodityPorts:           def('commodityPorts',           '&#9973;',   'commodityPorts',           'Commodity Ports'),
  webcams:                  def('webcams',                  '&#128247;', 'webcams',                  'Live Webcams'),
  // weatherRadar removed — radar tiles now auto-start when Weather Alerts layer is toggled on
  diseaseOutbreaks:         def('diseaseOutbreaks',         '&#129440;', 'diseaseOutbreaks',         'Disease Outbreaks', ['flat'], undefined, true),
  // DeckGL-only layers. `renderers: ['flat']` hides them from the globe
  // picker (GlobeMap has no branch in ensureStaticDataForLayer / no entry
  // in the layer-channel map). `deckGLOnly: true` also hides them from
  // the SVG/mobile fallback's CMD+K dispatch (Map.ts has no SVG render
  // path for either marker/pin type). Restore to `['flat', 'globe']`
  // without `deckGLOnly` once both renderers gain real support.
  storageFacilities:        def('storageFacilities',        '&#127959;', 'storageFacilities',        'Storage Facilities', ['flat'], undefined, true),
  fuelShortages:            def('fuelShortages',            '&#9881;',   'fuelShortages',            'Fuel Shortages', ['flat'], undefined, true),
  liveTankers:              def('liveTankers',              '&#128674;', 'liveTankers',              'Live Tanker Positions', ['flat'], undefined, true),
};

export const V1_LAYER_EXPLANATION_KEYS = [
  'conflicts',
  'ucdpEvents',
  'ciiChoropleth',
  'natural',
  'flights',
  'ais',
  'waterways',
  'tradeRoutes',
  'cyberThreats',
  'hotspots',
] as const satisfies readonly (keyof MapLayers)[];

export const LAYER_EXPLANATIONS: Partial<Record<keyof MapLayers, LayerExplanation>> = {
  conflicts: {
    key: 'conflicts',
    coverage: 'curated',
    category: '冲突',
    purpose: '展示精选的冲突区与地缘政治边界叠加，帮助分析师将实时信号与已知冲突战区对应。',
    source: 'WorldMonitor 冲突区注册表、UCDP/ACLED 冲突背景数据，以及朝鲜 DMZ 等已记录的边界元数据。',
    freshness: '基础区域为精选/静态。动态冲突事件输入通过 ACLED/UCDP 数据流和健康信号单独追踪。',
    confidence: '适用于地理方位参考；本身不构成实时事件确认。',
    limitations: [
      '静态区域可能滞后于快速战术变化。',
      '部分冲突证据出现在 UCDP 事件、CII 等面板中，而非冲突区多边形。',
    ],
    related: ['UCDP 事件', 'CII 面板', '战略风险', '国家简报'],
    evidence: ['docs/data-sources.mdx', 'docs/architecture.mdx', 'src/config/geo.ts'],
  },
  ucdpEvents: {
    key: 'ucdpEvents',
    coverage: 'curated',
    category: '冲突',
    purpose: '绘制事件级武装冲突记录，包含国家、参与方、日期和伤亡范围。',
    source: '通过冲突服务和 UCDP 事件种子接入的乌普萨拉冲突数据项目（UCDP）GED API。',
    freshness: 'UCDP 种子健康时每 6 小时播种一次。',
    confidence: '编辑一致性高于原始突发信息流，但有意滞后，并非实时战场信息。',
    limitations: [
      '年度/研究级发布节奏可能遗漏最新事件。',
      '伤亡范围为估算值，应作为区间解读，而非精确计数。',
    ],
    related: ['UCDP 事件面板', 'CII 冲突组件', '国家时间线'],
    evidence: ['docs/architecture.mdx', 'src/services/conflict/index.ts', 'scripts/seed-ucdp-events.mjs'],
  },
  ciiChoropleth: {
    key: 'ciiChoropleth',
    coverage: 'curated',
    category: '国家风险',
    purpose: '按当前国家不稳定指数（CII）得分对各国着色，用于宏观战略风险分诊。',
    source: 'WorldMonitor CII 评分服务，综合冲突、动荡、旅行警示、网络、AIS、航空、自然事件和新闻信号。',
    freshness: '风险评分缓存每 8 分钟温热探测；seed-meta 和 health.riskScores 在 30 分钟新鲜度预算内暴露实时、过期、部分或降级状态。',
    confidence: '复合模型信号，非官方国家评级或概率预测。',
    limitations: [
      '数据源稀疏或降级时，即使国家仍有得分，可信度也会降低。',
      '国家级颜色可能掩盖国内地区差异，引用前应对照面板核实。',
    ],
    related: ['CII 面板', '战略风险面板', '数据新鲜度状态', '国家简报'],
    evidence: ['docs/strategic-risk.mdx', 'docs/architecture.mdx', 'src/services/cached-risk-scores.ts'],
  },
  natural: {
    key: 'natural',
    coverage: 'curated',
    category: '自然灾害',
    purpose: '展示地震、严重灾害警报和活跃的对地观测事件，用于态势感知。',
    source: 'USGS 地震、GDACS 警报和 NASA EONET 事件，合并至自然事件服务。',
    freshness: '自然事件每 2 小时播种一次；USGS 地震的预期源节奏约为 5 分钟。',
    confidence: '对已检测的公共灾害信号可信度高；可信度因灾害类型和上游报告延迟而异。',
    limitations: [
      '低严重度 GDACS 警报被过滤以保持地图可读性。',
      'EONET 野火经过新鲜度过滤，较早的开放事件可能不显示为活跃地图点。',
    ],
    related: ['自然事件图层弹窗', '天气警报', '国家简报自然信号'],
    evidence: ['docs/data-sources.mdx', 'docs/architecture.mdx', 'server/worldmonitor/natural/v1/list-natural-events.ts'],
  },
  flights: {
    key: 'flights',
    coverage: 'curated',
    category: '航空',
    purpose: '突出显示机场中断、关闭、NOTAM 衍生的空域问题，以及可用时的实时飞机位置。',
    source: 'FAA ASWS、AviationStack、ICAO NOTAM、OpenSky/Wingbits 飞机追踪和航空服务。',
    freshness: '机场中断种子每 30 分钟运行一次；航空面板还以 5 分钟轮询周期刷新运营视图。',
    confidence: '最适合中断分诊；单架飞机实时覆盖取决于 ADS-B 可用性和已配置的提供商。',
    limitations: [
      '缺少 API 密钥时可能出现 AviationStack 模拟演示数据。',
      'ADS-B 覆盖较弱或受阻区域，实时飞机位置可能延迟或缺失。',
    ],
    related: ['航空情报面板', '航空命令栏', '国家简报航空信号'],
    evidence: ['docs/data-sources.mdx', 'docs/architecture.mdx', 'src/services/aviation/index.ts', 'scripts/seed-aviation.mjs'],
  },
  ais: {
    key: 'ais',
    coverage: 'curated',
    category: '海事',
    purpose: '展示战略水域和咽喉要道周围的船舶密度和 AIS 中断信号。',
    source: 'AISStream 中继快照、WorldMonitor 海事服务和咽喉要道中断分类器。',
    freshness: 'AIS 中继快照默认每 5 秒重建；服务器可能缓存基础密度快照 5 分钟，中继凭据/连接不可用时图层被禁用或过期。',
    confidence: '适用于海事异常筛查，但 AIS 为自主上报，船舶可能关闭信号。',
    limitations: [
      '陆地 AIS 覆盖不均，中东、亚洲和开阔大洋能见度较弱。',
      '暗船由信号缺口和拥堵模式推断，并非意图的直接证据。',
    ],
    related: ['供应链面板', '咽喉要道条带', '军用船只', '国家简报 AIS 信号'],
    evidence: ['docs/features.mdx', 'docs/architecture.mdx', 'src/services/maritime/index.ts', 'scripts/ais-relay.cjs'],
  },
  waterways: {
    key: 'waterways',
    coverage: 'curated',
    category: '海事',
    purpose: '标注战略水道和咽喉要道，使中断信号可对照固定海事地理解读。',
    source: 'WorldMonitor 战略水道注册表，叠加来自 AIS、NGA 警告和 PortWatch 衍生数据流的供应链咽喉要道状态。',
    freshness: '水道位置为静态；实时咽喉要道状态每 30 分钟温热探测，中继/PortWatch 路径健康时过境摘要每 10 分钟刷新。',
    confidence: '固定地理可信度高；实时中断可信度取决于配套的 AIS、NGA 和 PortWatch 数据流。',
    limitations: [
      '咽喉要道标记可见不意味着存在活跃中断。',
      '区域电子围栏和建模航线可能简化复杂交通模式。',
    ],
    related: ['供应链面板', '贸易航线图层', '航线浏览器', '情景引擎'],
    evidence: ['docs/architecture.mdx', 'docs/data-sources.mdx', 'src/config/geo.ts', 'server/worldmonitor/supply-chain/v1/get-chokepoint-status.ts'],
  },
  tradeRoutes: {
    key: 'tradeRoutes',
    coverage: 'curated',
    category: '海事',
    purpose: '绘制经过战略咽喉要道的主要集装箱、能源和散货航线，用于中断路径推理。',
    source: 'WorldMonitor 贸易航线注册表，加上供应链咽喉要道状态和过境摘要。',
    freshness: '航线几何为静态。咽喉要道状态每 30 分钟温热探测，过境摘要通过供应链缓存和中继路径每 10 分钟刷新。',
    confidence: '适用于航线级风险背景；非单船级航线数据流。',
    limitations: [
      '航线为建模通道，可能与具体航次计划不符。',
      '中断叠加取决于当前咽喉要道和 AIS 健康状态。',
    ],
    related: ['供应链面板', '航线浏览器', '情景引擎', '战略水道图层'],
    evidence: ['docs/data-sources.mdx', 'docs/architecture.mdx', 'src/config/trade-routes.ts', 'src/services/supply-chain/index.ts'],
  },
  cyberThreats: {
    key: 'cyberThreats',
    coverage: 'curated',
    category: '网络',
    purpose: '映射地理富化的入侵指标，如 C2 服务器、恶意软件宿主、钓鱼、恶意 URL 和勒索软件基础设施。',
    source: 'abuse.ch Feodo Tracker 和 URLhaus、C2IntelFeeds、AlienVault OTX、AbuseIPDB、ransomware.live RSS/新闻数据流，以及 IP 地理定位富化。',
    freshness: '网络威胁种子每 2 小时运行；显示的 IOC 使用 14 天滚动窗口并为地图性能设上限。',
    confidence: '适用于基础设施可见性，但归因和 IP 地理定位可能存在噪声。',
    limitations: [
      'IP 地理定位可能指向托管基础设施，而非操作者或受害者。',
      '数据流可用性、API 密钥和各数据流滥用报告可能导致覆盖偏差。',
    ],
    related: ['网络威胁地图弹窗', 'CII 网络补充加权', '数据新鲜度状态'],
    evidence: ['docs/data-sources.mdx', 'docs/architecture.mdx', 'scripts/seed-cyber-threats.mjs', 'server/worldmonitor/cyber/v1/list-cyber-threats.ts'],
  },
  hotspots: {
    key: 'hotspots',
    coverage: 'curated',
    category: '新闻 / 热点',
    purpose: '突出显示受监控的地缘政治热点，并在相关新闻和升级信号汇聚时提高其等级。',
    source: 'WorldMonitor 热点注册表、RSS/GDELT 新闻情报、热点升级评分、军事活动和 CII 背景。',
    freshness: '热点位置为精选/静态。新闻数据流单独追踪新鲜度；实时新闻 RSS 缓存预期约 5 分钟，GDELT 情报有更长的播种/缓存周期。',
    confidence: '可用作分诊线索，不打开底层新闻和国家背景时不构成可引用级别的结论。',
    limitations: [
      '新闻量和关键词匹配可能过度代表高覆盖地区。',
      'RSS/GDELT 覆盖稀疏或延迟时可能遗漏低知名度事件。',
    ],
    related: ['实时新闻面板', '战略风险面板', '国家简报', '热点弹窗'],
    evidence: ['docs/data-sources.mdx', 'docs/architecture.mdx', 'src/config/geo.ts', 'src/services/hotspot-escalation.ts'],
  },
};

const VARIANT_LAYER_ORDER: Record<MapVariant, Array<keyof MapLayers>> = {
  full: [
    'iranAttacks', 'hotspots', 'conflicts',
    'bases', 'nuclear', 'irradiators', 'radiationWatch', 'spaceports',
    'cables', 'pipelines', 'storageFacilities', 'fuelShortages', 'datacenters', 'military',
    'ais', 'tradeRoutes', 'flights', 'protests',
    'ucdpEvents', 'displacement', 'climate', 'weather',
    'outages', 'cyberThreats', 'natural', 'fires',
    'waterways', 'economic', 'minerals', 'gpsJamming',
    'satellites', 'ciiChoropleth', 'resilienceScore', 'sanctions', 'dayNight', 'webcams',
    'diseaseOutbreaks',
  ],
  tech: [
    'startupHubs', 'techHQs', 'accelerators', 'cloudRegions',
    'datacenters', 'cables', 'outages', 'cyberThreats',
    'techEvents', 'resilienceScore', 'natural', 'fires', 'dayNight',
  ],
  finance: [
    'stockExchanges', 'financialCenters', 'centralBanks', 'commodityHubs',
    'gulfInvestments', 'tradeRoutes', 'cables', 'pipelines',
    'outages', 'weather', 'economic', 'waterways',
    'resilienceScore', 'natural', 'cyberThreats', 'sanctions', 'dayNight',
  ],
  happy: [
    'positiveEvents', 'kindness', 'happiness', 'resilienceScore',
    'speciesRecovery', 'renewableInstallations',
  ],
  commodity: [
    'miningSites', 'processingPlants', 'commodityPorts', 'commodityHubs',
    'minerals', 'pipelines', 'waterways', 'tradeRoutes',
    'ais', 'economic', 'fires', 'climate',
    'resilienceScore', 'natural', 'weather', 'outages', 'sanctions', 'dayNight',
  ],
  energy: [
    // Core energy infrastructure — mirror of ENERGY_MAP_LAYERS in panels.ts
    'pipelines', 'storageFacilities', 'fuelShortages', 'waterways', 'commodityPorts', 'commodityHubs',
    'ais', 'liveTankers', 'tradeRoutes', 'minerals',
    // Energy-adjacent context
    'sanctions', 'fires', 'climate', 'weather', 'outages', 'natural',
    'resilienceScore', 'dayNight',
  ],
};

const I18N_PREFIX = 'components.deckgl.layers.';

export function getLayersForVariant(variant: MapVariant, renderer: MapRenderer): LayerDefinition[] {
  const keys = VARIANT_LAYER_ORDER[variant] ?? VARIANT_LAYER_ORDER.full;
  return keys
    .map(k => LAYER_REGISTRY[k])
    .filter(d => d.renderers.includes(renderer));
}

export function getAllowedLayerKeys(variant: MapVariant): Set<keyof MapLayers> {
  return new Set(VARIANT_LAYER_ORDER[variant] ?? VARIANT_LAYER_ORDER.full);
}

export function sanitizeLayersForVariant(layers: MapLayers, variant: MapVariant): MapLayers {
  const allowed = getAllowedLayerKeys(variant);
  const sanitized = { ...layers };
  for (const key of Object.keys(sanitized) as Array<keyof MapLayers>) {
    if (!allowed.has(key)) sanitized[key] = false;
  }
  return sanitized;
}

/**
 * Checks whether a layer can actually render under the given renderer +
 * DeckGL state. Used by both the layer picker UI and the CMD+K dispatcher
 * to hide / silently-skip toggles that would be a no-op.
 *
 * Rules:
 *   - The layer's declared `renderers` must include `currentRenderer`
 *     (catches globe toggles for flat-only layers).
 *   - If `deckGLOnly: true`, the SVG/mobile fallback can't render either,
 *     so DeckGL must be active (catches flat-only layers whose data
 *     shape is DeckGL-specific — see storageFacilities, fuelShortages).
 */
export function isLayerExecutable(
  layerKey: keyof MapLayers,
  currentRenderer: MapRenderer,
  isDeckGLActive: boolean,
): boolean {
  const def = LAYER_REGISTRY[layerKey];
  if (!def) return false;
  if (!def.renderers.includes(currentRenderer)) return false;
  if (def.deckGLOnly && !isDeckGLActive) return false;
  return true;
}

export const LAYER_SYNONYMS: Record<string, Array<keyof MapLayers>> = {
  aviation: ['flights'],
  flight: ['flights'],
  airplane: ['flights'],
  plane: ['flights'],
  notam: ['flights'],
  ship: ['ais', 'tradeRoutes'],
  vessel: ['ais'],
  maritime: ['ais', 'waterways', 'tradeRoutes'],
  sea: ['ais', 'waterways', 'cables'],
  ocean: ['cables', 'waterways'],
  war: ['conflicts', 'ucdpEvents', 'military'],
  battle: ['conflicts', 'ucdpEvents'],
  army: ['military', 'bases'],
  navy: ['military', 'ais'],
  missile: ['iranAttacks', 'military'],
  nuke: ['nuclear'],
  radiation: ['radiationWatch', 'nuclear', 'irradiators'],
  radnet: ['radiationWatch'],
  safecast: ['radiationWatch'],
  anomaly: ['radiationWatch', 'climate'],
  space: ['spaceports', 'satellites'],
  orbit: ['satellites'],
  internet: ['outages', 'cables', 'cyberThreats'],
  cyber: ['cyberThreats', 'outages'],
  hack: ['cyberThreats'],
  earthquake: ['natural'],
  volcano: ['natural'],
  tsunami: ['natural'],
  storm: ['weather', 'natural'],
  hurricane: ['weather', 'natural'],
  typhoon: ['weather', 'natural'],
  cyclone: ['weather', 'natural'],
  flood: ['weather', 'natural'],
  wildfire: ['fires'],
  forest: ['fires'],
  refugee: ['displacement'],
  migration: ['displacement'],
  riot: ['protests'],
  demonstration: ['protests'],
  oil: ['pipelines', 'commodityHubs'],
  gas: ['pipelines'],
  energy: ['pipelines', 'renewableInstallations'],
  solar: ['renewableInstallations'],
  wind: ['renewableInstallations'],
  green: ['renewableInstallations', 'speciesRecovery'],
  money: ['economic', 'financialCenters', 'stockExchanges'],
  bank: ['centralBanks', 'financialCenters'],
  stock: ['stockExchanges'],
  trade: ['tradeRoutes', 'waterways'],
  cloud: ['cloudRegions', 'datacenters'],
  ai: ['datacenters'],
  startup: ['startupHubs', 'accelerators'],
  tech: ['techHQs', 'techEvents', 'startupHubs', 'cloudRegions', 'datacenters'],
  gps: ['gpsJamming'],
  jamming: ['gpsJamming'],
  mineral: ['minerals', 'miningSites'],
  mining: ['miningSites'],
  port: ['commodityPorts'],
  happy: ['happiness', 'kindness', 'positiveEvents'],
  good: ['positiveEvents', 'kindness'],
  animal: ['speciesRecovery'],
  wildlife: ['speciesRecovery'],
  gulf: ['gulfInvestments'],
  gcc: ['gulfInvestments'],
  sanction: ['sanctions'],
  night: ['dayNight'],
  sun: ['dayNight'],
  webcam: ['webcams'],
  camera: ['webcams'],
  livecam: ['webcams'],
};

export function resolveLayerLabel(def: LayerDefinition, tFn?: (key: string) => string): string {
  if (tFn) {
    const translated = tFn(I18N_PREFIX + def.i18nSuffix);
    if (translated && translated !== I18N_PREFIX + def.i18nSuffix) return translated;
  }
  return def.fallbackLabel;
}

export function hasCuratedLayerExplanation(layerKey: keyof MapLayers): boolean {
  return LAYER_EXPLANATIONS[layerKey]?.coverage === 'curated';
}

export function getLayerExplanation(layerKey: keyof MapLayers): LayerExplanation {
  const curated = LAYER_EXPLANATIONS[layerKey];
  if (curated) return curated;

  return {
    key: layerKey,
    coverage: 'fallback',
    category: '图层',
    purpose: '此图层可在地图上切换，但尚未添加精选的数据来源与可信度说明卡。',
    source: '未纳入 v1 图层可解释性精选集。',
    freshness: '此处未声明图层级新鲜度约定。请查看可见的面板徽章、弹窗或数据新鲜度状态（如有）。',
    confidence: '在添加来源特定元数据前未知。',
    limitations: [
      '缺少精选卡不代表该图层不受支持。',
      '请使用图层弹窗和相关面板获取来源特定背景。',
    ],
    related: ['图层指南'],
    evidence: [],
  };
}

export function bindLayerSearch(container: HTMLElement): void {
  const searchInput = container.querySelector('.layer-search') as HTMLInputElement | null;
  if (!searchInput) return;
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    const synonymHits = new Set<string>();
    if (q) {
      for (const [alias, keys] of Object.entries(LAYER_SYNONYMS)) {
        if (alias.includes(q)) keys.forEach(k => synonymHits.add(k));
      }
    }
    container.querySelectorAll('.layer-toggle').forEach(label => {
      const el = label as HTMLElement;
      if (el.hasAttribute('data-layer-hidden')) return;
      const row = el.closest('.layer-toggle-row') as HTMLElement | null;
      const displayTarget = row ?? el;
      if (!q) { displayTarget.style.display = ''; return; }
      const key = label.getAttribute('data-layer') || '';
      const text = label.textContent?.toLowerCase() || '';
      const match = text.includes(q) || key.toLowerCase().includes(q) || synonymHits.has(key);
      displayTarget.style.display = match ? '' : 'none';
    });
  });
}
