import debounce from 'lodash.debounce';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchFn } from './fetchFn.js';

const searchForm = document.querySelector('.search-form');
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
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = cardCollection;

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    overlayOpacity: 1,
  });
}

function drawOneCard(item) {
  return `
  <a claass="photo" href="${item.largeImageURL}">

      <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${item.likes}
        </p>
        <p class="info-item"> 
          <b>Views</b>
          ${item.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${item.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${item.downloads}
        </p>
      </div>

  </a>
  `;
}
