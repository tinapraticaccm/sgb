import axios from 'axios';

const http = axios.create({
    baseURL: 'https://localhost:54512/api/'
});

export default http;