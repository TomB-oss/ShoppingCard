import React from "react";
import './Style/App.css';
import './Style/Plus.css';
import logo from './asset/logo.png';
import user from './asset/user.png';
import Popup from './Popup';
import { useNavigate  } from 'react-router-dom'
import { useLayoutEffect, useEffect, useState } from 'react';
import axios from 'axios';

function Home() {

  const baseURL = "http://localhost:3001/api/newlist";
  const listURL = "http://localhost:3001/api/list";
  const suppListURL = "http://localhost:3001/api/supplist";

  const [Name, setName] = React.useState('');
  const [List, setList] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [nameTaken, setnameTaken] = React.useState(false);

  const getList = () => {
    axios.get(listURL).then(response => {
      setList(response.data);
    });
  }

  useEffect(() => {
    getList();
  }, []);

  function submit() {
    axios.post(baseURL, {name: Name}).then(() => {
      setIsOpen(false);
      setName('');
      setnameTaken(false);
      getList();
    }).catch(() => {
      setnameTaken(true);
    })
  }

  function togglePopup(btn) {
    if (btn === 1 && Name !== "" && isOpen === true) {
      submit();
    } else if (btn === 2 && isOpen === true) {
      setIsOpen(false);
      setName('');
      setnameTaken(false);
    } else if (isOpen === false) {
      setIsOpen(true);
    }
  }

  let navigate = useNavigate();
  const routeUser = () =>{
    let path = `/user`;
    navigate(path);
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
    let y = 0;
    let i = 0;
    List.map((val) => {
      if (val.Tables_in_shoppingcard !== "USERS" && val.Tables_in_shoppingcard !== undefined && document.getElementById(val.Tables_in_shoppingcard) !== null) {
        var d = document.getElementById(val.Tables_in_shoppingcard);
        if (50 + 250 * i + 200 >= window.innerWidth) {
          y += 1;
          i = 0
        }
        d.style.left = 50 + 250 * i + 'px';
        d.style.top = 200 + (y * 250) + 'px';
        i += 1;
      }
      return ("");
    })
    if (50 + 250 * i + 200 >= window.innerWidth) {
      y += 1;
      i = 0;
    }
    var d = document.getElementById("moreList");
    d.style.left = 50 + 250 * i + 'px';
    d.style.top = 200 + (y * 250) + 'px';
    var foot = document.getElementById("footer");
    if (y < 2) {
      foot.style.top = window.innerHeight - foot.offsetHeight + 'px';
    } else {
      foot.style.top = 450 + (y * 250) + 'px';
    }
  }

  const getIdOnClick = event => {
    const val = event.currentTarget.id + ''
    axios.post(suppListURL, {name: val}).then(() => {
      getList();
    })
  };

  useEffect(() => {
    changeCoord();
  });

  return (
      <div id="banner">
          <h1 className="title">Shopping Card</h1>
          <img src={logo} className="logo" alt=""></img>
          <img src={user} className="user" alt="" onClick={() => routeUser()}></img>
          <div id="moreList" className="button_plus" onClick={() => togglePopup(0)}></div>
          { List.map((val) => {
            if (val.Tables_in_shoppingcard !== "USERS" && val.Tables_in_shoppingcard !== undefined) {
              return (<div className="listBtn" key={val.Tables_in_shoppingcard} id={val.Tables_in_shoppingcard}>
                <a className="linkList" href={"/list/" + val.Tables_in_shoppingcard}> {val.Tables_in_shoppingcard} </a>
                    <div className="deleteList" id={val.Tables_in_shoppingcard} onClick={ getIdOnClick }>-</div>
                </div>
              );
            }
            return("");
          })}
          {isOpen && <Popup
      content={<>
        <h1 className="title">Enter the name of the list</h1>
        <input className="nameList"
            type="text"
            placeholder= "Type here "
            name="Name"
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value);
            }}/>
        <button className="btnList" onClick={() => togglePopup(1)}>Ok</button>
        {nameTaken && <p className="info">List name already taken</p>}
      </>}
      handleClose={() => togglePopup(2)}
      />}
      <footer id="footer">
        <h1 className="title">Make your own lists</h1>
      </footer>
      </div>
  );
}

export default Home;
