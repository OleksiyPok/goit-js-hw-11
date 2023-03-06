import debounce from 'lodash.debounce';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchFn } from './fetchFn.js';

const searchForm = document.querySelector('.search__form');
searchForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const currentInput = e.currentTarget.elements.searchQuery.value;
  const currentSearch = currentInput.trim().replace(/ +/g, '+');
  if (currentSearch) sendRequest(currentSearch);

  // console.log('currentSearch:', currentSearch);
}

async function sendRequest(searchString) {
  const responce = await fetchFn(searchString);
  console.log('responce:', responce);
  if (responce.hits.length == 0) {
    Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notify.info(`Hooray! We found ${responce.totalHits} images.`);
    renderMarkup(responce.hits);
  }
}

function renderMarkup(items) {
  const cardCollection = items.map(item => drawOneCard(item)).join('');
  const galleryContainer = document.querySelector('.gallery__container');
  galleryContainer.innerHTML = cardCollection;

  const lightbox = new SimpleLightbox('.gallery__container a', {
    captionsData: 'alt',
    overlayOpacity: 1,
  });
}

function drawOneCard(item) {
  return `
  <a class="photo" href="${item.largeImageURL}">
    <div class="photo__card">
      <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
      <div class="info">
        <p class="info__item">
          <b>Likes</b>
          ${item.likes}
        </p>
        <p class="info__item"> 
          <b>Views</b>
          ${item.views}
        </p>
        <p class="info__item">
          <b>Comments</b>
          ${item.comments}
        </p>
        <p class="info__item">
          <b>Downloads</b>
          ${item.downloads}
        </p>
      </div>
    </div>
  </a>
  `;
}
