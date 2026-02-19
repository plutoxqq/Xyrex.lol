/* script.js
   Renders product cards, handles search/filters, and controls modal behavior.
   Product data remains array-of-objects.
*/

/* ================================
   PRODUCT DATA
   ================================
   To add a product:
    - Copy one object in the array and update fields.
    - Set freeOrPaid to "paid" or "free".
    - tags controls legend-style state symbols used on each card.
*/
const products = [
  {
    name: "Aether Decompiler",
    featured: true,
    platform: ["Windows", "macOS"],
    cheatType: "Internal",
    keySystem: "Keyless",
    tags: ["Internal", "Trending", "Verified"],
    features: ["Decompiler", "Multi-instance"],
    sunc: 97,
    description: "Aether Decompiler is a performance-first executor toolkit focused on rapid reverse analysis and reliable multi-instance execution. It includes quick symbol recovery, plugin extensibility, and a streamlined setup flow for users who need fast iteration without sacrificing advanced controls.",
    pros: ["Fast startup and analysis pipeline", "Extensible plugin architecture", "Strong multi-instance stability"],
    cons: ["Minor UI lag on first launch", "Heuristics can over-flag edge cases"],
    pricingOptions: ["1 Week — $5.99", "1 Month — $17.99", "Lifetime — $69.99"],
    costDisplay: "paid",
    stability: "Very Stable",
    trustLevel: "High",
    status: "Undetected"
  },
  {
    name: "KernelForge",
    featured: false,
    platform: ["Windows"],
    cheatType: "External",
    keySystem: "Keyed",
    tags: ["Kernel", "Verified", "External"],
    features: ["Kernel"],
    sunc: 88,
    description: "KernelForge delivers kernel-level tooling for advanced users who need deeper system interaction. Its driver stack includes fallback protections and validation checks designed to reduce risky misconfiguration during heavy operation sessions.",
    pros: ["Deep kernel integration", "Reliable fallback protections", "Strong control for advanced workflows"],
    cons: ["Driver signing workaround needed on some setups"],
    pricingOptions: ["1 Week — $8.99", "1 Month — $19.99", "Lifetime — $89.99"],
    costDisplay: "paid",
    stability: "Stable",
    trustLevel: "High",
    status: "Updating"
  },
  {
    name: "Nebula AI Runner",
    featured: false,
    platform: ["Android", "iOS"],
    cheatType: "External",
    keySystem: "Keyless",
    tags: ["AI", "Supports VNG", "Warning"],
    features: ["Multi-instance", "Decompiler"],
    sunc: 92,
    description: "Nebula AI Runner blends AI-assisted pattern detection with automation controls for batch execution. It is built for mobile-first environments and offers optional cloud-backed services for syncing profiles and job presets.",
    pros: ["Great for large-batch automation", "AI-assisted detection workflows", "Cross-mobile platform support"],
    cons: ["Cloud synchronization can be region-dependent"],
    pricingOptions: ["1 Week — $4.99", "1 Month — $14.99", "Lifetime — $59.99"],
    costDisplay: "both",
    stability: "Stable",
    trustLevel: "Medium",
    status: "Working"
  },
  {
    name: "MiniCore",
    featured: false,
    platform: ["Windows", "Android"],
    cheatType: "Internal",
    keySystem: "Keyless",
    tags: ["Internal", "Supports VNG", "Trending"],
    features: ["Multi-instance"],
    sunc: 71,
    description: "MiniCore is a compact executor tuned for lower-end hardware and low-latency launch times. It prioritizes a minimal footprint while still supporting rapid multi-instance sessions for users who need lightweight performance.",
    pros: ["Low resource usage", "Fast spin-up for multi-instance runs"],
    cons: ["Reduced compatibility on older GPUs"],
    pricingOptions: ["1 Week — $3.99", "1 Month — $10.99", "Lifetime — $39.99"],
    costDisplay: "paid",
    stability: "Moderate",
    trustLevel: "Medium",
    status: "Detected"
  },
  {
    name: "Sigma Suite",
    featured: false,
    platform: ["macOS"],
    cheatType: "External",
    keySystem: "Keyed",
    tags: ["Warning", "External"],
    features: [],
    sunc: 60,
    description: "Sigma Suite includes a broad utility bundle and configuration system, but it requires careful setup and regular maintenance to stay dependable. It is suited to experienced users willing to tune and monitor behavior closely.",
    pros: ["Broad utility set", "Flexible configuration options"],
    cons: ["Can conflict with antivirus software", "Setup complexity is higher than average"],
    pricingOptions: ["1 Week — $6.99", "1 Month — $12.00", "Lifetime — $49.99"],
    costDisplay: "paid",
    stability: "Unstable",
    trustLevel: "Low",
    status: "Discontinued"
  },
 {
    name: "Pluton",
    featured: true,
    platform: ["Windows", "Android"],
    cheatType: "Internal",
    keySystem: "Keyless",
    tags: ["Verified", "Trending", "Internal"],
    features: [],
    sunc: 100,
    description: "Pluton Executor is a next-gen Roblox executor built for raw performance and stealth, featuring a custom Lua VM, instant injection, and adaptive hot-patching to stay resilient against modern anti-cheat updates.",
    pros: ["High sUNC", "AntiCheat Bypass", "Instant Injection", "High stability"],
    cons: ["Can conflict with antivirus software", "Setup complexity is higher than average"],
    pricingOptions: ["1 Day — $0.99", "3 Days — $1.99", "1 Week — $4.99", "1 Month — $13.99"],
    costDisplay: "paid",
    stability: "Stable",
    trustLevel: "High",
    status: "Undetected"
  }
];



