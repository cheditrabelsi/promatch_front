import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
});

API.defaults.xsrfCookieName = 'csrftoken';
API.defaults.xsrfHeaderName = 'X-CSRFToken';
