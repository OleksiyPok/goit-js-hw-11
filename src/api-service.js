import axios from 'axios';

// to add a parameter to request, add the parameter as a string constant
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34108164-696ccaa844df7defeecc2723b';
const IMAGE_TYPE = 'photo';
const CATEGORY = '';
const MIN_WIGHT = '';
const MIN_HEIGHT = '';
const COLORS = '';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';
const PAGE = '';
const PER_PAGE = '40';

class ApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  get currentPage() {
    return this.page;
  }

  set currentPage(newPage) {
    this.page = newPage;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  async getItems() {
    const options = {
      key: API_KEY,
      q: this.searchQuery,
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
      page: this.page,
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

    return await axios.get(FULL_REQEST);
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
export { ApiService };
export { PER_PAGE };