const scriptsHubData = {
  // Update this list to change paid rankings.
  tierListPaid: [
    { tier: 'S', executor: 'Pluton', notes: 'Best overall reliability and performance.' },
    { tier: 'A', executor: 'Aether Decompiler', notes: 'Excellent reverse tooling and stability.' },
    { tier: 'B', executor: 'KernelForge', notes: 'Powerful but setup is heavier for most users.' }
  ],
  // Update this list to change free rankings.
  tierListFree: [
    { tier: 'S', executor: 'Nebula AI Runner', notes: 'Strong free option for mobile-heavy workflows.' },
    { tier: 'A', executor: 'MiniCore', notes: 'Lightweight and good on lower-end systems.' },
    { tier: 'C', executor: 'Sigma Suite', notes: 'Only worth considering for niche use cases.' }
  ],
  // Update this list to manage popular scripts shown in the UI.
  popularScripts: [
    {
      name: 'Universal Auto-Farm',
      game: 'Multi-game',
      description: 'General-purpose automation loop with teleport and anti-AFK toggles.',
      script: 'loadstring(game:HttpGet("https://example.com/universal-autofarm.lua"))()'
    },
    {
      name: 'Dungeon Assist',
      game: 'Dungeon Quest',
      description: 'Auto target assist and route preset loader for dungeon runs.',
      script: 'loadstring(game:HttpGet("https://example.com/dungeon-assist.lua"))()'
    }
  ],
  recentChanges: [
    { date: '2026-02-18', summary: 'Replaced the In Development tab with a Recent Changes log.' },
    { date: '2026-02-18', summary: 'Restored the Free + Paid pricing filter and matching behavior.' },
    { date: '2026-02-18', summary: 'Removed Script Hub tips and fixed duplicate search clear icon behavior.' },
    { date: '2026-02-18', summary: 'Added Save tab deletion plus required title/script validation.' }
  ]
};

const featureIconMap = {
  "Decompiler": "#icon-decompiler",
  "Multi-instance": "#icon-multi",
  "Kernel": "#icon-kernel"
};

const qs = sel => document.querySelector(sel);
const qsa = sel => Array.from(document.querySelectorAll(sel));

const tagSymbolMap = {
  Verified: { symbol: '✓', cls: 'verified' },
  Warning: { symbol: 'warning', cls: 'warning', isIcon: true },
  Trending: { symbol: 'trending', cls: 'trending', isIcon: true },
  Internal: { symbol: 'I', cls: 'internal' },
  External: { symbol: 'E', cls: 'external' }
};

