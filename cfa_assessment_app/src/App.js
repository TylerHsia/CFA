import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  // create a new XMLHttpRequest

  let authors = [];
  const [state, updateState] = useState("Initial Value");
  const [authorsState, setAuthorsState] = useState(["the", "two"]);
  const [resultState, setResultsState] = useState([]);

  let selectAuthorText = "Select an author";

  function searchClick() {
    var xhr = new XMLHttpRequest();

    let searchBox = document.getElementById("search-box");
    console.log(searchBox.value);

    if (searchBox.value) {
      document.getElementById("results-count").innerHTML = "";
      setResultsState([]);
      let authorSet = new Set();
      xhr.addEventListener("load", () => {
        let result = JSON.parse(xhr.response);
        populateResults(result);

        let authorSelect = document.getElementById("author-select");
        authorSelect.innerHTML = "";

        let defaultOption = document.createElement("option");
        defaultOption.innerHTML = selectAuthorText;
        authorSelect.appendChild(defaultOption);
        if (result?.length) {
          result.map(poem => authorSet.add(poem.author));
          authors = Array.from(authorSet).sort();
          setAuthorsState(authors);
          console.log(authors);
          for (let author of authors) {
            let authorOption = document.createElement("option");
            authorOption.innerHTML = author;
            authorSelect.appendChild(authorOption);
          }
        }
      })
      xhr.open("GET", "https://poetrydb.org/title/" + searchBox.value);
      xhr.send();
    }
  }

  function authorSelect(e) {
    var xhr = new XMLHttpRequest();
    let searchBox = document.getElementById("search-box");
    console.log(e);
    console.log(e.target.value);
    if (searchBox.value && e?.target?.value && e.target.value !== selectAuthorText) {
      document.getElementById("results-count").innerHTML = "";
      setResultsState([]);
      xhr.addEventListener("load", () => {
        // console.log(xhr.response);
        let result = JSON.parse(xhr.response);
        populateResults(result);
        document.getElementById("results-count").innerHTML += " by " + e.target.value;
      })
      xhr.open("GET", "https://poetrydb.org/title,author/" + searchBox.value + ";" + e.target.value);
      xhr.send();
    }
  }

  function populateResults(result) {
    console.log(resultState);
    if (result?.length) {
      setResultsState(result);
      document.getElementById("results-count").innerHTML = result.length + " poem" + (result.length == 1 ? " was" : "s were") + " found with this title";
    } else {
      setResultsState([]);
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
      <select className="form-select" aria-label="Default select example" id="author-select" onChange={(e) => authorSelect(e)}>
        <option>Make a search to enable author selection</option>
      </select>
      <p id="results-count">
        No search has been performed
      </p>
      <div className="accordion" id="accordion">
        {resultState.map((poem, index) =>
        (<div key={index} className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#" + index} aria-expanded="false" aria-controls={"#" + index}>
              {poem.title} by {poem.author}
            </button>
          </h2>
          <div id={index} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion">
            <div className="accordion-body">
              {poem.lines.map((line, i) => <p key={i}>{line}</p>)}
            </div>
          </div>
        </div>))}
      </div>
    </div>
  );
}



export default App;
