// read and set any environment variables with the dotenv package
require("dotenv").config();

var fs = require("fs");

// code required to import the keys.js file and store it in a variable.
// var spotify = new Spotify(keys.spotify);

// node  module imports needed to run the function
var request = require("request");
var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("node-spotify-api");

// code required to import the keys.js file and store it in a variable.
var client = new Twitter(keys.twitter);

// action argument from the user
var liriArgument = process.argv[2];

// switch-case statement will direct which function gets run
switch (liriArgument) {

    // calls myTweets function which uses twitter api key to get tweets
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

    // search parameters includes screen name and count up to 20 tweets
    var params = { screen_name: 'shirleyramz', count: 20 };

    // get up to 20 tweets when created in the terminal
    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error) {

            //  loop through tweets and append each tweet and creation date
            for (var i = 0; i < tweets.length; i++) {

                // add text to log.txt
                fs.appendFile("./log.txt", "@shirleymramirez: " + tweets[i].text + "\r\n");
                fs.appendFile("./log.txt", "Created At: " + tweets[i].created_at + "\r\n");
                fs.appendFile("./log.txt", "---------------------------- " + i + " ----------------------------\r\n");
            }
        } else {
            console.log("Error Tweets");
        }
    });
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