const iconPaths = {
  iOS: 'M447.1 332.7C446.9 296 463.5 268.3 497.1 247.9C478.3 221 449.9 206.2 412.4 203.3C376.9 200.5 338.1 224 323.9 224C308.9 224 274.5 204.3 247.5 204.3C191.7 205.2 132.4 248.8 132.4 337.5C132.4 363.7 137.2 390.8 146.8 418.7C159.6 455.4 205.8 545.4 254 543.9C279.2 543.3 297 526 329.8 526C361.6 526 378.1 543.9 406.2 543.9C454.8 543.2 496.6 461.4 508.8 424.6C443.6 393.9 447.1 334.6 447.1 332.7zM390.5 168.5C417.8 136.1 415.3 106.6 414.5 96C390.4 97.4 362.5 112.4 346.6 130.9C329.1 150.7 318.8 175.2 321 202.8C347.1 204.8 370.9 191.4 390.5 168.5z',
  Windows: 'M96 96L310.6 96L310.6 310.6L96 310.6L96 96zM329.4 96L544 96L544 310.6L329.4 310.6L329.4 96zM96 329.4L310.6 329.4L310.6 544L96 544L96 329.4zM329.4 329.4L544 329.4L544 544L329.4 544L329.4 329.4z',
  Android: 'M452.5 317.9C465.8 317.9 476.5 328.6 476.5 341.9C476.5 355.2 465.8 365.9 452.5 365.9C439.2 365.9 428.5 355.2 428.5 341.9C428.5 328.6 439.2 317.9 452.5 317.9zM187.4 317.9C200.7 317.9 211.4 328.6 211.4 341.9C211.4 355.2 200.7 365.9 187.4 365.9C174.1 365.9 163.4 355.2 163.4 341.9C163.4 328.6 174.1 317.9 187.4 317.9zM461.1 221.4L509 138.4C509.8 137.3 510.3 136 510.5 134.6C510.7 133.2 510.7 131.9 510.4 130.5C510.1 129.1 509.5 127.9 508.7 126.8C507.9 125.7 506.9 124.8 505.7 124.1C504.5 123.4 503.2 123 501.8 122.8C500.4 122.6 499.1 122.8 497.8 123.2C496.5 123.6 495.3 124.3 494.2 125.1C493.1 125.9 492.3 127.1 491.7 128.3L443.2 212.4C404.4 195 362.4 186 319.9 186C277.4 186 235.4 195 196.6 212.4L148.2 128.4C147.6 127.2 146.7 126.1 145.7 125.2C144.7 124.3 143.4 123.7 142.1 123.3C140.8 122.9 139.4 122.8 138.1 122.9C136.8 123 135.4 123.5 134.2 124.2C133 124.9 132 125.8 131.2 126.9C130.4 128 129.8 129.3 129.5 130.6C129.2 131.9 129.2 133.3 129.4 134.7C129.6 136.1 130.2 137.3 130.9 138.5L178.8 221.5C96.5 266.2 40.2 349.5 32 448L608 448C599.8 349.5 543.5 266.2 461.1 221.4z',
  macOS: 'M128 96C92.7 96 64 124.7 64 160L64 400L128 400L128 160L512 160L512 400L576 400L576 160C576 124.7 547.3 96 512 96L128 96zM19.2 448C8.6 448 0 456.6 0 467.2C0 509.6 34.4 544 76.8 544L563.2 544C605.6 544 640 509.6 640 467.2C640 456.6 631.4 448 620.8 448L19.2 448z',
  warning: 'M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.8 536.6 69.6 524.5C62.4 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 416C302.3 416 288 430.3 288 448C288 465.7 302.3 480 320 480C337.7 480 352 465.7 352 448C352 430.3 337.7 416 320 416zM320 224C301.8 224 287.3 239.5 288.6 257.7L296 361.7C296.9 374.2 307.4 384 319.9 384C332.5 384 342.9 374.3 343.8 361.7L351.2 257.7C352.5 239.5 338.1 224 319.8 224z',
  trending: 'M416 224C398.3 224 384 209.7 384 192C384 174.3 398.3 160 416 160L576 160C593.7 160 608 174.3 608 192L608 352C608 369.7 593.7 384 576 384C558.3 384 544 369.7 544 352L544 269.3L374.6 438.7C362.1 451.2 341.8 451.2 329.3 438.7L224 333.3L86.6 470.6C74.1 483.1 53.8 483.1 41.3 470.6C28.8 458.1 28.8 437.8 41.3 425.3L201.3 265.3C213.8 252.8 234.1 252.8 246.6 265.3L352 370.7L498.7 224L416 224z'
};

