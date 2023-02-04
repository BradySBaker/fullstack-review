const axios = require('axios');
const config = require('../config.js');
const database = require('../database/index');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios.get(options.url, options).then(req => {
    var repos = req.data;
    repos.forEach((curRepo) => {
      var repoInfo = {};
      repoInfo.id = curRepo.id;
      repoInfo.name = curRepo.name;
      repoInfo.url = curRepo.url;
      repoInfo.watchers = curRepo.watchers;

      database.find({username: username, id: repoInfo.id}, (err, repo) => {
        if (err) {
          console.log(err);
          return;
        }
        if (repo.length === 0) {
          database.save(username, repoInfo);
        } else {
          console.log(repoInfo.name, ' already in database!');
        }
      })
    });
  });

}

module.exports.getReposByUsername = getReposByUsername;