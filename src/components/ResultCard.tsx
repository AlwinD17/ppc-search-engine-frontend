import React from "react";
import type { ResultCardProps, SearchResult, ImageResult } from "../types";

const ResultCard: React.FC<ResultCardProps> = ({ result, onClick }) => {
  const isImageResult = "width" in result && "height" in result;

  const handleClick = () => onClick(result);

  if (isImageResult) {
    const image = result as ImageResult;

    return (
      <div
        className="group relative cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition break-inside-avoid mb-4 flex justify-center"
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        <img
          src={image.thumbnail}
          alt={image.alt || image.title}
          className="h-[300px] w-auto group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <h3 className="text-white text-sm font-medium line-clamp-2">
            {image.title}
          </h3>
          <p className="text-gray-200 text-xs mt-1 truncate">
            {image.source}
          </p>
        </div>
      </div>
    );
  }

  const web = result as SearchResult;

  return (
    <div
      className="cursor-pointer rounded-lg border border-border bg-card hover:shadow-sm hover:border-hover p-4 transition group"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start space-x-4">
        {web.thumbnail && (
          <img
            src={web.thumbnail}
            alt={web.title}
            className="w-12 h-12 rounded object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-xs text-foreground opacity-50 truncate">{web.domain}</p>
            {web.relevance !== undefined && (
              <span className="text-xs bg-background text-foreground opacity-60 px-2 py-0.5 rounded">
                Score: {web.relevance.toFixed(2)}
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-primary hover:underline line-clamp-2">
            {web.title}
          </h3>
          <p className="text-sm text-foreground opacity-70 mt-1 line-clamp-2">
            {web.description}
          </p>
          {web.publishedDate && (
            <p className="text-xs text-foreground opacity-40 mt-2">
              {new Date(web.publishedDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ResultCard;
