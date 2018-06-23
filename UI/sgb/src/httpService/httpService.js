import axios from 'axios';

const http = axios.create({
    baseURL: 'https://sgbccm-3c418.firebaseio.com/'
});

export default http;