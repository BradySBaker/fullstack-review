import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import Clear from './components/Clear.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);
  const [loadingStyle, setLoadingStyle] = useState({width: '0px'});
  const [alertStyle, setAlertStyle] = useState({'fontSize': '0px'});

  const update = (data) => {
    setLoadingStyle({width: '0px'})
    setRepos(data);
  }

  const fetch = (successCB) => {
    setLoadingStyle({width: '30px'})
    $.ajax({
      type: "GET",
      url: "http://localhost:1128/repos",
      dataType: "json",
      success: (data) => successCB(data),
      error: (err) => console.log(err)
    });
  }

  //Run once on startup
  useEffect(() => fetch(update),[]);

  const clear = () => {
    $.ajax({
      type: "DELETE",
      url: "http://localhost:1128/repos",
      success: () => {fetch(update); console.log('success!')},
      error: (err) => console.log(err)
    });
  }

  const functionSearchError = () => {
    setLoadingStyle({width: '0px'})
    setAlertStyle({'fontSize': '20px', color: 'red'});
  }

  const search = (term) => {
    setAlertStyle({'fontSize': '0px'});
    setLoadingStyle({width: '30px'})
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: "http://localhost:1128/repos",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({username: term}),
      success: (data) => {
        if (data.error) {functionSearchError(term)} else {
          fetch(update);
          console.log('Success!');
        }
      },
      error: (err) => console.log(err)
    });
  }
  return (
    <div>
      <img style={loadingStyle} className="loading" src="loading-gif.gif"></img>
      <h1>Github Fetcher</h1>
      <Clear onClear={clear}/>
      <Search onSearch={search}/>
      <h3 style={alertStyle}> User not found! </h3>
      <RepoList repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));