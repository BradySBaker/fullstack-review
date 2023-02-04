const express = require('express');
const cors = require('cors');
const github = require('../helpers/github');
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
  github.getReposByUsername(req.body.username);
  res.statusCode = 200;
  res.end();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

