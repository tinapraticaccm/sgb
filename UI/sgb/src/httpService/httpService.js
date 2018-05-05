import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:54512/api/'
});

http.interceptors.request.use(function (config) {
    console.log('config');
    console.log(config);
    // document.write('<div id="spinner" class="Loader"></div>');
    // document.write('<h1>Teste</h1>')
    return config;
  }, function (error) {
    //   var loading = document.getElementById('spinner');
    //   if (loading) {
    //       loading.parentNode.removeChild(loading);
    //   }
    // Do something with request error
    return Promise.reject(error);
  });

http.interceptors.request.use(function (config) {
    
    return config;
});
export default http;