function getIconSvg(key, extraClass = '') {
  const path = iconPaths[key];
  if (!path) return '';
  return `<svg class="icon-svg ${extraClass}" viewBox="0 0 640 640" aria-hidden="true" focusable="false"><path d="${path}"/></svg>`;
}

function createTagSymbols(product) {
  const wrap = document.createElement('div');
  wrap.className = 'tag-symbols';

  const uniqueTags = [...new Set(product.tags || [])];
  uniqueTags.forEach(tag => {
    const config = tagSymbolMap[tag];
    if (!config) return;
    const marker = document.createElement('span');
    marker.className = `legend-icon ${config.cls}`;
    marker.innerHTML = config.isIcon ? getIconSvg(config.symbol, 'legend-svg') : config.symbol;
    marker.title = tag;
    marker.setAttribute('aria-label', tag);
    wrap.appendChild(marker);
  });

  return wrap;
}

const platformIconMap = {
  Windows: getIconSvg('Windows', 'platform-svg'),
  macOS: getIconSvg('macOS', 'platform-svg'),
  Android: getIconSvg('Android', 'platform-svg'),
  iOS: getIconSvg('iOS', 'platform-svg')
};

function createPlatformChips(platforms) {
  const wrap = document.createElement('div');
  wrap.className = 'platform-chips';

  (platforms || []).forEach(platform => {
    const chip = document.createElement('span');
    chip.className = 'platform-chip';
    chip.innerHTML = `<span class="platform-logo">${platformIconMap[platform] || '•'}</span><span>${escapeHtml(platform)}</span>`;
    wrap.appendChild(chip);
  });

  return wrap;
}

function createProductCard(product, index) {
  const card = document.createElement('article');
  card.className = 'card';
  if (product.featured) card.classList.add('featured-card');
  card.setAttribute('data-index', index);

  const body = document.createElement('div');
  body.className = 'card-body';

  const header = document.createElement('div');
  header.className = 'card-header';

  const left = document.createElement('div');
  left.className = 'card-header-left';

  const name = document.createElement('div');
  name.className = 'product-name';
  name.textContent = product.name;

  left.appendChild(name);
  const right = document.createElement('div');
  right.className = 'card-header-right';

  const sunc = document.createElement('div');
  sunc.className = 'sunc';
  sunc.textContent = `sUNC ${product.sunc}%`;

  right.appendChild(sunc);
  right.appendChild(createTagSymbols(product));

  header.appendChild(left);
  header.appendChild(right);

  const platformChips = createPlatformChips(product.platform);

  const summary = document.createElement('p');
  summary.className = 'summary';
  summary.textContent = product.description;

  const price = document.createElement('div');
  price.className = 'price';
  price.textContent = formatCostDisplay(product.costDisplay);

  body.appendChild(header);
  body.appendChild(platformChips);
  body.appendChild(summary);
  body.appendChild(price);

  const infoBtn = document.createElement('button');
  infoBtn.className = 'info-btn';
  infoBtn.textContent = 'More Info';
  infoBtn.addEventListener('click', () => openModal(product));

  card.appendChild(body);
  card.appendChild(infoBtn);

  return card;
}

