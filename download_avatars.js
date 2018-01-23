// get arguments form node
var args = process.argv;
var request = require('request');
//require token from secret gitignore space
var gitHubToken = require('./secret');
var fs = require('fs');

//start er up
console.log("Welcome to the Github Avatar Downloader!");

//function to get the information from url and parse it into array
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization':  gitHubToken.GITHUB_TOKEN
    }
  }
  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  })
}

//use args from node to fill in and get repo contributors
getRepoContributors(args[2], args[3], function(err, users) {
  if (args.length < 4) //require both args
   {console.log("Specify both arguments!");
 return;
}
  fs.mkdir('./avatars', function(err, fd) { //make avatar directory
      if (err) {
        return console.error(err);
      }
        console.log("Directory opened successfully!");
  });
   users.forEach(function(user) { //go through each user in array to get needed parameters
    var url = user.avatar_url;
    var filePath = "avatars/" + user.login + ".jpg";
    console.log(downloadImageByURL(url, filePath)); //use parsed info from tags in download image function
  });
});


function downloadImageByURL(url, filePath) {
  request.get(url)               // use request to find the url
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode); //use to make sure they come through correctly
       })
       .pipe(fs.createWriteStream(filePath)); //pull in images to file path made in getrepocontributor function
       return;
}