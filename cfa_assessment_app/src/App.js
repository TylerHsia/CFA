import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  // create a new XMLHttpRequest
  var xhr = new XMLHttpRequest();
  function searchClick() {
    document.getElementById("display-text").innerHTML = "loading";
    let searchBox = document.getElementById("search-box");
    console.log(searchBox.value);
    // get a callback when the server responds
    xhr.addEventListener("load", () => {
      // update the state of the component with the result here
      // console.log(xhr.response);
      let result = JSON.parse(xhr.response);
      console.log(result);
      document.getElementById("display-text").innerHTML = "";
      if (result?.length) {
        result.map(poem => console.log(poem.linecount));
        let displayText = document.getElementById("display-text");
        for (let poem of result) {
          let title = document.createElement("p");
          title.innerHTML = poem.title;
          displayText.appendChild(title);

          let author = document.createElement("p");
          author.innerHTML = "By " + poem.author;
          displayText.appendChild(author);

          let lines = document.createElement("p");
          lines.innerHTML = poem.lines.join("<br>");
          displayText.appendChild(lines);
          console.log(poem);
        }

        document.getElementById("results-count").innerHTML = result.length + " poem" + (result.length == 1 ? " was" : "s were") + " found with this title";
      } else {
        document.getElementById("results-count").innerHTML = "No poems were found with this title";
      }


    })
    // open the request with the verb and the url
    xhr.open("GET", "https://poetrydb.org/title/" + searchBox.value);
    // send the request
    xhr.send();
  }

  return (
    <div className="App">
      <input type="text" placeholder='type here' id="search-box"></input>

      <button id="search-button" type="button" onClick={() => searchClick()}>
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
      <p id="results-count">
        no search has been performed
      </p>
      <div id="display-div">
        <div id="display-text">
          <p>
            Please search something
          </p>
        </div>
      </div>
    </div>
  );
}



export default App;