function sortFeaturedFirst(list) {
  return [...list].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

function renderProducts(list) {
  const grid = qs('#productGrid');
  const orderedProducts = sortFeaturedFirst(list);
  grid.innerHTML = '';
  if (orderedProducts.length === 0) {
    qs('#noResults').hidden = false;
    return;
  }
  qs('#noResults').hidden = true;

  orderedProducts.forEach((p, i) => grid.appendChild(createProductCard(p, i)));
}

function getActiveFilters() {
  const filterInputs = qsa('.filter-checkbox');
  const active = {};
  filterInputs.forEach(input => {
    if (!input.checked) return;
    const group = input.getAttribute('data-filter-group');
    if (!active[group]) active[group] = [];
    active[group].push(input.value);
  });
  return active;
}

function getPriceControls() {
  return {
    free: qs('#priceFree').checked,
    paid: qs('#pricePaid').checked,
    both: qs('#priceBoth').checked
  };
}

function isPriceMatch(prod, priceControls) {
  const costDisplay = (prod.costDisplay || 'paid').toLowerCase();
  const selectedFilters = [priceControls.free, priceControls.paid, priceControls.both].filter(Boolean).length;

  if (!selectedFilters) return true;

  if (priceControls.both && costDisplay === 'both') return true;
  if (priceControls.free && costDisplay === 'free') return true;
  if (priceControls.paid && costDisplay === 'paid') return true;

  return false;
}

function formatCostDisplay(costDisplay) {
  const normalized = String(costDisplay || 'paid').toLowerCase();
  if (normalized === 'free') return 'Free';
  if (normalized === 'both') return 'Free + Paid';
  return 'Paid';
}

function applyAllFilters() {
  const active = getActiveFilters();
  const priceControls = getPriceControls();
  const searchText = qs('#searchInput').value.trim().toLowerCase();

  const filtered = products.filter(prod => {
    if (searchText && !prod.name.toLowerCase().includes(searchText)) return false;

    if (active.platform && active.platform.length) {
      const productPlatforms = prod.platform || [];
      const matchesAllPlatforms = active.platform.every(platform => productPlatforms.includes(platform));
      if (!matchesAllPlatforms) return false;
    }

    if (active.tags && active.tags.length) {
      const productTags = [...(prod.tags || []), ...(prod.features || [])];
      const matchesAllTags = active.tags.every(tag => productTags.includes(tag));
      if (!matchesAllTags) return false;
    }

    if (active.cheatType && active.cheatType.length) {
      if (!active.cheatType.includes(prod.cheatType)) return false;
    }

    if (active.keySystem && active.keySystem.length) {
      if (!active.keySystem.includes(prod.keySystem)) return false;
    }

    if (!isPriceMatch(prod, priceControls)) return false;

    return true;
  });

  renderProducts(filtered);
}

function openModal(product) {
  const overlay = qs('#modalOverlay');
  const content = qs('#modalContent');
  overlay.setAttribute('aria-hidden', 'false');

  content.innerHTML = `
    <h2>${escapeHtml(product.name)}</h2>
    <div class="modal-layout">
      <div>
        <div class="modal-section">
          <strong>Description</strong>
          <p>${escapeHtml(product.description)}</p>
        </div>

        <div class="modal-section">
          <strong>Pros</strong>
          <ul>${product.pros.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
        </div>

        <div class="modal-section">
          <strong>Cons</strong>
          <ul>${product.cons.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
        </div>

        <div class="modal-section">
          <strong>Pricing</strong>
          <ul>${product.pricingOptions.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </div>

        <div class="modal-section">
          <strong>Platform</strong>
          <div class="platform-chips">${product.platform.map(platform => `<span class="platform-chip"><span class="platform-logo">${platformIconMap[platform] || '•'}</span><span>${escapeHtml(platform)}</span></span>`).join('')}</div>
        </div>
      </div>

      <aside class="status-panel">
        <h3>Status</h3>
        <div class="status-item"><span>Stability</span><strong>${escapeHtml(product.stability)}</strong></div>
        <div class="status-item"><span>Trust Level</span><strong>${escapeHtml(product.trustLevel)}</strong></div>
        <div class="status-item"><span>Current State</span><strong>${escapeHtml(product.status)}</strong></div>
      </aside>
    </div>
  `;

  qs('#modalCloseBtn').focus();
}

function closeModal() {
  qs('#modalOverlay').setAttribute('aria-hidden', 'true');
  qs('#modalContent').innerHTML = '';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function updateSearchClearButton() {
  const input = qs('#searchInput');
  const clearBtn = qs('#clearSearchBtn');
  if (!input || !clearBtn) return;
  const hasValue = input.value.trim().length > 0;
  clearBtn.hidden = input.disabled || !hasValue;
}

function renderTierList(containerId, entries) {
  const wrap = qs(`#${containerId}`);
  if (!wrap) return;

  wrap.innerHTML = entries.map(entry => `
    <article class="rank-item rank-tier-${escapeHtml(String(entry.tier || '').toLowerCase())}">
      <div class="rank-badge">${escapeHtml(entry.tier)}</div>
      <div>
        <h4>${escapeHtml(entry.executor)}</h4>
        <p>${escapeHtml(entry.notes)}</p>
      </div>
    </article>
  `).join('');
}

function renderPopularScripts() {
  const wrap = qs('#popularScriptsList');
  if (!wrap) return;

  wrap.innerHTML = scriptsHubData.popularScripts.map(item => `
    <article class="script-card">
      <div class="script-card-head">
        <h4>${escapeHtml(item.name)}</h4>
        <span>${escapeHtml(item.game)}</span>
      </div>
      <p>${escapeHtml(item.description)}</p>
      <pre>${escapeHtml(item.script)}</pre>
    </article>
  `).join('');
}

function renderRecentChanges() {
  const wrap = qs('#recentChangesList');
  if (!wrap) return;

  wrap.innerHTML = scriptsHubData.recentChanges.map(item => `
    <article class="change-item">
      <strong>${escapeHtml(item.date)}</strong>
      <p>${escapeHtml(item.summary)}</p>
    </article>
  `).join('');
}

const savedScriptsStorageKey = 'voxlis_saved_scripts';
let currentSavedScriptId = null;

function getSavedScripts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(savedScriptsStorageKey) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeSavedScripts(items) {
  localStorage.setItem(savedScriptsStorageKey, JSON.stringify(items));
}

function renderSavedScriptsList() {
  const wrap = qs('#savedScriptsList');
  if (!wrap) return;

  const items = getSavedScripts();
  if (!items.length) {
    wrap.innerHTML = '<p class="saved-empty">No saved scripts yet.</p>';
    return;
  }

  wrap.innerHTML = items.map(item => `
    <button class="saved-script-item ${item.id === currentSavedScriptId ? 'is-active' : ''}" data-saved-script-id="${escapeHtml(item.id)}" type="button">
      <strong>${escapeHtml(item.title)}</strong>
      <span>${new Date(item.updatedAt).toLocaleString()}</span>
    </button>
  `).join('');
}

function clearSavedScriptEditor() {
  const nameInput = qs('#savedScriptName');
  const bodyInput = qs('#savedScriptBody');
  if (!nameInput || !bodyInput) return;
  nameInput.value = '';
  bodyInput.value = '';
}

function setEditorFromSavedScript(item) {
  const nameInput = qs('#savedScriptName');
  const bodyInput = qs('#savedScriptBody');
  if (!nameInput || !bodyInput) return;

  if (!item) {
    clearSavedScriptEditor();
    return;
  }

  nameInput.value = item.title || '';
  bodyInput.value = item.body || '';
}

function setSavedScriptError(message = '') {
  const errorEl = qs('#savedScriptError');
  if (!errorEl) return;
  errorEl.textContent = message;
}

function saveScriptFromEditor() {
  const nameInput = qs('#savedScriptName');
  const bodyInput = qs('#savedScriptBody');
  if (!nameInput || !bodyInput) return;

  const trimmedTitle = nameInput.value.trim();
  const body = bodyInput.value.trim();

  if (!trimmedTitle || !body) {
    setSavedScriptError('A script title and script content are both required.');
    return;
  }

  const items = getSavedScripts();
  const scriptToPersist = {
    id: `script_${Date.now()}`,
    title: trimmedTitle,
    body,
    updatedAt: Date.now()
  };

  if (currentSavedScriptId) {
    const existingIndex = items.findIndex(item => item.id === currentSavedScriptId);
    if (existingIndex !== -1) {
      scriptToPersist.id = items[existingIndex].id;
      items.splice(existingIndex, 1);
    }
  }

  items.unshift(scriptToPersist);
  writeSavedScripts(items);

  currentSavedScriptId = null;
  clearSavedScriptEditor();
  setSavedScriptError('');
  renderSavedScriptsList();
  nameInput.focus();
}

function deleteSelectedSavedScript() {
  if (!currentSavedScriptId) {
    setSavedScriptError('Select a saved script to delete it.');
    return;
  }

  const items = getSavedScripts();
  const remainingItems = items.filter(item => item.id !== currentSavedScriptId);

  if (remainingItems.length === items.length) {
    setSavedScriptError('Selected script could not be found.');
    return;
  }

  writeSavedScripts(remainingItems);
  currentSavedScriptId = null;
  clearSavedScriptEditor();
  setSavedScriptError('');
  renderSavedScriptsList();
}

function setActivePage(targetPageId) {
  qsa('.app-page').forEach(page => {
    const active = page.id === targetPageId;
    page.hidden = !active;
    page.classList.toggle('is-active', active);
  });

  const onNonExecutorPage = targetPageId !== 'executorsPage';
  qs('#sidebar').hidden = onNonExecutorPage;
  qs('#searchInput').disabled = onNonExecutorPage;
  qs('#clearSearchBtn').disabled = onNonExecutorPage;
  updateSearchClearButton();
  qs('.page-layout').classList.toggle('scripts-mode', onNonExecutorPage);
}

function initScriptsHub() {
  renderTierList('tierPaidList', scriptsHubData.tierListPaid);
  renderTierList('tierFreeList', scriptsHubData.tierListFree);
  renderPopularScripts();
  renderRecentChanges();

  renderSavedScriptsList();
  clearSavedScriptEditor();

  qsa('.subtab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-subtab-target');
      qsa('.subtab-btn').forEach(item => {
        const active = item === btn;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      qsa('.subtab-panel').forEach(panel => {
        panel.hidden = panel.id !== target;
      });
    });
  });

  qsa('.page-switch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-page-target');
      qsa('.page-switch-btn').forEach(item => item.classList.toggle('is-active', item === btn));
      setActivePage(target);
    });
  });

  const activePageBtn = qs('.page-switch-btn.is-active');
  setActivePage(activePageBtn?.getAttribute('data-page-target') || 'executorsPage');

  qs('#savedScriptsList').addEventListener('click', event => {
    const trigger = event.target.closest('[data-saved-script-id]');
    if (!trigger) return;
    currentSavedScriptId = trigger.getAttribute('data-saved-script-id');
    const selected = getSavedScripts().find(item => item.id === currentSavedScriptId);
    setEditorFromSavedScript(selected);
    setSavedScriptError('');
    renderSavedScriptsList();
  });

  qs('#saveScriptBtn').addEventListener('click', saveScriptFromEditor);
  qs('#deleteScriptBtn').addEventListener('click', deleteSelectedSavedScript);
}

