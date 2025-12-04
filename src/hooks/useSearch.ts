// src/hooks/useSearch.ts
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

  // --- BÚSQUEDA DE TEXTO (Rust) ---
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
      setWebState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Error al buscar documentos' 
      }));
    }
  };

  // --- BÚSQUEDA POR IMAGEN (Flask) ---
  const searchByImage = async (file: File) => {
    setImageState(prev => ({ 
      ...prev, 
      loading: true, 
      query: `Imagen: ${file.name}` 
    }));

    try {
      const { results, pagination } = await searchService.searchByImage(file, {}, 1);
      
      setImageState({
        results: results as ImageResult[],
        pagination,
        query: `Imagen: ${file.name}`,
        loading: false,
        error: null
      });
    } catch {
      setImageState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Error en búsqueda por imagen' 
      }));
    }
  };

  // --- PAGINACIÓN WEB ---
  const setPage = (page: number, type: 'web' | 'images') => {
    if (type === 'web') {
      searchText(webState.query, page);
    }
    // La búsqueda de imágenes no soporta paginación por ahora
  };

  // --- LIMPIAR RESULTADOS ---
  const clearResults = useCallback(() => {
    setWebState({ 
      results: [], 
      pagination: initialPagination, 
      query: '', 
      loading: false, 
      error: null 
    });
    setImageState({ 
      results: [], 
      pagination: initialPagination, 
      query: '', 
      loading: false, 
      error: null 
    });
  }, []);

  return {
    webState,
    imageState,
    searchText,
    searchByImage,
    clearResults,
    setPage
  };
};