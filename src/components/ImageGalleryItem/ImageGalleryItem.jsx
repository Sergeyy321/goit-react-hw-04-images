import {
  Image,
  GalleryItem,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGalleryItem = ({ tags, previewImg, selectedImage }) => {
  return (
    <GalleryItem>
      <Image src={previewImg} alt={tags} onClick={selectedImage} />
    </GalleryItem>
  );
};