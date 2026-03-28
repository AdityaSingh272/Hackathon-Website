
document.addEventListener('DOMContentLoaded', () => {

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const bar1 = document.getElementById('bar1');
  const bar2 = document.getElementById('bar2');
  const bar3 = document.getElementById('bar3');
  let menuOpen = false;

  mobileMenuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('hidden', !menuOpen);
    bar1.style.transform = menuOpen ? 'translateY(8px) rotate(45deg)' : '';
    bar2.style.opacity = menuOpen ? '0' : '1';
    bar3.style.transform = menuOpen ? 'translateY(-8px) rotate(-45deg)' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.add('hidden');
      bar1.style.transform = '';
      bar2.style.opacity = '1';
      bar3.style.transform = '';
    });
  });


  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!answer.classList.contains('hidden')) {
      item.classList.add('open');
    }

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-answer').classList.add('hidden');
        other.querySelector('.faq-icon').textContent = 'add';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.classList.remove('hidden');
        icon.textContent = 'expand_more';
      }
    });

    if (item.classList.contains('open')) {
      icon.textContent = 'expand_more';
    }
  });


  const sections = document.querySelectorAll('main section[id]');
  const headerNavLinks = document.querySelectorAll('header nav a');
  let isScrollingByClick = false;
  let scrollTimeout;

  const setActiveLink = (id) => {
    headerNavLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      if (isActive) {
        link.classList.add('bg-lime-400', 'text-black');
        link.classList.remove('text-zinc-600');
      } else {
        link.classList.remove('bg-lime-400', 'text-black');
        link.classList.add('text-zinc-600');
      }
    });
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    if (isScrollingByClick) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(section => sectionObserver.observe(section));


  const navLinks = document.querySelectorAll('header nav a, footer nav a, #mobile-menu a');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          setActiveLink(href.slice(1));
          isScrollingByClick = true;
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => { isScrollingByClick = false; }, 1000);
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });


  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });


  const REGISTER_URL = 'https://unstop.com/hackathons/frontend-battle-madhav-institute-of-technology-and-science-mits-gwalior-1659725';

  const ctaButtons = document.querySelectorAll(
    'header button:not(#mobile-menu-btn):not(.faq-btn), main section button:not(.faq-btn):not(#view-quests-btn)'
  );

  ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      window.open(REGISTER_URL, '_blank', 'noopener,noreferrer');
    });
  });

  const viewQuestsBtn = document.getElementById('view-quests-btn');
  if (viewQuestsBtn) {
    viewQuestsBtn.addEventListener('click', () => {
      const tracks = document.querySelector('#tracks');
      if (tracks) tracks.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }


  document.querySelectorAll('.py-24.bg-surface.border-t-4 .grid > div').forEach(logo => {
    logo.addEventListener('mouseenter', () => {
      logo.classList.remove('grayscale');
      logo.classList.add('grayscale-0');
    });
  });


  document.querySelectorAll('footer .flex.flex-col.border-2 a').forEach(link => {
    const icon = link.querySelector('.material-symbols-outlined');
    link.addEventListener('mouseenter', () => { if (icon) icon.style.color = 'white'; });
    link.addEventListener('mouseleave', () => { if (icon) icon.style.color = ''; });
  });


  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {

    const tag = (el, reveal, delay = 0) => {
      el.dataset.reveal = reveal;
      if (delay) el.dataset.delay = delay;
    };

    const stagger = (selector, reveal, maxDelay = 5) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        tag(el, reveal, Math.min(i + 1, maxDelay));
      });
    };

    document.querySelectorAll('main section h2').forEach(el => tag(el, 'up'));

    document.querySelectorAll('#about .lg\\:w-1\\/2').forEach((col, i) => {
      tag(col, i === 0 ? 'left' : 'right');
    });

    stagger('#stages .grid > div', 'up');
    stagger('#tracks .grid > div', 'scale');

    document.querySelectorAll('.space-y-6 > div').forEach((el, i) => {
      if (el.closest('#about')) return;
      tag(el, 'left', Math.min(i + 1, 5));
    });

    stagger('#loot .grid > div', 'up');
    stagger('#team .grid > div', 'up');
    stagger('.faq-item', 'up');

    document.querySelectorAll('.py-12.md\\:py-24.px-4.sm\\:px-6.bg-surface .grid > div').forEach((el, i) => {
      tag(el, 'scale', i + 1);
    });

    const ctaContent = document.querySelector('.bg-secondary .z-10');
    if (ctaContent) tag(ctaContent, 'up');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
  }

});

