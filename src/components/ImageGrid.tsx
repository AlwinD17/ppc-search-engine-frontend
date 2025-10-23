import React from 'react';
import type { ImageGridProps } from '../types';
import ResultCard from './ResultCard';

const ImageGrid: React.FC<ImageGridProps> = ({ images, loading = false, onImageClick }) => {
  if (loading && images.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-square bg-card border border-border rounded-lg mb-2"></div>
            <div className="h-3 bg-card border border-border rounded mb-1"></div>
            <div className="h-2 bg-card border border-border rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <svg 
          className="w-16 h-16 text-foreground opacity-20 mx-auto mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
        <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron imágenes</h3>
        <p className="text-foreground opacity-60">Intenta con otros términos de búsqueda</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <ResultCard
            key={image.id}
            result={image}
            onClick={() => onImageClick(image)}
          />
        ))}
      </div>
      
      {loading && images.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="flex items-center space-x-2 text-foreground opacity-60">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
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
            <span>Cargando más imágenes...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
