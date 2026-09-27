import React, { useState } from 'react';

export const ArchitectureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'agent1' | 'agent2' | 'agent3'>('pipeline');

  const scrollToExhibits = () => {
    document.getElementById('exhibits')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="scroll-section architecture-scroll-section" id="architecture">
      <div className="arch-content-container">
        {/* Section Header */}
        <header className="arch-header">
          <div className="section-eyebrow">03 / SYSTEM ARCHITECTURE</div>
          <h2 className="section-heading" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            The Multi-Agent <span className="gradient-word">Production Engine</span>
          </h2>
          <p className="section-body" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem' }}>
            A deterministic three-agent chain converting raw natural language queries into broadcast-grade 60fps motion documentaries. Grounded in Google Data Commons MCP, structured through 226+ Edward Tufte principles, and rendered in Remotion.
          </p>
        </header>

        {/* Interactive Navigation Tabs */}
        <div className="arch-tabs-strip">
          <button
            className={`arch-tab-btn ${activeTab === 'pipeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('pipeline')}
          >
            00 / Complete Flow of Project
          </button>
          <button
            className={`arch-tab-btn ${activeTab === 'agent1' ? 'active' : ''}`}
            onClick={() => setActiveTab('agent1')}
          >
            01 / Subagent 1: Research & Intelligence
          </button>
          <button
            className={`arch-tab-btn ${activeTab === 'agent2' ? 'active' : ''}`}
            onClick={() => setActiveTab('agent2')}
          >
            02 / Subagent 2: Story & Production (Director)
          </button>
          <button
            className={`arch-tab-btn ${activeTab === 'agent3' ? 'active' : ''}`}
            onClick={() => setActiveTab('agent3')}
          >
            03 / Subagent 3: Rendering & Quality (Chromium QA)
          </button>
        </div>

        {/* =========================================================================
            TAB 0: COMPLETE FLOW OF PROJECT
            ========================================================================= */}
        {activeTab === 'pipeline' && (
          <div className="arch-section-card">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="spotlight-badge">END-TO-END PIPELINE ARCHITECTURE</span>
              <h3 className="spotlight-title" style={{ fontSize: '1.75rem', marginTop: '0.5rem' }}>
                Complete Execution Flow
              </h3>
              <p style={{ color: 'var(--c-silver)', fontSize: '0.95rem', maxWidth: '780px', margin: '0.5rem auto 0' }}>
                Click any subagent node below to inspect its operational contract, prompt schemas, and telemetry logs.
              </p>
            </div>

            {/* Interactive Flowchart */}
            <div className="pipeline-flowchart">
              {/* Step 0 */}
              <div className="flow-node">
                <div className="flow-step-num">STAGE 01 · INTAKE</div>
                <h4 className="flow-node-title">Natural Language Prompt</h4>
                <p className="flow-node-desc">
                  User inputs an empirical inquiry (e.g., global emissions breakdown, health divide, population shift).
                </p>
                <div className="flow-node-tag">User Intent Prompt</div>
              </div>

              <div className="flow-arrow">➔</div>

              {/* Step 1 */}
              <div
                className="flow-node flow-highlight"
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveTab('agent1')}
                title="Click to view Subagent 1 deep-dive"
              >
                <div className="flow-step-num">SUBAGENT 1 · RETRIEVAL</div>
                <h4 className="flow-node-title">Research & Intelligence</h4>
                <p className="flow-node-desc">
                  Queries Data Commons MCP, retrieves verified time-series data, and selects matching Tufte skill.
                </p>
                <div className="flow-node-tag">Canonical Research Package ↗</div>
              </div>

              <div className="flow-arrow">➔</div>

              {/* Step 2 */}
              <div
                className="flow-node flow-highlight-story"
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveTab('agent2')}
                title="Click to view Subagent 2 deep-dive"
              >
                <div className="flow-step-num">SUBAGENT 2 · DIRECTION</div>
                <h4 className="flow-node-title">Story & Production</h4>
                <p className="flow-node-desc">
                  Authors the causal 8-beat film arc, dynamic camera paths, pacing, and kinetic typography.
                </p>
                <div className="flow-node-tag">RenderSpec 1.7 JSON ↗</div>
              </div>

              <div className="flow-arrow">➔</div>

              {/* Step 3 */}
              <div
                className="flow-node flow-highlight-render"
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveTab('agent3')}
                title="Click to view Subagent 3 deep-dive"
              >
                <div className="flow-step-num">SUBAGENT 3 · SYNTHESIS</div>
                <h4 className="flow-node-title">Rendering & Quality</h4>
                <p className="flow-node-desc">
                  Remotion 4.0 React runtime renders at 60 FPS. Headless Chromium executes automated frame QA.
                </p>
                <div className="flow-node-tag">Broadcast 60fps MP4 ↗</div>
              </div>
            </div>

            {/* Three Foundational Pillars */}
            <div className="pipeline-breakdown-grid" style={{ marginBottom: '3rem' }}>
              <div className="breakdown-card">
                <div className="breakdown-icon">🛡️</div>
                <h3 className="breakdown-title">1. Zero Hallucination Contract</h3>
                <p className="breakdown-text">
                  Data retrieval strictly precedes visual styling. Data is grounded via Google Data Commons MCP (UN, EDGAR, ABS). The system explicitly fails if empirical ground truth is missing.
                </p>
              </div>

              <div className="breakdown-card">
                <div className="breakdown-icon">📐</div>
                <h3 className="breakdown-title">2. Edward Tufte Visual Reasoning</h3>
                <p className="breakdown-text">
                  Visual metaphors are selected from 226+ codified skills to match empirical distributions. Living histograms, small multiples, and true baselines eradicate chartjunk.
                </p>
              </div>

              <div className="breakdown-card">
                <div className="breakdown-icon">🎬</div>
                <h3 className="breakdown-title">3. Filmic Narrative Continuity</h3>
                <p className="breakdown-text">
                  Every documentary adheres to the strict 8-beat causal narrative arc: Hook → Question → Context → Evidence → Comparison → Insight → Conclusion → Takeaway.
                </p>
              </div>
            </div>

            {/* 3 Subagents Architecture Matrix Table */}
            <div style={{ marginTop: '2rem' }}>
              <h3 className="detail-heading" style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                Multi-Agent Architecture Matrix
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="arch-matrix-table">
                  <thead>
                    <tr>
                      <th>DIMENSION</th>
                      <th>SUBAGENT 1: RESEARCH</th>
                      <th>SUBAGENT 2: DIRECTOR</th>
                      <th>SUBAGENT 3: RENDERING</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 700, color: 'var(--c-white)' }}>Core Role</td>
                      <td>Grounded Data Retrieval & Provenance</td>
                      <td>8-Beat Screenplay & Kinetic Directing</td>
                      <td>Remotion 4.0 Render & Chromium QA</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 700, color: 'var(--c-white)' }}>Primary Protocol</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>Data Commons MCP (REST/JSON)</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>VisualReasoningEngine</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>Remotion React + Headless Chromium</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 700, color: 'var(--c-white)' }}>Knowledge Corpus</td>
                      <td>226+ Digitized Tufte Skill Handbooks</td>
                      <td>Kinetic Typography & Camera Paths</td>
                      <td>WCAG 2.1 AAA Contrast & 60fps Timing</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 700, color: 'var(--c-white)' }}>Contract Artifact</td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--c-white)' }}>canonical_research_package.json</td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--c-white)' }}>render_spec.json (v1.7)</td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--c-white)' }}>final.mp4 (60 FPS H.264)</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 700, color: 'var(--c-white)' }}>Quality Gate</td>
                      <td>Zero fabricated numbers (hard abort on missing citation)</td>
                      <td>Total time budget check (60–120s strictly locked)</td>
                      <td>Frame-by-frame jitter audit & contrast ratio &gt; 4.5:1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 1: SUBAGENT 1 - RESEARCH & INTELLIGENCE AGENT
            ========================================================================= */}
        {activeTab === 'agent1' && (
          <div className="arch-section-card">
            <div className="agent-spotlight-header">
              <div>
                <span className="spotlight-badge">SUBAGENT 01 · EMPIRICAL RETRIEVAL LAYER</span>
                <h3 className="spotlight-title" style={{ fontSize: '1.75rem', marginTop: '0.5rem' }}>
                  Research & Intelligence Agent
                </h3>
                <span className="spotlight-role">Live Data Commons MCP Client & 226+ Tufte Skills Evaluator</span>
              </div>
              <div className="agent-specs-box">
                <div><strong>Protocol:</strong> Model Context Protocol (MCP)</div>
                <div><strong>Endpoints:</strong> https://api.datacommons.org/mcp</div>
                <div><strong>Corpus:</strong> 226+ Digitized Edward Tufte Skills</div>
                <div><strong>Validation:</strong> Hard-fail on unverified numbers</div>
              </div>
            </div>

            <div className="agent-details-grid">
              <div className="detail-col">
                <h3 className="detail-heading">Mandatory 3-Stage Retrieval Protocol</h3>
                <div className="numbered-step">
                  <div className="step-circle">1</div>
                  <div>
                    <strong>Intake & Semantic Boundary:</strong> Extracts exact entities, measures, units, and time framing from user intent. Discards ambiguous or speculative premises.
                  </div>
                </div>
                <div className="numbered-step">
                  <div className="step-circle">2</div>
                  <div>
                    <strong>Data First — Google Data Commons MCP:</strong> Queries verified live time-series datasets (UN WPP, European Commission EDGAR, Australian Bureau of Statistics, World Bank). Values must be finalized before visual styling begins.
                  </div>
                </div>
                <div className="numbered-step">
                  <div className="step-circle">3</div>
                  <div>
                    <strong>Visual Reference Second — Tufte Corpus:</strong> Evaluates 226+ digitized Tufte skills to select the optimal graphic design matching finalized empirical data (e.g. living histograms, scatterplot matrices).
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ color: 'var(--c-white)', fontSize: '0.9rem', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                    🛡️ Zero Hallucination Enforcer:
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                    If a requested statistic cannot be validated through an authoritative government or peer-reviewed dataset via MCP, Subagent 1 refuses to invent values, outputting an explicit provenance error rather than corrupting the documentary.
                  </p>
                </div>
              </div>

              <div className="detail-col">
                <h3 className="detail-heading">Contract: Canonical Research Artifact</h3>
                <pre className="code-snippet-box">
{`{
  "artifact": "canonical_research_package",
  "version": "1.0",
  "topic": "Global Carbon Footprint & Lifestyle Disparities",
  "provenance": {
    "source_endpoint": "https://api.datacommons.org/mcp",
    "verified_series": "Emissions: 53.2B tonnes CO2e",
    "citations": [
      "European Commission EDGAR 2025",
      "UN Population Division WPP 2024"
    ]
  },
  "empirical_facts": [
    { "entity": "China", "share_pct": 29.2, "per_capita": 8.9 },
    { "entity": "United States", "share_pct": 11.2, "per_capita": 14.9 },
    { "entity": "India", "share_pct": 7.8, "per_capita": 2.5 }
  ],
  "tufte_selection": {
    "primary_skill": "p142-02-living-histogram-students-by-height",
    "rationale": "Ranks emitters using direct person-glyph units instead of arbitrary abstract bars"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: SUBAGENT 2 - STORY & PRODUCTION AGENT (DIRECTOR)
            ========================================================================= */}
        {activeTab === 'agent2' && (
          <div className="arch-section-card">
            <div className="agent-spotlight-header">
              <div>
                <span className="spotlight-badge">SUBAGENT 02 · CREATIVE DIRECTION & CHOREOGRAPHY</span>
                <h3 className="spotlight-title" style={{ fontSize: '1.75rem', marginTop: '0.5rem' }}>
                  Story & Production Agent
                </h3>
                <span className="spotlight-role">Autonomous Film Director & VisualReasoningEngine</span>
              </div>
              <div className="agent-specs-box">
                <div><strong>Output Schema:</strong> RenderSpec 1.7 JSON</div>
                <div><strong>Narrative Engine:</strong> Strict 8-Beat Causal Film Arc</div>
                <div><strong>Pacing:</strong> 60–120s Broadcast Duration Budget</div>
                <div><strong>Camera Engine:</strong> Deterministic 3D Vector Paths</div>
              </div>
            </div>

            <div className="agent-details-grid">
              <div className="detail-col">
                <h3 className="detail-heading">The 8-Beat Causal Narrative Arc</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                  Every documentary follows a rigorous causal sequence that guarantees audience comprehension without gratuitous visual noise:
                </p>
                <div className="narrative-beat-grid">
                  <div className="beat-card-mini"><strong>1. Hook:</strong> Immediate, concrete empirical quantity</div>
                  <div className="beat-card-mini"><strong>2. Question:</strong> The core analytical contradiction</div>
                  <div className="beat-card-mini"><strong>3. Context:</strong> Macro distribution and baseline scale</div>
                  <div className="beat-card-mini"><strong>4. Evidence:</strong> Exact measured values & rankings</div>
                  <div className="beat-card-mini"><strong>5. Comparison:</strong> Lifestyle & per-capita contrasts</div>
                  <div className="beat-card-mini"><strong>6. Insight:</strong> Mathematical causal mechanism</div>
                  <div className="beat-card-mini"><strong>7. Conclusion:</strong> Quantitative resolution of question</div>
                  <div className="beat-card-mini"><strong>8. Takeaway:</strong> Memorable final mental model & citation</div>
                </div>
              </div>

              <div className="detail-col">
                <h3 className="detail-heading">Contract: RenderSpec 1.7 Output</h3>
                <pre className="code-snippet-box">
{`{
  "schema_version": "1.7",
  "title": "Global Carbon Footprint",
  "render": { "fps": 60, "width": 1280, "height": 720 },
  "audio": { "narration_track": "voiceover_master.wav", "cadence": "analytical" },
  "scenes": [
    {
      "id": "beat_04_evidence",
      "beat_type": "evidence",
      "duration_seconds": 16,
      "camera": {
        "path": "slow_dolly_in",
        "fov": 45,
        "focal_length_mm": 50
      },
      "kinetic_typography": {
        "text": "China emits 29.2%, United States 11.2%...",
        "entry_frame": 120,
        "highlight_keyword": "29.2%"
      },
      "data_visualization": {
        "primitive": "living_unit_histogram",
        "cell_density": 100,
        "color_tokens": ["#FFFFFF", "#E4E4E7", "#A1A1AA"]
      }
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: SUBAGENT 3 - RENDERING & QUALITY AGENT
            ========================================================================= */}
        {activeTab === 'agent3' && (
          <div className="arch-section-card">
            <div className="agent-spotlight-header">
              <div>
                <span className="spotlight-badge">SUBAGENT 03 · SYNTHESIS & CHROMIUM QA AUDIT</span>
                <h3 className="spotlight-title" style={{ fontSize: '1.75rem', marginTop: '0.5rem' }}>
                  Rendering & Quality Agent
                </h3>
                <span className="spotlight-role">Remotion 4.0 React Engine & Headless Frame Auditor</span>
              </div>
              <div className="agent-specs-box">
                <div><strong>Framework:</strong> Remotion 4.0 (React 19 / TypeScript)</div>
                <div><strong>Frame Rate:</strong> 60 FPS Rock-Solid Deterministic</div>
                <div><strong>QA Engine:</strong> Headless Chromium Puppeteer</div>
                <div><strong>Video Codec:</strong> H.264 / AAC Pro Profile</div>
              </div>
            </div>

            <div className="agent-details-grid">
              <div className="detail-col">
                <h3 className="detail-heading">Automated Quality Assurance Gates</h3>
                <ul className="qa-check-list">
                  <li>
                    <strong>Frame-by-Frame Jitter Audit:</strong> Traverses all 5,000+ rendered frames in headless Chromium to detect visual pop-in, frame drops, or animation stutter.
                  </li>
                  <li>
                    <strong>WCAG Contrast Verification:</strong> Inspects typography and data marks against background tokens to verify adherence to AAA 4.5:1 ratio (measured average: 7.8:1).
                  </li>
                  <li>
                    <strong>Kinetic Audio-Visual Locking:</strong> Kinetic captions strictly synchronize to voiceover phonemes with sub-frame 16.6ms accuracy.
                  </li>
                  <li>
                    <strong>Deterministic Pixel Conformance:</strong> SVG vectors, WebGL layers, and HTML layouts render identically across server nodes and client runtimes.
                  </li>
                </ul>

                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button className="btn-cta" onClick={scrollToExhibits}>
                    <span>View Output Documentaries ↑</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="detail-col">
                <h3 className="detail-heading">Contract: Chromium Audit Telemetry</h3>
                <pre className="code-snippet-box">
{`{
  "audit_version": "2.4",
  "status": "PASSED_ALL_GATES",
  "execution_metrics": {
    "total_rendered_frames": 5460,
    "dropped_frames": 0,
    "fps_achieved": 60.0,
    "jitter_deviation_ms": 0.02
  },
  "accessibility_audit": {
    "wcag_compliance": "AAA",
    "minimum_contrast_ratio": 7.8,
    "smallest_font_pt": 14
  },
  "schema_compliance": {
    "renderspec_validated": true,
    "version": "1.7"
  },
  "output_artifact": {
    "filepath": "final/final.mp4",
    "codec": "libx264 (High@L4.2)",
    "bitrate": "14.2 Mbps",
    "audio": "AAC 48kHz Stereo"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
