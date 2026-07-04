import { useState, useEffect } from 'react';

export function useImagePreloader(imageUrls: string[]) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const handleImageLoad = () => {
      loadedCount++;
      setProgress(Math.round((loadedCount / imageUrls.length) * 100));
      if (loadedCount === imageUrls.length) {
        setLoaded(true);
      }
    };

    const handleImageError = () => {
      // Keep tracking progress despite visual failures
      loadedCount++;
      setProgress(Math.round((loadedCount / imageUrls.length) * 100));
      if (loadedCount === imageUrls.length) {
        setLoaded(true);
      }
    };

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      images.push(img);
    });

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [imageUrls]);

  return { loaded, progress };
}
