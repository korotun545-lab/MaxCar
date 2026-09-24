(function () {
  'use strict';

  /* ============================================================
     ДАННЫЕ УСЛУГ
     Список услуг — то, что реально предоставлено в брифе.
     Чтобы изменить список услуг, правьте только этот массив.
     ============================================================ */
  var SERVICES = [
    { title: 'Тормозные системы', icon: 'brake' },
    { title: 'Диагностика двигателей', icon: 'scan' },
    { title: 'Электричество', icon: 'bolt' },
    { title: 'Замена масла', icon: 'oil' },
    { title: 'Замена воздушных и салонных фильтров', icon: 'filter' },
    { title: 'Ремонт системы рулевого управления и подвески', icon: 'wheel' },
    { title: 'Ремонт коробок передач', icon: 'gear' },
    { title: 'Замена коробки передач', icon: 'gearSwap' },
    { title: 'Ремонт выхлопной системы автомобиля', icon: 'exhaust' },
    { title: 'Ремонт двигателей', icon: 'engine' }
  ];

  var ICONS = {
    brake: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="1.6"/>',
    scan: '<rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M7 15 9.5 9 12 14 14.5 8 17 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
    bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>',
    oil: '<path d="M8 3h8l2 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7l2-4Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M9 11h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    filter: '<rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    wheel: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M12 4v4M12 16v4M4 12h4M16 12h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    gear: '<circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.6"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    gearSwap: '<circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="16" r="3" stroke="currentColor" stroke-width="1.5"/><path d="m12.5 5.5 2 2-2 2M11.5 18.5l-2-2 2-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    exhaust: '<path d="M3 15h9l3-3h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><ellipse cx="19" cy="12" rx="2" ry="3" stroke="currentColor" stroke-width="1.6"/>',
    engine: '<rect x="4" y="9" width="12" height="8" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M8 9V6h5v3M16 12h4v4h-4" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>'
  };

  function renderServices() {
    var grid = document.getElementById('servicesGrid');
    if (!grid) return;
    var html = SERVICES.map(function (s) {
      var icon = ICONS[s.icon] || ICONS.gear;
      return (
        '<div class="service-card">' +
          '<span class="service-icon" aria-hidden="true">' +
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none">' + icon + '</svg>' +
          '</span>' +
          '<h3>' + s.title + '</h3>' +
        '</div>'
      );
    }).join('');
    grid.innerHTML = html;
  }

  /* ============================================================
     МОБИЛЬНОЕ МЕНЮ
     ============================================================ */
  function initMobileMenu() {
    var btn = document.getElementById('burgerBtn');
    var menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    function close() {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Открыть меню');
    }

    btn.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      btn.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    });

    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });
  }

  /* ============================================================
     СЛАЙДЕР ГАЛЕРЕИ
     Без автопрокрутки: слайд меняется только по действию
     пользователя — стрелки, точки или свайп.
     ============================================================ */
  function initCarousel() {
    var track = document.getElementById('carouselTrack');
    var dotsWrap = document.getElementById('carouselDots');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    if (!track || !dotsWrap) return;

    var slides = Array.prototype.slice.call(track.children);
    var count = slides.length;
    var index = 0;

    // dots
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Слайд ' + (i + 1) + ' из ' + count);
      dot.addEventListener('click', function () {
        goTo(i);
      });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function update() {
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === index);
      });
    }

    function goTo(i) {
      index = (i + count) % count;
      update();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // touch swipe — единственный способ перелистывания на мобильных,
    // кроме стрелок и точек; никакой автоматической смены слайдов
    var touchStartX = null;
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) next(); else prev();
      }
      touchStartX = null;
    });

    // клавиатурная навигация, когда слайдер в фокусе
    var carouselEl = document.getElementById('carousel');
    if (carouselEl) {
      carouselEl.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
      });
    }

    update();
  }

  /* ============================================================
     ГРАФИК РАБОТЫ: подсветка сегодняшнего дня + статус "открыто/закрыто"
     Часы работы одинаковы каждый день: 08:30–19:00
     ============================================================ */
  function initHoursStatus() {
    var OPEN_HOUR = 8, OPEN_MIN = 30, CLOSE_HOUR = 19, CLOSE_MIN = 0;

    var now = new Date();
    var todayIdx = now.getDay(); // 0 = вс ... 6 = сб

    var row = document.querySelector('#hoursTable tr[data-day="' + todayIdx + '"]');
    if (row) row.classList.add('today');

    var minutesNow = now.getHours() * 60 + now.getMinutes();
    var openMinutes = OPEN_HOUR * 60 + OPEN_MIN;
    var closeMinutes = CLOSE_HOUR * 60 + CLOSE_MIN;
    var isOpen = minutesNow >= openMinutes && minutesNow < closeMinutes;

    var badge = document.getElementById('statusBadge');
    var text = document.getElementById('statusText');
    if (!badge || !text) return;

    if (isOpen) {
      badge.classList.add('open');
      text.textContent = 'Открыто сейчас · до 19:00';
    } else {
      badge.classList.add('closed');
      text.textContent = 'Сейчас закрыто · с 08:30';
    }
  }

  function setYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderServices();
    initMobileMenu();
    initCarousel();
    initHoursStatus();
    setYear();
  });
})();
