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
  '> DETECTOR DE POSICION ACTIVADO.',
  '',
  '> SISTEMA LISTO.',
  '> BIENVENIDO.',
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

  await sleep(600);

  // Fade out text, show loading bar
  const bootContent = document.querySelector('.boot-content');
  bootContent.style.transition = 'opacity 0.6s ease';
  bootContent.style.opacity = '0';

  await sleep(700);
  bootContent.style.display = 'none';

  // Inject loading bar
  bootScreen.insertAdjacentHTML('beforeend', `
    <div id="boot-loader">
      <div class="boot-loader-label">INICIANDO SISTEMA...</div>
      <div class="boot-loader-bar-wrap">
        <div class="boot-loader-bar" id="boot-bar"></div>
        <span class="boot-loader-pct" id="boot-pct">0%</span>
      </div>
      <div class="boot-loader-sub" id="boot-sub">CARGANDO MÓDULOS</div>
    </div>
  `);
  bootScreen.style.opacity = '1';

  const bar = document.getElementById('boot-bar');
  const pct = document.getElementById('boot-pct');
  const sub = document.getElementById('boot-sub');

  const stages = [
    { target: 18,  label: 'CARGANDO MÓDULOS DE ANÁLISIS...',      delay: 30 },
    { target: 35,  label: 'VERIFICANDO BASE DE DATOS...',          delay: 25 },
    { target: 52,  label: 'CALIBRANDO ÍNDICES ECONÓMICOS...',      delay: 20 },
    { target: 67,  label: 'SINCRONIZANDO DATOS GEOPOLÍTICOS...',   delay: 22 },
    { target: 81,  label: 'COMPILANDO MODELOS PREDICTIVOS...',     delay: 18 },
    { target: 93,  label: 'APLICANDO PROTOCOLOS DE SEGURIDAD...', delay: 28 },
    { target: 100, label: 'SISTEMA LISTO.',                        delay: 15 },
  ];

  let current = 0;
  for (const stage of stages) {
    sub.textContent = stage.label;
    while (current < stage.target) {
      current++;
      bar.style.width = current + '%';
      pct.textContent = current + '%';
      await sleep(stage.delay);
    }
    await sleep(180);
  }

  await sleep(600);
  bootScreen.classList.add('fade-out');

  await sleep(900);
  bootScreen.style.display = 'none';

  const main = document.getElementById('main-terminal');
  main.classList.remove('hidden');

  // Load data after boot
  initTerminal();
  initChat();
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
      predContainer.innerHTML = noSignalHTML();
    } else {
      predContainer.innerHTML = predicciones.map(renderPrediccion).join('');
    }
  }

  // Análisis
  const analisis = await fetchAnalisis(seccion);
  const analContainer = document.getElementById(`${seccion}-analisis`);
  if (analContainer) {
    if (!analisis) {
      analContainer.innerHTML = noSignalHTML();
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
  if (!texto) return noSignalHTML();
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

function noSignalHTML() {
  // Delay aleatorio entre 0 y 14s para desincronizar cada panel
  const delay = (Math.random() * 14).toFixed(2);
  return `
    <div class="empty-state">
      <div class="no-signal-text" style="animation-duration:${10 + Math.random() * 5 | 0}s; animation-delay:-${delay}s">NO SIGNAL</div>
    </div>`;
}
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ─── START ────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', runBootSequence);

// ═══════════════════════════════════════════════════
// CHAT
// ═══════════════════════════════════════════════════

let chatActivo = false;

async function initChat() {
  chatActivo = await getChatActivo();
  renderChatEstado();

  // Cargar mensajes si está abierto
  if (chatActivo) await cargarMensajes();

  // Realtime: nuevos mensajes
  suscribirMensajes(payload => {
    if (chatActivo) appendMensaje(payload.new);
  });

  // Realtime: cambio de estado del chat
  suscribirConfig(payload => {
    if (payload.new && payload.new.clave === 'chat_activo') {
      chatActivo = payload.new.valor === 'true';
      renderChatEstado();
      if (chatActivo) cargarMensajes();
    }
  });

  // Enviar mensaje
  document.getElementById('chat-send').addEventListener('click', enviarMensaje);
  document.getElementById('chat-msg').addEventListener('keydown', e => {
    if (e.key === 'Enter') enviarMensaje();
  });
}

function renderChatEstado() {
  const closed = document.getElementById('chat-closed');
  const open   = document.getElementById('chat-open');
  if (!closed || !open) return;

  if (chatActivo) {
    closed.classList.add('hidden');
    open.classList.remove('hidden');
  } else {
    closed.classList.remove('hidden');
    open.classList.add('hidden');
    // Aplica animación desincronizada al NO SIGNAL del chat
    const ns = document.getElementById('chat-no-signal-text');
    if (ns) {
      const delay = (Math.random() * 14).toFixed(2);
      ns.style.animationDuration = (10 + (Math.random() * 5 | 0)) + 's';
      ns.style.animationDelay = '-' + delay + 's';
    }
  }
}

async function cargarMensajes() {
  const msgs = await fetchMensajes();
  const container = document.getElementById('chat-messages');
  if (!container) return;
  container.innerHTML = '';
  msgs.forEach(m => appendMensaje(m, false));
  scrollChat();
}

function appendMensaje(m, doScroll = true) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const hora = new Date(m.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const tipo = m.es_admin ? 'admin' : 'visitor';
  const alias = m.es_admin ? '[ OPERADOR ]' : (m.alias || 'ANON').toUpperCase();

  const div = document.createElement('div');
  div.className = `chat-msg ${tipo}`;
  div.innerHTML = `
    <div class="chat-msg-header">
      <span class="chat-msg-alias">${escHtml(alias)}</span>
      <span class="chat-msg-time">${hora}</span>
    </div>
    <div class="chat-msg-text">${escHtml(m.texto)}</div>
  `;
  container.appendChild(div);
  if (doScroll) scrollChat();
}

function scrollChat() {
  const wrap = document.querySelector('.chat-messages-wrap');
  if (wrap) wrap.scrollTop = wrap.scrollHeight;
}

async function enviarMensaje() {
  const alias = document.getElementById('chat-alias').value.trim();
  const texto = document.getElementById('chat-msg').value.trim();
  if (!texto) return;

  document.getElementById('chat-msg').value = '';
  document.getElementById('chat-send').disabled = true;

  await insertMensaje(alias, texto, false);

  document.getElementById('chat-send').disabled = false;
  document.getElementById('chat-msg').focus();
}
