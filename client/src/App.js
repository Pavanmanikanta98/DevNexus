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
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
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
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/profiles' element={<Profiles />} />
              <Route exact path='/profile/:id' element={ <Profile /> } />
              <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path='/create-profile' element={<PrivateRoute><CreateProfile /></PrivateRoute>} />
              <Route path='/editProfile' element={<PrivateRoute><EditProfile /></PrivateRoute>} />
              <Route path='/addExperience' element={<PrivateRoute><AddExperience /></PrivateRoute>} />
              <Route path='/addEducation' element={<PrivateRoute><AddEducation /></PrivateRoute>} />
              <Route path='/posts' element= { <PrivateRoute><Posts /></PrivateRoute>}/>
            </Routes>
          
          </section>
      
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
