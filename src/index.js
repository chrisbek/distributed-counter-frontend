import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './index.scss';
import {App} from './components/App';
import {BrowserRouter} from "react-router-dom";


let appRoot = document.getElementById("app__unique__id");
let template = (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
ReactDOM.render(template, appRoot);


if (module.hot) {
    // True only in dev env, and allows for hot module replacement
    module.hot.accept();
}