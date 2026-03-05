// Property of dani.co

var BOOT_LINES = [
  '> SYSTEM CHECK... [OK]',
  '> MEMORY INTEGRITY... [OK]',
  '> POLITICAL ANALYSIS MODULE... [OK]',
  '> ECONOMIC MODULE... [OK]',
  '> GEOPOLITICAL MODULE... [OK]',
  '> DATABASE CONNECTION... [OK]',
  '> LOADING HISTORICAL RECORDS...',
  '> RUNNING PREDICTIVE MODELS...',
  '> CALIBRATING INSTABILITY INDEX...',
  '> POSITION DETECTOR ACTIVE.',
  '',
  '> SYSTEM READY.',
];

async function runBootSequence() {
  var log = document.getElementById('boot-log');
  var bootScreen = document.getElementById('boot-screen');

  var bootAudio = new Audio('booting-up.m4a');
  bootAudio.volume = 0.7;
  bootAudio.play().catch(function() {});

  for (var i = 0; i < BOOT_LINES.length; i++) {
    await sleep(i < 6 ? 100 : i < 11 ? 180 : 260);
    var line = document.createElement('span');
    line.className = 'log-line';
    line.textContent = BOOT_LINES[i];
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }

  await sleep(500);
  var bootContent = document.querySelector('.boot-content');
  bootContent.style.transition = 'opacity 0.5s ease';
  bootContent.style.opacity = '0';
  await sleep(600);
  bootContent.style.display = 'none';

  bootScreen.insertAdjacentHTML('beforeend',
    '<div id="boot-loader">' +
      '<div class="boot-loader-outer">' +
        '<div class="boot-loader-bar" id="boot-bar"></div>' +
        '<div class="boot-loader-pct-box">' +
          '<span id="boot-pct">0%</span>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
  bootScreen.style.opacity = '1';

  var bar = document.getElementById('boot-bar');
  var pct = document.getElementById('boot-pct');
  var current = 0;

  while (current < 100) {
    current++;
    bar.style.width = current + '%';
    pct.textContent = current + '%';
    var delay = Math.max(4, Math.round(110 * Math.pow(1 - current / 100, 2.2)));
    await sleep(delay);
    if (current === 33 || current === 66) { await sleep(120); }
  }

  await sleep(400);
  bootScreen.classList.add('fade-out');
  await sleep(900);
  bootScreen.style.display = 'none';

  var main = document.getElementById('main-terminal');
  main.classList.remove('hidden');

  initTerminal();
  initChat();
  initRealtimeConfig();
  initListener();
}

function sleep(ms) {
  return new Promise(function(resolve) { setTimeout(resolve, ms); });
}

async function initTerminal() {
  updateClock();
  setInterval(updateClock, 1000);
  renderAllCharts();
  await loadSectionContent('espana');
  await loadSectionContent('economia');
  await loadSectionContent('geopolitica');

  var lastUpdate = await fetchLastUpdate();
  if (lastUpdate) {
    var d = new Date(lastUpdate);
    document.getElementById('footer-last-update').textContent =
      'LAST UPDATE: ' + d.toLocaleDateString('es-ES').toUpperCase();
  }
}

function updateClock() {
  var now = new Date();
  var dateStr = now.toLocaleDateString('es-ES', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  }).toUpperCase();
  document.getElementById('header-date').textContent = dateStr + ' ' + now.toLocaleTimeString('es-ES');
}

var hamburger = document.getElementById('nav-hamburger');
var navItems  = document.getElementById('nav-items');

if (hamburger && navItems) {
  hamburger.addEventListener('click', function() {
    var isOpen = navItems.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.textContent = isOpen ? '[ MENU ▲ ]' : '[ MENU ▼ ]';
  });
}

document.querySelectorAll('.nav-btn[data-section]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var target = btn.dataset.section;
    document.querySelectorAll('.terminal-section').forEach(function(s) { s.classList.add('hidden'); });
    document.getElementById('section-' + target).classList.remove('hidden');
    document.querySelectorAll('.nav-btn[data-section]').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    if (navItems) { navItems.classList.remove('open'); }
    if (hamburger) { hamburger.classList.remove('open'); hamburger.textContent = '[ MENU ▼ ]'; }
  });
});

async function loadSectionContent(seccion) {
  var predicciones = await fetchPredicciones(seccion);
  var predContainer = document.getElementById(seccion + '-predicciones');
  if (predContainer) {
    predContainer.innerHTML = predicciones.length === 0
      ? noSignalHTML()
      : predicciones.map(renderPrediccion).join('');
  }
  var analisis = await fetchAnalisis(seccion);
  var analContainer = document.getElementById(seccion + '-analisis');
  if (analContainer) {
    analContainer.innerHTML = analisis ? renderAnalisis(analisis.contenido) : noSignalHTML();
  }
}

function renderPrediccion(p) {
  var prob = p.probabilidad || '';
  var riesgo = p.riesgo || 'low';
  var badgeClass = riesgo === 'high' ? 'badge-high' : riesgo === 'mid' ? 'badge-mid' : 'badge-low';
  var riesgoLabel = riesgo === 'high' ? 'ALTO' : riesgo === 'mid' ? 'MEDIO' : 'BAJO';
  var fecha = p.fecha_objetivo ? new Date(p.fecha_objetivo).toLocaleDateString('es-ES') : '';
  var tags = p.tags ? p.tags.split(',').map(function(t) {
    return '<span class="badge badge-low">' + t.trim().toUpperCase() + '</span>';
  }).join('') : '';
  return '<div class="prediction-item">' +
    '<div class="prediction-title">' +
      '<span class="prediction-label">' + escHtml(p.titulo) + '</span>' +
      '<span class="prediction-prob">' + (prob ? prob + '%' : '') + '</span>' +
    '</div>' +
    '<div><span class="badge ' + badgeClass + '">' + riesgoLabel + '</span>' + tags + '</div>' +
    '<div class="prediction-text">' + escHtml(p.descripcion || '') + '</div>' +
    (fecha ? '<div class="prediction-date">HORIZON: ' + fecha.toUpperCase() + '</div>' : '') +
  '</div>';
}

