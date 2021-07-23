import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal'
import * as sessionActions from '../../store/session'
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const history = useHistory()


  const demoLogin = () => {
    return dispatch(sessionActions.login({ credential: 'Demo', password: 'password' }))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink className="add-accommodation-link" to="/lodgings">Add Accommodation</NavLink>
        <ProfileButton user={sessionUser} />
      </>
      );
  } else {
    sessionLinks = (
      <>
        <button className="demo-button" onClick={demoLogin}>Demo</button>
        <SignUpFormModal className="signup-modal"/>
        <LoginFormModal className="login-modal"/>
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
