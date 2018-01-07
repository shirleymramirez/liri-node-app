// read and set any environment variables with the dotenv package
require("dotenv").config();

// code required to import the keys.js file and store it in a variable.
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);