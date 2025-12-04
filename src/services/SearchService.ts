// src/services/SearchService.ts
import type { 
  SearchService as ISearchService, 
  SearchResult, 
  ImageResult, 
  PaginationInfo, 
  SearchFilters 
} from '../types';

// API response from Rust backend (búsqueda web)
interface RustSearchResult {
  filename: string;
  title: string;
  snippet: string;
  relevance: number;
}

interface RustSearchResponse {
  query: string;
  total_results: number;
  results: RustSearchResult[];
}

// API response from Flask backend (búsqueda de imágenes)
interface FlaskImageResult {
  id: string | number;
  score?: number;
  similarity_percent: string;
  image_path: string;
}

interface FlaskSearchResponse {
  success: boolean;
  task_id?: string;
  status?: string;
  message?: string;
  status_url?: string;
  query_image?: string;
  total_results?: number;
  results?: FlaskImageResult[];
  error?: string;
}

class SearchService implements ISearchService {
  // Backend Rust para búsqueda de texto
  private rustBackendUrl: string = 'http://127.0.0.1:3000';
  
  // Backend Flask para búsqueda de imágenes
  private flaskBackendUrl: string = 'http://localhost:5000';

  // ========== BÚSQUEDA DE TEXTO (Rust) ==========
  async searchText(
    query: string, 
    filters: Partial<SearchFilters> = {}, 
    page: number = 1
  ): Promise<{ results: SearchResult[]; pagination: PaginationInfo }> {
    if (!query.trim()) {
      return {
        results: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalResults: 0,
          resultsPerPage: 10,
          hasNextPage: false,
          hasPreviousPage: false
        }
      };
    }

