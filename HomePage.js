// Basic interactive behavior: nav toggle, properties carousel prev/next, testimonials slider, simple form handling

document.addEventListener('DOMContentLoaded', function () {
  // Sticky year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu toggle for small screens
  const menuBtn = document.getElementById('menuBtn');
  const navList = document.getElementById('navList');
  if (menuBtn && navList) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      navList.style.display = expanded ? '' : 'flex';
    });

    // Close menu on link click (mobile)
    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth < 820) {
          navList.style.display = '';
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Properties Carousel (simple scroll)
  const carousel = document.getElementById('propertiesCarousel');
  const prevBtns = document.querySelectorAll('.carousel-btn.prev');
  const nextBtns = document.querySelectorAll('.carousel-btn.next');

  function scrollCarousel(step = 1) {
    if (!carousel) return;
    const cardWidth = carousel.querySelector('.property-card').getBoundingClientRect().width + parseFloat(getComputedStyle(carousel).gap || 16);
    carousel.scrollBy({ left: cardWidth * step, behavior: 'smooth' });
  }

  prevBtns.forEach(btn => btn.addEventListener('click', () => scrollCarousel(-1)));
  nextBtns.forEach(btn => btn.addEventListener('click', () => scrollCarousel(1)));

  // Allow keyboard navigation on carousel (optional)
  if (carousel){
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') scrollCarousel(-1);
      if (e.key === 'ArrowRight') scrollCarousel(1);
    });
  }

  // Testimonials slider (auto + dots)
  const testimonials = document.getElementById('testimonialsSlider');
  const dotsWrap = document.getElementById('testDots');
  if (testimonials && dotsWrap) {
    const items = Array.from(testimonials.children);
    let index = 0;
    // layout: show a single card at a time on mobile, more on desktop; we'll cycle horizontally
    testimonials.style.display = 'flex';
    testimonials.style.overflow = 'hidden';
    testimonials.style.scrollBehavior = 'smooth';

    // create dots
    items.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.addEventListener('click', () => { index = i; showTestimonial(index); resetAuto(); });
      dotsWrap.appendChild(btn);
    });

    const dotButtons = Array.from(dotsWrap.children);

    function showTestimonial(i){
      const width = testimonials.getBoundingClientRect().width;
      testimonials.scrollTo({ left: width * i, behavior: 'smooth' });
      dotButtons.forEach((d, idx) => d.classList.toggle('active', idx === i));
    }

    // auto rotate
    let auto = setInterval(() => {
      index = (index + 1) % items.length;
      showTestimonial(index);
    }, 4500);

    function resetAuto(){
      clearInterval(auto);
      auto = setInterval(() => {
        index = (index + 1) % items.length;
        showTestimonial(index);
      }, 4500);
    }

    showTestimonial(0);
    window.addEventListener('resize', () => showTestimonial(index));
  }

  // Contact form basic validation (client-side only)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }

      // Placeholder for real submission (fetch/ajax)
      alert('Thanks — your message has been received.');
      form.reset();
    });
  }
});
