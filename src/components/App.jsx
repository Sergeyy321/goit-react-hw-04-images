import React, { useState, useEffect,useRef } from 'react';
import Modal from 'components/Modal/Modal';
import { Appstyle } from './App.styled';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import fetchGallery from './Api';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const App = () => {
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState('idle');
  const [error] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alt, setAlt] = useState(null);


let totalHits = useRef(null)
  useEffect(() => {
    const fetchData = async () => {
      if (loading !== 'pending') {
        setLoading('pending');
      }
 
      try {
        const imageData = await fetchGallery(name, page);
        totalHits.current = imageData.total;
        const imagesHits = imageData.hits;

        if (!imagesHits.length) {
          alert('No results were found.');
        }

        setImages(prevImages => [...prevImages, ...imagesHits]);
        setLoading('resolved');

        if (page > 1) {
          const CARD_HEIGHT = 300;
          window.scrollBy({
            top: CARD_HEIGHT * 2,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        alert(error);
        setLoading('rejected');
      }
    };
   
   const  fetch = (prevName, prevPage) => {
       if (name && (name !== prevName || page !== prevPage)) {
         fetchData();
       }
    }   
  fetch()
  }, [name, page,loading]);

  const reset = () => {
    setName('');
    setPage(1);
    setImages([]);
    setSelectedImage(null);
    setAlt(null);
    setLoading('idle');
  };

  const onFormSubmit = el => {
    if (name === el) {
      return;
    }
    reset();
    setName(el);
  };

  const onModalClose = () => {
    setSelectedImage(null);
    setAlt(null);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onSelectedImage = (largeImageUrl, tags) => {
    setSelectedImage(largeImageUrl);
    setAlt(tags);
  };

  return (
    <Appstyle>
      <Searchbar onSubmit={onFormSubmit} />
      {loading === 'pending' && <Loader />}
      {error && <h1>{error.message}</h1>}
      {images.length > 0 && (
        <ImageGallery images={images} selectedImage={onSelectedImage} />
      )}
      {images.length > 0 && images.length !== totalHits.current && (
        <Button onLoadMore={onLoadMore} />
      )}

      {selectedImage && (
        <Modal
          onModalClose={onModalClose}
          selectedImage={selectedImage}
          tags={alt}
        />
      )}
    </Appstyle>
  );
};

