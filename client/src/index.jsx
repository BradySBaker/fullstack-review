import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import Clear from './components/Clear.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);
  const [loadingStyle, setLoadingStyle] = useState({width: '0px'});

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

  const search = (term) => {
    setLoadingStyle({width: '30px'})
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: "http://localhost:1128/repos",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({username: term}),
      success: () => {fetch(update); console.log('success!')},
      error: (err) => console.log(err)
    });
  }
  return (
    <div>
      <img style={loadingStyle} className="loading" src="loading-gif.gif"></img>
      <h1>Github Fetcher</h1>
      <Clear onClear={clear}/>
      <Search onSearch={search}/>
      <RepoList repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));