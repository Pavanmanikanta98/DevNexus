import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {  connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Fragment } from 'react';


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
        Developers
        </Link>
      </li>
      <li>
        <Link to='/posts'>
        Posts
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'>
            {''}</i>
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className='fas fa-sign-out-alt' />
          <span className='hide-sm'> Logout</span></a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
        Developers
        </Link>
      </li>
      
      <li>
        <Link to={'/Register'}>Register</Link>
      </li>
      <li>
        <Link to={'/Login'}>Login</Link>
      </li>
    </ul>

  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevNexus</Link>
      </h1>
      {!loading && (<Fragment>{ isAuthenticated ? authLinks:guestLinks}</Fragment>)}
    </nav>
  )
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
