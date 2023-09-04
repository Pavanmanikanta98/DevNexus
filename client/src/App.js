import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router,Switch,Route,Routes } from 'react-router-dom';
import React, { Fragment } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';


const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <section className='continer'>
          <switch>
            <Router>
            <Route exact path='/Login' element={<Login />} />
            <Route exact path='/Rgister' element={ <Register/>} />
            </Router>
            
          </switch>

        </section>      
      </Routes>
    </Fragment>
  </Router>
);

export default App;
