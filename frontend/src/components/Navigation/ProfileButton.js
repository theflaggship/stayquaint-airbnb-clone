import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom'
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import './Navigation.css';

function ProfileButton({ user, isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    // document.addEventListener('click', closeMenu);

    // return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => {
    setShowMenu(false);
  };


  const demoLogin = () => {
    return dispatch(sessionActions.login({ credential: 'Demo', password: 'password' }))
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout(history))

  };

  let sessionLinks
  if (sessionUser) {
    sessionLinks = (
      <div className="user-menu">
        <div className="menu-username-container">
          <li className="username">{user.username}</li>
        </div>
        <div className="menu-bookings-container">
          <NavLink className="my-bookings-link" to="/bookings">My Bookings</NavLink>
        </div>
        <div className="menu-myaccommodation-container">
          <NavLink className="my-accommodations-link" to={`/user/lodgings/${user.id}`}>My Accommodations</NavLink>
        </div>
        <div className="menu-addaccommodation-container">
          <NavLink className="add-accommodation-link" to="/lodgings">Add Accommodation</NavLink>
        </div>
        <div className="menu-logout-container">
          <NavLink to="/" className="logout-button" onClick={logout}>Log Out</NavLink>
        </div>
      </div>
      );
  } else {
    sessionLinks = (
      <div className="nonuser-menu">
        <div className="menu-signup-container">
          <SignUpFormModal />
        </div>
        <div className="menu-login-container">
          <LoginFormModal />
        </div>
        <div className="menu-demo-container">
          <button id="menu-demo-button" onClick={demoLogin}>Demo</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-button">
      {showMenu && (
      <div className="transparent" onClick={closeMenu}/>
      )}
      <div>
        <button className="profile-icon" onClick={handleMenu}>
          <i className="fas fa-user-circle" />
        </button>
      </div>
      {showMenu && (
        <div className="nav-dropdown">
          <ul className="profile-dropdown">
            {sessionLinks}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
