import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchBar, ResultCard, Pagination, ImageGrid } from "../components";
import { useSearch } from "../hooks";
import type { SearchResult, ImageResult } from "../types";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";

  const {
    webState,
    imageState,
    searchText,
    searchImages,
    searchByImage,
    setPage,
  } = useSearch();
  const [searchType, setSearchType] = useState<"web" | "images">("web");

  const activeState = searchType === "web" ? webState : imageState;

  useEffect(() => {
    if (initialQuery) {
      searchText(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (query: string) => {
    if (searchType === "images") {
      searchImages(query);
    } else {
      searchText(query);
    }
  };

  const handleImageSearch = (image: File) => {
    searchByImage(image);
    setSearchType("images");
  };

  const handlePageChange = (page: number) => {
    setPage(page, searchType);
  };

  const handleResultClick = (result: SearchResult | ImageResult) => {
    window.open(result.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Resultados de búsqueda
            </h1>
            <p className="text-lg text-foreground opacity-70">
              {searchType === "web"
                ? "Resultados web"
                : "Resultados de imágenes"}
            </p>
          </div>

          <SearchBar
            onSearch={handleSearch}
            onImageSearch={handleImageSearch}
            loading={activeState.loading}
            placeholder={
              searchType === "images"
                ? "Buscar imágenes..."
                : "Buscar en la web..."
            }
          />

          {/* Tabs de búsqueda */}
          <div className="flex justify-center mt-8">
            <div className="bg-background rounded-lg p-1">
              <button
                onClick={() => setSearchType("web")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  searchType === "web"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-foreground opacity-70 hover:opacity-100"
                }`}
              >
                Web
              </button>
              <button
                onClick={() => {
                  setSearchType("images");
                  if (!imageState.results.length && webState.query)
                    searchImages(webState.query);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  searchType === "images"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-foreground opacity-70 hover:opacity-100"
                }`}
              >
                Imágenes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div
        className={`${
          searchType === "images"
            ? "w-full px-2 sm:px-4 lg:px-6 py-8"
            : "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        }`}
      >
        {activeState.loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-2 text-foreground opacity-60">
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                />
              </svg>
              <span>Buscando...</span>
            </div>
          </div>
        )}

        {activeState.error && (
          <div className="text-center py-12 text-primary">
            {activeState.error}
          </div>
        )}

        {activeState.results.length > 0 && (
          <>
            <div className="mb-6">
              <p className="text-sm text-foreground opacity-70">
                Aproximadamente{" "}
                {activeState.pagination.totalResults.toLocaleString()}{" "}
                resultados
              </p>
            </div>

            <div className="space-y-4">
              {searchType === "images" ? (
                <ImageGrid
                  images={activeState.results as ImageResult[]}
                  loading={activeState.loading}
                  onImageClick={handleResultClick}
                />
              ) : (
                <div className="space-y-4">
                  {activeState.results.map((result) => (
                    <ResultCard
                      key={result.id}
                      result={result}
                      onClick={handleResultClick}
                    />
                  ))}
                </div>
              )}
            </div>

            <Pagination
              pagination={activeState.pagination}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {!activeState.loading &&
          activeState.results.length === 0 &&
          activeState.query && (
            <div className="text-center py-12 text-foreground opacity-60">
              No se encontraron resultados
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchPage;
