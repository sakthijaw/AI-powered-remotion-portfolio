import React, { useState } from 'react';
import { VisualReasoningLab } from './VisualReasoningLab';

interface HowItWorksProps {
  onGoToResults: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onGoToResults }) => {
  const [activeAgentTab, setActiveAgentTab] = useState<'pipeline' | 'agent1' | 'agent2' | 'agent3'>('pipeline');

  return (
    <div className="view-page page-how-it-works">
      {/* =====================================================================
          PAGE HEADER
          ===================================================================== */}
      <section className="page-header-block">
        <div className="header-kicker">02 / ARCHITECTURE & PROCESS</div>
        <h1 className="page-title">The Deterministic Multi-Agent Engine</h1>
        <p className="page-lead">
          How raw natural language inquiries are transformed into broadcast-quality 60&nbsp;FPS motion documentaries through a three-agent pipeline grounded in Edward Tufte's visual reasoning principles.
        </p>
      </section>

      {/* =====================================================================
          1. THE PROBLEM VS THE SOLUTION (Visual Contrast)
          ===================================================================== */}
      <section className="problem-solution-section">
        <div className="comparison-grid">
          {/* Problem Card */}
          <div className="comparison-card problem-card">
            <div className="card-status-header">
              <span className="status-cross">✕</span>
              <span className="status-title">THE PROBLEM WITH GENERATIVE AI VIDEO</span>
            </div>
            <h3 className="card-subhead">Hallucinatory Pixels Without Empirical Truth</h3>
            <ul className="comparison-list">
              <li>
                <strong>Fictitious Data:</strong> Diffusion video models (Sora, Runway) hallucinate chart numbers, invent fake trends, and cannot calculate percentages.
              </li>
              <li>
                <strong>Distorted Visuals:</strong> Graph axes morph, bars warp randomly between frames, and text is unreadable or illegible.
              </li>
              <li>
                <strong>Zero Provenance:</strong> No mathematical audit trail or verifiable connection to authoritative registries.
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="comparison-card solution-card">
            <div className="card-status-header">
              <span className="status-check">✓</span>
              <span className="status-title">OUR DETERMINISTIC ARCHITECTURE</span>
            </div>
            <h3 className="card-subhead">Verified Provenance + 226 Codified Tufte Rules</h3>
            <ul className="comparison-list">
              <li>
                <strong>100% Grounded Data:</strong> Model Context Protocol (MCP) queries Google Data Commons, World Bank, and UN WPP registries directly.
              </li>
              <li>
                <strong>Tufte Graphical Integrity:</strong> Living unit-histograms, data-ink maximization, and direct comparative baselines eliminate chartjunk.
              </li>
              <li>
                <strong>60 FPS Remotion Synthesis:</strong> Deterministic React SVG/Canvas rendering with automated Chromium frame-by-frame QA audits.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. VISUAL PIPELINE FLOWCHART (Step-by-step Storytelling)
          ===================================================================== */}
      <section className="pipeline-flow-section">
        <div className="section-eyebrow-line">
          <span className="eyebrow-text">VISUAL EXECUTION PIPELINE</span>
        </div>

        <div className="pipeline-steps-horizontal">
          <div className="pipeline-step">
            <div className="step-badge">STEP 01</div>
            <div className="step-node">
              <div className="step-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h4 className="step-name">Natural Query</h4>
              <p className="step-detail">Empirical topic prompt (e.g. global emissions breakdown)</p>
            </div>
          </div>

          <div className="pipeline-connector">➔</div>

          <div className="pipeline-step">
            <div className="step-badge">STEP 02</div>
            <div className="step-node active-step" onClick={() => setActiveAgentTab('agent1')}>
              <div className="step-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h4 className="step-name">Data Commons MCP</h4>
              <p className="step-detail">Subagent 1 retrieves verified time-series & selects Tufte rule</p>
            </div>
          </div>

          <div className="pipeline-connector">➔</div>

          <div className="pipeline-step">
            <div className="step-badge">STEP 03</div>
            <div className="step-node active-step" onClick={() => setActiveAgentTab('agent2')}>
              <div className="step-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                  <line x1="7" y1="2" x2="7" y2="22" />
                  <line x1="17" y1="2" x2="17" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                </svg>
              </div>
              <h4 className="step-name">8-Beat Director</h4>
              <p className="step-detail">Subagent 2 authors causal arc & RenderSpec 1.7 JSON</p>
            </div>
          </div>

          <div className="pipeline-connector">➔</div>

          <div className="pipeline-step">
            <div className="step-badge">STEP 04</div>
            <div className="step-node active-step" onClick={() => setActiveAgentTab('agent3')}>
              <div className="step-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <h4 className="step-name">Remotion 60 FPS</h4>
              <p className="step-detail">Subagent 3 renders React frames with Chromium frame QA</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. INTERACTIVE SUBAGENT SPECIFICATION INSPECTOR
          ===================================================================== */}
      <section className="subagents-deep-dive">
        <div className="section-eyebrow-line">
          <span className="eyebrow-text">SUBAGENT SPECIFICATION & PROMPT CONTRACTS</span>
        </div>

        {/* Tab strip */}
        <div className="agent-tabs-strip">
          <button
            type="button"
            className={`agent-tab-btn ${activeAgentTab === 'pipeline' ? 'active' : ''}`}
            onClick={() => setActiveAgentTab('pipeline')}
          >
            00 / System Overview
          </button>
          <button
            type="button"
            className={`agent-tab-btn ${activeAgentTab === 'agent1' ? 'active' : ''}`}
            onClick={() => setActiveAgentTab('agent1')}
          >
            01 / Subagent 1: Research
          </button>
          <button
            type="button"
            className={`agent-tab-btn ${activeAgentTab === 'agent2' ? 'active' : ''}`}
            onClick={() => setActiveAgentTab('agent2')}
          >
            02 / Subagent 2: Story Arc
          </button>
          <button
            type="button"
            className={`agent-tab-btn ${activeAgentTab === 'agent3' ? 'active' : ''}`}
            onClick={() => setActiveAgentTab('agent3')}
          >
            03 / Subagent 3: Remotion QA
          </button>
        </div>

        {/* Tab Content 0: Overview */}
        {activeAgentTab === 'pipeline' && (
          <div className="agent-content-card">
            <div className="agent-card-header">
              <span className="agent-num-badge">PIPELINE ARCHITECTURE</span>
              <h3 className="agent-title">The Three Deterministic Execution Contracts</h3>
            </div>
            <div className="contracts-grid">
              <div className="contract-box">
                <h4 className="contract-heading">1. Zero Hallucination Gate</h4>
                <p className="contract-text">
                  Data retrieval strictly precedes visual styling. Data is ingested from Google Data Commons (UN, EDGAR, ABS). If ground truth cannot be verified, execution halts.
                </p>
              </div>
              <div className="contract-box">
                <h4 className="contract-heading">2. Digitized Tufte Constraints</h4>
                <p className="contract-text">
                  226+ codified visual reasoning rules enforce maximum data-ink ratio, countable physical units (1 figure = 1% population), and zero 3D chartjunk.
                </p>
              </div>
              <div className="contract-box">
                <h4 className="contract-heading">3. Headless Chromium QA</h4>
                <p className="contract-text">
                  Every Remotion composition undergoes headless Chromium frame-by-frame inspection. Contrast ratios (WCAG AAA &gt; 7.0:1) and 60.0 FPS frame delivery are enforced.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 1: Subagent 1 */}
        {activeAgentTab === 'agent1' && (
          <div className="agent-content-card">
            <div className="agent-card-header">
              <span className="agent-num-badge">SUBAGENT 1 · RESEARCH & INTELLIGENCE</span>
              <h3 className="agent-title">Empirical Data Ingestion & Tufte Principle Matching</h3>
            </div>
            <p className="agent-desc">
              Queries Google Data Commons MCP server to retrieve verified statistical indicators, historical baselines, and demographic distributions. It maps data structures to appropriate Tufte visual skills.
            </p>
            <div className="code-spec-block">
              <div className="spec-label">OUTPUT CONTRACT: CanonicalResearchPackage</div>
              <pre className="spec-pre">
{`{
  "query": "Global greenhouse gas emissions totals vs per capita",
  "dataset": "EDGAR_v8.0_FT2023_GHG + WorldBank_WDI",
  "groundTruth": {
    "totalEmissionsGt": 53.2,
    "topEmitters": [
      { "country": "China", "totalShare": 0.292, "perCapitaTons": 8.9 },
      { "country": "USA", "totalShare": 0.112, "perCapitaTons": 14.9 },
      { "country": "India", "totalShare": 0.078, "perCapitaTons": 2.5 }
    ]
  },
  "tufteSkillSelected": "p142-02-living-histogram-students-by-height",
  "rationale": "Replaces abstract bar charts with 100 countable unit cells contrasting total share against citizen footprint."
}`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab Content 2: Subagent 2 */}
        {activeAgentTab === 'agent2' && (
          <div className="agent-content-card">
            <div className="agent-card-header">
              <span className="agent-num-badge">SUBAGENT 2 · STORY & PRODUCTION</span>
              <h3 className="agent-title">Causal 8-Beat Narrative Arc & Dynamic Camera Choreography</h3>
            </div>
            <p className="agent-desc">
              Authors a causal narrative structure following the 8-beat documentary grammar: Hook → Question → Context → Evidence → Comparison → Insight → Conclusion → Takeaway. Generates complete RenderSpec 1.7 JSON.
            </p>
            <div className="code-spec-block">
              <div className="spec-label">OUTPUT CONTRACT: RenderSpec 1.7 (Excerpt)</div>
              <pre className="spec-pre">
{`{
  "specVersion": "1.7",
  "durationSeconds": 91,
  "fps": 60,
  "camera": {
    "projection": "perspective",
    "easing": "cubic-bezier(0.16, 1, 0.3, 1)",
    "paths": ["hook_wide", "evidence_split_zoom", "comparison_dual_axis"]
  },
  "scenes": [
    { "id": "hook", "duration": 9, "goal": "Make 53.2B tonnes feel concrete", "metaphor": "Countable weight counter" },
    { "id": "comparison", "duration": 16, "goal": "Contrast total vs per-capita", "metaphor": "Person glyph array" }
  ]
}`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab Content 3: Subagent 3 */}
        {activeAgentTab === 'agent3' && (
          <div className="agent-content-card">
            <div className="agent-card-header">
              <span className="agent-num-badge">SUBAGENT 3 · RENDERING & QUALITY</span>
              <h3 className="agent-title">Remotion 4.0 React Compilation & Chromium Frame Auditing</h3>
            </div>
            <p className="agent-desc">
              Compiles the RenderSpec JSON into modular React Remotion components. Invokes a headless Chromium browser instance to inspect each frame for drop frames, jitter, audio sync, and WCAG AAA compliance.
            </p>
            <div className="code-spec-block">
              <div className="spec-label">HEADLESS CHROMIUM AUDIT LOG</div>
              <pre className="spec-pre">
{`[AUDIT_PASS] Total frames rendered: 5,460 frames @ 60.0 FPS
[AUDIT_PASS] Frame time variance: 0.12ms (Target: < 0.50ms)
[AUDIT_PASS] Audio-visual synchronization delta: 0.00 frames
[AUDIT_PASS] Minimum text contrast ratio: 7.8:1 (WCAG AAA pass)
[AUDIT_PASS] 0.0% Hallucination verification: All 6 claims cross-verified with Data Commons MCP`}
              </pre>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          4. INTERACTIVE TUFTE VISUAL REASONING LAB
          ===================================================================== */}
      <section className="tufte-lab-section">
        <div className="section-eyebrow-line">
          <span className="eyebrow-text">INTERACTIVE EMPIRICAL REASONING DEMO</span>
        </div>
        <p className="tufte-lab-lead">
          Test the Tufte unit-cell living histogram engine in real time. Switch modes below to see how 100 discrete cells reveal the difference between national totals and per-capita lifestyles.
        </p>

        <VisualReasoningLab />
      </section>

      {/* =====================================================================
          5. KEY ENGINEERING DECISIONS & CTA
          ===================================================================== */}
      <section className="engineering-decisions-section">
        <div className="section-eyebrow-line">
          <span className="eyebrow-text">KEY ENGINEERING DECISIONS</span>
        </div>

        <div className="decisions-grid">
          <div className="decision-item">
            <h4 className="decision-title">Sub-Frame Audio-Visual Sync</h4>
            <p className="decision-desc">
              Voiceover timecodes are calculated down to exact frame indices. Remotion's `interpolate` and `spring` functions lock kinetic typography to voiceover phonemes.
            </p>
          </div>
          <div className="decision-item">
            <h4 className="decision-title">Zero DOM Overhead Vector Grids</h4>
            <p className="decision-desc">
              For complex demographic fields (8.2 billion people / 10,000+ data dots), canvas and instanced SVG paths render smoothly at 60 FPS without memory bloat.
            </p>
          </div>
          <div className="decision-item">
            <h4 className="decision-title">Strict Provenance Assertion</h4>
            <p className="decision-desc">
              Subagent 2 cannot write a narrative claim unless Subagent 1 has returned an authoritative citation URL and indicator key from Google Data Commons.
            </p>
          </div>
        </div>

        <div className="page-next-cta">
          <button
            type="button"
            className="btn-primary"
            onClick={onGoToResults}
          >
            <span>See Finished Production Results →</span>
          </button>
        </div>
      </section>
    </div>
  );
};