    try {
      const response = await fetch(
        `${this.rustBackendUrl}/api/search?q=${encodeURIComponent(query)}&limit=50`
      );
      
      if (!response.ok) {
        throw new Error(`Búsqueda falló: ${response.statusText}`);
      }

      const data: RustSearchResponse = await response.json();

      // Transformar resultados de Rust a formato frontend
      const results: SearchResult[] = data.results.map((item, index) => ({
        id: `${item.filename}-${index}`,
        title: item.title || item.filename,
        url: `#${item.filename}`,
        description: item.snippet,
        type: 'web' as const,
        domain: item.filename,
        relevance: item.relevance,
      }));

      // Paginación del lado del cliente
      const resultsPerPage = 10;
      const startIndex = (page - 1) * resultsPerPage;
      const endIndex = startIndex + resultsPerPage;
      const paginatedResults = results.slice(startIndex, endIndex);

      const pagination: PaginationInfo = {
        currentPage: page,
        totalPages: Math.ceil(results.length / resultsPerPage),
        totalResults: data.total_results,
        resultsPerPage,
        hasNextPage: endIndex < results.length,
        hasPreviousPage: page > 1
      };

      return {
        results: paginatedResults,
        pagination
      };
    } catch (error) {
      console.error('Error en búsqueda de texto:', error);
      throw error;
    }
  }

  // ========== BÚSQUEDA DE IMÁGENES POR TEXTO (No implementado) ==========
  async searchImages(
    query: string, 
    filters: Partial<SearchFilters> = {}, 
    page: number = 1
  ): Promise<{ results: ImageResult[]; pagination: PaginationInfo }> {
    // Este método no está implementado en ninguno de los backends
    return {
      results: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        resultsPerPage: 20,
        hasNextPage: false,
        hasPreviousPage: false
      }
    };
  }

  // ========== BÚSQUEDA POR IMAGEN (Flask) ==========
  async searchByImage(
    image: File, 
    filters: Partial<SearchFilters> = {}, 
    page: number = 1
  ): Promise<{ results: (SearchResult | ImageResult)[]; pagination: PaginationInfo }> {
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Paso 1: Subir imagen a Flask
      const startResponse = await fetch(`${this.flaskBackendUrl}/search`, {
        method: 'POST',
        body: formData,
      });

      if (!startResponse.ok) {
        throw new Error(`Error al subir imagen: ${startResponse.statusText}`);
      }

      const startData: FlaskSearchResponse = await startResponse.json();
      
      if (!startData.task_id) {
        throw new Error('No se recibió ID de tarea del servidor');
      }

      // Paso 2: Esperar resultados con polling
      const results = await this.pollFlaskTask(startData.task_id);
      
      if (!results.success || !results.results) {
        throw new Error(results.error || 'Error en la búsqueda');
      }

      // Paso 3: Formatear resultados
      const resultsPerPage = 12;
      const totalPages = Math.ceil((results.total_results || 0) / resultsPerPage);
      const startIndex = (page - 1) * resultsPerPage;
      const endIndex = startIndex + resultsPerPage;
      const paginatedResults = results.results.slice(startIndex, endIndex);

      // Paso 4: Convertir a ImageResult
      const formattedResults: ImageResult[] = paginatedResults.map((result, index) => {
        const imageUrl = this.formatImageUrl(result.image_path);
        
        return {
          id: `${result.id}-${index}`,
          title: `Imagen ${index + 1} (${result.similarity_percent})`,
          url: imageUrl,
          thumbnail: imageUrl,
          originalUrl: imageUrl,
          width: 400,
          height: 400,
          alt: `Imagen similar con ${result.similarity_percent} de similitud`,
          source: 'Motor de búsqueda de imágenes'
        };
      });

      const pagination: PaginationInfo = {
        currentPage: page,
        totalPages,
        totalResults: results.total_results || 0,
        resultsPerPage,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      };

      return {
        results: formattedResults,
        pagination
      };
    } catch (error: any) {
      console.error('Error en búsqueda por imagen:', error);
      throw error;
    }
  }

  // ========== HELPERS PARA FLASK ==========
  private async pollFlaskTask(
    taskId: string, 
    maxAttempts: number = 30, 
    interval: number = 2000
  ): Promise<FlaskSearchResponse> {
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`${this.flaskBackendUrl}/task_status/${taskId}`);
        const data: any = await response.json();

        if (data.state === 'SUCCESS') {
          return {
            success: true,
            total_results: data.result?.total_results || 0,
            results: data.result?.results || [],
            query_image: data.result?.query_image || '',
          };
        } else if (data.state === 'FAILURE') {
          return {
            success: false,
            error: data.error || 'La tarea falló',
          };
        } else {
          // PENDING, STARTED, etc. - esperar y reintentar
          await new Promise(resolve => setTimeout(resolve, interval));
          attempts++;
        }
      } catch (error) {
        console.error('Error en polling:', error);
        attempts++;
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    }

    return {
      success: false,
      error: 'La búsqueda tomó demasiado tiempo',
    };
  }

  private formatImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    
    // Si ya es una URL completa
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Extraer nombre del archivo
    const filename = imagePath.split('/').pop() || imagePath.split('\\').pop() || '';
    
    // Determinar si es de uploads o batch_uploads
    if (imagePath.includes('uploads')) {
      return `${this.flaskBackendUrl}/uploads/${filename}`;
    } else if (imagePath.includes('batch_uploads')) {
      return `${this.flaskBackendUrl}/batch_uploads/${filename}`;
    } else {
      return `${this.flaskBackendUrl}/uploads/${filename}`;
    }
  }

  // ========== MÉTODOS ADICIONALES ==========
  async getSuggestions(query: string): Promise<string[]> {
    return [];
  }

  // Información del sistema Flask
  async getFlaskHealth() {
    try {
      const response = await fetch(`${this.flaskBackendUrl}/health`);
      return await response.json();
    } catch (error) {
      console.error('Error verificando salud de Flask:', error);
      throw error;
    }
  }

  async getFlaskCollectionInfo() {
    try {
      const response = await fetch(`${this.flaskBackendUrl}/collection_info`);
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo información de colección:', error);
      throw error;
    }
  }
}

export const searchService = new SearchService();
export default SearchService;