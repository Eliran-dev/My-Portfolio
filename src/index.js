import React from 'react';
import './index.css';
import App from './app';
import { hydrate, render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
});

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrate(
    <I18nextProvider i18n={i18next}>
  <App />
  </I18nextProvider>
  , rootElement);
} else {
  render(
  <App />
  , rootElement);
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
