const database = require('../database/index');

//Find lowestWatchCount in all top repos
var getLowestWatchCount = (topRepos, curRepoIdx = 0, lowestWatchCount = {idx: 0, watchCount: topRepos[0].watchers}) => {
  var curRepo = topRepos[curRepoIdx];
  if (curRepo.watchers < lowestWatchCount.watchCount) {
    lowestWatchCount = {idx: curRepoIdx, watchCount: curRepo.watchers};
  }
  if (curRepoIdx < topRepos.length - 1) {
    lowestWatchCount = getLowestWatchCount(topRepos, curRepoIdx + 1, lowestWatchCount);
  }
  return lowestWatchCount;
};

let getTopRepos = (cb) => {
  var watchObj = {};
  var topRepos = [];
  database.find({} , (err, repos) => {
    if (err) {
      cb(err, null);
      return;
    } else {
      //Loop through all repos in database
      repos.forEach((curRepo, curIdx) => {
        //If topRepos not full yet
        if (topRepos.length < 25) {
          topRepos.push(curRepo);
        } else {
          var lowestWatchCount = getLowestWatchCount(topRepos);
          if (curRepo.watchers > lowestWatchCount.watchCount) {
            topRepos[lowestWatchCount.idx] = curRepo;
          }
        }
      });
      cb(null, topRepos);
    }
  });
}

let sortTopRepos = (repos, result = [], ammount = 0, ignore = {}) => {
  if (ammount === repos.length) {
    return result;
  }
  var highestIdx = null;
  repos.forEach((curRepo, idx) => {
    if (!ignore[idx]) {
      if (highestIdx === null || curRepo.watchers > repos[highestIdx].watchers) {
        highestIdx = idx;
      }
    }
  });
  ignore[highestIdx] = 1;
  result.push(repos[highestIdx]);
  result = sortTopRepos(repos, result, ammount + 1, ignore);
  return result;
}

module.exports.getTopRepos = getTopRepos;
module.exports.sortTopRepos = sortTopRepos;