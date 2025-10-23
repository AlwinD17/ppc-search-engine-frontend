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
---

**Desarrollado con ❤️ usando React, TypeScript y Tailwind CSS**