import axios from 'axios';

const api = axios.create({
  baseURL: 'https://desafioonline.webmotors.com.br/api',
});

export default api;
