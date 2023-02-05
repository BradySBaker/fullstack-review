const axios = require('axios');
const config = require('../config.js');
const database = require('../database/index');

let deleteRepos = (cb) => {
  database.deleteAllRepos((err) => {
    if (err) {
      cb(err);
      return;
    } else {
      cb(null);
    }
  });
};

let getReposByUsername = (username, cb) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  //
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios.get(options.url, options).then(req => {
    var repos = req.data;
    console.log(repos);
    if (repos.length === 0) {
      cb(null);
      return;
    }
    var ammountSaved = 0;
    repos.forEach((curRepo, idx) => {
      var repoInfo = {};
      repoInfo.id = curRepo.id;
      repoInfo.name = curRepo.name;
      repoInfo.url = curRepo.html_url;
      repoInfo.watchers = curRepo.watchers;
      database.find({username: username, id: repoInfo.id}, (err, repo) => {
        if (err) {
          cb(err);
          return;
        }
        ammountSaved++;
        if (repo.length === 0) {
          database.save(username, repoInfo, (err) => {
          });
        } else {
          console.log(repoInfo.name, ' already in database!');
        }
        if (ammountSaved === repos.length) {
          cb(null);
        }
      })
    });
  });
}

module.exports.getReposByUsername = getReposByUsername;
module.exports.deleteRepos = deleteRepos;