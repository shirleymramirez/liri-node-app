***Liri App***

**Introduction**

- LIRI is a node app which stands for Language Interpretation and Recognition Interface. It is like SIRI (from an iphone).

- It is a command line node app that takes in parameters and gives you back data.

- LIRI will do any of the below command when you enter them into the command line.

      * my-tweets
      * spotify-this-song
      * movie-this
      * do-what-it-says


- Type in node liri.js to get the instructions on how to enter the commands correctly. 

- So if you were to type the below command you'd get the last 20 tweets

**Commands to be used in your terminal**
        
1. node liri.js my-tweets

    Example for tweeter using console.log(terminal)
![screen shot 2018-01-14 at 1 34 53 pm](https://user-images.githubusercontent.com/31137669/34921847-9b1f2fa8-f944-11e7-809c-4cd91e1dd465.png)


    Example for twitter output (text files)
    ![screen shot 2018-01-14 at 1 34 44 pm](https://user-images.githubusercontent.com/31137669/34921600-087cfe2a-f942-11e7-94b9-631f01a00799.png)


2.  Node liri.js spotify-this-song ‘ song name here ’
        
    Example output for spotify in the terminal
    ![screen shot 2018-01-14 at 1 46 42 pm](https://user-images.githubusercontent.com/31137669/34921661-ca9a85fe-f942-11e7-8370-840e4d8c043a.png)

    Shows the following information about the song in the logFiles.txt
    ![screen shot 2018-01-14 at 1 45 19 pm](https://user-images.githubusercontent.com/31137669/34921657-c4dfbe2c-f942-11e7-92f6-32c06c4d0c90.png)
    
		Data List from Spotify :
		      * Artist(s)
		      * Title of the song 
		      * preview link of the song from spotify
		      * album that the song is a part of
		      * Example output in the terminal

3. node liri.js movie-this 'movie name here'
	
	Example for ombd movie output in the logFiles.txt
	![screen shot 2018-01-14 at 1 52 42 pm](https://user-images.githubusercontent.com/31137669/34921664-d1ccbd7e-f942-11e7-8831-565c2629f20f.png)

		Data List from OMDB 
		    * Title of the movie.
		    * Year the movie came out.
		    * IMDB Rating of the movie.
		    * Rotten Tomatoes Rating of the movie.
		    * Country where the movie was produced.
		    * Language of the movie.
		    * Plot of the movie.
		    * Actors in the movie.

    Example output in the terminal
	![screen shot 2018-01-14 at 1 53 26 pm](https://user-images.githubusercontent.com/31137669/34921670-da680f06-f942-11e7-9698-aaf79c136725.png)

4. node liri.js do-what-it-says
	
	Example for do what-it-says output in the terminal
	![screen shot 2018-01-14 at 2 00 58 pm](https://user-images.githubusercontent.com/31137669/34921677-e3750630-f942-11e7-9386-139668bfd1d8.png)

**Instruction When Cloning the app from github**

1. Before you start you will be needing the following  npm packages to run the app

        *fs package in node
        *twitter
        *spotify
        *Request
           -You'll use Request to grab data from the OMDB API.
       *Dotenv
  
  
2. To install these npm packages run these commands one at a time.

     - npm install twitter
     - npm install spotify
     - npm install request
     
3. Initialize a package.json file at your project root by running npm init. 
4. Be sure to save all of the npm packages you'll be using to this file. 
5. If you fail to initialize a package.json file and save your dependencies to it, it will be troublesome, and at times almost impossible for anyone else to run your code.
6. Make a .gitignore file and add the following lines to it. 
7. This will tell git not to track these files, and thus they won't be committed to Github.

        - Node_modules
        - .DS_Store
        - .env
        
8. Make a JavaScript file named keys.js.
    - Inside keys.js your file will look like this:
    ````javascript
      console.log('this is loaded');
      
      exports.twitter = {
       consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
      };
      
      exports.spotify = {
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
      };
     ````
      
9. Next, create a file named .env, add the following to it, replacing the values with your API keys (no quotes) once you have them:
      
        # Spotify API keys
        SPOTIFY_ID=your-spotify-id
        SPOTIFY_SECRET=your-spotify-secret

        # Twitter API keys
        TWITTER_CONSUMER_KEY=your-twitter-consumer-key
        TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
        TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
        TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
      
10. This file will be used by the dotenv package to set what are known as environment variables to the global process.env object in node. 
11. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github — keeping our API key information private.

**How to get API Keys**
- Get your Twitter API keys by following these steps:

       Step One: Visit https://apps.twitter.com/app/new
       Step Two: Fill out the form with dummy data. Type http://google.com in the Website input. Don't fill out the Callback URL input. Then submit the form.
       Step Three: On the next screen, click the Keys and Access Tokens tab to get your consume key and secret. 
       Copy and paste them where the <input here> tags are inside your keys.js file.
       Step Four: At the bottom of the page, click the Create my access token button to get your access token key and secret. 
       Copy the access token key and secret displayed at the bottom of the next screen. Paste them where the <input here> tags are inside your keys.js file.



Copyright @Shirley Ramirez 2018
