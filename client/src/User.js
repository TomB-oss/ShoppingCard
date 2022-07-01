import React from "react";
import './Style/App.css';
import './Style/Plus.css';
import logo from './asset/logo.png';
import { useNavigate  } from 'react-router-dom'

function User() {

  let navigate = useNavigate();
  const routeHome = () =>{
    let path = `/home`;
    navigate(path);
  }

  return (
      <div id="banner">
          <h1 className="title">Shopping Card</h1>
          <img src={logo} className="logo" alt="" onClick={routeHome}></img>
      </div>
  );
}

export default User;
