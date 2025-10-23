// Tipos para resultados de búsqueda
export interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnail?: string;
  type: 'web' | 'image';
  domain: string;
  publishedDate?: string;
}

// Tipos para resultados de imágenes
export interface ImageResult {
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

// Tipos para paginación
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Tipos para filtros de búsqueda
export interface SearchFilters {
  type: 'all' | 'web' | 'images';
  dateRange?: 'day' | 'week' | 'month' | 'year' | 'all';
  size?: 'small' | 'medium' | 'large' | 'all';
  color?: 'color' | 'black' | 'white' | 'transparent' | 'all';
  safeSearch: boolean;
}

// Tipos para búsqueda por similitud de imagen
export interface ImageSearchRequest {
  image: File;
  filters?: Partial<SearchFilters>;
}

// Tipos para el estado de búsqueda
export interface SearchState<T> {
  results: T[];
  pagination: PaginationInfo;
  query: string;
  loading: boolean;
  error: string | null;
}

// Tipos para el contexto de tema
export interface ThemeContextType {
  theme: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  toggleTheme: () => void;
  updateColors: (colors: Partial<ThemeContextType['colors']>) => void;
}

// Tipos para componentes
export interface SearchBarProps {
  onSearch: (query: string, filters?: Partial<SearchFilters>) => void;
  onImageSearch: (image: File) => void;
  loading?: boolean;
  placeholder?: string;
}

export interface ResultCardProps {
  result: SearchResult | ImageResult;
  onClick: (result: SearchResult | ImageResult) => void;
}

export interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

export interface ImageGridProps {
  images: ImageResult[];
  loading?: boolean;
  onImageClick: (image: ImageResult) => void;
}

// Tipos para servicios
export interface SearchService {
  searchText: (query: string, filters?: Partial<SearchFilters>, page?: number) => Promise<{
    results: SearchResult[];
    pagination: PaginationInfo;
  }>;
  
  searchImages: (query: string, filters?: Partial<SearchFilters>, page?: number) => Promise<{
    results: ImageResult[];
    pagination: PaginationInfo;
  }>;
  
  searchByImage: (image: File, filters?: Partial<SearchFilters>, page?: number) => Promise<{
    results: (SearchResult | ImageResult)[];
    pagination: PaginationInfo;
  }>;
}
