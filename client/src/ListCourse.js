import React from "react";
import './Style/App.css';
import './Style/Plus.css';
import { useLayoutEffect, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'

function ListCourse() {

  const baseURL = "http://localhost:3001/api/listInfo";
  const addIngrediantURL = "http://localhost:3001/api/addListInfo";
  const deleteIngrediantURL = "http://localhost:3001/api/suppIngrediant";

  const url = window.location.href
  let Name = /[^/]*$/.exec(url)[0];
  const [List, setList] = React.useState([]);
  const [Ingrediant, setIngrediant] = React.useState('');
  let navigate = useNavigate();

  const getList = () => {
    axios.post(baseURL, {name: Name}).then(response => {
      setList(response.data);
    });
  }

  function submit() {
    if (Ingrediant !== '') {
      axios.post(addIngrediantURL, {ingrediant: Ingrediant, name: Name}).then(() => {
        getList();
      })
    }
  }

  const routeLogin = () =>{
    let path = `/home`;
    navigate(path);
  }

  function clearF(target) {
    if (target.value !== '') {
        target.value = "";
    }
 }

   function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  useWindowSize();

  function changeCoord() {
    let i = 0;
    const size = window.innerWidth / 2 - 200 + 'px';
    List.map(() => {
      if (document.getElementById(i+"_ID") !== null) {
        var d = document.getElementById(i+"_ID");
        d.style.left = size;
      }
      i+=1;
      return ("");
    })
    var input = document.getElementById("listCourseInput");
    input.style.left = size;
    var btn = document.getElementById("listCourseBtn");
    btn.style.left = size;
  }

  const getIdOnClick = event => {
    const val = event.currentTarget.id + ''
    axios.post(deleteIngrediantURL, {ingrediant: val, tableName: Name}).then(() => {
      getList();
    })
  };


  useEffect(() => {
    getList();
    changeCoord();
  });

  return (
    <div id="banner">
      <h1 className="titleLog">Shoping List of "{ Name }"</h1>
      <div className="listCourse">
      {  List.map((val, id) => {
        return (<div className="nameIngrediant" id={ id + "_ID" }>{val.ingrediant}
              <div className="deleteIngrediant" id={val.ingrediant} onClick={ getIdOnClick }>-</div>
        </div>
        )
      })}
      <input id="listCourseInput" className="addBarre" type="text" onChange={(e) => setIngrediant(e.target.value)} onFocus={ (e)=> clearF(e.target) }/>
      <button id="listCourseBtn" className="btnAdd" onClick={() => submit()} >Add</button>
      </div>
      <button className="backBtn2" onClick={routeLogin}>Back</button>
    </div>
  );
}

export default ListCourse;
