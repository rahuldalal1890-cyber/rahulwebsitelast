/**
* Template Name: Kelly
* Template URL: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();

window.addEventListener("load", function () {
  const preloader = document.getElementById("raj-preloader");

  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.pointerEvents = "none";
  }, 300);

  setTimeout(() => {
    preloader.remove();
  }, 900);
});


(function() {

  "use strict";

  var lava0;
  var ge1doot = {
    screen: {
      elem:     null,
      callback: null,
      ctx:      null,
      width:    0,
      height:   0,
      left:     0,
      top:      0,
      init: function (id, callback, initRes) {
        this.elem = document.getElementById(id);
        this.callback = callback || null;
        if (this.elem.tagName == "CANVAS") this.ctx = this.elem.getContext("2d");
        window.addEventListener('resize', function () {
          this.resize();
        }.bind(this), false);
        initRes && this.resize();
        return this;
      },
      resize: function () {
        var o = this.elem;
        this.width  = o.offsetWidth;
        this.height = o.offsetHeight;
        if (this.ctx) {
          this.elem.width  = this.width;
          this.elem.height = this.height;
        }
        this.callback && this.callback();
      }
    }
  };

  var Point = function(x, y) {
    this.x = x;
    this.y = y;
    this.magnitude = x * x + y * y;
    this.computed = 0;
    this.force = 0;
  };
  Point.prototype.add = function(p) {
    return new Point(this.x + p.x, this.y + p.y);
  };

  var Ball = function(parent) {
    this.vel = new Point(
      (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.25),
      (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random())
    );
    this.pos = new Point(
      parent.width * 0.2 + Math.random() * parent.width * 0.6,
      parent.height * 0.2 + Math.random() * parent.height * 0.6
    );
    this.size = (parent.wh / 15) + Math.random() * (parent.wh / 10);
    this.width = parent.width;
    this.height = parent.height;
  };

  Ball.prototype.move = function() {

    if (this.pos.x >= this.width - this.size) this.vel.x = -Math.abs(this.vel.x);
    if (this.pos.x <= this.size) this.vel.x = Math.abs(this.vel.x);

    if (this.pos.y >= this.height - this.size) this.vel.y = -Math.abs(this.vel.y);
    if (this.pos.y <= this.size) this.vel.y = Math.abs(this.vel.y);

    this.pos = this.pos.add(this.vel);
  };

  var LavaLamp = function(width, height, numBalls, c0, c1) {
    this.step = 5;
    this.width = width;
    this.height = height;
    this.wh = Math.min(width, height);
    this.sx = Math.floor(this.width / this.step);
    this.sy = Math.floor(this.height / this.step);
    this.metaFill = createRadialGradient(width, height, width, c0, c1);
    this.grid = [];
    this.balls = [];

    for (var i = 0; i < (this.sx + 2) * (this.sy + 2); i++) {
      this.grid[i] = new Point(
        (i % (this.sx + 2)) * this.step,
        Math.floor(i / (this.sx + 2)) * this.step
      );
    }

    for (var k = 0; k < numBalls; k++) {
      this.balls[k] = new Ball(this);
    }
  };

  LavaLamp.prototype.computeForce = function(x, y, idx) {
    var id = idx || x + y * (this.sx + 2);
    var force = 0;
    var cell = this.grid[id];
    var i = 0, ball;

    while (ball = this.balls[i++]) {
      force += ball.size * ball.size /
              (-2 * cell.x * ball.pos.x - 2 * cell.y * ball.pos.y +
                ball.pos.magnitude + cell.magnitude);
    }
    this.grid[id].force = force;
    return force;
  };

  LavaLamp.prototype.renderMetaballs = function() {
    var i = 0, ball;
    while (ball = this.balls[i++]) ball.move();

    ctx.fillStyle = this.metaFill;
    ctx.beginPath();

    var grid = this.grid;
    var step = this.step;

    for (var y = 1; y < this.sy; y++) {
      for (var x = 1; x < this.sx; x++) {
        var id = x + y * (this.sx + 2);
        var force = this.computeForce(x, y, id);
        if (Math.abs(force) > 1) {
          ctx.rect(grid[id].x, grid[id].y, step, step);
        }
      }
    }
    ctx.fill();
  };

  var createRadialGradient = function(w, h, r, c0, c1) {
    var g = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, r);
    g.addColorStop(0, c0);
    g.addColorStop(1, c1);
    return g;
  };

  var run = function() {
    requestAnimationFrame(run);
    ctx.clearRect(0, 0, screen.width, screen.height);
    lava0.renderMetaballs();
  };

  var screen = ge1doot.screen.init("bubble", null, true),
      ctx = screen.ctx;

  screen.resize();
  lava0 = new LavaLamp(screen.width, screen.height, 6, "#FF9298", "#E4008E");

  run();

})();