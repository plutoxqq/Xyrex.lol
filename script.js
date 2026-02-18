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
  Warning: { symbol: '!', cls: 'warning' },
  Trending: { symbol: '↗', cls: 'trending' },
  Internal: { symbol: 'I', cls: 'internal' },
  External: { symbol: 'E', cls: 'external' }
};

function createTagSymbols(product) {
  const wrap = document.createElement('div');
  wrap.className = 'tag-symbols';

  const uniqueTags = [...new Set(product.tags || [])];
  uniqueTags.forEach(tag => {
    const config = tagSymbolMap[tag];
    if (!config) return;
    const marker = document.createElement('span');
    marker.className = `legend-icon ${config.cls}`;
    marker.textContent = config.symbol;
    marker.title = tag;
    marker.setAttribute('aria-label', tag);
    wrap.appendChild(marker);
  });

  return wrap;
}

const platformIconMap = {
  Windows: '🪟',
  macOS: '',
  Android: '🤖',
  iOS: ''
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
  const isFree = costDisplay === 'free' || costDisplay === 'both';
  const isPaid = costDisplay === 'paid' || costDisplay === 'both';
  const isBoth = costDisplay === 'both';

  // No price checkboxes selected means no restriction.
  if (!priceControls.free && !priceControls.paid && !priceControls.both) return true;

  let matches = false;
  if (priceControls.free && isFree) matches = true;
  if (priceControls.paid && isPaid) matches = true;
  if (priceControls.both && isBoth) matches = true;
  return matches;
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
      <strong>${escapeHtml(item.title || 'Untitled script')}</strong>
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

function saveScriptFromEditor() {
  const nameInput = qs('#savedScriptName');
  const bodyInput = qs('#savedScriptBody');
  if (!nameInput || !bodyInput) return;

  const trimmedTitle = nameInput.value.trim();
  const body = bodyInput.value;

  if (!trimmedTitle || !body.trim()) {
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
  renderSavedScriptsList();
  nameInput.focus();
}


function deleteSelectedScript() {
  if (!currentSavedScriptId) return;

  const items = getSavedScripts();
  const nextItems = items.filter(item => item.id !== currentSavedScriptId);
  writeSavedScripts(nextItems);

  currentSavedScriptId = null;
  clearSavedScriptEditor();
  renderSavedScriptsList();
}

function applyThemeColour(rawValue) {
  const probe = document.createElement('span');
  probe.style.color = '';
  probe.style.color = rawValue;
  if (!probe.style.color) return false;

  const cssColor = probe.style.color;
  document.documentElement.style.setProperty('--periwinkle', cssColor);
  document.documentElement.style.setProperty('--periwinkle-2', cssColor);
  localStorage.setItem('voxlis_theme_color', cssColor);
  return true;
}

function initThemeControls() {
  const panel = qs('#themePanel');
  const toggleBtn = qs('#themeToggleBtn');
  const customInput = qs('#customThemeColor');
  if (!panel || !toggleBtn || !customInput) return;

  const savedColor = localStorage.getItem('voxlis_theme_color');
  if (savedColor) applyThemeColour(savedColor);

  toggleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    panel.hidden = !panel.hidden;
  });

  panel.addEventListener('click', event => event.stopPropagation());

  qsa('.theme-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-theme-color');
      if (!value) return;
      applyThemeColour(value);
      panel.hidden = true;
    });
  });

  qs('#applyCustomThemeBtn').addEventListener('click', () => {
    const value = customInput.value.trim();
    if (!value) return;
    const isValid = applyThemeColour(value);
    if (!isValid) return;
    customInput.value = '';
    panel.hidden = true;
  });

  document.addEventListener('click', () => {
    panel.hidden = true;
  });
}

function setActivePage(targetPageId) {
  qsa('.app-page').forEach(page => {
    const active = page.id === targetPageId;
    page.hidden = !active;
    page.classList.toggle('is-active', active);
  });

  const onScriptsPage = targetPageId === 'scriptsPage';
  qs('#sidebar').hidden = onScriptsPage;
  qs('#searchInput').disabled = onScriptsPage;
  qs('#clearSearchBtn').disabled = onScriptsPage;
  qs('.page-layout').classList.toggle('scripts-mode', onScriptsPage);
}

function initScriptsHub() {
  renderTierList('tierPaidList', scriptsHubData.tierListPaid);
  renderTierList('tierFreeList', scriptsHubData.tierListFree);
  renderPopularScripts();

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
    renderSavedScriptsList();
  });

  qs('#saveScriptBtn').addEventListener('click', saveScriptFromEditor);
  qs('#deleteScriptBtn').addEventListener('click', deleteSelectedScript);
}

function init() {
  renderProducts(products);
  initScriptsHub();

  const searchInput = qs('#searchInput');
  const clearSearchBtn = qs('#clearSearchBtn');

  const syncClearButton = () => {
    clearSearchBtn.hidden = !searchInput.value.trim();
  };

  searchInput.addEventListener('input', () => {
    syncClearButton();
    applyAllFilters();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    syncClearButton();
    applyAllFilters();
  });

  syncClearButton();

  qsa('.filter-checkbox').forEach(cb => cb.addEventListener('change', applyAllFilters));
  qsa('.price-checkbox').forEach(cb => cb.addEventListener('change', applyAllFilters));

  initThemeControls();

  qs('#resetFilters').addEventListener('click', () => {
    qsa('.filter-checkbox').forEach(cb => (cb.checked = false));
    qsa('.price-checkbox').forEach(cb => (cb.checked = false));
    qs('#searchInput').value = '';
    qs('#clearSearchBtn').hidden = true;
    applyAllFilters();
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
