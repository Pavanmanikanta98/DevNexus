import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import React, { Fragment,useEffect } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/profile-forms/EditProfile';
import CreateProfile from './components/profile-forms/CreateProfile';
//redux

import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utilities/setAuthToken';
import store from "./Store";



if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Landing />} />
          </Routes>
          <section className='container'>
            <Alert />
            <Routes>
              <Route exact path='/login' element={ <Login />}  />
              <Route exact path='/register' element={ <Register /> } />
              <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path='/create-profile' element={<PrivateRoute><CreateProfile /></PrivateRoute>} />
              <Route path='/Edit-profile' element= { <PrivateRoute><EditProfile /></PrivateRoute>}/>
            </Routes>
          
          </section>
      
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
