import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  // create a new XMLHttpRequest

  let authors;
  let selectAuthorText = "Please select an author";

  function searchClick() {
    var xhr = new XMLHttpRequest();

    let searchBox = document.getElementById("search-box");
    console.log(searchBox.value);

    if (searchBox.value) {
      let authorSet = new Set();
      document.getElementById("display-text").innerHTML = "loading";
      // get a callback when the server responds
      xhr.addEventListener("load", () => {
        // update the state of the component with the result here
        let result = JSON.parse(xhr.response);
        populateResults(result);

        let authorSelect = document.getElementById("author-select");
        authorSelect.innerHTML = "";

        let defaultOption = document.createElement("option");
        defaultOption.innerHTML = selectAuthorText;
        authorSelect.appendChild(defaultOption);
        // console.log(result);
        if (result?.length) {
          result.map(poem => authorSet.add(poem.author));

          authors = Array.from(authorSet).sort();
          console.log(authors);
          for (let author of authors) {
            let authorOption = document.createElement("option");
            authorOption.innerHTML = author;
            authorSelect.appendChild(authorOption);
          }
        } 
      })
      // open the request with the verb and the url
      xhr.open("GET", "https://poetrydb.org/title/" + searchBox.value);
      // send the request
      xhr.send();
    }
  }

  function authorSelect(e) {
    var xhr = new XMLHttpRequest();
    let searchBox = document.getElementById("search-box");
    console.log(e);
    console.log(e.target.value);
    if (searchBox.value && e?.target?.value && e.target.value !== selectAuthorText) {
      document.getElementById("display-text").innerHTML = "loading";
      // get a callback when the server responds
      xhr.addEventListener("load", () => {
        // update the state of the component with the result here
        // console.log(xhr.response);
        let result = JSON.parse(xhr.response);
        populateResults(result);
        document.getElementById("results-count").innerHTML += " by " + e.target.value;
      })
      // open the request with the verb and the url
      xhr.open("GET", "https://poetrydb.org/title,author/" + searchBox.value + ";" + e.target.value);
      // send the request
      xhr.send();
    }
  }

  function populateResults(result) {
    document.getElementById("display-text").innerHTML = "";
    if (result?.length) {
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
      }

      document.getElementById("results-count").innerHTML = result.length + " poem" + (result.length == 1 ? " was" : "s were") + " found with this title";
    } else {
      document.getElementById("results-count").innerHTML = "No poems were found with this title";
    }
  }



  return (
    <div className="App">
      <h1>Title</h1>
      <input type="text" placeholder='type here' id="search-box"></input>

      <button id="search-button" type="button" onClick={() => searchClick()}>
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
      <select class="form-select" aria-label="Default select example" id="author-select" onChange={(e) => authorSelect(e)}>
        <option selected>Make a search to enable author selection</option>
      </select>
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
