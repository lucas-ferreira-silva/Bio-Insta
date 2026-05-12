// Ano dinâmico no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Toast helper
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// Botão de compartilhar
const shareBtn = document.getElementById('shareBtn');
shareBtn.addEventListener('click', async () => {
  const data = {
    title: 'Lucas Ferreira',
    text: 'Confira os links do Lucas Ferreira',
    url: window.location.href,
  };
  try {
    if (navigator.share) {
      await navigator.share(data);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copiado para a área de transferência!');
    }
  } catch (err) {
    if (err.name !== 'AbortError') showToast('Não foi possível compartilhar.');
  }
});

// Tracking suave de cliques (console)
document.querySelectorAll('.link-card, .socials a').forEach((el) => {
  el.addEventListener('click', () => {
    const label = el.querySelector('.link-title')?.textContent || el.getAttribute('aria-label') || 'link';
    console.log('[click]', label);
  });
});

// Tilt 3D sutil nos cards (desktop)
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.link-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-3px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
