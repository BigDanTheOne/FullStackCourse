import React, {useState, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navigation from './Navigation'
import {store} from "./app/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
// let content = <MapWithEdge places={places}/>
// const ref = useRef(null)

root.render(
    <Provider store={store}>
        <Navigation/>
    </Provider>
);
