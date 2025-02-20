import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import { addStyles } from '@utils/utils';
import { theme } from '@styles/Arwes';

interface SciFiCarouselProps {
  styles?: React.CSSProperties;
  className?: string;
  images: string[];
}

const SciFiCarousel: React.FC<SciFiCarouselProps> = ({ images, styles, className }) => {
  return (
      <Carousel 
        className={`sci-fi-carousel ${className}`.trim()}
        interval={5000}
        wrap={true}
        style={styles}
        >
        {images.map((src, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 sci-fi-img"
              src={src}
              alt={`Sci-Fi Image ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
  );
};

addStyles(`
.sci-fi-img {
  border-radius: 15px;
  filter: brightness(0.8);
  transition: filter 0.3s ease-in-out;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.sci-fi-img:hover {
  filter: brightness(1) contrast(1.1);
}

.sci-fi-carousel {
  box-shadow: 0 0 30px ${theme.color.primary(9, {alpha:0.5})};
  border-radius: 15px;
  pointer-events: auto;
}


.carousel-inner {
  background: radial-gradient(circle at center, #1a1a1a, #0f0f0f);
  /*border: 1px solid ${theme.color.primary(6)}; #00ff99 Glowing border effect */
  box-shadow: 0 0 30px ${theme.color.primary(9, {alpha:0.5})}; /* rgba(0, 255, 153, 0.5)Glowing effect */
}

.carousel-control-prev,
.carousel-control-next {
  background-color: transparent;
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  pointer-events: auto;
  color: ${theme.color.primary(6)}; /* #00ff99Sci-fi glow */
}
`)

export default SciFiCarousel;