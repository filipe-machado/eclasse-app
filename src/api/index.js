import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({
  baseURL: 'http://api.eclasse.io:8080/v1',
  responseType: 'json',
  headers: {
    Accept: 'application/json',
  },
});
API.interceptors.response.use(response => {
  toast.success(response.data.message);
  return response;
}, error => {
  toast.error(error.response.data.userMessage);
});

export default API;
