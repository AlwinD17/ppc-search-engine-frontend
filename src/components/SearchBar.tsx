import React, { useState, useRef } from 'react';
import type { SearchBarProps } from '../types';

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onImageSearch, 
  loading = false, 
  placeholder = "Buscar en la web..." 
}) => {
  const [query, setQuery] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query.trim());
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSearch(file);
      setShowImageUpload(false);
    }
  };

  const handleImageSearchClick = () => {
    if (showImageUpload) {
      fileInputRef.current?.click();
    } else {
      setShowImageUpload(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-card rounded-full shadow-lg border border-border focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
          {/* Icono de búsqueda */}
          <div className="pl-4 pr-2">
            <svg 
              className="w-5 h-5 text-foreground opacity-40" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>

          {/* Input de búsqueda */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 py-3 px-2 text-foreground placeholder-foreground placeholder:opacity-50 bg-transparent border-none outline-none"
            disabled={loading}
          />

          {/* Botones de acción */}
          <div className="flex items-center pr-2 space-x-1">
            {/* Botón de búsqueda por imagen */}
            <button
              type="button"
              onClick={handleImageSearchClick}
              className="p-2 text-foreground  hover:text-primary hover:opacity-100 transition-colors duration-200"
              title="Búsqueda por imagen"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </button>

            {/* Botón de búsqueda */}
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Input oculto para subir imágenes */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </form>

      {/* Indicador de búsqueda por imagen */}
      {showImageUpload && (
        <div className="mt-2 text-center">
          <p className="text-sm text-foreground opacity-70">
            Haz clic en el ícono de imagen para subir una foto
          </p>
        </div>
      )}
    </div>
  );
};
export default SearchBar;
