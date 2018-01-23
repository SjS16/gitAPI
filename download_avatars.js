var request = require('request');
var gitHubToken = require('./secret');
var fs = require('fs');

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

function downloadImageByURL(url, filePath) {
  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")
