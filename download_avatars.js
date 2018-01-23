var request = require('request');
var gitHubToken = require('./secret');

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'gitHubToken'
    }
  }

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });

}


getRepoContributors("jquery", "jquery", function(err, users) {
  console.log("Errors:", err);
  users.forEach(function(user) {
    console.log("Avatar url: ", user.avatar_url);
  })
  //console.log("Result:", result.length, result);
});