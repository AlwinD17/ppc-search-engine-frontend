import type { SearchService as ISearchService, SearchResult, ImageResult, PaginationInfo, SearchFilters } from '../types';

// API response from our Rust backend
interface BackendSearchResult {
  filename: string;
  title: string;
  snippet: string;
  relevance: number;
}

interface BackendSearchResponse {
  query: string;
  total_results: number;
  results: BackendSearchResult[];
}

class SearchService implements ISearchService {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://127.0.0.1:3000') {
    this.baseUrl = baseUrl;
  }

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
          resultsPerPage: 50,
          hasNextPage: false,
          hasPreviousPage: false
        }
      };
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/api/search?q=${encodeURIComponent(query)}&limit=50`
      );
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data: BackendSearchResponse = await response.json();

      // Transform backend results to frontend format
      const results: SearchResult[] = data.results.map((item, index) => ({
        id: `${item.filename}-${index}`,
        title: item.title || item.filename,
        url: `#${item.filename}`, // Could be expanded to real URLs
        description: item.snippet,
        type: 'web' as const,
        domain: item.filename,
        relevance: item.relevance,
      }));

      // Simple client-side pagination
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
      console.error('Search error:', error);
      throw error;
    }
  }

  async searchImages(
    query: string, 
    filters: Partial<SearchFilters> = {}, 
    page: number = 1
  ): Promise<{ results: ImageResult[]; pagination: PaginationInfo }> {
    // Image search not supported by our backend - return empty results
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

  async searchByImage(
    image: File, 
    filters: Partial<SearchFilters> = {}, 
    page: number = 1
  ): Promise<{ results: (SearchResult | ImageResult)[]; pagination: PaginationInfo }> {
    // Image upload search not supported by our backend
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

  async getSuggestions(query: string): Promise<string[]> {
    // Suggestions not implemented in backend
    return [];
  }
}

export const searchService = new SearchService();
export default SearchService;
