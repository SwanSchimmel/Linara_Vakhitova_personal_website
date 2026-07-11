const cursor = document.querySelector('.cursor-glow');
const tiltItems = document.querySelectorAll('[data-tilt]');
const revealItems = document.querySelectorAll('.reveal-up');
const magneticItems = document.querySelectorAll('.magnetic');

if (cursor) {
  window.addEventListener('pointermove', (event) => {
    document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealItems.forEach((item) => revealObserver.observe(item));

tiltItems.forEach((item) => {
  item.addEventListener('pointermove', (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    item.style.setProperty('--rotate-x', `${rotateX}deg`);
    item.style.setProperty('--rotate-y', `${rotateY}deg`);
    item.style.setProperty('--spotlight-x', `${x}px`);
    item.style.setProperty('--spotlight-y', `${y}px`);
  });

  item.addEventListener('pointerleave', () => {
    item.style.setProperty('--rotate-x', '0deg');
    item.style.setProperty('--rotate-y', '0deg');
  });
});

magneticItems.forEach((item) => {
  item.addEventListener('pointermove', (event) => {
    const rect = item.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.28;
    item.style.transform = `translate(${x}px, ${y}px)`;
  });

  item.addEventListener('pointerleave', () => {
    item.style.transform = 'translate(0, 0)';
  });
});
