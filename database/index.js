const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repo_id: Number,
  repo_name: String,
  user_name: String,
  repo_url: String,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (username, repoInfo) => {
  var repo = new Repo({
    repo_id: repoInfo.id,
    repo_name: repoInfo.name,
    user_name: username,
    repo_url: repoInfo.url,
    watchers: repoInfo.watchers
  });
  repo.save(function(err, newRepo) {
    console.log(newRepo.repo_name + " info saved to database");
  });
}

let find = (repoInfo, cb) => {
  var options = {}
  if (repoInfo.username) {
    options.user_name = repoInfo.username;
  }
  if (repoInfo.id) {
    options.repo_id = repoInfo.id;
  }
  Repo.find(options, (err, repos) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, repos);
    }
  })
};

find({username: 'BradySBaker'}, (err, repoInfo) => {
  console.log(repoInfo)
});

module.exports.save = save;
module.exports.find = find;