const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34108164-696ccaa844df7defeecc2723b';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';
const PAGE = '';
const PER_PAGE = '';

async function fetchFn(searchString) {
  const options = {
    key: API_KEY,
    q: searchString,
    lang: '',
    id: '',
    image_type: IMAGE_TYPE,
    orientation: ORIENTATION,
    category: '',
    min_width: '',
    min_height: '',
    colors: '',
    editors_choice: '',
    safesearch: SAFESEARCH,
    order: '',
    page: PAGE,
    per_page: PER_PAGE,
    callback: '',
    pretty: '',
  };
  const params = [];

  Object.entries(options).forEach(([key, value]) => {
    if (value) params.push(`${key}=${value}`);
  });
  const PARAMS = params.join('&');
  const FULL_REQEST = BASE_URL + '?' + PARAMS;

  // console.log('FULL_URL:', FULL_REQEST);

  const responce = await fetch(FULL_REQEST);
  return responce.json();
}

export { fetchFn };