function init() {
  renderProducts(products);
  initScriptsHub();
  updateSearchClearButton();

  qs('#searchInput').addEventListener('input', () => {
    applyAllFilters();
    updateSearchClearButton();
  });
  qs('#searchInput').addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    if (qs('#searchInput').value === 'XYREX') {
      event.preventDefault();
      setActivePage('xyrexPage');
      qsa('.page-switch-btn').forEach(item => item.classList.remove('is-active'));
    }
  });
  qs('#clearSearchBtn').addEventListener('click', () => {
    qs('#searchInput').value = '';
    applyAllFilters();
    updateSearchClearButton();
  });

  qsa('.filter-checkbox').forEach(cb => cb.addEventListener('change', applyAllFilters));
  qsa('.price-checkbox').forEach(cb => cb.addEventListener('change', applyAllFilters));

  qs('#resetFilters').addEventListener('click', () => {
    qsa('.filter-checkbox').forEach(cb => (cb.checked = false));
    qsa('.price-checkbox').forEach(cb => (cb.checked = false));
    qs('#searchInput').value = '';
    applyAllFilters();
    updateSearchClearButton();
  });

  qs('#modalCloseBtn').addEventListener('click', closeModal);
  qs('#modalOverlay').addEventListener('click', (e) => {
    if (e.target === qs('#modalOverlay')) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  qs('#productGrid').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.matches('.info-btn')) {
      e.target.click();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
