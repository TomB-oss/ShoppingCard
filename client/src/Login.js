import React from "react";
import './Style/App.css';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'

function Login() {

  const baseURL = "http://localhost:3001/api/login";

  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('');

  const submit = () => {
    if (Email.length === 0 || Password.length === 0) {
      alert("Fill all the informations");
      return;
    }
    axios.post(baseURL, {email: Email, password: Password}).then(() => {
      let path = `/home`;
      navigate(path);
    }).catch ((error) => {
      if (error.response.status === 401) {
        alert("Invalid email or password");
      }
    });
  };

  let navigate = useNavigate();
  const routeRegister = () =>{
    let path = `/register`;
    navigate(path);
  }

  return (
      <div className="login">
        <h1 className="titleLog">Shopping Card</h1>
        <div className="form">
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}/>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}/>
        </div>
        <p>Don't have an account ? Register</p>
        <button className="btn" onClick={submit}>Login</button>
        <button className="btn" onClick={routeRegister}>Register</button>
      </div>
  );
}

export default Login;
