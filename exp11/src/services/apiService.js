import axios from 'axios';

const dummyApi = axios.create({ baseURL: 'https://dummyjson.com' });
const fakeStoreApi = axios.create({ baseURL: 'https://fakestoreapi.com' });

export const fetchPosts = (limit = 30) =>
  dummyApi.get(`/posts?limit=${limit}`).then((r) => r.data.posts);

export const fetchProducts = () =>
  fakeStoreApi.get('/products').then((r) => r.data);

export const fetchProductCategories = () =>
  fakeStoreApi.get('/products/categories').then((r) => r.data);
