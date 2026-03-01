// ═══════════════════════════════════════════════════
// LORD DANIEL'S TERMINAL — MAIN JS
// ═══════════════════════════════════════════════════

// ─── BOOT SEQUENCE ──────────────────────────────────
const BOOT_LINES = [
  '> INICIANDO LORD DANIEL\'S TERMINAL...',
  '> VERIFICANDO INTEGRIDAD DEL SISTEMA... [OK]',
  '> CARGANDO MÓDULOS DE ANÁLISIS POLÍTICO... [OK]',
  '> CARGANDO MÓDULOS ECONÓMICOS... [OK]',
  '> CARGANDO MÓDULOS GEOPOLÍTICOS... [OK]',
  '> ESTABLECIENDO CONEXIÓN CON BASE DE DATOS... [OK]',
  '> CARGANDO REGISTROS HISTÓRICOS...',
  '> EJECUTANDO MODELOS PREDICTIVOS...',
  '> CALIBRANDO ÍNDICES DE INESTABILIDAD...',
  '> ADVERTENCIA: LOS DATOS SON ESTIMACIONES. EL FUTURO ES INCIERTO.',
  '> TODO EL ANÁLISIS ES OPINIÓN PERSONAL DEL OPERADOR.',
  '',
  '> SISTEMA LISTO.',
  '> BIENVENIDO, OPERADOR.',
];

async function runBootSequence() {
  const log = document.getElementById('boot-log');
  const bootScreen = document.getElementById('boot-screen');

  for (let i = 0; i < BOOT_LINES.length; i++) {
    await sleep(i < 6 ? 120 : i < 11 ? 200 : 300);
    const line = document.createElement('span');
    line.className = 'log-line';
    line.textContent = BOOT_LINES[i];
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }

  await sleep(800);
  bootScreen.classList.add('fade-out');

  await sleep(900);
  bootScreen.style.display = 'none';

  const main = document.getElementById('main-terminal');
  main.classList.remove('hidden');

  // Load data after boot
  initTerminal();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── INIT TERMINAL ────────────────────────────────────
async function initTerminal() {
  updateClock();
  setInterval(updateClock, 1000);

  // Render charts (async)
  renderAllCharts();

  // Load text content
  await loadSectionContent('espana');
  await loadSectionContent('economia');
  await loadSectionContent('geopolitica');

  // Update footer
  const lastUpdate = await fetchLastUpdate();
  if (lastUpdate) {
    const d = new Date(lastUpdate);
    document.getElementById('footer-last-update').textContent =
      `ÚLTIMA ACTUALIZACIÓN: ${d.toLocaleDateString('es-ES').toUpperCase()}`;
  }
}

// ─── CLOCK ───────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-ES', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  }).toUpperCase();
  const timeStr = now.toLocaleTimeString('es-ES');
  document.getElementById('header-date').textContent = `${dateStr} ${timeStr}`;
}

// ─── NAVIGATION ──────────────────────────────────────
document.querySelectorAll('.nav-btn[data-section]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.section;

    // Hide all sections
    document.querySelectorAll('.terminal-section').forEach(s => {
      s.classList.add('hidden');
    });

    // Show target
    document.getElementById(`section-${target}`).classList.remove('hidden');

    // Update nav active state
    document.querySelectorAll('.nav-btn[data-section]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ─── LOAD SECTION CONTENT ────────────────────────────
async function loadSectionContent(seccion) {
  // Predicciones
  const predicciones = await fetchPredicciones(seccion);
  const predContainer = document.getElementById(`${seccion}-predicciones`);
  if (predContainer) {
    if (predicciones.length === 0) {
      predContainer.innerHTML = '<div class="empty-state">// SIN PREDICCIONES ACTIVAS //</div>';
    } else {
      predContainer.innerHTML = predicciones.map(renderPrediccion).join('');
    }
  }

  // Análisis
  const analisis = await fetchAnalisis(seccion);
  const analContainer = document.getElementById(`${seccion}-analisis`);
  if (analContainer) {
    if (!analisis) {
      analContainer.innerHTML = '<div class="empty-state">// SIN ANÁLISIS DISPONIBLE //</div>';
    } else {
      analContainer.innerHTML = renderAnalisis(analisis.contenido);
    }
  }
}

// ─── RENDER HELPERS ──────────────────────────────────
function renderPrediccion(p) {
  const prob = p.probabilidad || '';
  const riesgo = p.riesgo || 'low';
  const badgeClass = riesgo === 'high' ? 'badge-high' : riesgo === 'mid' ? 'badge-mid' : 'badge-low';
  const riesgoLabel = riesgo === 'high' ? 'ALTO' : riesgo === 'mid' ? 'MEDIO' : 'BAJO';
  const fecha = p.fecha_objetivo ? new Date(p.fecha_objetivo).toLocaleDateString('es-ES') : '';

  return `
    <div class="prediction-item">
      <div class="prediction-title">
        <span class="prediction-label">${escHtml(p.titulo)}</span>
        <span class="prediction-prob">${prob ? prob + '%' : ''}</span>
      </div>
      <div>
        <span class="badge ${badgeClass}">${riesgoLabel}</span>
        ${p.tags ? p.tags.split(',').map(t => `<span class="badge badge-low">${t.trim().toUpperCase()}</span>`).join('') : ''}
      </div>
      <div class="prediction-text">${escHtml(p.descripcion || '')}</div>
      ${fecha ? `<div class="prediction-date">HORIZONTE: ${fecha.toUpperCase()}</div>` : ''}
    </div>
  `;
}

function renderAnalisis(texto) {
  if (!texto) return '<div class="empty-state">// SIN ANÁLISIS //</div>';
  // Convierte saltos de línea en párrafos, *texto* en highlight
  const html = texto
    .split('\n\n')
    .map(p => `<p>${
      p.replace(/\*([^*]+)\*/g, '<span class="highlight">$1</span>')
        .replace(/\n/g, '<br>')
    }</p>`)
    .join('');
  return `<div class="analysis-block">${html}</div>`;
}

function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ─── START ────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', runBootSequence);
