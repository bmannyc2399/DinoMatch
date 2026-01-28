import React, { useState } from 'react';
import ImageSkeletonLoader from './ImageSkeletonLoader';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0">
          <ImageSkeletonLoader />
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400 font-bold p-4 text-center">
          Dino Image Missing!
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};

export default ImageWithLoader;