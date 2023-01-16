import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const KEY = '32822912-5b663025839bc66c64f5a98ae';
const BASE_URL = 'https://pixabay.com/';
const formEl = document.querySelector('form#search-form');
const loadBtn = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');
const querry = formEl.searchQuery.value;
let page = 1;

const axios = require('axios');
let markup = ``;
formEl.addEventListener('submit', onSearch);
loadBtn.addEventListener('click', onClick);

function onClick(params) {
  page += 1;
  getPics(formEl.searchQuery.value)
    .then(pics => pics.map(pic => createMarkup(pic)))
    .catch(err => console.log(err));
}

function onSearch(evt) {
  evt.preventDefault();
  page = 1;
  galleryEl.innerHTML = '';
  // fetchPhotos();
  getPics(formEl.searchQuery.value)
    .then(pics => {
      pics.map(pic => createMarkup(pic));
      loadBtn.hidden = false;
    })
    .catch(err => console.log(err));
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

async function getPics(querry) {
  try {
    const response = await axios(
      `${BASE_URL}api/?key=${KEY}&q=${querry.trim()}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    const pics = response.data.hits;
    console.log(pics);
    return pics;
  } catch (error) {
    console.error(error);
  }
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
  markup = '';
  markup += `<div class="photo-card">
    <a 
    class="gallery__item" 
    href="${largeImageURL}">
  <img 
  class="gallery__image" 
  src="${webformatURL}" 
  alt="${tags}" 
  title="${tags}"
  />
</a>
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
  galleryEl.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

let gallery = new SimpleLightbox('.gallery__item', {
  captionDelay: 250,
  fadeSpeed: 250,
});
