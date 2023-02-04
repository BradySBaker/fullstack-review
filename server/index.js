const express = require('express');
const cors = require('cors');
const github = require('../helpers/github');
const getTopRepos = require('../helpers/repoSorter');
let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(cors(({
  "Access-Control-Allow-Origin": 'http://localhost:3000/'
})));

app.use(express.json());

app.post('/repos', function (req, res) {
  if (req.body.username) {
    github.getReposByUsername(req.body.username);
    res.statusCode = 201;
  } else {
    res.statusCode = 404;
  }
  res.end();
});

app.get('/repos', function (req, res) {
  getTopRepos((err, topRepos) => {
    if (err) {
      res.statusCode = 500;
      res.end();
    } else {
      res.statusCode = 200;
      res.send(JSON.stringify(topRepos));
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

