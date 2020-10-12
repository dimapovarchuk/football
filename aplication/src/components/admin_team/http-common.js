import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://localhost:3000/wares/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})