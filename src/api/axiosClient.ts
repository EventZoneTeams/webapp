import axios from 'axios';
const baseUrl = 'https://student-event-forum-api.azurewebsites.net';

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
