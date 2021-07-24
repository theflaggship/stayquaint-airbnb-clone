import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="cred-div">
          <div className="welcome-title">
            <h2>Welcome to stayQuaint</h2>
          </div>
          <div className="cred-input-container">
            <input
              className="cred-input"
              placeHolder="Username or Email"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
            </div>
            <div className="password-div">
            <input
              className="password-input"
              placeHolder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button className="modal-login-button button" type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
