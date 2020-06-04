import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import Hello from './Hello';
import './style.css';
import store from './store';


render( <Provider store={store}>
    <Hello />
  </Provider>,  document.getElementById('root'));



