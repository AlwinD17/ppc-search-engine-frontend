// src/pages/SearchPage.tsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchBar, ResultCard, Pagination, ImageGrid } from "../components";
import { useSearch } from "../hooks";
import type { SearchResult, ImageResult } from "../types";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";
  const searchType = queryParams.get("type") || "web";

  const {
    webState,
    imageState,
    searchText,
    searchByImage,
    setPage,
  } = useSearch();

  useEffect(() => {
    if (initialQuery && searchType === "web") {
      searchText(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (query: string) => {
    if (searchType === "web") {
      searchText(query);
      navigate(`/search?q=${encodeURIComponent(query)}&type=web`);
    }
  };

  const handleImageSearch = (image: File) => {
    searchByImage(image);
    navigate(`/search?type=image`);
  };

  const handlePageChange = (page: number) => {
    if (searchType === "web") {
      setPage(page, "web");
    }
  };

  const handleResultClick = (result: SearchResult | ImageResult) => {
    if (result.type === 'web') {
      alert(`Archivo: ${(result as SearchResult).domain}`);
    } else {
      window.open((result as ImageResult).originalUrl, '_blank');
    }
  };

  const handleImageClick = (image: ImageResult) => {
    window.open(image.originalUrl, '_blank');
  };

  const isImageSearch = searchType === "image";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => navigate('/')}
              >
                <h1 className="text-2xl font-bold text-foreground">KazeSeek</h1>
                <span className={`text-xs px-2 py-1 rounded ${
                  isImageSearch 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {isImageSearch ? 'Imágenes' : 'Web'}
                </span>
              </div>
            </div>
            
            <div className="w-full md:w-96">
              <SearchBar
                onSearch={handleSearch}
                onImageSearch={handleImageSearch}
                loading={isImageSearch ? imageState.loading : webState.loading}
                placeholder={
                  isImageSearch 
                    ? "Sube una imagen para buscar similares..." 
                    : "Buscar documentos..."
                }
                showImageButton={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {!isImageSearch && webState.pagination.totalResults > 0 && (
          <div className="mb-6 text-sm text-foreground opacity-60">
            Encontrados {webState.pagination.totalResults} resultados para "{webState.query}"
          </div>
        )}

        {isImageSearch && imageState.pagination.totalResults > 0 && (
          <div className="mb-6 text-sm text-foreground opacity-60">
            Encontradas {imageState.pagination.totalResults} imágenes similares
          </div>
        )}

        {/* Loading */}
        {(isImageSearch ? imageState.loading : webState.loading) && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-2 text-foreground opacity-60">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
              </svg>
              <span>{isImageSearch ? 'Buscando imágenes similares...' : 'Buscando...'}</span>
            </div>
          </div>
        )}

        {/* Error */}
        {(isImageSearch ? imageState.error : webState.error) && (
          <div className="text-center py-12 text-primary">
            {isImageSearch ? imageState.error : webState.error}
          </div>
        )}

        {/* Results */}
        {!isImageSearch && webState.results.length > 0 && (
          <>
            <div className="space-y-4">
              {webState.results.map((result) => (
                <ResultCard
                  key={result.id}
                  result={result}
                  onClick={handleResultClick}
                />
              ))}
            </div>

            <Pagination
              pagination={webState.pagination}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {isImageSearch && imageState.results.length > 0 && (
          <>
            <ImageGrid
              images={imageState.results}
              loading={imageState.loading}
              onImageClick={handleImageClick}
            />

            <Pagination
              pagination={imageState.pagination}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {/* No results */}
        {!isImageSearch && !webState.loading && webState.query && webState.results.length === 0 && (
          <div className="text-center py-12 text-foreground opacity-60">
            No se encontraron resultados para "{webState.query}"
          </div>
        )}

        {isImageSearch && !imageState.loading && imageState.query && imageState.results.length === 0 && (
          <div className="text-center py-12 text-foreground opacity-60">
            No se encontraron imágenes similares
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;