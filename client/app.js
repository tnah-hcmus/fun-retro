import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import CssBaseline from '@material-ui/core/CssBaseline';

import Router from './routes/routes';
ReactDOM.render(
    <>
        <CssBaseline />
        <Router/>
    </>,
    document.getElementById('root')
);
  