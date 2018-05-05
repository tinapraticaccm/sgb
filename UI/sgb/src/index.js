import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import reducer from './store/reducer'
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter} from 'react-router-dom'

const store = createStore(reducer);

const AppMaterial = () => (  
    <Provider store={store}>
      <MuiThemeProvider>
        <BrowserRouter>    
          <App/>
        </BrowserRouter>    
      </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(<AppMaterial />, document.getElementById('root'));
registerServiceWorker();
