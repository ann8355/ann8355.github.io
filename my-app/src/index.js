import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import { provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(rootReducer);

ReactDOM.render(
    // <Provider store={store}>
        <App />
    // </Provider>
    , document.getElementById('root'));
registerServiceWorker();
