import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:54512/api/'
});

export default http;