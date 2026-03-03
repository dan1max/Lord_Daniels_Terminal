// Property of dani.co

// ⚠️  INSTRUCCIONES DE CONFIGURACIÓN:
//     1. Ve a tu proyecto en supabase.com
//     2. Settings → API
//     3. Copia "Project URL" y "anon public key"
//     4. Pégalos aquí abajo

const SUPABASE_URL  = 'https://dvyeirpphrrdkdrubehw.supabase.co';
const SUPABASE_ANON = 'sb_publishable_t8071wTQx0HbyKPTc2w_XQ_dYbvIbfW';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

async function fetchPredicciones(seccion) {
  const { data, error } = await supabaseClient
    .from('predicciones')
    .select('*')
    .eq('seccion', seccion)
    .eq('activa', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching predicciones:', error);
    return [];
  }
  return data || [];
}

async function fetchAnalisis(seccion) {
  const { data, error } = await supabaseClient
    .from('analisis')
    .select('*')
    .eq('seccion', seccion)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) return null;
  return data;
}

async function fetchGrafico(nombre) {
  const { data, error } = await supabaseClient
    .from('graficos')
    .select('*')
    .eq('nombre', nombre)
    .single();

  if (error) return null;
  return data;
}

async function fetchLastUpdate() {
  const { data } = await supabaseClient
    .from('predicciones')
    .select('created_at')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  return data ? data.created_at : null;
}

async function insertPrediccion(prediccion) {
  const { data, error } = await supabaseClient
    .from('predicciones')
    .insert([prediccion])
    .select()
    .single();
  return { data, error };
}

async function updatePrediccion(id, updates) {
  const { data, error } = await supabaseClient
    .from('predicciones')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}

async function deletePrediccion(id) {
  const { error } = await supabaseClient
    .from('predicciones')
    .delete()
    .eq('id', id);
  return { error };
}

async function upsertAnalisis(seccion, contenido) {
  // Busca si ya existe uno para esta sección
  const { data: existing } = await supabaseClient
    .from('analisis')
    .select('id')
    .eq('seccion', seccion)
    .single();

  if (existing) {
    const { data, error } = await supabaseClient
      .from('analisis')
      .update({ contenido, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
      .select()
      .single();
    return { data, error };
  } else {
    const { data, error } = await supabaseClient
      .from('analisis')
      .insert([{ seccion, contenido }])
      .select()
      .single();
    return { data, error };
  }
}

async function upsertGrafico(nombre, labels, datasets) {
  const { data: existing } = await supabaseClient
    .from('graficos')
    .select('id')
    .eq('nombre', nombre)
    .single();

  const payload = {
    nombre,
    labels: JSON.stringify(labels),
    datasets: JSON.stringify(datasets),
    updated_at: new Date().toISOString()
  };

  if (existing) {
    const { data, error } = await supabaseClient
      .from('graficos')
      .update(payload)
      .eq('id', existing.id)
      .select()
      .single();
    return { data, error };
  } else {
    const { data, error } = await supabaseClient
      .from('graficos')
      .insert([payload])
      .select()
      .single();
    return { data, error };
  }
}

async function getChatActivo() {
  const { data } = await supabaseClient
    .from('config')
    .select('valor')
    .eq('clave', 'chat_activo')
    .single();
  return data ? data.valor === 'true' : false;
}

async function setChatActivo(activo) {
  const { data: existing } = await supabaseClient
    .from('config')
    .select('id')
    .eq('clave', 'chat_activo')
    .single();

  if (existing) {
    return supabaseClient.from('config').update({ valor: String(activo) }).eq('clave', 'chat_activo');
  } else {
    return supabaseClient.from('config').insert([{ clave: 'chat_activo', valor: String(activo) }]);
  }
}

async function fetchMensajes(limit = 60) {
  const { data } = await supabaseClient
    .from('mensajes')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(limit);
  return data || [];
}

async function insertMensaje(alias, texto, esAdmin = false) {
  const { data, error } = await supabaseClient
    .from('mensajes')
    .insert([{ alias: alias || 'ANON', texto, es_admin: esAdmin }])
    .select()
    .single();
  return { data, error };
}

async function deleteMensaje(id) {
  return supabaseClient.from('mensajes').delete().eq('id', id);
}

function suscribirMensajes(callback) {
  return supabaseClient
    .channel('mensajes-visitor')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes' }, callback)
    .subscribe();
}

function suscribirConfig(callback) {
  return supabaseClient
    .channel('config-visitor')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'config' }, callback)
    .subscribe();
}

async function getSiteActivo() {
  var result = await supabaseClient
    .from('config')
    .select('valor')
    .eq('clave', 'site_activo')
    .single();
  if (!result.data) { return true; } // default: site on
  return result.data.valor !== 'false';
}

async function setSiteActivo(activo) {
  var existing = await supabaseClient
    .from('config')
    .select('id')
    .eq('clave', 'site_activo')
    .single();

  if (existing.data) {
    return supabaseClient.from('config').update({ valor: String(activo) }).eq('clave', 'site_activo');
  } else {
    return supabaseClient.from('config').insert([{ clave: 'site_activo', valor: String(activo) }]);
  }
}

async function getBroadcastActivo() {
  var result = await supabaseClient
    .from('config')
    .select('valor')
    .eq('clave', 'broadcast_activo')
    .single();
  if (!result.data) { return false; }
  return result.data.valor === 'true';
}

async function setBroadcastActivo(activo) {
  var existing = await supabaseClient
    .from('config')
    .select('id')
    .eq('clave', 'broadcast_activo')
    .single();
  if (existing.data) {
    return supabaseClient.from('config').update({ valor: String(activo) }).eq('clave', 'broadcast_activo');
  } else {
    return supabaseClient.from('config').insert([{ clave: 'broadcast_activo', valor: String(activo) }]);
  }
}
