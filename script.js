const phoneNumber = '94773015484';

const menuButton = document.querySelector('.menu-button');
const mainNav = document.querySelector('#main-nav');
const header = document.querySelector('.site-header');

menuButton?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

const filters = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');
const projectGrid = document.querySelector('.project-grid');
const showMoreButton = document.querySelector('#show-more-projects');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const selected = button.dataset.filter;

    projectGrid?.classList.add('show-all');
    if (showMoreButton) showMoreButton.hidden = true;

    projectCards.forEach((card) => {
      const categories = String(card.dataset.category || '').split(' ');
      card.classList.toggle('hidden', selected !== 'all' && !categories.includes(selected));
    });
  });
});

showMoreButton?.addEventListener('click', () => {
  const expanded = projectGrid.classList.toggle('show-all');
  showMoreButton.innerHTML = expanded ? 'Show fewer projects <span>−</span>' : 'Show more projects <span>＋</span>';
});

const lightbox = document.querySelector('#project-lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxTitle = document.querySelector('#lightbox-title');
const lightboxDescription = document.querySelector('#lightbox-description');
const lightboxClose = document.querySelector('.lightbox-close');
let lastFocusedElement = null;

function openLightbox(card) {
  if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription) return;
  lastFocusedElement = document.activeElement;
  lightboxImage.src = card.dataset.image || '';
  lightboxImage.alt = card.dataset.title || 'Project photograph';
  lightboxTitle.textContent = card.dataset.title || 'Selected project';
  lightboxDescription.textContent = card.dataset.description || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lightboxImage?.removeAttribute('src');
  lastFocusedElement?.focus?.();
}

document.querySelectorAll('.project-open').forEach((button) => {
  button.addEventListener('click', () => openLightbox(button.closest('.project-card')));
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox?.classList.contains('open')) closeLightbox();
});

document.querySelector('#quote-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get('name') || '').trim();
  const location = String(form.get('location') || '').trim();
  const service = String(form.get('service') || '').trim();
  const message = String(form.get('message') || '').trim();
  const text = [
    'Hello SG Home Renovation & Construction,',
    name ? `My name is ${name}.` : '',
    location ? `Project location: ${location}.` : '',
    service ? `Service required: ${service}.` : '',
    message ? `Project details: ${message}` : '',
    'Please contact me with more information and a quotation.'
  ].filter(Boolean).join('\n');
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
});

document.querySelector('#year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px' });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}
