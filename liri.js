// read and set any environment variables with the dotenv package
require("dotenv").config();

// this will enable user to use end of line break both with MacOS or Windows machine
var os = require("os");

// node module for file system  
var fs = require("fs");

// node  module imports needed to run the function
var request = require("request");
var keys = require("./keys.js");

// input argument from the user
var userInput = process.argv[2];
var inputSongOrMovieTitle = process.argv[3];
var infoSeparator = "------------------------------------------------------------------";

inputCommand(userInput);

function inputCommand(userInput) {
    // switch-case statement will direct which function gets run
    switch (userInput) {
        // calls myTweets function which uses twitter api key to get tweets
        case "my-tweets":
            myTweets();
            break;

            // calls spotifyThisSong function which uses spotify api key
        case "spotify-this-song":
            spotifyThisSong();
            break;

            // calls movieThis function which used OMDB api key
        case "movie-this":
            movieThis();
            break;

            // this case will read random.txt file and do what is written in the tt files
        case "do-what-it-says":
            doWhatItSays();
            break;

        default:
            console.log(
                "Please input a valid user arguments. See README.md for instructions"
            );
            break;
    }
};

function myTweets() {

    // code required to import twitter node modules files and store it in a variable.
    var Twitter = require("twitter");
    var twitterClient = new Twitter(keys.twitter);

    // search parameters includes screen name and count up to 20 tweets
    var params = { screen_name: 'shirleyramz', count: 20 };

    twitterClient.get('statuses/user_timeline', params, function(error, tweets) {

        if (!error) {

            const tweeterStr = tweeterStringify(tweets);
            console.log(tweeterStr);

            // update tweeterLog.txt 
            fs.appendFile("./logFiles/tweeterLog.txt", tweeterStr + os.EOL, function(err) {
                if (err) {
                    return console.log(err);
                }
            });

        } else {
            return console.log("Error Tweets");
        }
    });
}

function tweeterStringify(tweets) {
    const tweetsInfo = [];

    //  loop through tweets and append each tweet and creation date
    for (var i = 0; i < tweets.length; i++) {

        // add text to tweeterLog.txt
        tweetsInfo.push("@shirleymramirez: " + tweets[i].text);
        tweetsInfo.push("@Created At: " + tweets[i].created_at);
        tweetsInfo.push(infoSeparator + (i + 1) + infoSeparator);
    }

    // this will drop each line of text to the next line
    return tweetsInfo.join(os.EOL);
}

function spotifyThisSong() {

    // code required to get spotify modules and store in a variable
    const Spotify = require("node-spotify-api");
    const spotify = new Spotify(keys.spotify);

    // if no input Song from user, default song title is "The Sign"
    if (!inputSongOrMovieTitle) {
        inputSongOrMovieTitle = 'The Sign';
    }

    // used spotify api search to find album, artist or track 
    // set limit search to 1
    spotify.search({ type: "track", query: inputSongOrMovieTitle, limit: 1 }, function(err, data) {

        if (!err) {
            var songInfo = data.tracks.items;

            //store information to a variable from spotify data
            const songStr = spotifyStringify(data.tracks.items);
            console.log(songStr);

            // update spotifyLog.txt
            fs.appendFile(
                "./logFiles/spotifyLog.txt",
                songStr + os.EOL,
                function(err) {
                    if (err) {
                        return console.log(err);
                    }
                }
            );
        } else {
            return console.log("Error occurred: " + err);
        }
    });
}

function spotifyStringify(songs) {
    const songsInfo = [];

    // loop through each spotify data and append it on spotifyLog.txt using push() method
    for (var i = 0; i < songs.length; i++) {
        songsInfo.push("Artists: " + songs[i].artists[0].name);
        songsInfo.push("Title of the song: " + songs[i].name);
        songsInfo.push("Preview Link: " + songs[i].preview_url);
        songsInfo.push("Album Name: " + songs[i].album.name);
        songsInfo.push(infoSeparator + (i + 1) + infoSeparator);
    }

    // this will drop each line of text to the next line
    return songsInfo.join(os.EOL);
}


function movieThis() {
    // if user doesn't input a movie title, default would be "Mr. Nobody"
    if (!inputSongOrMovieTitle) {
        inputSongOrMovieTitle = "Mr. Nobody";
    }
    // omdb path using movie title and api key
    var queryUrl = "http://www.omdbapi.com/?t=" + inputSongOrMovieTitle + "&y=&plot=short&apikey=trilogy";

    // request method using path and a callback function
    request(queryUrl, function(error, data, body) {

        if (!error && data.statusCode === 200) {

            // assigned all the data(body) to a const movie which will be used 
            // in a function for getting all the information we needed to log in our text file
            const movie = JSON.parse(body);
            const movieStr = movieStringify(movie);
            console.log(movieStr);

            // update movieLog.txt
            fs.appendFile("./logFiles/movieLog.txt", movieStr + os.EOL, function(err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });
}

function movieStringify(movie) {
    const movieInformation = [];

    // get all the data needed to be pushed to our text file
    // used push() method to add new items for the movie info
    movieInformation.push("Title of the movie: " + movie.Title);
    movieInformation.push("Year Release: " + movie.Year);
    if (movie.Ratings[0]) {
        movieInformation.push("IMDB Rating: " + movie.Ratings[0].Value);
    }
    if (movie.Ratings[1]) {
        movieInformation.push("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
    }
    movieInformation.push("Country where the movie was produced: " + movie.Country);
    movieInformation.push("Language: " + movie.Language);
    movieInformation.push("Plot: " + movie.Plot);
    movieInformation.push("Actors: " + movie.Actors);
    movieInformation.push(infoSeparator);

    // this will drop each line of text to the next line
    return movieInformation.join(os.EOL);
}

// read data from random.txt files and do what it says on that file
function doWhatItSays() {
    fs.readFile("./logFiles/random.txt", "utf8", function(error, data) {
        if (error) {
            console.log("It says: ERROR!");
        } else {
            // split text string from random.txt to get the user input command
            var randomTxtData = data.split(",");

            // assigned first index data to userInput 
            userInput = randomTxtData[0];

            // input data error/validation check for random.txt files
            if (userInput === "my-tweets" || userInput === "spotify-this-song" || userInput === "movie-this" || userInput === "do-what-it-says") {

                // assigned 2nd index data to inputSongOrMovieTitle 
                inputSongOrMovieTitle = randomTxtData[1];

                // calls inputCommand function 
                inputCommand(userInput);

            } else {
                console.log("Please input the correct argument, see README.md");
            }

        }
    });
};