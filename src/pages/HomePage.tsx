import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components';
import { useSearch } from '../hooks';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { searchText, searchByImage } = useSearch();

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    await searchText(query);
    navigate(`/search?q=${encodeURIComponent(query)}&type=web`);
  };

  const handleImageSearch = async (image: File) => {
    if (!image) return;
    await searchByImage(image);
    navigate(`/search?type=image-reverse`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Título */}
          <h1 className="text-7xl font-[fascinate] font-semibold text-foreground mb-6">
            KazeSeek
          </h1>
          <p className="text-xl text-foreground opacity-70 mb-12 max-w-2xl mx-auto">
            Encuentra exactamente lo que necesitas con nuestro motor de búsqueda inteligente. 
            Busca en la web o encuentra información a partir de una imagen.
          </p>

          {/* Barra de búsqueda principal */}
          <div className="mb-12">
            <SearchBar
              onSearch={handleSearch}
              onImageSearch={handleImageSearch}
              placeholder="Buscar en la web..."
            />
          </div>

          {/* Características */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Feature
              title="Búsqueda Inteligente"
              description="Algoritmos avanzados que entienden tu intención y te muestran los resultados más relevantes."
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              }
            />
            <Feature
              title="Búsqueda por Imagen"
              description="Sube una imagen y encuentra contenido similar o información relacionada."
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              }
            />
            <Feature
              title="Resultados Rápidos"
              description="Obtén resultados instantáneos con nuestra infraestructura optimizada para velocidad."
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <div className="text-center">
    <div className="w-12 h-12 bg-primary  rounded-lg flex items-center justify-center mx-auto mb-4">
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {icon}
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-foreground opacity-70">{description}</p>
  </div>
);

export default HomePage;
