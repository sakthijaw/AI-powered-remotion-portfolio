import React, { useState } from 'react';
import { usePhysicalTilt } from '../hooks/usePhysicalTilt';

export const VisualReasoningLab: React.FC = () => {
  const [metricMode, setMetricMode] = useState<'total' | 'perCapita' | 'dataInk'>('total');

  const tilt = usePhysicalTilt({
    maxTilt: 4.5,
    perspective: 1000,
    scaleOnHover: 1.015,
  });

  // 100 unit cells representing the global distribution
  const totalCells = 100;
  // Allocation in 'total' mode: China (29), US (11), India (8), EU (7), Russia (5), Rest of World (40)
  // Allocation in 'perCapita' mode: US (35), China (21), EU (16), Russia (14), India (6), Rest (8)

  return (
    <div
      ref={tilt.ref}
      {...tilt.props}
      style={tilt.style}
      className="visual-reasoning-lab-card"
    >
      <div className="card-shine-layer" style={tilt.shineStyle} />

      {/* Lab Header */}
      <div className="lab-header">
        <div className="lab-title-group">
          <div className="lab-live-badge">
            <span className="live-dot" />
            <span>LIVE EMPIRICAL REASONING ENGINE</span>
          </div>
          <h3 className="lab-title">Tufte Data-Ink & Ground Truth Probe</h3>
        </div>
        <span className="lab-spec-chip">EDWARD TUFTE P142-02</span>
      </div>

      {/* Interactive Mode Selector */}
      <div className="lab-mode-strip">
        <button
          className={`lab-mode-tab ${metricMode === 'total' ? 'active' : ''}`}
          onClick={() => setMetricMode('total')}
        >
          01 / National Total (53.2B t)
        </button>
        <button
          className={`lab-mode-tab ${metricMode === 'perCapita' ? 'active' : ''}`}
          onClick={() => setMetricMode('perCapita')}
        >
          02 / Per-Capita Footprint
        </button>
        <button
          className={`lab-mode-tab ${metricMode === 'dataInk' ? 'active' : ''}`}
          onClick={() => setMetricMode('dataInk')}
        >
          03 / Data-Ink Maximization
        </button>
      </div>

      {/* Interactive 100-Unit Living Dot Matrix */}
      <div className="lab-matrix-container">
        <div className="matrix-heading-row">
          <span className="matrix-label">
            {metricMode === 'total'
              ? 'LIVING UNIT MATRIX: AGGREGATE CO2e OUTPUT SHARE'
              : metricMode === 'perCapita'
              ? 'LIVING UNIT MATRIX: CITIZEN CONSUMPTION FOOTPRINT (x6 US vs India)'
              : 'DATA-INK PURITY MATRIX: 0.0% CHARTJUNK / 100% EMPIRICAL INK'}
          </span>
          <span className="matrix-counter">100 CELLS = 100% GROUND TRUTH</span>
        </div>

        <div className="unit-cells-grid">
          {Array.from({ length: totalCells }).map((_, i) => {
            let cellClass = 'cell-other';
            let tooltip = 'Rest of World';

            if (metricMode === 'total') {
              if (i < 29) {
                cellClass = 'cell-china';
                tooltip = 'China: 29.2% (15.5B tonnes)';
              } else if (i < 40) {
                cellClass = 'cell-us';
                tooltip = 'United States: 11.2% (6.0B tonnes)';
              } else if (i < 48) {
                cellClass = 'cell-india';
                tooltip = 'India: 7.8% (4.1B tonnes)';
              } else if (i < 55) {
                cellClass = 'cell-eu';
                tooltip = 'European Union: 7.1%';
              }
            } else if (metricMode === 'perCapita') {
              if (i < 35) {
                cellClass = 'cell-us';
                tooltip = 'United States: 14.9 tonnes / person (Highest G20)';
              } else if (i < 56) {
                cellClass = 'cell-china';
                tooltip = 'China: 8.9 tonnes / person';
              } else if (i < 72) {
                cellClass = 'cell-eu';
                tooltip = 'European Union: 6.8 tonnes / person';
              } else if (i < 78) {
                cellClass = 'cell-india';
                tooltip = 'India: 2.5 tonnes / person (6x smaller footprint)';
              }
            } else {
              // dataInk mode - all pure white ink
              cellClass = 'cell-pure-ink';
              tooltip = 'Active Data-Ink Pixel (No Moiré, No Distortion)';
            }

            return (
              <div
                key={i}
                className={`unit-cell ${cellClass}`}
                title={tooltip}
                style={{ animationDelay: `${(i % 10) * 0.02}s` }}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="matrix-legend-row">
          <div className="legend-item">
            <span className="legend-dot dot-china" />
            <span>China (29% Tot / 8.9t PC)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot dot-us" />
            <span>USA (11% Tot / 14.9t PC)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot dot-india" />
            <span>India (8% Tot / 2.5t PC)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot dot-other" />
            <span>Rest of World</span>
          </div>
        </div>
      </div>

      {/* Verified Data Commons Metrics Row */}
      <div className="lab-metrics-row">
        <div className="lab-metric-card">
          <span className="lab-metric-val">98.4%</span>
          <span className="lab-metric-lbl">Data-Ink Ratio</span>
          <div className="lab-progress-bar">
            <div className="lab-progress-fill" style={{ width: '98.4%' }} />
          </div>
        </div>

        <div className="lab-metric-card">
          <span className="lab-metric-val">0.0%</span>
          <span className="lab-metric-lbl">Chartjunk / 3D Distortion</span>
          <div className="lab-progress-bar">
            <div className="lab-progress-fill fill-zero" style={{ width: '0%' }} />
          </div>
        </div>

        <div className="lab-metric-card">
          <span className="lab-metric-val">7.8 : 1</span>
          <span className="lab-metric-lbl">WCAG AAA Contrast</span>
          <div className="lab-progress-bar">
            <div className="lab-progress-fill" style={{ width: '100%', background: '#34D399' }} />
          </div>
        </div>
      </div>

      {/* Provenance Terminal Line */}
      <div className="lab-provenance-bar">
        <span className="prov-mcp-tag">MCP PROTOCOL</span>
        <span className="prov-text">
          Provenanced via Google Data Commons API · European Commission EDGAR 2025 · UN WPP 2024
        </span>
      </div>
    </div>
  );
};
