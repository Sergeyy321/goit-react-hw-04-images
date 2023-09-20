import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'
import React from 'react';
import {ImageEl} from 'components/ImageGallery/ImageGallery.styled'

export const ImageGallery = ({ images, selectedImage }) => {
  return (
    <ImageEl>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          previewImg={webformatURL}
          tags={tags}
          selectedImage={() => selectedImage(largeImageURL,tags)}
        />
      ))}
    </ImageEl>
  );
};
