import React from "react";
import './Style/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import User from './User';
import ListCourse from './ListCourse';

function App() {

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/list/:id" element={<ListCourse />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
