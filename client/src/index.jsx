import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  const fetch = (successCB) => {
    $.ajax({
      type: "GET",
      url: "http://localhost:1128/repos",
      dataType: "json",
      success: (data) => successCB(data),
      error: (err) => console.log(err)
    });
  }
  const update = (data) => {
    console.log(data);
  }

  fetch(update);

  const search = (term) => {
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: "http://localhost:1128/repos",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({username: term}),
      success: () => console.log('Succesfull Post')
    });
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));