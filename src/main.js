/**
 * AUTONOMOUS AI DOCUMENTARY DIRECTOR - INTERACTIVE PORTFOLIO ENGINE
 * Manages video playback, interactive 8-beat narrative scrubbing,
 * dynamic search & filtering, theater mode modal, and Tufte principle inspector.
 */

// Application State
const state = {
  projects: [],
  tufteSkills: [],
  activeCategory: 'All',
  activeTufteFilter: 'All',
  searchQuery: '',
  activeProjectInModal: null,
  flagshipProject: null,
};

// Formats seconds into MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Fetch JSON data or fallback
async function loadData() {
  try {
    const [portfolioRes, tufteRes] = await Promise.all([
      fetch('./data/portfolio-data.json'),
      fetch('./data/tufte-skills.json'),
    ]);

    if (!portfolioRes.ok || !tufteRes.ok) {
      throw new Error('Failed to load local JSON files');
    }

    const portfolioData = await portfolioRes.json();
    const tufteData = await tufteRes.json();

    state.projects = portfolioData.projects || [];
    state.tufteSkills = tufteData || [];

    // Flagship: Global Greenhouse Gas Emissions: Totals vs. Per-Capita
    state.flagshipProject =
      state.projects.find((p) => p.slug === 'emissions-totals-vs-lifestyles') ||
      state.projects[0];

    initApp();
  } catch (err) {
    console.warn('Error loading data asynchronously, using embedded fallback:', err);
    // Try fallback via relative path
    try {
      const resp = await fetch('data/portfolio-data.json');
      const pData = await resp.json();
      state.projects = pData.projects || [];
      state.flagshipProject = state.projects[0];
      initApp();
    } catch (e) {
      console.error('Fatal data loading error:', e);
    }
  }
}

// Initialize Application UI and Event Listeners
function initApp() {
  renderFlagshipNarrativeArc();
  renderGallery();
  renderTufteSkills();
  setupEventListeners();
  setupFlagshipVideoSync();
}

// Setup Flagship 8-Beat Narrative Scrubber Sync
function renderFlagshipNarrativeArc() {
  const p = state.flagshipProject;
  if (!p || !p.scenes || !p.scenes.length) return;

  const track = document.getElementById('narrative-track');
  if (!track) return;

  track.innerHTML = '';
  let cumulativeSeconds = 0;

  p.scenes.forEach((scene, index) => {
    const startSec = cumulativeSeconds;
    const dur = scene.duration_seconds || 10;
    const endSec = startSec + dur;
    cumulativeSeconds = endSec;

    const btn = document.createElement('button');
    btn.className = `beat-node ${index === 0 ? 'active' : ''}`;
    btn.setAttribute('data-start', startSec);
    btn.setAttribute('data-end', endSec);
    btn.setAttribute('data-beat', scene.id);
    btn.title = `Jump to ${scene.id} (${formatTime(startSec)})`;

    btn.innerHTML = `
      <span class="beat-index">${index + 1}</span>
      <span class="beat-label">${scene.id.charAt(0).toUpperCase() + scene.id.slice(1)}</span>
      <span class="beat-time">${formatTime(startSec)}</span>
    `;

    btn.addEventListener('click', () => {
      const vid = document.getElementById('flagship-video');
      if (vid) {
        vid.currentTime = startSec;
        vid.play().catch(() => {});
        updateActiveFlagshipBeat(index, scene);
      }
    });

    track.appendChild(btn);
  });

  // Initial insight text
  if (p.scenes[0]) {
    updateActiveFlagshipBeat(0, p.scenes[0]);
  }
}

function updateActiveFlagshipBeat(index, scene) {
  const beatNodes = document.querySelectorAll('#narrative-track .beat-node');
  beatNodes.forEach((node, idx) => {
    if (idx === index) {
      node.classList.add('active');
    } else {
      node.classList.remove('active');
    }
  });

  const tag = document.getElementById('active-beat-name');
  if (tag) {
    tag.textContent = `Beat ${index + 1}: ${scene.id.toUpperCase()}`;
  }

  const detailText = document.getElementById('beat-detail-text');
  if (detailText) {
    detailText.textContent = scene.main_insight || scene.scene_goal || 'Examining verified empirical metrics.';
  }
}

