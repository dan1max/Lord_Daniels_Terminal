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
