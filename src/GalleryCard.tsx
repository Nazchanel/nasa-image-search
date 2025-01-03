import React from 'react';
import './GalleryCard.css';

interface GalleryCardProps {
  item: {
    href: string; 
    data: {
      title: string;
      date_created: string;
      description: string;
      links: { href: string }[];
    }[];
  };
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item }) => {
  const { data, links } = item;
  const firstData = data[0];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="gallery-card">
      <div className="gallery-card-left">
        <h1 className="title">{firstData.title}</h1>
        <img
          src={links[0].href}
          alt={firstData.title}
          className="gallery-image"
        />
        <p className="date">{formatDate(firstData.date_created)}</p>
      </div>
      <div className="gallery-card-right">
        <p className="description">{firstData.description}</p>
      </div>
    </div>
  );
};


export default GalleryCard;
