const express = require('express');
const cors = require('cors');
const github = require('../helpers/github');
const sort = require('../helpers/repoSorter');
let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
//
app.use(cors(({
  "Access-Control-Allow-Origin": 'http://localhost:3000/'
})));

app.use(express.json());

app.post('/repos', function (req, res) {
  if (req.body.username.length > 0) {
    github.getReposByUsername(req.body.username, (err) => {
      if (err) {
        res.statusCode = 200;
        res.send({error: 'No user found!'});
      } else {
        res.statusCode = 201;
        res.send(req.body);
      }
    });
  } else {
    res.statusCode = 200;
    res.send({error: 'No user given'});
  }
});

app.get('/repos', function (req, res) {
  sort.getTopRepos((err, topRepos) => {
    if (err) {
      res.statusCode = 500;
      res.end();
    } else {
      res.statusCode = 200;
      res.send(JSON.stringify(sort.sortTopRepos(topRepos)));
    }
  });
});

app.delete('/repos', function(req, res) {
  github.deleteRepos((err) => {
    if (err) {
      res.statusCode = 404;
      res.end();
    } else {
      res.statusCode = 204;
      res.end();
    }
  });
})

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

