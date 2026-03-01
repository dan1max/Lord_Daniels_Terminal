// ═══════════════════════════════════════════════════
// LORD DANIEL'S TERMINAL — AUTH (Admin)
// ═══════════════════════════════════════════════════

async function signIn(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  return { data, error };
}

async function signOut() {
  const { error } = await supabaseClient.auth.signOut();
  return { error };
}

async function getSession() {
  const { data } = await supabaseClient.auth.getSession();
  return data.session;
}

async function getCurrentUser() {
  const { data } = await supabaseClient.auth.getUser();
  return data.user;
}
