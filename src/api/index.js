import axios from 'axios';

function create(baseURL, options) {
  const instance = axios.create({
    baseURL: baseURL,
    ...options,
  });
  return instance;
}

export const _axios = create(import.meta.env.VITE_APP_API_URL);
