
document.addEventListener('DOMContentLoaded', () => {
  // Cada grupo data-check permite seleccionar solo una opción.
  document.querySelectorAll('[data-check]').forEach(box => {
    box.addEventListener('change', () => {
      if (!box.checked) return;
      document.querySelectorAll(`[data-check="${box.dataset.check}"]`).forEach(x => {
        if (x !== box) x.checked = false;
      });
    });
  });

  // Aviso visual para archivos cargados.
  document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', () => {
      if (input.files.length && input.nextElementSibling) {
        input.nextElementSibling.classList.add('ok');
      }
    });
  });

  // Firma táctil / mouse si existe un canvas con clase firma.
  document.querySelectorAll('.firma').forEach(canvas => {
    const ctx = canvas.getContext('2d');
    let drawing = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const old = canvas.toDataURL();
      canvas.width = Math.max(1, Math.floor(rect.width * devicePixelRatio));
      canvas.height = Math.max(1, Math.floor(rect.height * devicePixelRatio));
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      if (old && old !== 'data:,') {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
        img.src = old;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const point = e => {
      const r = canvas.getBoundingClientRect();
      const t = e.touches && e.touches[0];
      return {x:(t ? t.clientX : e.clientX)-r.left, y:(t ? t.clientY : e.clientY)-r.top};
    };

    const start = e => {
      drawing = true;
      const p = point(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      e.preventDefault();
    };
    const move = e => {
      if (!drawing) return;
      const p = point(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      e.preventDefault();
    };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', () => drawing = false);
    canvas.addEventListener('touchstart', start, {passive:false});
    canvas.addEventListener('touchmove', move, {passive:false});
    canvas.addEventListener('touchend', () => drawing = false);
  });
});

function imprimir() {
  window.print();
}
