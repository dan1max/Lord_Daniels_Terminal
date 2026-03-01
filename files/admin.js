// ═══════════════════════════════════════════════════
// LORD DANIEL'S TERMINAL — ADMIN JS
// ═══════════════════════════════════════════════════

// ─── AUTH CHECK ───────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  const session = await getSession();
  if (session) {
    showAdmin();
  } else {
    document.getElementById('login-view').style.display = 'flex';
    document.getElementById('login-view').style.justifyContent = 'center';
  }
});

// ─── LOGIN ─────────────────────────────────────────────
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

// ─── LOGOUT ────────────────────────────────────────────
document.getElementById('btn-logout').addEventListener('click', async () => {
  await signOut();
  location.reload();
});

// ─── SHOW ADMIN ────────────────────────────────────────
function showAdmin() {
  document.getElementById('login-view').style.display = 'none';
  document.getElementById('admin-view').style.display = 'block';
  loadPredList();
}

// ─── TABS ──────────────────────────────────────────────
document.querySelectorAll('[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(t => t.style.display = 'none');
    document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${btn.dataset.tab}`).style.display = 'block';
    btn.classList.add('active');
  });
});

// ─── ALERT HELPER ──────────────────────────────────────
function showAlert(msg, type = 'success') {
  const el = document.getElementById('admin-alert');
  el.className = `alert alert-${type}`;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 3000);
}

// ════════════════════════════════════════════════════
// PREDICCIONES
// ════════════════════════════════════════════════════

// ─── LOAD LIST ─────────────────────────────────────────
async function loadPredList() {
  const seccion = document.getElementById('filter-seccion').value;
  const listEl = document.getElementById('pred-list');
  listEl.innerHTML = '<div class="loading-text">CARGANDO...</div>';

  const items = await fetchPredicciones(seccion);
  if (items.length === 0) {
    listEl.innerHTML = '<div class="empty-state">// SIN PREDICCIONES //</div>';
    return;
  }

  listEl.innerHTML = items.map(p => `
    <div class="admin-item">
      <div style="flex:1;">
        <div class="admin-item-title">${escHtml(p.titulo)}</div>
        <div class="admin-item-meta">${p.seccion.toUpperCase()} · ${p.probabilidad ? p.probabilidad + '%' : '--'} · ${p.riesgo.toUpperCase()}</div>
      </div>
      <div style="display:flex;gap:0.5rem;">
        <button class="btn-secondary" style="font-size:10px;padding:2px 8px;" onclick="editPred(${p.id})">EDITAR</button>
        <button class="btn-danger" onclick="deletePred(${p.id})">✕</button>
      </div>
    </div>
  `).join('');
}

document.getElementById('filter-seccion').addEventListener('change', loadPredList);

// ─── SAVE ──────────────────────────────────────────────
document.getElementById('btn-save-pred').addEventListener('click', async () => {
  const id = document.getElementById('pred-id').value;
  const payload = {
    seccion:       document.getElementById('pred-seccion').value,
    titulo:        document.getElementById('pred-titulo').value.trim(),
    descripcion:   document.getElementById('pred-descripcion').value.trim(),
    probabilidad:  parseInt(document.getElementById('pred-prob').value) || null,
    riesgo:        document.getElementById('pred-riesgo').value,
    fecha_objetivo: document.getElementById('pred-fecha').value || null,
    tags:          document.getElementById('pred-tags').value.trim() || null,
    activa:        true,
  };

  if (!payload.titulo) {
    showAlert('> ERROR: EL TÍTULO ES OBLIGATORIO', 'error');
    return;
  }

  let error;
  if (id) {
    ({ error } = await updatePrediccion(id, payload));
  } else {
    ({ error } = await insertPrediccion(payload));
  }

  if (error) {
    showAlert('> ERROR: ' + error.message.toUpperCase(), 'error');
  } else {
    showAlert('> PREDICCIÓN GUARDADA CORRECTAMENTE');
    clearPredForm();
    loadPredList();
  }
});

// ─── EDIT ──────────────────────────────────────────────
async function editPred(id) {
  const { data } = await supabaseClient
    .from('predicciones')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) return;

  document.getElementById('pred-id').value           = data.id;
  document.getElementById('pred-seccion').value      = data.seccion;
  document.getElementById('pred-titulo').value       = data.titulo;
  document.getElementById('pred-descripcion').value  = data.descripcion || '';
  document.getElementById('pred-prob').value         = data.probabilidad || '';
  document.getElementById('pred-riesgo').value       = data.riesgo || 'low';
  document.getElementById('pred-fecha').value        = data.fecha_objetivo || '';
  document.getElementById('pred-tags').value         = data.tags || '';
}

// ─── DELETE ────────────────────────────────────────────
async function deletePred(id) {
  if (!confirm('¿Eliminar esta predicción?')) return;
  const { error } = await deletePrediccion(id);
  if (error) {
    showAlert('> ERROR AL ELIMINAR', 'error');
  } else {
    showAlert('> PREDICCIÓN ELIMINADA');
    loadPredList();
  }
}

// ─── CLEAR FORM ────────────────────────────────────────
document.getElementById('btn-clear-pred').addEventListener('click', clearPredForm);

function clearPredForm() {
  document.getElementById('pred-id').value          = '';
  document.getElementById('pred-titulo').value      = '';
  document.getElementById('pred-descripcion').value = '';
  document.getElementById('pred-prob').value        = '';
  document.getElementById('pred-riesgo').value      = 'low';
  document.getElementById('pred-fecha').value       = '';
  document.getElementById('pred-tags').value        = '';
}

// ════════════════════════════════════════════════════
// ANÁLISIS
// ════════════════════════════════════════════════════

document.getElementById('btn-load-analisis').addEventListener('click', async () => {
  const seccion = document.getElementById('analisis-seccion').value;
  const data = await fetchAnalisis(seccion);
  if (data) {
    document.getElementById('analisis-contenido').value = data.contenido;
    showAlert('> ANÁLISIS CARGADO');
  } else {
    document.getElementById('analisis-contenido').value = '';
    showAlert('> SIN ANÁLISIS PREVIO PARA ESTA SECCIÓN');
  }
});

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

// ─── UTILS ─────────────────────────────────────────────
function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
