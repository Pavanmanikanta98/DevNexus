import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import React, { Fragment } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
//redux

import { Provider } from 'react-redux';

import store from "./Store";



const App = () => (
  <Provider store={ store}>
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Landing />} />
        </Routes>
        <section className='container'>
          <Alert />
          <Routes>
            <Route exact path='/Login' element={<Login />} />
            <Route exact path='/Register' element={<Register />} />
          </Routes>
          
        </section>
      
      </Fragment>
    </Router>
  </Provider>
);

export default App;