function renderAnalisis(texto) {
  if (!texto) { return noSignalHTML(); }
  var html = texto.split('\n\n').map(function(p) {
    return '<p>' + p
      .replace(/\*([^*]+)\*/g, '<span class="highlight">$1</span>')
      .replace(/\n/g, '<br>') + '</p>';
  }).join('');
  return '<div class="analysis-block">' + html + '</div>';
}

function noSignalHTML() {
  var delay = (Math.random() * 14).toFixed(2);
  var dur = 10 + Math.floor(Math.random() * 5);
  return '<div class="empty-state"><div class="no-signal-text" style="animation-duration:' +
    dur + 's;animation-delay:-' + delay + 's">NO SIGNAL</div></div>';
}

function escHtml(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Property of dani.co

window.addEventListener('DOMContentLoaded', async function() {
  var siteActivo = await getSiteActivo();
  if (!siteActivo) {
    showKillScreen();
    supabaseClient.channel('site-watch')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'config' }, function(payload) {
        if (payload.new && payload.new.clave === 'site_activo' && payload.new.valor !== 'false') {
          location.reload();
        }
      })
      .subscribe();
    return;
  }
  runBootSequence();
});

var chatActivo = false;

function initRealtimeConfig() {
  supabaseClient.channel('config-unified')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'config' }, function(payload) {
      if (!payload.new) { return; }
      var key = payload.new.clave;
      var val = payload.new.valor;

      if (key === 'chat_activo') {
        chatActivo = val === 'true';
        renderChatEstado();
        if (chatActivo) { cargarMensajes(); }
      }

      if (key === 'site_activo') {
        if (val === 'false') { showKillScreen(); }
        else { hideKillScreen(); }
      }
    })
    .subscribe();
}

function showKillScreen() {
  var ks = document.getElementById('kill-screen');
  if (!ks) { return; }
  ks.classList.remove('hidden');
  var ns = document.getElementById('kill-no-signal-text');
  if (ns) {
    ns.style.animationDuration = (10 + Math.floor(Math.random() * 5)) + 's';
    ns.style.animationDelay = '-' + (Math.random() * 14).toFixed(2) + 's';
  }
}

function hideKillScreen() {
  var ks = document.getElementById('kill-screen');
  if (ks) { ks.classList.add('hidden'); }
}

async function initChat() {
  chatActivo = await getChatActivo();
  renderChatEstado();
  if (chatActivo) { await cargarMensajes(); }

  supabaseClient.channel('mensajes-live')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes' }, function(payload) {
      if (chatActivo) { appendMensaje(payload.new); }
    })
    .subscribe();

  var sendBtn  = document.getElementById('chat-send');
  var msgInput = document.getElementById('chat-msg');
  if (sendBtn)  { sendBtn.addEventListener('click', enviarMensaje); }
  if (msgInput) { msgInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') { enviarMensaje(); } }); }
}

function renderChatEstado() {
  var closed = document.getElementById('chat-closed');
  var open   = document.getElementById('chat-open');
  if (!closed || !open) { return; }
  if (chatActivo) {
    closed.classList.add('hidden');
    open.classList.remove('hidden');
  } else {
    closed.classList.remove('hidden');
    open.classList.add('hidden');
    var ns = document.getElementById('chat-no-signal-text');
    if (ns) {
      ns.style.animationDuration = (10 + Math.floor(Math.random() * 5)) + 's';
      ns.style.animationDelay = '-' + (Math.random() * 14).toFixed(2) + 's';
    }
  }
}

async function cargarMensajes() {
  var msgs = await fetchMensajes();
  var container = document.getElementById('chat-messages');
  if (!container) { return; }
  container.innerHTML = '';
  msgs.forEach(function(m) { appendMensaje(m, false); });
  scrollChat();
}

function appendMensaje(m, doScroll) {
  if (doScroll === undefined) { doScroll = true; }
  var container = document.getElementById('chat-messages');
  if (!container) { return; }
  var hora  = new Date(m.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  var tipo  = m.es_admin ? 'admin' : 'visitor';
  var alias = m.es_admin ? '[ LD ]' : (m.alias || 'ANON').toUpperCase();
  var div = document.createElement('div');
  div.className = 'chat-msg ' + tipo;
  div.innerHTML =
    '<div class="chat-msg-header">' +
      '<span class="chat-msg-alias">' + escHtml(alias) + '</span>' +
      '<span class="chat-msg-time">' + hora + '</span>' +
    '</div>' +
    '<div class="chat-msg-text">' + escHtml(m.texto) + '</div>';
  container.appendChild(div);
  if (doScroll) { scrollChat(); }
}

function scrollChat() {
  var wrap = document.querySelector('.chat-messages-wrap');
  if (wrap) { wrap.scrollTop = wrap.scrollHeight; }
}

async function enviarMensaje() {
  var aliasEl = document.getElementById('chat-alias');
  var msgEl   = document.getElementById('chat-msg');
  var sendBtn = document.getElementById('chat-send');
  var alias = aliasEl ? aliasEl.value.trim() : '';
  var texto = msgEl ? msgEl.value.trim() : '';
  if (!texto) { return; }
  msgEl.value = '';
  if (sendBtn) { sendBtn.disabled = true; }
  await insertMensaje(alias, texto, false);
  if (sendBtn) { sendBtn.disabled = false; }
  if (msgEl)   { msgEl.focus(); }
}
