import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
      );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/signup" className="signup-button">Sign Up</NavLink>
        <LoginFormModal />
      </>
    );
  }

  return (
    <div className="nav-container">
      <div className="left-nav">
        <NavLink exact to="/">
            <img className="logo" src="https://i.imgur.com/LOv8ujp.png"/>
        </NavLink>
      </div>
      <div className="mid-nav">
        <div className="search">
            <form>
                <input className="searchInput"></input>
            </form>
        </div>
      </div>
      <div className="right-nav">
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
