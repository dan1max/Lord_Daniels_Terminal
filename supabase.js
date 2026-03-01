// ═══════════════════════════════════════════════════
// LORD DANIEL'S TERMINAL — SUPABASE CONFIG
// ═══════════════════════════════════════════════════
// ⚠️  INSTRUCCIONES DE CONFIGURACIÓN:
//     1. Ve a tu proyecto en supabase.com
//     2. Settings → API
//     3. Copia "Project URL" y "anon public key"
//     4. Pégalos aquí abajo
// ═══════════════════════════════════════════════════

const SUPABASE_URL  = 'https://dvyeirpphrrdkdrubehw.supabase.co';
const SUPABASE_ANON = 'sb_publishable_t8071wTQx0HbyKPTc2w_XQ_dYbvIbfW';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// ─── FETCH PREDICCIONES ──────────────────────────────
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

// ─── FETCH ANÁLISIS ──────────────────────────────────
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

// ─── FETCH DATOS DE GRÁFICOS ─────────────────────────
async function fetchGrafico(nombre) {
  const { data, error } = await supabaseClient
    .from('graficos')
    .select('*')
    .eq('nombre', nombre)
    .single();

  if (error) return null;
  return data;
}

// ─── FETCH FECHA ÚLTIMA ACTUALIZACIÓN ────────────────
async function fetchLastUpdate() {
  const { data } = await supabaseClient
    .from('predicciones')
    .select('created_at')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  return data ? data.created_at : null;
}

// ─── CRUD PREDICCIONES (ADMIN) ────────────────────────
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

// ─── CRUD ANÁLISIS (ADMIN) ─────────────────────────────
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

// ─── CRUD GRÁFICOS (ADMIN) ────────────────────────────
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