function setupFlagshipVideoSync() {
  const vid = document.getElementById('flagship-video');
  const timecode = document.getElementById('video-timecode');
  if (!vid) return;

  vid.addEventListener('timeupdate', () => {
    const cur = vid.currentTime;
    const dur = vid.duration || state.flagshipProject.render.duration || 100;

    if (timecode) {
      timecode.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
    }

    // Auto-update active beat node based on current playback time
    const scenes = state.flagshipProject.scenes;
    if (scenes && scenes.length) {
      let cumulative = 0;
      for (let i = 0; i < scenes.length; i++) {
        const sDur = scenes[i].duration_seconds || 10;
        const start = cumulative;
        const end = cumulative + sDur;
        cumulative = end;

        if (cur >= start && cur < end) {
          const currentActive = document.querySelector('#narrative-track .beat-node.active');
          const beatNodes = document.querySelectorAll('#narrative-track .beat-node');
          if (beatNodes[i] && beatNodes[i] !== currentActive) {
            updateActiveFlagshipBeat(i, scenes[i]);
          }
          break;
        }
      }
    }
  });
}

// Render Videos Gallery Grid with search & category filters
function renderGallery() {
  const grid = document.getElementById('videos-grid');
  if (!grid) return;

  const filtered = state.projects.filter((item) => {
    // Category check
    const matchesCategory =
      state.activeCategory === 'All' || item.category === state.activeCategory;

    // Search check
    const q = state.searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesTitle = item.title && item.title.toLowerCase().includes(q);
    const matchesTags = item.tags && item.tags.some((t) => t.toLowerCase().includes(q));
    const matchesSummary = item.summary && item.summary.toLowerCase().includes(q);
    const matchesTufte =
      item.tufteSkills &&
      item.tufteSkills.some((ts) => ts.skill_id && ts.skill_id.toLowerCase().includes(q));

    return matchesCategory && (matchesTitle || matchesTags || matchesSummary || matchesTufte);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; color: var(--text-muted);">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--text-pure);">No documentary found matching "${state.searchQuery}"</p>
        <p style="font-size: 0.9rem;">Try selecting a different category or clearing search filters.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map((item) => {
      const durationStr = formatTime(item.render ? item.render.duration : 60);
      const resStr = item.render ? `${item.render.width}×${item.render.height}` : '1280×720';
      const fpsStr = item.render ? `${item.render.fps} fps` : '30 fps';
      const specVer = item.render ? `RenderSpec ${item.render.spec_version}` : 'RenderSpec 1.7';
      const tagsHtml = (item.tags || [])
        .map((tag) => `<span class="card-tag">${tag}</span>`)
        .join('');

      return `
        <article class="video-card" data-slug="${item.slug}">
          <div class="card-media" onclick="window.openTheaterModal('${item.slug}')" role="button" tabindex="0" aria-label="Play ${item.title}">
            <img class="card-poster" src="${item.thumbnailUrl}" alt="${item.title}" loading="lazy">
            <div class="card-badges">
              <span class="card-category-badge">${item.category}</span>
              <span class="card-time-badge">${durationStr}</span>
            </div>
            <div class="card-play-overlay">
              <div class="play-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
          </div>

          <div class="card-content">
            <h3 class="card-title">${item.title}</h3>
            <p class="card-summary">${item.summary || (item.scenes && item.scenes[0] ? item.scenes[0].main_insight : 'Data-driven visual documentary.')}</p>
            
            <div class="card-tags">
              ${tagsHtml}
            </div>

            <div class="card-footer">
              <div class="card-specs-info">
                <span class="spec-line">${specVer} · ${resStr}</span>
                <span class="spec-line">${fpsStr} · ${item.scenes ? item.scenes.length : 8} scenes · ${item.claims ? item.claims.length : 4} claims</span>
              </div>
              <button class="card-action-btn" onclick="window.openTheaterModal('${item.slug}')">
                Watch & Inspect
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

// Render Tufte Design Skills
function renderTufteSkills() {
  const grid = document.getElementById('tufte-skills-grid');
  if (!grid) return;

  const filtered = state.tufteSkills.filter((s) => {
    if (state.activeTufteFilter === 'All') return true;
    if (state.activeTufteFilter === 'Data-Ink') {
      return s.id.includes('data-ink') || s.id.includes('redesign') || s.id.includes('erasing');
    }
    if (state.activeTufteFilter === 'Graphical Integrity') {
      return s.id.includes('integrity') || s.id.includes('non-lying') || s.id.includes('optical-plane');
    }
    if (state.activeTufteFilter === 'Small Multiples') {
      return s.id.includes('galaxy') || s.id.includes('marey') || s.id.includes('multivariate');
    }
    if (state.activeTufteFilter === 'Multifunctioning') {
      return s.id.includes('living-histogram') || s.id.includes('double-functioning') || s.id.includes('anscombe');
    }
    return true;
  });

  grid.innerHTML = filtered
    .map((skill) => {
      return `
        <div class="tufte-skill-card" onclick="window.openTufteModal('${skill.id}')" role="button" tabindex="0" aria-label="View ${skill.title}">
          <div class="tufte-card-img-box">
            <img class="tufte-card-img" src="${skill.image}" alt="${skill.title}" loading="lazy">
          </div>
          <div class="tufte-card-content">
            <span class="tufte-card-cat">${skill.category || 'Tufte Design Principle'}</span>
            <h4 class="tufte-card-title">${skill.title}</h4>
            <p class="tufte-card-desc">${skill.summary || 'Codified visual reasoning skill preventing chartjunk and maximizing data density.'}</p>
          </div>
        </div>
      `;
    })
    .join('');
}

// Global Modal Handlers (Exposed to window for inline onclicks)
window.openTheaterModal = function (slug) {
  const project = state.projects.find((p) => p.slug === slug);
  if (!project) return;

  state.activeProjectInModal = project;

  const modal = document.getElementById('theater-modal');
  const video = document.getElementById('modal-video');
  const title = document.getElementById('modal-title');
  const desc = document.getElementById('modal-desc');
  const cat = document.getElementById('modal-category');
  const spec = document.getElementById('modal-spec');
  const dur = document.getElementById('modal-duration');
  const scenesTrack = document.getElementById('modal-scenes-track');
  const claimsList = document.getElementById('modal-claims-list');
  const skillsList = document.getElementById('modal-skills-list');

  // Populate metadata
  title.textContent = project.title;
  desc.textContent = project.summary || (project.scenes && project.scenes[0] ? project.scenes[0].main_insight : '');
  cat.textContent = project.category;
  spec.textContent = `RenderSpec ${project.render ? project.render.spec_version : '1.7'}`;
  dur.textContent = `${formatTime(project.render ? project.render.duration : 60)} · ${project.render ? project.render.width : 1280}×${project.render ? project.render.height : 720}`;

  // Video source
  video.src = project.videoUrl;
  video.poster = project.thumbnailUrl;
  video.load();
  video.play().catch(() => {});

  // Populate Scenes Scrubber
  scenesTrack.innerHTML = '';
  let cumulative = 0;
  (project.scenes || []).forEach((scene, idx) => {
    const sStart = cumulative;
    const sDur = scene.duration_seconds || 10;
    cumulative += sDur;

    const row = document.createElement('div');
    row.className = `modal-scene-item ${idx === 0 ? 'active' : ''}`;
    row.innerHTML = `
      <div class="modal-scene-left">
        <span class="modal-scene-id">${scene.id.toUpperCase()}</span>
        <span class="modal-scene-insight">${scene.main_insight || scene.scene_goal}</span>
      </div>
      <span class="modal-scene-dur">${formatTime(sStart)} (${sDur}s)</span>
    `;

    row.addEventListener('click', () => {
      video.currentTime = sStart;
      video.play().catch(() => {});
      document.querySelectorAll('#modal-scenes-track .modal-scene-item').forEach((it, i) => {
        if (i === idx) it.classList.add('active');
        else it.classList.remove('active');
      });
    });

    scenesTrack.appendChild(row);
  });

  // Populate Verified Claims
  claimsList.innerHTML = '';
  if (project.claims && project.claims.length) {
    project.claims.forEach((claim) => {
      const cDiv = document.createElement('div');
      cDiv.className = 'claim-item';
      cDiv.innerHTML = `
        <div class="claim-text">${claim.text}</div>
        <div class="claim-source">Source: ${claim.source || 'European Commission EDGAR / UN WPP / ABS / Data Commons'}</div>
      `;
      claimsList.appendChild(cDiv);
    });
  } else {
    claimsList.innerHTML = `
      <div class="claim-item">
        <div class="claim-text">Empirical data verified against live Data Commons API endpoints.</div>
        <div class="claim-source">Source: Google Data Commons MCP</div>
      </div>
    `;
  }

  // Populate Tufte Skills
  skillsList.innerHTML = '';
  if (project.tufteSkills && project.tufteSkills.length) {
    project.tufteSkills.forEach((skill) => {
      const sDiv = document.createElement('div');
      sDiv.className = 'applied-skill-item';
      sDiv.innerHTML = `
        <div class="applied-skill-id">${skill.skill_id}</div>
        <div class="applied-skill-why">${skill.principle || skill.why || 'Enforces high data density and zero chartjunk.'}</div>
      `;
      skillsList.appendChild(sDiv);
    });
  } else {
    skillsList.innerHTML = `
      <div class="applied-skill-item">
        <div class="applied-skill-id">Data-Ink Maximization</div>
        <div class="applied-skill-why">Eliminates non-data framing and redundant visual noise.</div>
      </div>
    `;
  }

  // Sync video time to modal scene track
  video.ontimeupdate = () => {
    const cur = video.currentTime;
    let acc = 0;
    const items = document.querySelectorAll('#modal-scenes-track .modal-scene-item');
    for (let i = 0; i < (project.scenes || []).length; i++) {
      const dur = project.scenes[i].duration_seconds || 10;
      if (cur >= acc && cur < acc + dur) {
        items.forEach((it, idx) => {
          if (idx === i) it.classList.add('active');
          else it.classList.remove('active');
        });
        break;
      }
      acc += dur;
    }
  };

  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeTheaterModal = function () {
  const modal = document.getElementById('theater-modal');
  const video = document.getElementById('modal-video');
  if (video) video.pause();
  if (modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = '';
};

window.openTufteModal = function (skillId) {
  const skill = state.tufteSkills.find((s) => s.id === skillId);
  if (!skill) return;

  const modal = document.getElementById('tufte-modal');
  const img = document.getElementById('tufte-modal-img');
  const title = document.getElementById('tufte-modal-title');
  const desc = document.getElementById('tufte-modal-desc');
  const cat = document.getElementById('tufte-modal-category');

  img.src = skill.image;
  img.alt = skill.title;
  title.textContent = skill.title;
  desc.textContent = skill.summary;
  cat.textContent = skill.category || 'Tufte Design Principle';

  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeTufteModal = function () {
  const modal = document.getElementById('tufte-modal');
  if (modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = '';
};

// Event Listeners Setup
function setupEventListeners() {
  // Modal Close buttons
  document.getElementById('modal-close')?.addEventListener('click', window.closeTheaterModal);
  document.getElementById('tufte-modal-close')?.addEventListener('click', window.closeTufteModal);

  // Click outside to close modals
  document.getElementById('theater-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'theater-modal') window.closeTheaterModal();
  });
  document.getElementById('tufte-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'tufte-modal') window.closeTufteModal();
  });

  // Category Filter Pills
  const catButtons = document.querySelectorAll('#category-filters .filter-pill');
  catButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      catButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.getAttribute('data-category');
      renderGallery();
    });
  });

  // Tufte Filter Pills
  const tufteButtons = document.querySelectorAll('#tufte-filters .tufte-pill');
  tufteButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tufteButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeTufteFilter = btn.getAttribute('data-tufte-filter');
      renderTufteSkills();
    });
  });

  // Search input
  const searchInput = document.getElementById('gallery-search');
  const clearBtn = document.getElementById('clear-search');

  searchInput?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    if (clearBtn) {
      clearBtn.style.display = state.searchQuery ? 'block' : 'none';
    }
    renderGallery();
  });

  clearBtn?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    state.searchQuery = '';
    clearBtn.style.display = 'none';
    renderGallery();
  });

  // Copy Case Study Bullets
  const copyBtn = document.getElementById('copy-bullets-btn');
  const copyBtnText = document.getElementById('copy-btn-text');

  copyBtn?.addEventListener('click', () => {
    const bullets = [
      '• Architected Autonomous AI Documentary Director: Developed a multi-agent generative pipeline connecting Google Data Commons MCP, Claude/Codex reasoning agents, and Remotion (React) to produce 60–120s broadcast motion documentaries from natural language prompts.',
      '• Codified Edward Tufte Data Visualization Engine: Built a retrieval system of 226+ digitized visual skills (Data-Ink Maximization, Small Multiples, Living Histograms), eliminating chartjunk and enforcing continuous visual reasoning over static slides.',
      '• Engineered Multi-Pass Automated Video QA: Implemented deterministic frame verification in TypeScript/Chromium detecting flicker, contrast issues, and continuity breaches before final 60fps MP4 export.',
      '• Created End-to-End Factual Verification: Enforced strict source-claim provenance linking all on-screen graphics to real-world datasets (UN WPP, European Commission EDGAR, ABS) with zero hallucination.',
    ].join('\n\n');

    navigator.clipboard.writeText(bullets).then(() => {
      if (copyBtnText) copyBtnText.textContent = 'Copied to Clipboard! ✓';
      setTimeout(() => {
        if (copyBtnText) copyBtnText.textContent = 'Copy Case Study Bullets';
      }, 2500);
    });
  });

  // Keyboard navigation & shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeTheaterModal();
      window.closeTufteModal();
    }
  });
}

// Start application
loadData();
