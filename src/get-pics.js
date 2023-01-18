import axios from 'axios';

const KEY = '32822912-5b663025839bc66c64f5a98ae';
const BASE_URL = 'https://pixabay.com/';

export async function getPics(querry, page) {
  try {
    const response = await axios(
      `${BASE_URL}api/?key=${KEY}&q=${querry}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    const pics = await response.data;
    return pics;
  } catch (error) {
    throw new Error(error);
  }
}
