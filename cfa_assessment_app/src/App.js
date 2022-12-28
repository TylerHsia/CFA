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
          setAuthorsState(authors);
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
      document.getElementById("results-count").innerHTML = "";
      setResultsState([]);
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
    console.log(resultState);
    document.getElementById("display-text").innerHTML = "";
    if (result?.length) {
      // let displayText = document.getElementById("display-text");
      // for (let poem of result) {
      //   let title = document.createElement("p");
      //   title.innerHTML = poem.title;
      //   displayText.appendChild(title);

      //   let author = document.createElement("p");
      //   author.innerHTML = "By " + poem.author;
      //   displayText.appendChild(author);

      //   let lines = document.createElement("p");
      //   lines.innerHTML = poem.lines.join("<br>");
      //   displayText.appendChild(lines);
      // }
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
        no search has been performed
      </p>
      {/* {false ? <p>hello</p> : <p>goodbye</p>} */}




      <div className="accordion" id="accordion">
        {/* <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="t" aria-controls="collapseOne">
              Accordion Item #1
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordion">
            <div class="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Accordion Item #2
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion">
            <div class="accordion-body">
              <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div> */}

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



      {/* {authorsState.map((value, index) => (<p key={index}>{value}</p>))} */}

      <div id="display-div">
        <div id="display-text">
          <p>Please search something</p>
        </div>
      </div>
    </div>
  );
}



export default App;
