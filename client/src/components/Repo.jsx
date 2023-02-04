import React from 'react';

/*
repo_name: repoInfo.name,
user_name: username,
repo_url: repoInfo.url,
watchers
    */

const Repo = ({ repo }) => (
  <div className="repos">
    <a target="_blank" href={repo.repo_url} className="repo_names">
      Repo: {repo.repo_name}
      </a>
      <ul>
        <li>username: {repo.user_name}</li>
        <a target="_blank" href={repo.repo_url}>url: {repo.repo_url}</a>
        <li>watchers: {repo.watchers}</li>
      </ul>
  </div>
)

export default Repo;