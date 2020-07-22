import React from 'react';
import ReactDOM from 'react-dom';
import AppConfig from 'config/AppConfig';

import './index.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <AppConfig />,
  rootElement,
);
