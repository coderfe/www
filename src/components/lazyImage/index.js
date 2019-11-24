import React, { useState, useEffect } from 'react';

const LazyImage = ({ src, alt }) => {
  const [imageRef, setImageRef] = useState();

  const onLoad = event => {
    event.target.classList.add('loaded');
    event.target.classList.remove('lazy');
  };

  const onError = event => {
    event.target.classList.remove('lazy');
    event.target.classList.add('has-error');
  };

  useEffect(() => {
    let observer;

    if (imageRef) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.intersectionRatio > 0 || entry.isIntersecting) {
                imageRef.src = src;
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          }
        );
        observer.observe(imageRef);
      }
    }

    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageRef]);

  return (
    <img
      ref={setImageRef}
      alt={alt}
      className="lazy"
      data-src={src}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default LazyImage;
