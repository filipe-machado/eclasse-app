import axios from 'axios';

const API = axios.create({
  baseURL: 'http://api.eclasse.io:8080/v1',
  responseType: 'json',
  headers: {
    Accept: 'application/json',
  },
});

export default API;
