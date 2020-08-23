import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import App from './App';
import allReducers from './reducers/allReducers'
import { HashRouter } from 'react-router-dom';

const reduxStore=createStore(allReducers)
ReactDOM.render(
  <HashRouter>
  <Provider store={reduxStore}>
    <App />
    </Provider>
    </HashRouter>,
  document.getElementById('root')
);

