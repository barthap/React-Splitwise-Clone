import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {createStore} from 'redux';
import {appReducer} from "./reducers";

const store = createStore(appReducer);

ReactDOM.render(
    <Provider store={store}><App store={store}/></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
