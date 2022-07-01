import React from "react";
import './Style/App.css';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'

function Register() {

  const baseURL = "http://localhost:3001/api/register";

  const [Name, setName] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('');

  let navigate = useNavigate();

  const submit = () => {
    if (Name.length === 0 || Email.length === 0 || Password.length === 0) {
      alert("Fill all the informations");
      return;
    }
    axios.post(baseURL, {name: Name, email: Email, password: Password}).then(() => {
      let path = `/home`;
      navigate(path);
    }).catch((err) => {
      if (err.response.status === 500) {
        alert("Email already taken");
      }
    });
  };

  const routeLogin = () =>{
    let path = `/`;
    navigate(path);
  }

  return (
    <div className="register">
        <h1 className="titleLog">Register</h1>
        <div className="form">
        <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}/>
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
        <button className="backBtn" onClick={routeLogin}>Back</button>
        <button className="btn" onClick={submit}>Register</button>
    </div>
  );
}

export default Register;
