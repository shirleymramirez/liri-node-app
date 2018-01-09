// read and set any environment variables with the dotenv package
require("dotenv").config();

// node module for file system
var fs = require("fs");

// node  module imports needed to run the function
var request = require("request");
var keys = require("./keys.js");

// action argument from the user
var liriArgument = process.argv[2];
var inputSongOrMovieTitle = process.argv[3];

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

    // code required to import the twitter files and store it in a variable.
    var Twitter = require("twitter");
    var twitterClient = new Twitter(keys.twitter);

    // search parameters includes screen name and count up to 20 tweets
    var params = { screen_name: 'shirleyramz', count: 20 };

    // get method for 20 tweets when created in the terminal
    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error) {

            //  loop through tweets and append each tweet and creation date
            for (var i = 0; i < tweets.length; i++) {
                // add text to log.txt
                fs.appendFile("./log.txt", "@shirleymramirez: " + tweets[i].text + "\r\n");
                fs.appendFile("./log.txt", "Created At: " + tweets[i].created_at + "\r\n");
                fs.appendFile("./log.txt", "---------------------------- " + i + " ----------------------------\r\n");
            }
        } else {
            return console.log("Error Tweets");
        }
    });
}

function spotifyThisSong() {

    // 
    const Spotify = require("node-spotify-api");
    const spotify = new Spotify(keys.spotify);

    if (!inputSongOrMovieTitle) {
        inputSongOrMovieTitle = "The Sign";
    }

    // used spotify search to find album, artist or track 
    spotify.search({ type: "track", query: inputSongOrMovieTitle }, function(err, data) {

        if (!err) {

            //store information to a variable from spotify data
            var songInfo = data.tracks.items;
            console.log("Title of the Song: ", songInfo[0].name);
            console.log("Artists: ", songInfo[0].artists[0].name);
            console.log("Preview link: ", songInfo[0].preview_url);
            console.log("Album Name: ", songInfo[0].album.name);
            console.log("------------------------------------");

            // loop through each spotify data and append it on log.txt
            for (var i = 0; i < songInfo.length; i++) {
                fs.appendFile("./log.txt", "Artists: " + songInfo[i].artists[i].name + "\r\n");
                fs.appendFile("./log.txt", "Title of the song: " + songInfo[i].name + "\r\n");
                fs.appendFile("./log.txt", "Preview Link: " + songInfo[i].preview_url + "\r\n");
                fs.appendFile("./log.txt", "Album Name: " + songInfo[i].album.name + "\r\n");
                fs.appendFile("./log.txt", "---------------------------------------------------" + "\r\n");
            }
        } else {
            return console.log("Error occurred: " + err);
        }
    });
}

function movieThis() {

    if (!inputSongOrMovieTitle) {
        inputSongOrMovieTitle = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputSongOrMovieTitle + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, data, body) {
        if (!error && data.statusCode === 200) {
            console.log("Title of the movie: ", JSON.parse(body).Title);
            console.log("Year Released: ", JSON.parse(body).Year);
            console.log("IMDB Rating: ", JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: ", JSON.parse(body).Ratings[1].Value);
            console.log("Country where the movie was produced: ", JSON.parse(body).Country);
            console.log("Language: ", JSON.parse(body).Language);
            console.log("Plot: ", JSON.parse(body).Plot);
            console.log("Actors: ", JSON.parse(body).Actors);
            console.log("-------------------------------------------------");

            // fs.appendFile("./log.txt", "Title of the movie: ", JSON.parse(body).Title);
        }
    });

}

function doWhatItSays() {
    console.log("Do it!");
}