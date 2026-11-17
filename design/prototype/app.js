/* Electronics prototype — interactive layer */
(function () {
  'use strict';

  const GLYPHS = { resistor: '⏻', capacitor: ' (', connector: ' (', cable: ' (', switch: ' (', sensor: ' (', mcu: ' (', tool: ' (', enclosure: ' (', fastener: ' (', led: ' (', diode: ' (', transistor: ' (', relay: ' (', fuse: ' (', battery: ' (', motor: ' (', display: ' (', antenna: ' (', misc: ' ( ' };

  const PRODUCTS = [
    { id: 'r1', name: 'Carbon Film Resistor 10kΩ 1/4W', partno: 'CF-10K-025', cat: 'Resistors', price: 0.08, stock: 'in', qty: 5000, specs: '10kΩ · 1/4W · ±5% · Axial', glyph: '⏻' },
    { id: 'r2', name: 'Metal Film Resistor 1kΩ 1/8W', partno: 'MF-1K0-0125', cat: 'Resistors', price: 0.12, stock: 'in', qty: 3200, specs: '1kΩ · 1/8W · ±1% · Axial', glyph: '⏻' },
    { id: 'c1', name: 'Ceramic Capacitor 100nF 50V', partno: 'CC-100N-50', cat: 'Capacitors', price: 0.05, stock: 'in', qty: 8000, specs: '100nF · 50V · X7R · 0805 SMD', glyph: ' ( ' },
    { id: 'c2', name: 'Electrolytic Capacitor 100µF 25V', partno: 'EC-100U-25', cat: 'Capacitors', price: 0.35, stock: 'low', qty: 120, specs: '100µF · 25V · Radial · 6.3×11mm', glyph: ' ( ' },
    { id: 'con1', name: 'JST-PH 2-pin Connector (10pcs)', partno: 'JST-PH2-10', cat: 'Connectors', price: 1.20, stock: 'in', qty: 450, specs: '2.0mm pitch · Wire-to-board', glyph: ' ( ' },
    { id: 'con2', name: 'USB-C Receptacle SMD', partno: 'USBC-RCPT-SMD', cat: 'Connectors', price: 0.85, stock: 'in', qty: 900, specs: 'USB 2.0 · 16-pin · SMD', glyph: ' ( ' },
    { id: 'sw1', name: 'Tactile Push Button 6×6mm', partno: 'TACT-6MM', cat: 'Switches', price: 0.15, stock: 'in', qty: 2000, specs: '6×6mm · 4-pin · Through-hole', glyph: ' ( ' },
    { id: 'sw2', name: 'Slide Switch SPDT', partno: 'SLIDE-SPDT', cat: 'Switches', price: 0.45, stock: 'out', qty: 0, specs: 'SPDT · 3-pin · Through-hole', glyph: ' ( ' },
    { id: 'sen1', name: 'DHT22 Temp/Humidity Sensor', partno: 'DHT22-MOD', cat: 'Sensors', price: 4.50, stock: 'in', qty: 180, specs: '−40~80°C · 0~100% RH · Digital', glyph: ' ( ' },
    { id: 'mcu1', name: 'ESP32-WROOM-32 Module', partno: 'ESP32-WROOM-32', cat: 'Microcontrollers', price: 3.20, stock: 'in', qty: 260, specs: 'Wi-Fi + BT · 4MB Flash · 38-pin', glyph: ' ( ' },
    { id: 'mcu2', name: 'Arduino Nano (ATmega328P)', partno: 'ARD-NANO-328', cat: 'Microcontrollers', price: 8.90, stock: 'in', qty: 95, specs: 'ATmega328P · 16MHz · USB Mini-B', glyph: ' ( ' },
    { id: 'led1', name: '5mm LED Red Diffused (100pcs)', partno: 'LED-5MM-RED-100', cat: 'LEDs', price: 2.80, stock: 'in', qty: 300, specs: '5mm · Red · 20mA · 100pcs', glyph: ' ( ' },
    { id: 'cbl1', name: 'Jumper Wire M-M 20cm (40pcs)', partno: 'JW-MM-20-40', cat: 'Cables', price: 2.10, stock: 'in', qty: 500, specs: 'M-M · 20cm · 40pcs · Dupont', glyph: ' ( ' },
    { id: 'enc1', name: 'ABS Enclosure 85×58×33mm', partno: 'ENC-ABS-8558', cat: 'Enclosures', price: 1.95, stock: 'low', qty: 40, specs: 'ABS · IP54 · 85×58×33mm', glyph: ' ( ' },
    { id: 'fst1', name: 'M3 Brass Standoff (20pcs)', partno: 'STANDOFF-M3-20', cat: 'Fasteners', price: 3.40, stock: 'in', qty: 220, specs: 'M3 · 10mm · Brass · 20pcs', glyph: ' ( ' },
    { id: 'fuse1', name: 'Glass Fuse 5×20 2A (10pcs)', partno: 'FUSE-5x20-2A', cat: 'Fuses', price: 1.10, stock: 'in', qty: 600, specs: '5×20mm · 2A · Fast-blow', glyph: ' ( ' }
  ];

  const CATEGORIES = ['Resistors','Capacitors','Connectors','Switches','Sensors','Microcontrollers','LEDs','Cables','Enclosures','Fasteners','Fuses','Tools'];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const CART_KEY = 'volt_cart';
  function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
  function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartCount(); renderCartDrawer(); }
  function seedCart() {
    if (localStorage.getItem(CART_KEY)) return;
    localStorage.setItem(CART_KEY, JSON.stringify([
      { key: 'mcu1|{}', id: 'mcu1', qty: 2, variant: {} },
      { key: 'r1|{}', id: 'r1', qty: 100, variant: {} },
      { key: 'con1|{}', id: 'con1', qty: 1, variant: {} }
    ]));
  }
  seedCart();

  function addToCart(id, qty = 1, variant = {}) {
    const cart = getCart();
    const key = id + '|' + JSON.stringify(variant);
    const existing = cart.find(i => i.key === key);
    if (existing) existing.qty += qty; else cart.push({ key, id, qty, variant });
    saveCart(cart);
    showToast('Added to cart', 'success');
    openCartDrawer();
  }
  function updateQty(key, delta) {
    const cart = getCart();
    const item = cart.find(i => i.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
    saveCart(cart);
    renderCartPage();
  }
  function removeItem(key) { saveCart(getCart().filter(i => i.key !== key)); renderCartPage(); showToast('Removed'); }
  function cartTotal() { return getCart().reduce((s, i) => { const p = PRODUCTS.find(x => x.id === i.id); return s + (p ? p.price * i.qty : 0); }, 0); }
  function cartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }

  function updateCartCount() { $$('.cart-count').forEach(el => { el.textContent = cartCount(); }); }

  /* Toast */
  function ensureToastContainer() {
    let c = $('.toast-container');
    if (!c) { c = document.createElement('div'); c.className = 'toast-container'; document.body.appendChild(c); }
    return c;
  }
  function showToast(msg, type = '') {
    const c = ensureToastContainer();
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 300ms'; setTimeout(() => t.remove(), 300); }, 2200);
  }

  /* Cart drawer */
  function buildCartDrawer() {
    if ($('.cart-drawer')) return;
    const overlay = document.createElement('div'); overlay.className = 'cart-drawer-overlay'; overlay.addEventListener('click', closeCartDrawer);
    const drawer = document.createElement('div'); drawer.className = 'cart-drawer';
    drawer.innerHTML = `<header><h3>Your Cart</h3><button class="icon-btn" data-close-cart aria-label="Close">&times;</button></header>
      <div class="items"></div>
      <footer>
        <div class="summary-row total"><span>Total</span><span class="drawer-total">$0.00</span></div>
        <a href="cart.html" class="btn btn-primary" style="width:100%;margin-top:var(--sp-3);">View Cart & Checkout</a>
      </footer>`;
    document.body.appendChild(overlay); document.body.appendChild(drawer);
    drawer.querySelector('[data-close-cart]').addEventListener('click', closeCartDrawer);
  }
  function openCartDrawer() { buildCartDrawer(); $('.cart-drawer-overlay').classList.add('open'); $('.cart-drawer').classList.add('open'); renderCartDrawer(); }
  function closeCartDrawer() { $('.cart-drawer-overlay')?.classList.remove('open'); $('.cart-drawer')?.classList.remove('open'); }
  function renderCartDrawer() {
    const drawer = $('.cart-drawer'); if (!drawer) return;
    const items = drawer.querySelector('.items');
    const cart = getCart();
    if (!cart.length) { items.innerHTML = '<div class="empty">Your cart is empty.</div>'; }
    else {
      items.innerHTML = cart.map(i => {
        const p = PRODUCTS.find(x => x.id === i.id); if (!p) return '';
        return `<div class="item">
          <div class="img"><span class="glyph">${p.glyph}</span></div>
          <div>
            <div class="name">${p.name}</div>
            <div class="partno">${p.partno}</div>
            <div class="qty">
              <button data-delta="-1" data-key="${i.key}">-</button>
              <span>${i.qty}</span>
              <button data-delta="1" data-key="${i.key}">+</button>
            </div>
          </div>
          <div style="font-weight:600;font-size:var(--fs-body-s);">$${(p.price * i.qty).toFixed(2)}</div>
        </div>`;
      }).join('');
      items.querySelectorAll('[data-delta]').forEach(b => b.addEventListener('click', () => updateQty(b.dataset.key, parseInt(b.dataset.delta))));
    }
    const total = drawer.querySelector('.drawer-total'); if (total) total.textContent = '$' + cartTotal().toFixed(2);
  }

  /* Cart page */
  function renderCartPage() {
    const container = $('#cart-items-container'); if (!container) return;
    const cart = getCart();
    if (!cart.length) {
      container.innerHTML = '<div class="empty-state"><h3>Your cart is empty</h3><p>Browse parts to get started.</p><a href="shop.html" class="btn btn-primary" style="margin-top:var(--sp-3);">Browse Parts</a></div>';
    } else {
      container.innerHTML = cart.map(i => {
        const p = PRODUCTS.find(x => x.id === i.id); if (!p) return '';
        return `<div class="cart-item">
          <div class="img"><span class="glyph">${p.glyph}</span></div>
          <div>
            <div class="name">${p.name}</div>
            <div class="partno">${p.partno}</div>
            <div class="meta">${p.specs}</div>
            <div class="qty"><button data-delta="-1" data-key="${i.key}">-</button><span>${i.qty}</span><button data-delta="1" data-key="${i.key}">+</button></div>
          </div>
          <div class="price">
            <div>$${(p.price * i.qty).toFixed(2)}</div>
            <button class="btn-ghost" data-remove="${i.key}" style="font-size:var(--fs-caption);margin-top:var(--sp-2);">Remove</button>
          </div>
        </div>`;
      }).join('');
      container.querySelectorAll('[data-delta]').forEach(b => b.addEventListener('click', () => updateQty(b.dataset.key, parseInt(b.dataset.delta))));
      container.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => removeItem(b.dataset.remove)));
    }
    const totalEl = $('#cart-total'); if (totalEl) totalEl.textContent = '$' + cartTotal().toFixed(2);
    const subEl = $('#cart-subtotal'); if (subEl) subEl.textContent = '$' + cartTotal().toFixed(2);
  }

  /* Mobile menu */
  function buildMobileMenu() {
    if ($('.mobile-menu')) return;
    const overlay = document.createElement('div'); overlay.className = 'mobile-menu-overlay'; overlay.addEventListener('click', closeMobileMenu);
    const menu = document.createElement('div'); menu.className = 'mobile-menu';
    menu.innerHTML = CATEGORIES.map(c => `<a href="shop.html">${c}</a>`).join('') + `<a href="cart.html">Cart (${cartCount()})</a>`;
    document.body.appendChild(overlay); document.body.appendChild(menu);
  }
  function openMobileMenu() { buildMobileMenu(); $('.mobile-menu-overlay').classList.add('open'); $('.mobile-menu').classList.add('open'); }
  function closeMobileMenu() { $('.mobile-menu-overlay')?.classList.remove('open'); $('.mobile-menu')?.classList.remove('open'); }

  /* Search overlay */
  function buildSearch() {
    if ($('.search-overlay')) return;
    const overlay = document.createElement('div'); overlay.className = 'search-overlay';
    overlay.innerHTML = `<button class="search-close" aria-label="Close">&times;</button>
      <div class="search-box">
        <input type="text" placeholder="Search by part number or name..." aria-label="Search">
        <div class="results"></div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('.search-close').addEventListener('click', closeSearch);
    const input = overlay.querySelector('input');
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      const res = overlay.querySelector('.results');
      if (!q) { res.innerHTML = ''; return; }
      const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.partno.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q));
      res.innerHTML = matches.map(p => `
        <div class="result" data-id="${p.id}">
          <div class="img"><span class="glyph">${p.glyph}</span></div>
          <div>
            <div class="name">${p.name}</div>
            <div class="partno">${p.partno} · ${p.cat}</div>
          </div>
          <div class="price">$${p.price.toFixed(2)}</div>
        </div>`).join('') || '<div style="padding:var(--sp-4);color:var(--color-text-secondary);">No results</div>';
      res.querySelectorAll('.result').forEach(r => r.addEventListener('click', () => {
        const p = PRODUCTS.find(x => x.id === r.dataset.id);
        if (p) addToCart(p.id, 1);
        closeSearch();
      }));
    });
  }
  function openSearch() { buildSearch(); $('.search-overlay').classList.add('open'); setTimeout(() => $('.search-overlay input').focus(), 50); }
  function closeSearch() { $('.search-overlay')?.classList.remove('open'); }

  /* Quick view */
  function openQuickView(id) {
    const p = PRODUCTS.find(x => x.id === id); if (!p) return;
    let ov = $('.qv-overlay');
    if (!ov) { ov = document.createElement('div'); ov.className = 'qv-overlay'; document.body.appendChild(ov); }
    const stockColor = p.stock === 'in' ? 'var(--color-state-success)' : p.stock === 'low' ? 'var(--color-state-warning)' : 'var(--color-state-error)';
    const stockText = p.stock === 'in' ? 'In stock' : p.stock === 'low' ? 'Low stock' : 'Out of stock';
    ov.innerHTML = `
      <div class="qv-modal">
        <div class="img"><span class="glyph">${p.glyph}</span></div>
        <div class="info">
          <div class="partno">${p.partno}</div>
          <h2 style="font-family:var(--font-display);font-size:var(--fs-h2);margin:var(--sp-1) 0 var(--sp-2);">${p.name}</h2>
          <div style="font-size:var(--fs-h3);font-weight:600;margin-bottom:var(--sp-2);">$${p.price.toFixed(2)}</div>
          <div style="color:${stockColor};font-weight:600;font-size:var(--fs-body-s);margin-bottom:var(--sp-3);">${stockText} · ${p.qty} available</div>
          <p style="color:var(--color-text-secondary);font-size:var(--fs-body-s);margin-bottom:var(--sp-4);">${p.specs}</p>
          <div style="display:flex;gap:var(--sp-2);align-items:center;margin-bottom:var(--sp-4);">
            <div class="qty" style="display:inline-flex;border:1px solid var(--color-border-strong);border-radius:var(--radius-sm);">
              <button id="qv-dec">-</button><span id="qv-qty">1</span><button id="qv-inc">+</button>
            </div>
            <button class="btn btn-primary" style="flex:1;" data-qv-add="${p.id}">Add to Cart</button>
          </div>
        </div>
      </div>
      <button class="qv-close" aria-label="Close">&times;</button>`;
    ov.classList.add('open');
    let q = 1;
    const qtyEl = ov.querySelector('#qv-qty');
    ov.querySelector('#qv-inc').addEventListener('click', () => { q++; qtyEl.textContent = q; });
    ov.querySelector('#qv-dec').addEventListener('click', () => { if (q > 1) { q--; qtyEl.textContent = q; } });
    ov.querySelector('.qv-close').addEventListener('click', () => ov.classList.remove('open'));
    ov.addEventListener('click', (e) => { if (e.target === ov) ov.classList.remove('open'); });
    ov.querySelector('[data-qv-add]').addEventListener('click', (e) => {
      addToCart(e.target.dataset.qvAdd, q);
      ov.classList.remove('open');
    });
  }

  /* PDP variant/qty */
  function initPDP() {
    let q = 1;
    const qtyEl = $('#pdp-qty');
    $('#pdp-inc')?.addEventListener('click', () => { q++; if (qtyEl) qtyEl.textContent = q; });
    $('#pdp-dec')?.addEventListener('click', () => { if (q > 1) { q--; if (qtyEl) qtyEl.textContent = q; } });
    const addBtn = document.querySelector('[data-pdp-add]');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        addToCart(addBtn.dataset.pdpAdd || 'mcu1', q);
      });
    }
    $$('.pdp-gallery .thumbs div').forEach((t, i) => {
      t.addEventListener('click', () => {
        $$('.pdp-gallery .thumbs div').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
      });
    });
    if ($$('.pdp-gallery .thumbs div').length) $$('.pdp-gallery .thumbs div')[0].classList.add('active');
  }

  /* Reveal */
  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    $$('.reveal').forEach(el => io.observe(el));
  }

  /* Back to top */
  function initBackToTop() {
    let btn = $('.back-to-top');
    if (!btn) {
      btn = document.createElement('button'); btn.className = 'back-to-top'; btn.innerHTML = '&uarr;'; btn.setAttribute('aria-label', 'Back to top');
      document.body.appendChild(btn);
      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
    window.addEventListener('scroll', () => { btn.classList.toggle('show', window.scrollY > 400); });
  }

  /* Header wiring */
  function wireHeader() {
    $$('a[href="cart.html"].icon-btn, .icon-btn[aria-label="Cart"]').forEach(b => {
      b.addEventListener('click', (e) => { e.preventDefault(); openCartDrawer(); });
    });
    $$('button[aria-label="Search"], .icon-btn[aria-label="Search"]').forEach(b => b.addEventListener('click', (e) => { e.preventDefault(); openSearch(); }));
    $$('button[aria-label="Menu"]').forEach(b => b.addEventListener('click', (e) => { e.preventDefault(); openMobileMenu(); }));
    // search bar submit
    $$('.search-bar input').forEach(inp => {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); openSearch(); const so = $('.search-overlay'); if (so) { const i = so.querySelector('input'); if (i) { i.value = inp.value; i.dispatchEvent(new Event('input')); } } }
      });
    });
  }

  /* Add-to-cart wiring */
  function wireAddToCart() {
    $$('[data-add]').forEach(b => {
      b.addEventListener('click', (e) => { e.preventDefault(); addToCart(b.dataset.add, parseInt(b.dataset.qty || '1')); });
    });
    $$('.quick-view-btn').forEach(qv => {
      qv.addEventListener('click', (e) => { e.stopPropagation(); openQuickView(qv.dataset.qv); });
    });
  }

  /* Promo */
  function wirePromo() {
    const btn = document.querySelector('[data-promo]');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const input = document.querySelector('[data-promo-input]');
        const code = (input?.value || '').trim().toUpperCase();
        if (code === 'VOLT10') showToast('Promo applied: 10% off', 'success');
        else showToast('Invalid promo code', 'error');
      });
    }
  }

  /* Render product grid helper for pages that use data-product-grid */
  function renderProductGrids() {
    $$('[data-product-grid]').forEach(grid => {
      const filter = grid.dataset.productGrid;
      const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
      grid.innerHTML = list.map(p => {
        const stockColor = p.stock === 'in' ? 'var(--color-state-success)' : p.stock === 'low' ? 'var(--color-state-warning)' : 'var(--color-state-error)';
        const stockText = p.stock === 'in' ? 'In stock' : p.stock === 'low' ? 'Low stock' : 'Out of stock';
        return `<article class="product-card">
          <div class="img-wrap"><span class="glyph">${p.glyph}</span></div>
          <div class="partno">${p.partno}</div>
          <div class="name">${p.name}</div>
          <div class="specs">${p.specs}</div>
          <div class="price-row">
            <div class="price">$${p.price.toFixed(2)} <span class="unit">/ ea</span></div>
            <div class="stock ${p.stock}" style="color:${stockColor};">${stockText}</div>
          </div>
          <div class="actions">
            <button class="btn btn-secondary btn-sm quick-view-btn" data-qv="${p.id}">Quick View</button>
            <button class="btn btn-primary btn-sm" data-add="${p.id}">Add</button>
          </div>
        </article>`;
      }).join('');
    });
    wireAddToCart();
  }

  function init() {
    buildCartDrawer(); updateCartCount(); renderCartDrawer(); renderCartPage();
    wireHeader(); wirePromo(); initPDP(); initReveal(); initBackToTop(); renderProductGrids();
    $$('form').forEach(f => {
      if (f.querySelector('input[type="email"]')) {
        f.addEventListener('submit', (e) => { e.preventDefault(); showToast('Subscribed. Thanks!', 'success'); f.reset(); });
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.Volt = { addToCart, openCartDrawer, openSearch, openQuickView, showToast, PRODUCTS, CATEGORIES };
})();
/* ===== Enhanced interactions ===== */
(function enhance() {
  // Scroll progress bar
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  function updateProgress() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    bar.style.width = (scrolled * 100) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Header shrink
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // Ripple effect on buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  // Hero particles
  const hero = document.querySelector('.hero-search');
  if (hero) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('span');
      p.className = 'hero-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = (Math.random() * 6) + 's';
      p.style.animationDuration = (4 + Math.random() * 4) + 's';
      hero.appendChild(p);
    }
  }

  // Cart badge pulse on update
  const origUpdate = window.Volt ? null : null;
  // monkey-patch updateCartCount by observing badge text changes
  const badges = document.querySelectorAll('.cart-count');
  const obs = new MutationObserver(() => {
    badges.forEach(b => {
      b.classList.remove('pulse');
      void b.offsetWidth;
      b.classList.add('pulse');
    });
  });
  badges.forEach(b => obs.observe(b, { childList: true, characterData: true, subtree: true }));

  // Smooth anchor scrolling already via css; add focus management for modals (basic)
  // Reveal on scroll already handled
})();
