import type { LayerExplanation } from '@/config/map-layer-definitions';
import { escapeHtml } from '@/utils/sanitize';

export function renderLayerExplanationCard(layerLabel: string, explanation: LayerExplanation): string {
  const list = (items: string[]): string => items.map(item => `<li>${escapeHtml(item)}</li>`).join('');
  const related = explanation.related.length > 0
    ? explanation.related.map(item => `<span>${escapeHtml(item)}</span>`).join('')
    : '<span>图层指南</span>';
  const evidence = explanation.evidence.length > 0
    ? `<div class="layer-explanation-grounding"><span>依据</span>${explanation.evidence.map(item => `<code>${escapeHtml(item)}</code>`).join('')}</div>`
    : '';
  const coverageLabel = explanation.coverage === 'curated' ? '精选 v1' : '兜底';

  return `
    <div class="layer-explanation-header">
      <div>
        <span class="layer-explanation-kicker">${escapeHtml(explanation.category)}</span>
        <strong>${escapeHtml(layerLabel)}</strong>
      </div>
      <button class="layer-explanation-close" aria-label="关闭">×</button>
    </div>
    <div class="layer-explanation-content">
      <div class="layer-explanation-status ${explanation.coverage}">${coverageLabel}</div>
      <p class="layer-explanation-purpose">${escapeHtml(explanation.purpose)}</p>
      <div class="layer-explanation-grid">
        <section>
          <span>数据来源</span>
          <p>${escapeHtml(explanation.source)}</p>
        </section>
        <section>
          <span>更新频率</span>
          <p>${escapeHtml(explanation.freshness)}</p>
        </section>
        <section>
          <span>可信度</span>
          <p>${escapeHtml(explanation.confidence)}</p>
        </section>
      </div>
      <div class="layer-explanation-section">
        <span>局限性</span>
        <ul>${list(explanation.limitations)}</ul>
      </div>
      <div class="layer-explanation-section">
        <span>相关</span>
        <div class="layer-explanation-related">${related}</div>
      </div>
      ${evidence}
    </div>
  `;
}
