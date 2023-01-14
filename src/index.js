import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const KEY = '32822912-5b663025839bc66c64f5a98ae';
const BASE_URL = 'https://pixabay.com/';
const formEl = document.querySelector('form#search-form');
const loadBtn = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');
let markup = ``;

formEl.addEventListener('submit', onSearch);

function onSearch(evt) {
  markup = '';
  evt.preventDefault();
  fetchPhotos();
  //   createMarkup();
}

async function fetchPhotos() {
  const querry = formEl.searchQuery.value;
  const pics = await fetch(
    `${BASE_URL}api/?key=${KEY}&q=${querry.trim()}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(resp => resp.json())
    .then(data => {
      return data.hits;
    });
  console.log(pics);
  pics.map(pic => createMarkup(pic));
  //   return pics;
  // .catch(err => console.log(err));
}

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  markup += `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
  galleryEl.innerHTML = markup;
}
