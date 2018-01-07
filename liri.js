// read and set any environment variables with the dotenv package
require("dotenv").config();

var fs = require("fs");

// code required to import the keys.js file and store it in a variable.
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

// node  module imports needed to run the function
var request = require("request");
var keys = require("./keys.js");
var twitterKeys = keys.twitterKeys;
var twitter = require("twitter");
// var spotify = require("spotify");
var liriArgument = process.argv[2];
console.log(liriArgument);

// switch-case statement will direct which function gets run
switch (liriArgument) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("error");
        break;
}

function myTweets() {
    fs.appendFile("./log.txt", "User Command: node liri.js my-tweets\n\n", err => {
        if (err) throw err;
    });
    var client = new twitter(twitterKeys);
    var params = { screen_name: "_angrbrd", count: 20 };

    console.log("Tweeter Tweets");
}

function spotifyThisSong() {
    console.log("Spotify Song");
}

function movieThis() {
    console.log("Movie Results");
}

function doWhatItSays() {
    console.log("Do it!");
}