// Property of dani.co

window.addEventListener('DOMContentLoaded', async () => {
  const session = await getSession();
  if (session) {
    showAdmin();
  } else {
    document.getElementById('login-view').style.display = 'flex';
    document.getElementById('login-view').style.justifyContent = 'center';
  }
});

document.getElementById('btn-login').addEventListener('click', async () => {
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl    = document.getElementById('login-error');

  if (!email || !password) {
    errEl.textContent = '> ERROR: INTRODUCE EMAIL Y CONTRASEÑA';
    return;
  }

  errEl.textContent = '> AUTENTICANDO...';
  const { error } = await signIn(email, password);

  if (error) {
    errEl.textContent = '> ERROR: ' + error.message.toUpperCase();
  } else {
    showAdmin();
  }
});

// Enter key en login
document.getElementById('login-password').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('btn-login').click();
});

document.getElementById('btn-logout').addEventListener('click', async () => {
  await signOut();
  location.reload();
});

function showAdmin() {
  document.getElementById('login-view').style.display = 'none';
  document.getElementById('admin-view').style.display = 'block';
  initKillSwitchAdmin();
  initBroadcastAdmin();
  initAdminChat();
}

document.querySelectorAll('[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(t => t.style.display = 'none');
    document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${btn.dataset.tab}`).style.display = 'block';
    btn.classList.add('active');
  });
});

function showAlert(msg, type = 'success') {
  const el = document.getElementById('admin-alert');
  el.className = `alert alert-${type}`;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 3000);
}


document.getElementById('btn-save-analisis').addEventListener('click', async () => {
  const seccion   = document.getElementById('analisis-seccion').value;
  const contenido = document.getElementById('analisis-contenido').value.trim();

  if (!contenido) {
    showAlert('> ERROR: EL CONTENIDO NO PUEDE ESTAR VACÍO', 'error');
    return;
  }

  const { error } = await upsertAnalisis(seccion, contenido);
  if (error) {
    showAlert('> ERROR: ' + error.message.toUpperCase(), 'error');
  } else {
    showAlert('> ANÁLISIS GUARDADO CORRECTAMENTE');
  }
});

function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// CHAT ADMIN

let adminChatActivo = false;

var _adminChatInit = false;
async function initAdminChat() {
  if (_adminChatInit) { return; }
  _adminChatInit = true;
  adminChatActivo = await getChatActivo();
  renderToggleUI();
  await cargarAdminMensajes();

  // Realtime: nuevos mensajes
  suscribirMensajes(payload => {
    appendAdminMensaje(payload.new);
  });

  // Realtime: cambio de estado
  suscribirConfig(payload => {
    if (payload.new && payload.new.clave === 'chat_activo') {
      adminChatActivo = payload.new.valor === 'true';
      renderToggleUI();
    }
  });

  // Toggle
  document.getElementById('btn-toggle-chat').addEventListener('click', async () => {
    adminChatActivo = !adminChatActivo;
    await setChatActivo(adminChatActivo);
    renderToggleUI();
    showAlert(adminChatActivo ? '> CANAL ACTIVADO — LOS VISITANTES PUEDEN CHATEAR' : '> CANAL CERRADO — NO SIGNAL');
  });

  // Enviar respuesta
  document.getElementById('admin-chat-send').addEventListener('click', enviarRespuestaAdmin);
  document.getElementById('admin-chat-msg').addEventListener('keydown', e => {
    if (e.key === 'Enter') enviarRespuestaAdmin();
  });

  // Borrar todo
  document.getElementById('btn-clear-chat').addEventListener('click', async () => {
    if (!confirm('¿Borrar todos los mensajes del chat?')) return;
    const msgs = await fetchMensajes(200);
    for (const m of msgs) await deleteMensaje(m.id);
    document.getElementById('admin-chat-messages').innerHTML = '';
    showAlert('> HISTORIAL DE CHAT BORRADO');
  });
}

function renderToggleUI() {
  const btn   = document.getElementById('btn-toggle-chat');
  const label = document.getElementById('chat-toggle-label');
  if (!btn || !label) return;

  if (adminChatActivo) {
    btn.textContent = '[ DESACTIVAR TERMINAL ]';
    btn.className = 'toggle-btn-off';
    label.textContent = '● CANAL ACTIVO — VISITANTES CONECTADOS';
    label.className = 'chat-toggle-status on';
  } else {
    btn.textContent = '[ ACTIVAR TERMINAL ]';
    btn.className = 'toggle-btn-on';
    label.textContent = 'CANAL CERRADO — NO SIGNAL';
    label.className = 'chat-toggle-status off';
  }
}

async function cargarAdminMensajes() {
  const msgs = await fetchMensajes();
  const container = document.getElementById('admin-chat-messages');
  if (!container) return;
  container.innerHTML = '';
  msgs.forEach(m => appendAdminMensaje(m, false));
  scrollAdminChat();
}

function appendAdminMensaje(m, doScroll = true) {
  const container = document.getElementById('admin-chat-messages');
  if (!container) return;

  const hora  = new Date(m.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const tipo  = m.es_admin ? 'admin' : 'visitor';
  const alias = m.es_admin ? '[ LD ]' : (m.alias || 'ANON').toUpperCase();

  const div = document.createElement('div');
  div.className = `chat-msg ${tipo}`;
  div.style.maxWidth = '100%';
  div.innerHTML = `
    <div class="chat-msg-header">
      <span class="chat-msg-alias">${escHtml(alias)}</span>
      <span class="chat-msg-time">${hora}</span>
      <button onclick="deleteMensaje(${m.id}).then(cargarAdminMensajes)" class="btn-danger" style="font-size:9px;padding:1px 5px;margin-left:auto;">✕</button>
    </div>
    <div class="chat-msg-text">${escHtml(m.texto)}</div>
  `;
  container.appendChild(div);
  if (doScroll) scrollAdminChat();
}

function scrollAdminChat() {
  const el = document.getElementById('admin-chat-messages');
  if (el) el.scrollTop = el.scrollHeight;
}

async function enviarRespuestaAdmin() {
  const texto = document.getElementById('admin-chat-msg').value.trim();
  if (!texto) return;

  document.getElementById('admin-chat-msg').value = '';
  const { error } = await insertMensaje('LD', texto, true);
  if (error) showAlert('> ERROR AL ENVIAR: ' + error.message, 'error');
}

  }
});

// KILL SWITCH ADMIN

var siteActivo = true;

async function initKillSwitchAdmin() {
  siteActivo = await getSiteActivo();
  renderKillSwitchUI();

  document.getElementById('btn-kill-switch').addEventListener('click', async function() {
    siteActivo = !siteActivo;
    await setSiteActivo(siteActivo);
    renderKillSwitchUI();
    showAlert(siteActivo
      ? '> SITIO REACTIVADO — VISITANTES PUEDEN ACCEDER'
      : '> KILL SWITCH ACTIVADO — TODOS VEN NO SIGNAL',
      siteActivo ? 'success' : 'error'
    );
  });
}

function renderKillSwitchUI() {
  var btn   = document.getElementById('btn-kill-switch');
  var label = document.getElementById('kill-switch-label');
  if (!btn || !label) { return; }

  if (siteActivo) {
    btn.textContent = '[ SITIO ACTIVO ]';
    btn.className = 'toggle-btn-on';
    label.textContent = '● SITIO EN LÍNEA — VISITANTES PUEDEN ACCEDER';
    label.className = 'chat-toggle-status on';
  } else {
    btn.textContent = '[ KILL SWITCH ACTIVADO ]';
    btn.className = 'toggle-btn-off';
    label.textContent = '⚠ SITIO DESACTIVADO — TODOS VEN NO SIGNAL';
    label.className = 'chat-toggle-status off';
    label.style.color = 'var(--red-alert)';
  }
}
