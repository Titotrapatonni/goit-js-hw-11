import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryEl = document.querySelector('.gallery');

let gallery = new SimpleLightbox('.gallery__item', {
  fadeSpeed: 250,
});

export function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  let markup = '';
  markup += `<div class="photo-card">
    <a 
    class="gallery__item" 
    href="${largeImageURL}">
  <img 
  class="gallery__image" 
  src="${webformatURL}" 
  alt="${tags}"
  loading="lazy"
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
