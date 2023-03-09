import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ApiService, PER_PAGE } from './api-service.js';

const searchForm = document.querySelector('.search__form');
searchForm.addEventListener('submit', onSubmitSearch);
const loadMore = document.querySelector('.load-more');
loadMore.addEventListener('click', onLoadMore);
hideButtonMore();

const apiService = new ApiService();

function onSubmitSearch(e) {
  e.preventDefault();

  hideButtonMore();
  const currentInput = e.currentTarget.elements.searchQuery.value;
  const currentSearch = validateSearchString(currentInput);

  apiService.resetPage();

  if (!currentSearch) {
    clearGalleryContainer();
    Notify.warning('Enter text to search');
  } else {
    apiService.query = currentSearch;
    apiService.fetchItems().then(responseProcessing);
  }
}

function onLoadMore() {
  apiService.incrementPage();
  apiService.fetchItems().then(responseProcessing);
}

function validateSearchString(searchString) {
  return searchString.trim().replace(/ +/g, '+');
}

async function responseProcessing(responce) {
  if (responce.hits.length == 0) {
    Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    clearGalleryContainer();
    hideButtonMore();
  } else {
    Notify.success(`Hooray! We found ${responce.totalHits} images.`);
    renderMarkup(responce.hits);
    showButtonMore();
  }

  if (apiService.currentPage * PER_PAGE >= responce.totalHits) {
    Notify.warning(
      "We're sorry, but you've reached the end of search results.."
    );
    hideButtonMore();
  }
}

function renderMarkup(items) {
  const cardCollection = items.map(item => drawOneCard(item)).join('');
  const galleryContainer = document.querySelector('.gallery__container');
  clearGalleryContainer();
  galleryContainer.innerHTML = cardCollection;

  const gallery = new SimpleLightbox('.gallery__container a', {
    captionsData: 'alt',
    overlayOpacity: 0.8,
  });
}

function drawOneCard(item) {
  return `
  <a class="gallery__item" href="${item.largeImageURL}">
      <div class="gallery__image-container">
        <img class="gallery__image" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
      </div>
      <div class="info gallery__info">
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
  </a>
  `;
}

function clearGalleryContainer() {
  const galleryContainer = document.querySelector('.gallery__container');
  galleryContainer.innerHTML = '';
}

function hideButtonMore() {
  loadMore.style.visibility = 'hidden';
}

function showButtonMore() {
  loadMore.style.visibility = 'visible';
}
