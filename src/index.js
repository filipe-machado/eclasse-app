import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import login from './store/ducks';
import StateLoader from './store/ducks/actions';


const stateLoader = new StateLoader();

const store = createStore(login, stateLoader.loadState());

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
