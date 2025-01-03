import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import GalleryCard from './GalleryCard';
import './DisplayPage.css';

const DisplayPage: React.FC = () => {
  const location = useLocation();
  const { items } = location.state || { items: [] };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imagesToLoad = items.length > 50 ? items.slice(0, 50) : items;

    const preloadImages = async () => {
      const loadedImages = await Promise.all(
        imagesToLoad.map((item: any) => {
          const firstLink = item.links[0].href;
          return new Promise((resolve) => {
            const img = new Image();
            img.src = firstLink;
            img.onload = () => resolve(img);
          });
        })
      );
      setPreloadedImages(loadedImages); 
      setIsLoading(false);
    };

    preloadImages();
  }, [items]);

  const nextItem = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="display-page">
      {isLoading ? (
        <div className="loading-screen">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <button className="arrow-button left" onClick={previousItem} disabled={currentIndex === 0}></button>
          {preloadedImages.length > 0 && <GalleryCard item={items[currentIndex]} />}
          <button className="arrow-button right" onClick={nextItem} disabled={currentIndex === items.length - 1}></button>
        </>
      )}

      <Link to="/" className="back-button">
        Back
      </Link>
    </div>
  );
};

export default DisplayPage;
