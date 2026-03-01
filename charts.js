// ═══════════════════════════════════════════════════
// LORD DANIEL'S TERMINAL — CHARTS
// ═══════════════════════════════════════════════════

const CHART_DEFAULTS = {
  color: '#20c20e',
  colorBright: '#39ff14',
  colorDim: '#0f6e07',
  colorAmber: '#ffb000',
  colorRed: '#ff2200',
  gridColor: 'rgba(57,255,20,0.08)',
  bgBlack: '#020d01',
};

// ─── GLOBAL CHART DEFAULTS ──────────────────────────
Chart.defaults.color = CHART_DEFAULTS.color;
Chart.defaults.font.family = "'Share Tech Mono', monospace";
Chart.defaults.font.size = 11;

function getBaseChartOptions(title = '') {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: CHART_DEFAULTS.color,
          font: { family: "'Share Tech Mono', monospace", size: 10 },
          boxWidth: 12,
          padding: 8,
        }
      },
      title: {
        display: !!title,
        text: title,
        color: CHART_DEFAULTS.colorBright,
        font: { family: "'Share Tech Mono', monospace", size: 11 },
      },
      tooltip: {
        backgroundColor: '#000',
        borderColor: CHART_DEFAULTS.colorDim,
        borderWidth: 1,
        titleColor: CHART_DEFAULTS.colorBright,
        bodyColor: CHART_DEFAULTS.color,
        titleFont: { family: "'Share Tech Mono', monospace" },
        bodyFont:  { family: "'Share Tech Mono', monospace" },
      }
    },
    scales: {
      x: {
        grid:  { color: CHART_DEFAULTS.gridColor },
        ticks: { color: CHART_DEFAULTS.color, font: { size: 10 } },
        border: { color: CHART_DEFAULTS.colorDim }
      },
      y: {
        grid:  { color: CHART_DEFAULTS.gridColor },
        ticks: { color: CHART_DEFAULTS.color, font: { size: 10 } },
        border: { color: CHART_DEFAULTS.colorDim }
      }
    }
  };
}

// ─── FALLBACK DATA (mientras no hay datos en Supabase) ─
const FALLBACK_DATA = {
  'voto-espana': {
    labels: ['Oct 23', 'Nov 23', 'Dic 23', 'Ene 24', 'Feb 24', 'Mar 24'],
    datasets: [
      { label: 'PP',    data: [32, 33, 34, 33, 34, 33], borderColor: '#39ff14', backgroundColor: 'rgba(57,255,20,0.05)' },
      { label: 'PSOE',  data: [28, 27, 27, 28, 27, 28], borderColor: '#ffb000', backgroundColor: 'rgba(255,176,0,0.05)' },
      { label: 'VOX',   data: [14, 13, 12, 13, 12, 12], borderColor: '#ff2200', backgroundColor: 'rgba(255,34,0,0.05)' },
      { label: 'SUMAR', data: [10, 11, 10, 10, 11, 10], borderColor: '#0f6e07', backgroundColor: 'rgba(15,110,7,0.05)' },
    ]
  },
  'partidos-espana': {
    labels: ['PP', 'PSOE', 'VOX', 'SUMAR', 'ERC', 'JUNTS', 'PNV'],
    datasets: [{
      label: 'Valoración',
      data: [33, 28, 12, 10, 5, 4, 3],
      backgroundColor: [
        'rgba(57,255,20,0.6)', 'rgba(255,176,0,0.6)', 'rgba(255,34,0,0.6)',
        'rgba(15,110,7,0.6)', 'rgba(57,255,20,0.3)', 'rgba(57,255,20,0.2)', 'rgba(57,255,20,0.15)'
      ],
      borderColor: CHART_DEFAULTS.colorDim,
      borderWidth: 1,
    }]
  },
  'indices': {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      { label: 'S&P 500',    data: [4700, 4820, 5100, 5150, 5200, 5300], borderColor: '#39ff14', backgroundColor: 'transparent' },
      { label: 'IBEX 35',    data: [9800, 9900, 10100, 10200, 10050, 10300], borderColor: '#ffb000', backgroundColor: 'transparent' },
      { label: 'Euro Stoxx', data: [4500, 4600, 4700, 4650, 4720, 4800], borderColor: '#0f6e07', backgroundColor: 'transparent' },
    ]
  },
  'inflacion': {
    labels: ['EEUU', 'UE', 'España', 'UK', 'Japón', 'China'],
    datasets: [{
      label: 'Inflación %',
      data: [3.1, 2.8, 3.4, 4.0, 2.5, 0.7],
      backgroundColor: 'rgba(57,255,20,0.2)',
      borderColor: CHART_DEFAULTS.colorBright,
      borderWidth: 1,
    }]
  },
  'inestabilidad': {
    labels: ['Oriente Medio', 'Europa Este', 'Asia-Pac', 'África Sahel', 'América Latina', 'Europa Occ'],
    datasets: [{
      label: 'Índice de inestabilidad',
      data: [82, 75, 55, 70, 48, 25],
      backgroundColor: 'rgba(255,34,0,0.15)',
      borderColor: '#ff2200',
      borderWidth: 1,
    }]
  }
};

