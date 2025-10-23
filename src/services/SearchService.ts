import type { SearchService as ISearchService, SearchResult, ImageResult, PaginationInfo, SearchFilters } from '../types';
import { mockWebResults, mockImageResults } from '../mocks';

class SearchService implements ISearchService {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string = '', apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async searchText(
    query: string, 
    filters: Partial<SearchFilters> = {}, 
    page: number = 1
  ): Promise<{ results: SearchResult[]; pagination: PaginationInfo }> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Filtrar resultados basados en la query
    const filteredResults = mockWebResults.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase())
    );

    const resultsPerPage = 10;
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const paginatedResults = filteredResults.slice(startIndex, endIndex);

    const pagination: PaginationInfo = {
      currentPage: page,
      totalPages: Math.ceil(filteredResults.length / resultsPerPage),
      totalResults: filteredResults.length,
      resultsPerPage,
      hasNextPage: endIndex < filteredResults.length,
      hasPreviousPage: page > 1
    };

    return {
      results: paginatedResults,
      pagination
    };
  }

  async searchImages(
    query: string, 
    filters: Partial<SearchFilters> = {}, 
    page: number = 1
  ): Promise<{ results: ImageResult[]; pagination: PaginationInfo }> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Filtrar resultados basados en la query
    const filteredResults = mockImageResults.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.alt?.toLowerCase().includes(query.toLowerCase())
    );

    const resultsPerPage = 20;
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const paginatedResults = filteredResults.slice(startIndex, endIndex);

    const pagination: PaginationInfo = {
      currentPage: page,
      totalPages: Math.ceil(filteredResults.length / resultsPerPage),
      totalResults: filteredResults.length,
      resultsPerPage,
      hasNextPage: endIndex < filteredResults.length,
      hasPreviousPage: page > 1
    };

    return {
      results: paginatedResults,
      pagination
    };
  }

  async searchByImage(
    image: File, 
    filters: Partial<SearchFilters> = {}, 
    page: number = 1
  ): Promise<{ results: (SearchResult | ImageResult)[]; pagination: PaginationInfo }> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 2000));

    // En una implementación real, aquí enviarías la imagen al backend
    // Por ahora, devolvemos resultados mock
    const results = [...mockWebResults, ...mockImageResults];
    
    const resultsPerPage = 10;
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const paginatedResults = results.slice(startIndex, endIndex);

    const pagination: PaginationInfo = {
      currentPage: page,
      totalPages: Math.ceil(results.length / resultsPerPage),
      totalResults: results.length,
      resultsPerPage,
      hasNextPage: endIndex < results.length,
      hasPreviousPage: page > 1
    };

    return {
      results: paginatedResults,
      pagination
    };
  }
}

export const searchService = new SearchService();
export default SearchService;
