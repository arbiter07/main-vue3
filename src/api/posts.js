import { _axios } from './index.js';

export function getPosts(params) {
  return _axios.get('/posts', { params });
}

export function getPostById(id) {
  return _axios.get(`/posts/${id}`);
}

export function createPost(data) {
  return _axios.post('/posts/', data);
}
export function udpatePost(id, data) {
  return _axios.put(`/posts/${id}`, data);
}
export function deletePost(id) {
  return _axios.delete(`/posts/${id}`);
}