// ─── INIT CHARTS ────────────────────────────────────
let charts = {};

function initChart(canvasId, type, data, extraOptions = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  if (charts[canvasId]) {
    charts[canvasId].destroy();
  }

  const opts = { ...getBaseChartOptions(), ...extraOptions };

  // Ajuste para gráfico de barras horizontal (inestabilidad)
  if (canvasId === 'chart-inestabilidad') {
    opts.indexAxis = 'y';
  }

  charts[canvasId] = new Chart(canvas, {
    type,
    data,
    options: opts
  });

  return charts[canvasId];
}

// ─── RENDER CHARTS FROM SUPABASE OR FALLBACK ────────
async function renderAllCharts() {

  // Voto España (line)
  const votoData = await loadChartData('voto-espana', FALLBACK_DATA['voto-espana']);
  initChart('chart-voto-espana', 'line', {
    labels: votoData.labels,
    datasets: votoData.datasets.map(d => ({ ...d, tension: 0.4, fill: true }))
  });

  // Partidos España (bar)
  const partidosData = await loadChartData('partidos-espana', FALLBACK_DATA['partidos-espana']);
  initChart('chart-partidos-espana', 'bar', {
    labels: partidosData.labels,
    datasets: partidosData.datasets
  });

  // Índices globales (line)
  const indicesData = await loadChartData('indices', FALLBACK_DATA['indices']);
  initChart('chart-indices', 'line', {
    labels: indicesData.labels,
    datasets: indicesData.datasets.map(d => ({ ...d, tension: 0.3 }))
  });

  // Inflación (bar)
  const inflacionData = await loadChartData('inflacion', FALLBACK_DATA['inflacion']);
  initChart('chart-inflacion', 'bar', {
    labels: inflacionData.labels,
    datasets: inflacionData.datasets
  });

  // Inestabilidad (bar horizontal)
  const inestData = await loadChartData('inestabilidad', FALLBACK_DATA['inestabilidad']);
  initChart('chart-inestabilidad', 'bar', {
    labels: inestData.labels,
    datasets: inestData.datasets
  });
}

// Carga datos de Supabase, usa fallback si no hay
async function loadChartData(nombre, fallback) {
  try {
    const row = await fetchGrafico(nombre);
    if (row && row.labels && row.datasets) {
      return {
        labels: JSON.parse(row.labels),
        datasets: JSON.parse(row.datasets)
      };
    }
  } catch(e) {}
  return fallback;
}

// ─── UPDATE CHART (usado desde admin) ───────────────
function updateChart(canvasId, newLabels, newDatasets) {
  if (!charts[canvasId]) return;
  charts[canvasId].data.labels = newLabels;
  charts[canvasId].data.datasets = newDatasets;
  charts[canvasId].update();
}
