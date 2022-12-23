import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  function searchClick(){
    console.log(document.getElementById("search-box").value);
  }
  console.log("hello world");

  useEffect(() => {
    console.log("loaded");
    document.getElementById("display-text").innerHTML = "loading";
    searchBox = document.getElementById("search-box");
    console.log(searchBox.value);
  }, [""]);

  let searchBox;
  useEffect(() => {
    console.log("hello");
    console.log(searchBox.value);


  }, searchBox);



  // create a new XMLHttpRequest
  var xhr = new XMLHttpRequest()
  xhr.responseType = '';



  // get a callback when the server responds
  xhr.addEventListener("load", () => {
    // update the state of the component with the result here
    // console.log(xhr.response);
    document.getElementById("display-text").innerHTML = JSON.parse(xhr.response)[0]["lines"];
  })
  // open the request with the verb and the url
  xhr.open("GET", "https://poetrydb.org/author,linecount/Shakespeare;14/lines")
  // send the request
  xhr.send()
  return (
    <div className="App">
      <div id="display-div">
        <p id="display-text">
          hello world
        </p>
        <input type="text" placeholder='type here' id="search-box"></input>
      </div>
      <button id="search-button" type="button" onClick={() => searchClick()}>
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}



export default App;
