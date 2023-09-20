
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';


 async function fetchGallery(name, page) {
  const resp = await axios.get(
    `?q=${name}&page=${page}&key=33447079-0ba3d1fd30cda0252aa7b7ada&image_type=photo&orientation=horizontal&per_page=12`
  );
  return resp.data;
}
export default fetchGallery;