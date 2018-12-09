import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './component/Header';
import AddBox from './component/AddBox';
import Box from './component/Box';
import registerServiceWorker from './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt,faTrash,faTimes,faPlus,faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(faPencilAlt,faTrash,far,faTimes,faPlus,faPlusSquare)
// import rootReducer from './reducers';
// import { provider } from 'react-redux';
// import { createStore } from 'redux';

// const store = createStore(rootReducer);

ReactDOM.render(
    <div> 
        <Header />
        <div className="content">
            <div className="container">
                <AddBox />
                <div className="draggable">
                </div>
                <Box />
            </div>
        </div>
    </div>
    // <Provider store={store}>
    // </Provider>
    , document.getElementById('root'));
registerServiceWorker();
