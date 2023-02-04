import React from 'react';
import Repo from './Repo.jsx';

const RepoList = ({ repos }) => (
  <div className="repo_list">
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    {(repos.map((curRepo) =>
      <Repo key={curRepo.repo_id} repo={curRepo}/>
    ))}
  </div>
)

export default RepoList;