(function () {
  // Apply URL comes from src/site.js at build time.
  var APPLY = window.CP_APPLY_URL;
  if (APPLY) document.querySelectorAll('[data-apply]').forEach(function (a) { a.setAttribute('href', APPLY); });

  // --- mobile menu -----------------------------------------------------------
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');
  var mq = window.matchMedia('(max-width: 1100px)');

  // --- transparent header over full-bleed heroes ---------------------------------
  var bleed = document.body.classList.contains('has-bleed');
  var menuOpen = false;
  function updateHeader() {
    if (!bleed) return;
    document.body.classList.toggle('hdr-clear', window.scrollY <= 24 && !menuOpen);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });

  function setMenu(open) {
    menuOpen = open;
    updateHeader();
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector('a').focus();
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (menu.hidden) return;
      if (e.key === 'Escape') { setMenu(false); toggle.focus(); return; }
      if (e.key === 'Tab') {
        // focus trap across toggle + menu links
        var items = [toggle].concat([].slice.call(menu.querySelectorAll('a')));
        var i = items.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
        else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
      }
    });
    mq.addEventListener('change', function (e) { if (!e.matches && !menu.hidden) setMenu(false); });
  }

  // --- desktop dropdown (hover/focus handled in CSS; button handles tap + keyboard) ---
  document.querySelectorAll('.has-sub').forEach(function (li) {
    var btn = li.querySelector('.sub-toggle');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  function closeSubs() {
    document.querySelectorAll('.has-sub.open').forEach(function (li) {
      li.classList.remove('open');
      li.querySelector('.sub-toggle').setAttribute('aria-expanded', 'false');
    });
  }
  document.addEventListener('click', closeSubs);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSubs(); });

  // --- FAQ accordion (one open at a time) ------------------------------------
  document.querySelectorAll('[data-faq]').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('.faq-q');
      if (!btn) return;
      var item = btn.closest('.faq-item');
      var willOpen = btn.getAttribute('aria-expanded') !== 'true';
      group.querySelectorAll('.faq-item').forEach(function (it) {
        it.classList.remove('open');
        it.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (willOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
})();
