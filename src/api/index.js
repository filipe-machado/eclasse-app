import axios from 'axios';
import { store } from '../store/ducks/auth';

store.subscribe(() => store.getState());
const auth = `Bearer ${store.getState().token}`;

const API = axios.create({
  baseURL: 'http://api.eclasse.io:8080/v1',
  responseType: 'json',
  headers: {
    Authorization: auth,
    Accept: 'application/json',
  },
});

export default API;
