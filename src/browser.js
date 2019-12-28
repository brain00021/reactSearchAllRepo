import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './App';

export default function Routes() {
    return (
      <BrowserRouter basename={ process.env.PUBLIC_URL }>
           <Route exact path="/" component={App} />
           <Route component={() => (<div>404 Not found </div>)} />
      </BrowserRouter>
    );
  }