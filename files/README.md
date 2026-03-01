# LORD DANIEL'S TERMINAL

> Sistema de análisis político y económico · Estética Fallout Terminal

---

## 📁 Estructura de archivos

```
lord-daniels-terminal/
├── index.html              ← Página principal
├── css/
│   └── style.css           ← Estilos (tema verde fosforescente)
├── js/
│   ├── main.js             ← Lógica general y secuencia de arranque
│   ├── charts.js           ← Gráficos (Chart.js)
│   ├── supabase.js         ← Conexión y CRUD con Supabase
│   └── auth.js             ← Autenticación
├── admin/
│   ├── panel.html          ← Panel de edición (protegido)
│   └── admin.js            ← Lógica del panel de admin
└── README.md
```

---

## 🗄️ CONFIGURACIÓN SUPABASE (paso a paso)

### 1. Crear el proyecto
1. Ve a [supabase.com](https://supabase.com) e inicia sesión
2. Clic en **"New Project"**
3. Nombre: `lords-terminal` (o el que quieras)
4. Pon una contraseña segura para la base de datos
5. Elige región: **West EU (Ireland)** — la más cercana a España

---

### 2. Crear las tablas

Ve a **Table Editor** → **New Table** y crea estas tres:

#### Tabla: `predicciones`
| Columna | Tipo | Default | Notas |
|---|---|---|---|
| `id` | int8 | autoincrement | Primary key |
| `created_at` | timestamptz | now() | |
| `seccion` | text | — | 'espana', 'economia' o 'geopolitica' |
| `titulo` | text | — | |
| `descripcion` | text | — | |
| `probabilidad` | int4 | null | 0-100 |
| `riesgo` | text | 'low' | 'low', 'mid', 'high' |
| `fecha_objetivo` | date | null | |
| `tags` | text | null | Separados por coma |
| `activa` | bool | true | |

#### Tabla: `analisis`
| Columna | Tipo | Default |
|---|---|---|
| `id` | int8 | autoincrement |
| `created_at` | timestamptz | now() |
| `updated_at` | timestamptz | now() |
| `seccion` | text | — |
| `contenido` | text | — |

#### Tabla: `graficos`
| Columna | Tipo | Default |
|---|---|---|
| `id` | int8 | autoincrement |
| `created_at` | timestamptz | now() |
| `updated_at` | timestamptz | now() |
| `nombre` | text | — |
| `labels` | text | — | (JSON string) |
| `datasets` | text | — | (JSON string) |

---

### 3. Configurar Row Level Security (RLS)

Para cada tabla, en **Authentication → Policies**, añade:

**Política de lectura pública** (para que los visitantes vean los datos):
- Policy name: `public read`
- Operation: `SELECT`
- Target roles: `anon`
- Expression: `true`

**Política de escritura autenticada** (solo tú puedes editar):
- Policy name: `auth write`
- Operation: `ALL`
- Target roles: `authenticated`
- Expression: `true`

---

### 4. Crear tu usuario de acceso

Ve a **Authentication → Users** → **"Add User"**:
- Email: tu email
- Password: una contraseña segura
- Marca "Auto Confirm User"

---

### 5. Obtener las claves API

Ve a **Settings → API**:
- Copia **Project URL** (algo como `https://xxxx.supabase.co`)
- Copia **anon public** key

Abre `js/supabase.js` y pega los valores:
```javascript
const SUPABASE_URL  = 'https://TU_PROYECTO.supabase.co';
const SUPABASE_ANON = 'TU_ANON_KEY_AQUI';
```

---

## 🐙 PUBLICAR EN GITHUB PAGES

### 1. Crear el repositorio
1. Ve a [github.com](https://github.com) → **New repository**
2. Nombre: `lords-terminal` (o `TuNombre.github.io` para URL más limpia)
3. Público

### 2. Subir los archivos
```bash
git init
git add .
git commit -m "Initial commit - Lord Daniel's Terminal"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/lords-terminal.git
git push -u origin main
```

### 3. Activar GitHub Pages
1. En el repositorio → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `/ (root)`
4. Clic en **Save**

Tu web estará en: `https://TU_USUARIO.github.io/lords-terminal/`

---

## ✏️ CÓMO AÑADIR CONTENIDO

1. Abre `https://TU_USUARIO.github.io/lords-terminal/admin/panel.html`
2. Inicia sesión con tu email y contraseña de Supabase
3. Desde el panel puedes:
   - **Predicciones**: Añadir, editar y eliminar predicciones por sección
   - **Análisis**: Escribir el texto de análisis de cada sección
     - Usa `*texto*` para resaltar palabras en verde brillante
     - Deja una línea en blanco entre párrafos

---

## 🎨 PERSONALIZACIÓN

- **Colores**: Edita las variables CSS al inicio de `css/style.css`
- **Datos de gráficos**: Desde el panel admin (próximamente) o editando `FALLBACK_DATA` en `js/charts.js`
- **Secciones**: Añade más secciones duplicando el bloque en `index.html` y añadiendo el botón en el nav
