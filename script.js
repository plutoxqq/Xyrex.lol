/* script.js
   Renders product cards, handles search/filters, and controls modal behavior.
   Product data remains array-of-objects.
*/

/* ================================
   PRODUCT DATA
   ================================
   To add a product:
    - Copy one object in the array and update fields.
    - Keep priceValue numeric for paid products and null for free/lifetime.
    - tags controls legend-style state symbols used on each card.
*/
const products = [
  {
    name: "Aether Decompiler",
    platform: ["Windows", "macOS"],
    cheatType: "Internal",
    keySystem: "Keyless",
    tags: ["Internal", "Trending", "Verified"],
    features: ["Decompiler", "Multi-instance"],
    sunc: 97,
    description: "Aether Decompiler is a performance-first executor toolkit focused on rapid reverse analysis and reliable multi-instance execution. It includes quick symbol recovery, plugin extensibility, and a streamlined setup flow for users who need fast iteration without sacrificing advanced controls.",
    pros: ["Fast startup and analysis pipeline", "Extensible plugin architecture", "Strong multi-instance stability"],
    cons: ["Minor UI lag on first launch", "Heuristics can over-flag edge cases"],
    pricingOptions: ["Weekly — $5.99", "Monthly — $17.99", "Lifetime — $69.99"],
    priceValue: 5.99,
    durationDays: 7,
    stability: "Very Stable",
    trustLevel: "High",
    status: "Undetected"
  },
  {
    name: "KernelForge",
    platform: ["Windows"],
    cheatType: "External",
    keySystem: "Keyed",
    tags: ["Kernel", "Verified", "External"],
    features: ["Kernel"],
    sunc: 88,
    description: "KernelForge delivers kernel-level tooling for advanced users who need deeper system interaction. Its driver stack includes fallback protections and validation checks designed to reduce risky misconfiguration during heavy operation sessions.",
    pros: ["Deep kernel integration", "Reliable fallback protections", "Strong control for advanced workflows"],
    cons: ["Driver signing workaround needed on some setups"],
    pricingOptions: ["Weekly — $8.99", "Monthly — $19.99", "Lifetime — $89.99"],
    priceValue: 19.99,
    durationDays: 30,
    stability: "Stable",
    trustLevel: "High",
    status: "Updating"
  },
  {
    name: "Nebula AI Runner",
    platform: ["Android", "iOS"],
    cheatType: "External",
    keySystem: "Keyless",
    tags: ["AI", "Supports VNG", "Warning"],
    features: ["Multi-instance", "Decompiler"],
    sunc: 92,
    description: "Nebula AI Runner blends AI-assisted pattern detection with automation controls for batch execution. It is built for mobile-first environments and offers optional cloud-backed services for syncing profiles and job presets.",
    pros: ["Great for large-batch automation", "AI-assisted detection workflows", "Cross-mobile platform support"],
    cons: ["Cloud synchronization can be region-dependent"],
    pricingOptions: ["Weekly — $4.99", "Monthly — $14.99", "Lifetime — $59.99"],
    priceValue: null,
    durationDays: null,
    stability: "Stable",
    trustLevel: "Medium",
    status: "Working"
  },
  {
    name: "MiniCore",
    platform: ["Windows", "Android"],
    cheatType: "Internal",
    keySystem: "Keyless",
    tags: ["Internal", "Supports VNG", "Trending"],
    features: ["Multi-instance"],
    sunc: 71,
    description: "MiniCore is a compact executor tuned for lower-end hardware and low-latency launch times. It prioritizes a minimal footprint while still supporting rapid multi-instance sessions for users who need lightweight performance.",
    pros: ["Low resource usage", "Fast spin-up for multi-instance runs"],
    cons: ["Reduced compatibility on older GPUs"],
    pricingOptions: ["Weekly — $3.99", "Monthly — $10.99", "Lifetime — $39.99"],
    priceValue: 3.99,
    durationDays: 3,
    stability: "Moderate",
    trustLevel: "Medium",
    status: "Detected"
  },
  {
    name: "Sigma Suite",
    platform: ["macOS"],
    cheatType: "External",
    keySystem: "Keyed",
    tags: ["Warning", "External"],
    features: [],
    sunc: 60,
    description: "Sigma Suite includes a broad utility bundle and configuration system, but it requires careful setup and regular maintenance to stay dependable. It is suited to experienced users willing to tune and monitor behavior closely.",
    pros: ["Broad utility set", "Flexible configuration options"],
    cons: ["Can conflict with antivirus software", "Setup complexity is higher than average"],
    pricingOptions: ["Weekly — $6.99", "Monthly — $12.00", "Lifetime — $49.99"],
    priceValue: 12.0,
    durationDays: 14,
    stability: "Unstable",
    trustLevel: "Low",
    status: "Discontinued"
  }
];

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
  Internal: { symbol: '⇄', cls: 'io' },
  External: { symbol: '⇄', cls: 'io' }
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
  card.setAttribute('data-index', index);

  const body = document.createElement('div');
  body.className = 'card-body';

  const header = document.createElement('div');
  header.className = 'card-header';

  const left = document.createElement('div');
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
  price.textContent = (product.pricingOptions && product.pricingOptions[0]) || '—';

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

function renderProducts(list) {
  const grid = qs('#productGrid');
  grid.innerHTML = '';
  if (list.length === 0) {
    qs('#noResults').hidden = false;
    return;
  }
  qs('#noResults').hidden = true;

  list.forEach((p, i) => grid.appendChild(createProductCard(p, i)));
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
    paid: qs('#pricePaid').checked
  };
}

function isPriceMatch(prod, priceControls) {
  const isFree = prod.priceValue === null || prod.priceValue === 0;

  // Free + Paid unchecked means no price restriction.
  if (!priceControls.free && !priceControls.paid) return true;
  if (priceControls.free && isFree) return true;
  if (priceControls.paid && !isFree) return true;
  return false;
}

function applyAllFilters() {
  const active = getActiveFilters();
  const priceControls = getPriceControls();
  const searchText = qs('#searchInput').value.trim().toLowerCase();

  const filtered = products.filter(prod => {
    if (searchText && !prod.name.toLowerCase().includes(searchText)) return false;

    if (active.platform && active.platform.length) {
      if (!prod.platform.some(p => active.platform.includes(p))) return false;
    }

    if (active.tags && active.tags.length) {
      const matches = active.tags.some(t => (prod.tags || []).includes(t));
      if (!matches) return false;
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
          <strong>Compatibility</strong>
          <p class="small">Cheat Type: ${escapeHtml(product.cheatType)} • Key System: ${escapeHtml(product.keySystem)} • sUNC ${escapeHtml(product.sunc)}%</p>
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

function init() {
  renderProducts(products);

  qs('#searchInput').addEventListener('input', applyAllFilters);
  qs('#clearSearchBtn').addEventListener('click', () => {
    qs('#searchInput').value = '';
    applyAllFilters();
  });

  qsa('.filter-checkbox').forEach(cb => cb.addEventListener('change', applyAllFilters));
  qsa('.price-checkbox').forEach(cb => cb.addEventListener('change', applyAllFilters));

  qs('#resetFilters').addEventListener('click', () => {
    qsa('.filter-checkbox').forEach(cb => (cb.checked = false));
    qsa('.price-checkbox').forEach(cb => (cb.checked = false));
    qs('#searchInput').value = '';
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
