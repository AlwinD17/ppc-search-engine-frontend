# KazeSeek - Frontend

Un motor de búsqueda moderno construido con React, TypeScript y Vite. Incluye funcionalidades de búsqueda web, búsqueda de imágenes y búsqueda por similitud de imagen.

## 🚀 Características

- **Búsqueda Web**: Búsqueda de texto con resultados paginados
- **Búsqueda de Imágenes**: Vista en grilla para resultados de imágenes
- **Búsqueda por Similitud**: Sube una imagen y encuentra contenido similar
- **Tema Personalizable**: Sistema de temas con colores personalizables
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **TypeScript**: Tipado completo para mejor desarrollo
- **Tailwind CSS**: Estilos modernos y consistentes

## 🛠️ Tecnologías

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción
- **Tailwind CSS** - Framework de CSS
- **React Router** - Enrutamiento
- **Context API** - Gestión de estado global

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── SearchBar.tsx   # Barra de búsqueda
│   ├── ResultCard.tsx  # Tarjeta de resultado
│   ├── Pagination.tsx  # Componente de paginación
│   └── ImageGrid.tsx   # Grilla de imágenes
├── pages/              # Páginas principales
│   ├── HomePage.tsx    # Página de inicio
│   ├── SearchPage.tsx  # Página de búsqueda web
│   └── ImagesPage.tsx  # Página de búsqueda de imágenes
├── layout/             # Componentes de layout
│   ├── Header.tsx      # Encabezado
│   └── Footer.tsx      # Pie de página
├── hooks/              # Hooks personalizados
│   └── useSearch.ts    # Hook para búsqueda
├── services/           # Servicios
│   └── SearchService.ts # Servicio de búsqueda
├── context/            # Contextos
│   └── ThemeContext.tsx # Contexto de tema
├── types/              # Definiciones de tipos
│   └── index.ts        # Tipos principales
└── assets/             # Recursos estáticos
    ├── images/         # Imágenes
    └── icons/          # Iconos
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd motor-busqueda-frontend
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   ```
   http://localhost:5173
   ```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo
npm run build         # Construye para producción
npm run preview       # Vista previa de la build
npm run lint          # Ejecuta el linter
```

## 🎨 Personalización de Temas

El proyecto incluye un sistema de temas configurable desde código que sigue las mejores prácticas de Tailwind CSS.

### Configuración de Colores

Los colores se configuran en `src/config/theme.ts`:

```typescript
export const themeConfig = {
  // Colores primarios
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    600: '#2563eb',
    // ... más variantes
  },
  
  // Colores secundarios
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    500: '#64748b',
    // ... más variantes
  },
  
  // Tema claro
  light: {
    background: '#f9fafb',
    foreground: '#111827',
    card: '#ffffff',
    // ... más colores semánticos
  },
  
  // Tema oscuro
  dark: {
    background: '#0f172a',
    foreground: '#f8fafc',
    card: '#1e293b',
    // ... más colores semánticos
  },
};
```

### Cómo Cambiar los Colores

1. **Edita el archivo `src/config/theme.ts`**
2. **Modifica los valores de color** según tus necesidades
3. **Los cambios se aplicarán automáticamente** al recargar la página

```typescript
// Ejemplo: Cambiar a un esquema verde
export const themeConfig = {
  primary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    600: '#059669', // Verde
    // ... resto de variantes
  },
  // ... resto de configuración
};
```

### Uso del Contexto de Tema

```typescript
import { useTheme } from './hooks/useTheme';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <button onClick={toggleTheme}>
        Cambiar a tema {theme === 'light' ? 'oscuro' : 'claro'}
      </button>
    </div>
  );
};
```

### Funciones de Tema Disponibles

```typescript
import { applyThemeColors, applyDarkTheme, applyLightTheme } from './utils/themeUtils';

// Aplicar colores base
applyThemeColors();

// Cambiar a tema oscuro
applyDarkTheme();

// Cambiar a tema claro
applyLightTheme();
```

## 🔍 Funcionalidades de Búsqueda

### Búsqueda de Texto

```typescript
const { searchText } = useSearch();

// Búsqueda básica
await searchText('react typescript');

// Búsqueda con filtros
await searchText('imágenes', { 
  type: 'images',
  dateRange: 'week',
  safeSearch: true 
});
```

### Búsqueda de Imágenes

```typescript
const { searchImages } = useSearch();

await searchImages('naturaleza', {
  size: 'large',
  color: 'color'
});
```

### Búsqueda por Similitud

```typescript
const { searchByImage } = useSearch();

const handleImageUpload = (file: File) => {
  searchByImage(file);
};
```

## 📱 Componentes Principales

### SearchBar

Barra de búsqueda con soporte para texto e imágenes.

```typescript
<SearchBar
  onSearch={(query) => handleSearch(query)}
  onImageSearch={(file) => handleImageSearch(file)}
  loading={isLoading}
  placeholder="Buscar..."
/>
```

### ResultCard

Tarjeta para mostrar resultados de búsqueda.

```typescript
<ResultCard
  result={searchResult}
  onClick={(result) => handleResultClick(result)}
/>
```

### ImageGrid

Grilla responsiva para mostrar imágenes.

```typescript
<ImageGrid
  images={imageResults}
  loading={isLoading}
  onImageClick={(image) => handleImageClick(image)}
/>
```

## 🎯 Tipos TypeScript

### SearchResult

```typescript
interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnail?: string;
  type: 'web' | 'image';
  domain: string;
  publishedDate?: string;
}
```

### ImageResult

```typescript
interface ImageResult {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  originalUrl: string;
  width: number;
  height: number;
  alt?: string;
  source: string;
}
```

## 🔧 Configuración del Servicio de Búsqueda

El servicio de búsqueda está configurado para usar datos mock. Para conectar con un backend real:

```typescript
// src/services/SearchService.ts
class SearchService {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string = 'https://api.tu-backend.com', apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async searchText(query: string, filters?: SearchFilters, page?: number) {
    const response = await fetch(`${this.baseUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ query, filters, page })
    });
    
    return response.json();
  }
}
```

## 🚀 Despliegue

### Build para Producción

```bash
npm run build
```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=https://api.tu-backend.com
VITE_API_KEY=tu-api-key
```

### Despliegue en Vercel

1. Conecta tu repositorio con Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Despliegue en Netlify

1. Conecta tu repositorio con Netlify
2. Configura el build command: `npm run build`
3. Configura el publish directory: `dist`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes alguna pregunta o problema, por favor:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

## 🔮 Roadmap

- [ ] Integración con APIs reales de búsqueda
- [ ] Búsqueda por voz
- [ ] Filtros avanzados
- [ ] Historial de búsquedas
- [ ] Búsqueda en tiempo real
- [ ] Modo offline
- [ ] PWA (Progressive Web App)

---

**Desarrollado con ❤️ usando React, TypeScript y Tailwind CSS**