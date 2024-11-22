import React from 'react';
import ReactDOM from 'react-dom';
// import { createRoot } from "react-dom/client"; replaced by ReactDOM.render
import { Provider, connect } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import './index.css'; 
import App from './containers/App';
import 'tachyons';
import registerServiceWorker from './registerServiceWorker';
import { searchRobots } from './reducers';

const store = configureStore({
    reducer: {
        search: searchRobots
    }
});

// const root = createRoot(document.getElementById('root'));
// root.render(<App />);


ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();
