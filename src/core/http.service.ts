import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

API.defaults.xsrfCookieName = 'csrftoken';
API.defaults.xsrfHeaderName = 'X-CSRFToken';