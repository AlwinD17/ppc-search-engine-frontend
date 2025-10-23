import { useState, useCallback } from 'react';
import type { SearchState, SearchResult, ImageResult, SearchFilters, PaginationInfo } from '../types';
import { searchService } from '../services/SearchService';

const initialPagination: PaginationInfo = {
  currentPage: 1,
  totalPages: 0,
  totalResults: 0,
  resultsPerPage: 10,
  hasNextPage: false,
  hasPreviousPage: false
};

export const useSearch = () => {
  const [webState, setWebState] = useState<SearchState<SearchResult>>({
    results: [],
    pagination: initialPagination,
    query: '',
    loading: false,
    error: null
  });

  const [imageState, setImageState] = useState<SearchState<ImageResult>>({
    results: [],
    pagination: initialPagination,
    query: '',
    loading: false,
    error: null
  });

  // --- Web search (default) ---
  const searchText = async (query: string, page = 1) => {
    setWebState(prev => ({ ...prev, loading: true, query }));

    try {
      const { results, pagination } = await searchService.searchText(query, {}, page);

      setWebState({
        results,
        pagination,
        query,
        loading: false,
        error: null
      });
    } catch {
      setWebState(prev => ({ ...prev, loading: false, error: 'Error al buscar en la web' }));
    }
  };

  // --- Image search with infinite scroll ---
  const searchImages = async (query: string, page = 1) => {
    setImageState(prev => ({ ...prev, loading: true, query }));

    try {
      const { results, pagination } = await searchService.searchImages(query, {}, page);

      setImageState(prev => ({
        ...prev,
        results: page === 1 ? results : [...prev.results, ...results], // 👈 concat for infinite scroll
        pagination,
        loading: false,
        error: null
      }));
    } catch {
      setImageState(prev => ({ ...prev, loading: false, error: 'Error al buscar imágenes' }));
    }
  };

  // --- Search by image upload ---
  const searchByImage = async (file: File) => {
    setImageState(prev => ({ ...prev, loading: true, query: '[búsqueda por imagen]' }));

    try {
      const { results, pagination } = await searchService.searchByImage(file, {}, 1);
      setImageState({
        results,
        pagination,
        query: '[búsqueda por imagen]',
        loading: false,
        error: null
      });
    } catch {
      setImageState(prev => ({ ...prev, loading: false, error: 'Error en búsqueda por imagen' }));
    }
  };

  // --- Infinite scroll handler for images ---
  const loadMoreImages = useCallback(async () => {
    if (imageState.loading || !imageState.pagination.hasNextPage) return;

    const nextPage = imageState.pagination.currentPage + 1;
    await searchImages(imageState.query, nextPage);
  }, [imageState]);

  // --- Regular pagination handler for web ---
  const setPage = (page: number, type: 'web' | 'images') => {
    if (type === 'web') {
      searchText(webState.query, page);
    } else {
      searchImages(imageState.query, page);
    }
  };

  // --- Clear results (for UI resets) ---
  const clearResults = useCallback(() => {
    setWebState({ results: [], pagination: initialPagination, query: '', loading: false, error: null });
    setImageState({ results: [], pagination: initialPagination, query: '', loading: false, error: null });
  }, []);

  return {
    webState,
    imageState,
    searchText,
    searchImages,
    searchByImage,
    loadMoreImages,
    clearResults,
    setPage
  };
};
