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
    - tagsDropdown controls the card's Tags dropdown list.
*/
const products = [
  {
    name: "Aether Decompiler",
    platform: ["Windows", "macOS"],
    cheatType: "Internal",
    keySystem: "Keyless",
    tags: ["Internal", "Trending"],
    // Add/remove Tags menu entries by editing this array only.
    tagsDropdown: ["Internal", "Trending", "Verified"],
    features: ["Decompiler", "Multi-instance"],
    sunc: 97,
    summary: "Lightweight decompiler with fast analysis and multi-instance support.",
    details: "Aether Decompiler offers symbol recovery, smart heuristics, and plugin support. Designed for performance on modern CPUs.",
    issues: ["Minor UI lag on initial load", "Some heuristics false-positive in corner cases"],
    price: "$5.99 • 7 days",
    priceValue: 5.99,
    durationDays: 7
  },
  {
    name: "KernelForge",
    platform: ["Windows"],
    cheatType: "External",
    keySystem: "Keyed",
    tags: ["Kernel", "Verified"],
    tagsDropdown: ["Kernel", "Verified", "External"],
    features: ["Kernel"],
    sunc: 88,
    summary: "Robust kernel-level hooking utilities for advanced tasks.",
    details: "KernelForge provides a secure kernel driver, with fallback and safety checks. Intended for advanced users.",
    issues: ["Requires driver signing workaround on some systems"],
    price: "$19.99 • 30 days",
    priceValue: 19.99,
    durationDays: 30
  },
  {
    name: "Nebula AI Runner",
    platform: ["Android", "iOS"],
    cheatType: "External",
    keySystem: "Keyless",
    tags: ["AI", "Supports VNG"],
    tagsDropdown: ["AI", "Supports VNG", "Warning"],
    features: ["Multi-instance", "Decompiler"],
    sunc: 92,
    summary: "AI-powered assistant for automated analysis and large-batch runs.",
    details: "Nebula uses advanced ML to detect patterns and accelerate workflows. Cloud-backed features available.",
    issues: ["Cloud sync occasionally slow in AU region"],
    price: "Lifetime",
    priceValue: null,
    durationDays: null
  },
  {
    name: "MiniCore",
    platform: ["Windows", "Android"],
    cheatType: "Internal",
    keySystem: "Keyless",
    tags: ["Internal", "Supports VNG"],
    tagsDropdown: ["Internal", "Supports VNG", "Trending"],
    features: ["Multi-instance"],
    sunc: 71,
    summary: "Compact executor focused on low-latency multi-instance runs.",
    details: "MiniCore is optimized for low footprint and quick spins of many instances.",
    issues: ["Some incompatibility with older GPUs"],
    price: "$3.99 • 3 days",
    priceValue: 3.99,
    durationDays: 3
  },
  {
    name: "Sigma Suite",
    platform: ["macOS"],
    cheatType: "External",
    keySystem: "Keyed",
    tags: ["Warning"],
    tagsDropdown: ["Warning", "External"],
    features: [],
    sunc: 60,
    summary: "A feature-rich suite — use caution; active maintenance required.",
    details: "Sigma Suite packs many tools but requires careful configuration and maintenance.",
    issues: ["Known to conflict with some antivirus", "Setup can be complex"],
    price: "$12.00 • 14 days",
    priceValue: 12.0,
    durationDays: 14
  }
];

const featureIconMap = {
  "Decompiler": "#icon-decompiler",
  "Multi-instance": "#icon-multi",
  "Kernel": "#icon-kernel"
};

const qs = sel => document.querySelector(sel);
const qsa = sel => Array.from(document.querySelectorAll(sel));

function createTagsDropdown(product) {
  const wrap = document.createElement('div');
  wrap.className = 'tag-dropdown';

  const toggle = document.createElement('button');
  toggle.className = 'tags-toggle';
  toggle.type = 'button';
  toggle.textContent = 'Tags';
  toggle.setAttribute('aria-expanded', 'false');

  const menu = document.createElement('ul');
  menu.className = 'tags-menu';

  const entries = Array.isArray(product.tagsDropdown) ? product.tagsDropdown : [];
  entries.forEach(tag => {
    const item = document.createElement('li');
    item.textContent = tag;
    menu.appendChild(item);
  });

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const willOpen = !wrap.classList.contains('open');
    qsa('.tag-dropdown.open').forEach(node => {
      node.classList.remove('open');
      const btn = node.querySelector('.tags-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });

    if (willOpen) {
      wrap.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  wrap.appendChild(toggle);
  wrap.appendChild(menu);
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

  const sunc = document.createElement('div');
  sunc.className = 'sunc';
  sunc.textContent = `sUNC ${product.sunc}%`;

  left.appendChild(name);
  left.appendChild(sunc);

  const tagsDropdown = createTagsDropdown(product);

  header.appendChild(left);
  header.appendChild(tagsDropdown);

  const featuresRow = document.createElement('div');
  featuresRow.className = 'features-row';

  product.features.forEach(f => {
    const ic = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    ic.setAttribute('class', 'feature-icon');
    ic.setAttribute('viewBox', '0 0 24 24');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', featureIconMap[f] || '#icon-info');
    ic.appendChild(use);
    ic.title = f;
    featuresRow.appendChild(ic);
  });

  const platformSmall = document.createElement('div');
  platformSmall.className = 'small';
  platformSmall.textContent = 'Platforms: ' + (product.platform.join(', ') || '—');

  const summary = document.createElement('p');
  summary.className = 'summary';
  summary.textContent = product.summary;

  const price = document.createElement('div');
  price.className = 'price';
  price.textContent = product.price || '—';

  body.appendChild(header);
  body.appendChild(featuresRow);
  body.appendChild(platformSmall);
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
      const combinedTags = [...(prod.tags || []), ...(prod.tagsDropdown || [])];
      const matches = active.tags.some(t => combinedTags.includes(t));
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
    <div class="modal-section">
      <strong>Summary</strong>
      <p>${escapeHtml(product.summary)}</p>
    </div>

    <div class="modal-section">
      <strong>Full description</strong>
      <p>${escapeHtml(product.details)}</p>
    </div>

    <div class="modal-section">
      <strong>Features</strong>
      <ul>${product.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
    </div>

    <div class="modal-section">
      <strong>Issues</strong>
      <ul>${product.issues.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
    </div>

    <div class="modal-section">
      <strong>Pricing</strong>
      <p>${escapeHtml(product.price)}</p>
    </div>

    <div class="modal-section">
      <strong>Metadata</strong>
      <p class="small">Platforms: ${product.platform.join(', ') || '—'} • Cheat: ${product.cheatType} • Key system: ${product.keySystem} • sUNC ${product.sunc}%</p>
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

  document.addEventListener('click', () => {
    qsa('.tag-dropdown.open').forEach(node => {
      node.classList.remove('open');
      const btn = node.querySelector('.tags-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      qsa('.tag-dropdown.open').forEach(node => node.classList.remove('open'));
    }
  });

  qs('#productGrid').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.matches('.info-btn')) {
      e.target.click();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
