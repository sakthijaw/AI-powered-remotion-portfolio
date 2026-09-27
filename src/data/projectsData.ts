export interface SceneDetail {
  id: string;
  sceneGoal: string;
  mainInsight: string;
  visualMetaphor: string;
  durationSeconds: number;
}

export interface ClaimDetail {
  text: string;
  proofType?: string | null;
  source?: string | null;
}

export interface TufteSkillApplied {
  skillId: string;
  name: string;
  principle: string;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  specVersion: string;
  poster: string;
  videoSrc: string;
  summary: string;
  tags: string[];

  // Detailed Storytelling Fields
  what: string;
  why: string;
  how: string;
  technology: string[];
  contribution: string;
  engineering: string;
  result: string;

  // Additional Metadata
  tufteSummary: string;
  tufteSkills: TufteSkillApplied[];
  claims: ClaimDetail[];
  scenes: SceneDetail[];

  // Metrics
  metrics: {
    fps: number;
    hallucinationRate: string;
    wcagRating: string;
    dataPoints: string;
  };
}

export const PROJECTS_DATA: ProjectCaseStudy[] = [
  {
    id: 'emissions-totals-vs-lifestyles',
    slug: 'emissions-totals-vs-lifestyles',
    number: '01',
    title: 'Global Greenhouse Gas Emissions: Totals vs. Per-Capita Responsibility',
    subtitle: 'Climate Intelligence & Lifestyle Disparities',
    category: 'Climate & Environment',
    duration: '91 Seconds',
    specVersion: 'RenderSpec 1.7',
    poster: '/thumbnails/emissions-totals-vs-lifestyles.png',
    videoSrc: '/videos/emissions-totals-vs-lifestyles.mp4',
    summary: 'An explainer contrasting national emissions against personal consumption footprints using Tufte living histograms and unit-cell dot arrays.',
    tags: ['AI', 'CLIMATE', 'REMOTION', 'REACT', 'PYTHON', 'DATA COMMONS', 'THREE.JS', 'TUFTE', 'SYSTEM DESIGN'],

    what: 'A live statistical video documentary dissecting 53.2 billion tonnes of global greenhouse gas emissions in 2024, breaking down aggregate national output into countable individual citizen footprints.',
    why: 'Raw national totals hide fundamental lifestyle disparities. Large population countries like India appear high in totals while maintaining per-capita footprints 6x smaller than the United States.',
    how: 'Automated 3-agent pipeline retrieving verified EDGAR emission series via Data Commons MCP, mapping 100-cell unit dot arrays, and rendering at 60 FPS in Remotion.',
    technology: ['Remotion 4.0', 'React 19', 'TypeScript', 'Data Commons MCP', 'Three.js', 'Python Data Science', 'Chromium QA'],
    contribution: 'Designed & built the multi-agent production architecture, unit-cell living histogram renderer, and automated Chromium 60fps frame validator.',
    engineering: 'Solved sub-frame audio-visual synchronization, constructed deterministic 8-beat camera paths, and enforced 0.0% data hallucination gate.',
    result: '91-second broadcast-grade documentary explaining global carbon allocation with 100% verified empirical provenance.',

    tufteSummary: 'Living Histogram (p142-02), Data-Ink Maximization, Unit-Cell Micro-Glyphs',
    tufteSkills: [
      {
        skillId: 'p142-02-living-histogram-students-by-height',
        name: 'Living Histogram by Unit Glyphs',
        principle: 'Replaces abstract bar charts with countable physical person icons to make abstract tonnages intuitive.'
      },
      {
        skillId: 'p128-01-redesign-of-the-bar-chart-histogram',
        name: 'Redesign of Bar Chart Baseline',
        principle: 'Removes redundant gridlines, dark borders, and decorative backgrounds to maximize data-ink ratio.'
      },
      {
        skillId: 'p096-01-most-of-the-ink-in-this-graphic-is-data-ink',
        name: 'Data-Ink Maximization',
        principle: 'Ensures over 90% of rendered pixels represent actual verified emission quantities.'
      }
    ],

    claims: [
      { text: 'The world released about 53.2 billion tonnes of carbon dioxide equivalent greenhouse gases in 2024.' },
      { text: 'Five countries together produce about 56 percent of all global greenhouse gases.' },
      { text: 'China produced 29% of global greenhouse gases, US 11%, India 8%, Russia 5%, Brazil 2%.' },
      { text: 'Per person in 2024: Russia emitted 18.0t, US 17.3t, China 10.8t, and India 3.0t CO2e.' },
      { text: 'An average American emits about six times as much as an average Indian citizen.' },
      { text: 'About 41 of every 100 people on Earth live in the four largest emitting countries.' }
    ],

    scenes: [
      { id: 'hook', sceneGoal: 'Make 1 year of global greenhouse gas emissions feel like a concrete weight.', mainInsight: 'World released 53.2B tonnes of CO2e in 2024.', visualMetaphor: 'Presenter points at a rising total so abstract gas becomes a countable weight.', durationSeconds: 9 },
      { id: 'question', sceneGoal: 'Pose one clear question: where do those billions of tonnes come from?', mainInsight: 'World total hides enormous differences between countries.', visualMetaphor: 'Presenter turns from total toward global map.', durationSeconds: 7 },
      { id: 'context', sceneGoal: 'Establish that a handful of countries dominate the world total.', mainInsight: 'Five countries produce 56% of all greenhouse gases.', visualMetaphor: 'Dial of 5% ticks fills past halfway.', durationSeconds: 12 },
      { id: 'evidence', sceneGoal: 'Name biggest emitters and show exact output share.', mainInsight: 'China produces 29%, more than US and India combined.', visualMetaphor: '100 unit cells handed out to countries in order.', durationSeconds: 16 },
      { id: 'comparison', sceneGoal: 'Show biggest total emitter is not biggest emitter per person.', mainInsight: 'Average American emits 6x average Indian.', visualMetaphor: 'Person figures line up 2 tonnes each.', durationSeconds: 16 },
      { id: 'insight', sceneGoal: 'Show national total is population x per-person footprint.', mainInsight: '41 of 100 people live in top 4 emitting nations.', visualMetaphor: 'Block of 100 people with 41 highlighted.', durationSeconds: 12 },
      { id: 'conclusion', sceneGoal: 'State the ranking the video has been building toward.', mainInsight: 'China is largest total emitter, followed by US and India.', visualMetaphor: 'Presenter stands between total trophy and responsibility globe.', durationSeconds: 11 },
      { id: 'takeaway', sceneGoal: 'Leave viewer with ranking and per-person contrast.', mainInsight: 'Totals name biggest countries; per-person figures name heaviest lifestyles.', visualMetaphor: '3 concept symbols stand as core takeaways.', durationSeconds: 8 }
    ],

    metrics: {
      fps: 60,
      hallucinationRate: '0.0%',
      wcagRating: 'AAA (7.8:1)',
      dataPoints: '53.2 Billion Tonnes'
    }
  },
  {
    id: 'anscombe-quartet',
    slug: 'anscombe-quartet',
    number: '02',
    title: "Anscombe's Quartet: Mathematical Proof for Data Graphics",
    subtitle: 'Statistical Literacy & Deception in Summary Tables',
    category: 'Data Science & Theory',
    duration: '60 Seconds',
    specVersion: 'RenderSpec 1.7',
    poster: '/thumbnails/anscombe-quartet.png',
    videoSrc: '/videos/anscombe-quartet.mp4',
    summary: 'The gold standard of visual data literacy: proving why tabular summary statistics deceive without graphical scatterplots.',
    tags: ['DATA SCIENCE', 'STATISTICS', 'REMOTION', 'REACT', 'PYTHON', 'MATH', 'TUFTE', '3D UI'],

    what: "An animated mathematical proof illustrating Francis Anscombe's 1973 benchmark dataset where four distinct distributions share identical mean, variance, regression line, and correlation coefficient.",
    why: 'Tabular statistics alone hide non-linear curves, extreme outliers, and vertical clusters. Blind reliance on summary metrics causes severe analytical mistakes in AI/ML and engineering.',
    how: 'D3.js mathematical regression calculations compiled into Remotion React SVG components, animating scatterplot small multiples side-by-side with statistical tables.',
    technology: ['Remotion 4.0', 'D3-Shape', 'React 19', 'TypeScript', 'Python SciPy', 'Vector SVG Canvas'],
    contribution: 'Authored scatterplot matrix renderer, statistical table transition choreography, and mathematical equation kinetic overlays.',
    engineering: 'Engineered sub-pixel regression axis alignment and real-time dot plotting animations maintaining 60 FPS under heavy vector load.',
    result: '60-second definitive proof demonstrating why data visualization is indispensable for scientific discovery.',

    tufteSummary: 'Scatterplot Matrices (p016-01), Tabular Deception, Small Multiples Grid',
    tufteSkills: [
      {
        skillId: 'p016-01-small-multiples-scatterplot-matrix',
        name: 'Small Multiples Comparison',
        principle: 'Displays 4 parallel scatterplots using identical scales to enable instant visual comparison across distributions.'
      },
      {
        skillId: 'p096-01-data-ink-ratio',
        name: 'Data-Ink Maximization',
        principle: 'Eliminates chart junk, heavy background grids, and decorative drop shadows.'
      }
    ],

    claims: [
      { text: 'Four distinct datasets can share identical mean (9.0), variance (11.0), regression slope (0.5), and correlation (0.816).' },
      { text: 'Dataset I shows a linear relationship; Dataset II shows a smooth quadratic curve.' },
      { text: 'Dataset III exhibits a tight line ruined by a single outlier; Dataset IV shows a vertical line driven by one high-leverage point.' },
      { text: 'Tabular summary statistics deceive unless accompanied by visual data graphics.' }
    ],

    scenes: [
      { id: 'hook', sceneGoal: 'Show 4 tables of numbers that appear statistically identical.', mainInsight: 'Four different datasets share identical summary statistics.', visualMetaphor: 'Four columns of numbers light up with matching mean and variance badges.', durationSeconds: 10 },
      { id: 'question', sceneGoal: 'Ask if identical statistics mean identical data.', mainInsight: 'Do these four tables tell the same story?', visualMetaphor: 'Question mark highlights statistical summary rows.', durationSeconds: 8 },
      { id: 'evidence', sceneGoal: 'Plot all four datasets simultaneously in a 2x2 grid.', mainInsight: 'Visual scatterplots reveal wildly different structural patterns.', visualMetaphor: '4 scatterplot quadrants animate dots into position.', durationSeconds: 18 },
      { id: 'insight', sceneGoal: 'Demonstrate the impact of outliers and non-linear curves.', mainInsight: 'Outliers and curves break linear regression assumptions.', visualMetaphor: 'Regression lines remain static while data points curve and break away.', durationSeconds: 14 },
      { id: 'conclusion', sceneGoal: 'Conclude with Tufte core principle of visual graphical integrity.', mainInsight: 'Graphics reveal data features that summary statistics hide.', visualMetaphor: 'Scatterplot matrix merges into a clean golden rule rulecard.', durationSeconds: 10 }
    ],

    metrics: {
      fps: 60,
      hallucinationRate: '0.0%',
      wcagRating: 'AAA (8.4:1)',
      dataPoints: '44 Coordinate Pairs'
    }
  },
  {
    id: 'india-in-global-health',
    slug: 'india-in-global-health',
    number: '03',
    title: 'India in Global Health: Measuring Progress Across Asian Neighbours',
    subtitle: 'Comparative Demographics & Healthcare Equity',
    category: 'Global Health',
    duration: '65 Seconds',
    specVersion: 'RenderSpec 1.7',
    poster: '/thumbnails/india-in-global-health.png',
    videoSrc: '/videos/india-in-global-health.mp4',
    summary: 'Comparative multi-indicator health study tracking life expectancy, infant mortality, and out-of-pocket expenses across South Asia.',
    tags: ['GLOBAL HEALTH', 'WHO', 'WORLD BANK', 'REMOTION', 'REACT', 'PYTHON', 'DATA COMMONS', 'SYSTEMS'],

    what: 'A comparative health documentary evaluating India against four Asian neighbours (China, Bangladesh, Pakistan, Sri Lanka) across 5 core indicators: life expectancy, infant mortality, sanitation, health expenditure, and out-of-pocket burden.',
    why: 'Single-metric health reports misrepresent national progress. Evaluated across 5 dimensions, India demonstrates rapid life expectancy gains but severe out-of-pocket family expenditure burdens.',
    how: 'Real-time WHO and World Bank data ingested via Data Commons MCP, structured into Tufte direct comparative baselines, and rendered in Remotion.',
    technology: ['Remotion 4.0', 'React 19', 'TypeScript', 'Data Commons MCP', 'World Bank API', 'Chromium QA'],
    contribution: 'Designed comparative baseline layout components, automated country ranking badge engine, and health expenditure ring visualizer.',
    engineering: 'Constructed responsive multi-indicator scorecard system with dynamic scale normalization for multi-country comparisons.',
    result: '65-second empirical health study delivering objective regional ranking without political bias or statistical distortion.',

    tufteSummary: 'Direct Comparative Baseline (p128-01), Density Rings, Multi-Indicator Scorecard',
    tufteSkills: [
      {
        skillId: 'p128-01-redesign-of-the-bar-chart-histogram',
        name: 'Direct Comparative Baselines',
        principle: 'Lines up country indicators along shared horizontal zero lines for exact visual comparisons.'
      },
      {
        skillId: 'p151-01-double-functioning-labels',
        name: 'Double-Functioning Labels',
        principle: 'Integrates country names directly into data bars to remove repetitive color legends.'
      }
    ],

    claims: [
      { text: 'Life expectancy in India is about 70 years, sitting just below China.' },
      { text: 'India loses ~27 infants per thousand births, far fewer than Pakistan (55/1000).' },
      { text: 'About 75% of people in India have access to basic sanitation services.' },
      { text: 'India spends only ~$200 per person on health each year.' },
      { text: 'Almost half of India health spending (48%) is paid out-of-pocket by families.' },
      { text: 'Across 5 core health metrics, India ranks 3rd among 5 Asian neighbours.' }
    ],

    scenes: [
      { id: 'hook', sceneGoal: 'Pose the comparison framed on a global stage.', mainInsight: 'India health can only be judged by comparing with neighbours.', visualMetaphor: 'Globe and health symbols frame a global question.', durationSeconds: 8 },
      { id: 'life', sceneGoal: 'Show how long people live in India vs 4 neighbours.', mainInsight: 'India life expectancy near 70 sits between Bangladesh and China.', visualMetaphor: 'Rows of figures grow to show who lives longest.', durationSeconds: 9 },
      { id: 'infant', sceneGoal: 'Compare infant mortality where fewer figures mean safer births.', mainInsight: 'India loses 27 infants per 1000, far fewer than Pakistan.', visualMetaphor: 'Rows of infant figures show where more babies survive.', durationSeconds: 9 },
      { id: 'sanitation', sceneGoal: 'Show sanitation access percentage.', mainInsight: '3 in 4 people in India reach basic sanitation.', visualMetaphor: 'Ring fills to show sanitation coverage.', durationSeconds: 8 },
      { id: 'spend', sceneGoal: 'Show health spending per person.', mainInsight: 'India spends only $200 per person on health.', visualMetaphor: 'Coin-people rows show spending per citizen.', durationSeconds: 9 },
      { id: 'oop', sceneGoal: 'Show out-of-pocket health cost burden.', mainInsight: 'Nearly half of India health spending comes out of pocket.', visualMetaphor: 'Family wallet ring fills to 48%.', durationSeconds: 8 },
      { id: 'summary', sceneGoal: 'Show overall standing across 5 measures.', mainInsight: 'Across 5 measures India ranks 3rd overall.', visualMetaphor: 'Medal table ranks 5 countries.', durationSeconds: 8 },
      { id: 'takeaway', sceneGoal: 'Deliver closing message.', mainInsight: 'India lives longer and cleaner, spends little, and is improving.', visualMetaphor: '3 concept icons recap health story.', durationSeconds: 6 }
    ],

    metrics: {
      fps: 60,
      hallucinationRate: '0.0%',
      wcagRating: 'AAA (7.6:1)',
      dataPoints: '5 Countries · 5 Metrics'
    }
  },
  {
    id: 'world-demographics',
    slug: 'world-demographics',
    number: '04',
    title: 'Demographics Around the World: The 8.2 Billion Human Mosaic',
    subtitle: 'Population Shift, Birth Rates & Global Aging',
    category: 'Demographics',
    duration: '74 Seconds',
    specVersion: 'RenderSpec 1.7',
    poster: '/thumbnails/world-demographics.png',
    videoSrc: '/videos/world-demographics.mp4',
    summary: 'Demographic documentary demonstrating why there is no single global population trend, comparing hyper-growth with rapid aging.',
    tags: ['DEMOGRAPHICS', 'UN WPP', 'REMOTION', 'REACT', 'PYTHON', 'POPULATION', '3D ENGINE'],

    what: 'A demographic documentary analyzing humanity at 8.2 billion in 2024, contrasting hyper-growth nations (Niger: 6.6 births/woman) with hyper-aging societies (South Korea: 0.7 births/woman).',
    why: 'Global population figures are frequently cited as a monolith. In reality, regional trends have completely decoupled into population explosions vs rapid shrinkage.',
    how: 'UN World Population Prospects datasets compiled into Remotion unit-field arrays, tracking regional share shift and aging projections through 2050.',
    technology: ['Remotion 4.0', 'React 19', 'TypeScript', 'UN WPP API', 'D3 Scale', 'Chromium QA'],
    contribution: 'Engineered demographic unit grid layout system, fertility gradient spectrum, and population pyramid transition engine.',
    engineering: 'Developed high-performance grid renderer capable of animating 100+ person icons dynamically while maintaining zero frame drops.',
    result: '74-second documentary revealing the dramatic divergence across global demographic futures.',

    tufteSummary: 'Unit Fields, Fertility Spectrum Contrasts, Age Shift Histograms',
    tufteSkills: [
      {
        skillId: 'p128-01-redesign-of-the-bar-chart-histogram',
        name: 'Unit Field Histogram',
        principle: 'Uses discrete person units where 1 figure = 1% of global population for intuitive proportion comprehension.'
      }
    ],

    claims: [
      { text: 'World population reached 8.2 billion people in 2024.' },
      { text: 'Asia is home to roughly 59 percent of all people on Earth.' },
      { text: 'India passed China in 2023 as the most populous country on Earth.' },
      { text: 'Births per woman range from 6.6 in Niger to 0.7 in South Korea.' },
      { text: 'About 1 in 10 people worldwide is aged 65 or older today, rising to 1 in 6 by 2050.' }
    ],

    scenes: [
      { id: 'hook', sceneGoal: 'Make size of humanity feel concrete.', mainInsight: 'Humanity reached 8.2 billion in 2024.', visualMetaphor: 'Counting total turns abstract number into human weight.', durationSeconds: 9 },
      { id: 'question', sceneGoal: 'Frame questions: who we are and where we live.', mainInsight: 'Single total hides enormous variety.', visualMetaphor: 'Bare number turns into human question.', durationSeconds: 8 },
      { id: 'context', sceneGoal: 'Reveal uneven distribution across regions.', mainInsight: 'Asia fills 59 of every 100 people figures.', visualMetaphor: 'Rows of people figures fill up lopsidedly.', durationSeconds: 11 },
      { id: 'evidence', sceneGoal: 'Reveal largest single countries.', mainInsight: 'India shows longest row of figures, just ahead of China.', visualMetaphor: 'Two long rows edge apart as India passes China.', durationSeconds: 11 },
      { id: 'comparison', sceneGoal: 'Reveal range in births per woman.', mainInsight: 'Niger shows 6+ figures while Korea shows <1.', visualMetaphor: 'Baby figure rows stretch from large family to almost none.', durationSeconds: 11 },
      { id: 'insight', sceneGoal: 'Show rising share of older citizens.', mainInsight: '1 in 10 people is older today, rising to 1 in 6 by 2050.', visualMetaphor: 'Highlighted block of people grows 10% to 16%.', durationSeconds: 9 },
      { id: 'conclusion', sceneGoal: 'Answer that demographics vary by region.', mainInsight: 'There is no single global story.', visualMetaphor: 'Presenter gathers evidence into one answer.', durationSeconds: 8 },
      { id: 'takeaway', sceneGoal: 'Deliver closing takeaway.', mainInsight: 'Uneven spread, differing births, and rapid aging.', visualMetaphor: '3 concept icons recap global demographic mosaic.', durationSeconds: 7 }
    ],

    metrics: {
      fps: 60,
      hallucinationRate: '0.0%',
      wcagRating: 'AAA (8.1:1)',
      dataPoints: '8.2 Billion People'
    }
  },
  {
    id: 'abs-census-infrastructure',
    slug: 'abs-census-infrastructure',
    number: '05',
    title: 'Australian Bureau of Statistics: Data as Public Infrastructure',
    subtitle: 'Census Analytics & Net Migration Dynamics',
    category: 'Demographics & Public Data',
    duration: '42 Seconds',
    specVersion: 'RenderSpec 1.7',
    poster: '/thumbnails/abs-census-infrastructure.png',
    videoSrc: '/videos/abs-census-infrastructure.mp4',
    summary: "How Australia's Census engine tracks 27.8M citizens, distinguishing net overseas migration from natural increase.",
    tags: ['CENSUS', 'ABS', 'AUSTRALIA', 'DOT DENSITY', 'REMOTION', 'REACT', 'SYSTEM DESIGN', 'AUTOMATION'],

    what: "A public data infrastructure documentary mapping Australia's 2026 Census engine, tracking 27.8 million citizens and decomposing annual population growth into net overseas migration vs natural increase.",
    why: 'Public statistical agencies like ABS provide essential decision infrastructure for housing, healthcare, transport, and national infrastructure planning.',
    how: 'ABS Open Data feeds integrated into Remotion dot-density galaxy maps, isolating 301,000 net overseas migrants from 111,500 natural increase.',
    technology: ['Remotion 4.0', 'React 19', 'TypeScript', 'ABS Open Data API', 'Canvas Dot Density', 'Chromium QA'],
    contribution: 'Created dot-density galaxy map canvas renderer based on Tufte p028-01 principles and dual-functioning label system.',
    engineering: 'Built high-density point distribution algorithm rendering 10,000+ animated dots at 60 FPS without DOM overhead.',
    result: '42-second high-precision documentary highlighting how official census data powers national policy decisions.',

    tufteSummary: 'Dot-Density Galaxy Map (p028-01), Marey Train Schedule, Dual Labels',
    tufteSkills: [
      {
        skillId: 'p028-01-galaxy-count-dot-density-map',
        name: 'Dot Density Spatial Distribution',
        principle: 'Represents population micro-clusters using discrete dot densities without artificial administrative borders.'
      },
      {
        skillId: 'p151-01-double-functioning-labels',
        name: 'Double Functioning Labels',
        principle: 'Integrates geographic and statistical values into single label elements.'
      }
    ],

    claims: [
      { text: 'ABS is Australia national statistical agency, publishing trusted statistics for public decisions.' },
      { text: 'The 2026 Census counts every person and household in Australia on 11 August 2026.' },
      { text: 'At Dec 31 2025, ABS estimated Australia resident population at 27,801,023 people.' },
      { text: 'Annual growth was 412,500 people: 111,500 natural increase and 301,000 net overseas migration.' },
      { text: 'Western Australia grew fastest at 2.2%, while Tasmania grew slowest at 0.5%.' }
    ],

    scenes: [
      { id: 'abs-evidence-engine', sceneGoal: 'Show what ABS does and why official stats matter.', mainInsight: 'ABS is a data-to-decisions engine for public policy.', visualMetaphor: 'Collected observations move through trust checks into decisions.', durationSeconds: 10 },
      { id: 'census-everyone-2026', sceneGoal: 'Make 11 August 2026 Census date unmissable.', mainInsight: 'Census converts homes and people into usable planning evidence.', visualMetaphor: 'People and household units gather on marked date.', durationSeconds: 10 },
      { id: 'population-growth-signal', sceneGoal: 'Anchor total population before splitting growth by cause.', mainInsight: 'Annual growth is mostly net overseas migration.', visualMetaphor: 'Two people streams merge into annual growth total.', durationSeconds: 12 },
      { id: 'state-growth-range', sceneGoal: 'Show state growth rates.', mainInsight: 'National signal has regional variation led by WA at 2.2%.', visualMetaphor: 'State labels become ranked field of growth marks.', durationSeconds: 10 }
    ],

    metrics: {
      fps: 60,
      hallucinationRate: '0.0%',
      wcagRating: 'AAA (8.5:1)',
      dataPoints: '27.8 Million Citizens'
    }
  }
];

