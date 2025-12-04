import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SearchBar, ResultCard, Pagination } from "../components";
import { useSearch } from "../hooks";
import type { SearchResult, ImageResult } from "../types";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";

  const {
    webState,
    searchText,
    setPage,
  } = useSearch();

  useEffect(() => {
    if (initialQuery) {
      searchText(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (query: string) => {
    searchText(query);
  };

  const handleImageSearch = (_image: File) => {
    // Image search not supported
    console.log("Image search not supported by this backend");
  };

  const handlePageChange = (page: number) => {
    setPage(page, "web");
  };

  const handleResultClick = (result: SearchResult | ImageResult) => {
    // For now, just show the filename since we're searching local HTML files
    alert(`File: ${(result as SearchResult).domain}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              PruSearch
            </h1>
            <p className="text-lg text-foreground opacity-70">
              Inverted Index + TF-IDF + N-gram Fuzzy Search
            </p>
          </div>

          <SearchBar
            onSearch={handleSearch}
            onImageSearch={handleImageSearch}
            loading={webState.loading}
            placeholder="Search documents..."
          />

          {/* Stats */}
          {webState.pagination.totalResults > 0 && (
            <div className="text-center mt-6 text-sm text-foreground opacity-60">
              Found {webState.pagination.totalResults} results for "{webState.query}"
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {webState.loading && (
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
              <span>Searching...</span>
            </div>
          </div>
        )}

        {webState.error && (
          <div className="text-center py-12 text-primary">
            {webState.error}
          </div>
        )}

        {webState.results.length > 0 && (
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

        {!webState.loading &&
          webState.results.length === 0 &&
          webState.query && (
            <div className="text-center py-12 text-foreground opacity-60">
              No results found
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchPage;