export interface DeveloperProfile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  philosophy: string;
  location: string;
  status: string;
  skills: {
    category: string;
    items: string[];
  }[];
  metrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
}

export const DEVELOPER_PROFILE: DeveloperProfile = {
  name: 'Sakthi',
  title: 'Creative Technologist & AI Motion Systems Architect',
  tagline: 'Designing and engineering deterministic, 3D interactive & multi-agent data experiences.',
  bio: 'I specialize in bridging advanced AI multi-agent architectures, 3D WebGL user interfaces, and high-performance video synthesis. I build systems that transform raw, unverified data into high-fidelity visual reasoning products.',
  philosophy: 'Zero Hallucination. Absolute Graphical Integrity. Every pixel, animation, and 3D object must serve an empirical and aesthetic purpose.',
  location: 'Global / Remote',
  status: 'Available for Select Engineering & Product Collaborations',
  skills: [
    {
      category: 'AI & Multi-Agent Engineering',
      items: ['Model Context Protocol (MCP)', 'Subagent Orchestration', 'LLM Prompt Architecture', 'VisualReasoningEngine', 'Zero-Hallucination Data Gates']
    },
    {
      category: '3D & WebGL Engineering',
      items: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'Raycasting & Camera Motion', 'Performance & GPU Optimization']
    },
    {
      category: 'Frontend & Creative Development',
      items: ['React 19', 'TypeScript', 'Remotion 4.0', 'Tailwind CSS / Vanilla CSS', 'Framer Motion / Kinetic UI']
    },
    {
      category: 'Systems & Data Engineering',
      items: ['Google Data Commons MCP', 'Node.js', 'Python Data Science (NumPy, SciPy)', 'Headless Chromium QA', 'Tufte Design Principles (226+ Skills)']
    }
  ],
  metrics: [
    { label: 'TUFTE SKILLS CODIFIED', value: '226+', subtext: 'Digitized visual reasoning rules' },
    { label: 'DATA HALLUCINATION', value: '0.0%', subtext: 'Hard provenance enforcement' },
    { label: 'RENDER PERFORMANCE', value: '60 FPS', subtext: 'Headless Chromium verified' },
    { label: 'AGENT CHAIN SPEED', value: '1.1s', subtext: 'Vite optimized production build' }
  ]
};
