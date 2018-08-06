var screenName = document.getElementById('twHandle');
var header = document.querySelector('header');
var section = document.querySelector('section');

import {
    twConsumerKey,
    twConsumerSecret,
    twAccessToken,
    twAccessTokenSecret,
    googleMapsGeocodingAPIKey
} from '/app-env.js';

// setup for json request
// store the json source URL in a variable
// use the commented version of the link with the input from the screen. for now, hardcode for testing.
// var requestURL = 'https://api.twitter.com/1.1/users/show.json?screen_name=' + screenName;
var requestURL = 'https://api.twitter.com/1.1/users/show.json?screen_name=dkreidler';

// create a variable for the XHR, which has methods(?)
var data = null;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
        console.log(this.responseText);
    }
});
// HTTP method is GET as we are just retrieving data from 
// the previously stored URL
xhr.open('GET', requestURL);
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.setRequestHeader("Authorization", "OAuth oauth_consumer_key=" + twConsumerKey +
    ",oauth_token=" + twAccessToken +
    ",oauth_signature_method=HMAC-SHA1" +
    ",oauth_timestamp=1533513827" +
    ",oauth_nonce=IUWuS0QIGk4" +
    ",oauth_version=1.0" +
    ",oauth_signature=ATnOOMRaTLA5z43uOo%2BS%2F2sD73I%3D");
// telling XHR to be expecting a JSON response
xhr.responseType = 'json';

// then we send the request with the send() method
xhr.send(data);

// wait for the response from the server, then dealing with it
// store response object in a new variable called superHeroes
// pass that object to two function calls that will fill the header and hero info
// Wrapping function in the onload handler guarantees that it won't run until the JSON request *has* completed
xhr.onload = function() {
    var response = xhr.response;
    //var twitterId = response.id;
    populateHeader(response);
    // showHeroes(superHeroes);
};
// call the parameter jsonObj to make it clear we're parsing a JSON object
function populateHeader(jsonObj) {
    // create a variable to hold the header to be pulled from the json object
    var myH1 = document.createElement('h1');
    // set the variable text content equal to the value of squadName
    myH1.textContent = jsonObj.id;
    // add the variable text to the header
    header.appendChild(myH1);

    // create a variable to hold the data in the homeTown & formed object endpoints
    var myPara = document.createElement('p');
    // set the value of the para variable to a string including homeTown and formed.
    myPara.textContent = 'Hometown: ' + jsonObj.homeTown + ' // Formed: ' + jsonObj.formed;
    // add the paragraph to the header            
    header.appendChild(myPara);
}
// create a function that will pull in data from individual member objects
function showHeroes(jsonObj) {
    // create a new variable of the array of members
    var heroes = jsonObj.members;
    // for each member of members, create variables to hold each bit of data
    for (let i = 0; i < heroes.length; i++) {
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');
        var myPara3 = document.createElement('p');
        var myList = document.createElement('ul');
        // set each variable's textContent to the value of the matching key
        myH2.textContent = heroes[i].name;
        myPara1.textContent = 'Secret Identity: ' + heroes[i].secretIdentity;
        myPara2.textContent = 'Age: ' + heroes[i].age;
        myPara3.textContent = 'Superpowers: ';

        // create a variable to hold each superhero's powers list
        var superPowers = heroes[i].powers;
        // the number of superpowers varies... go through them one by one
        // remember to use a new variable (j) to not conflict with the (i) used above
        for (let j = 0; j < superPowers.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = superPowers[j];
            myList.appendChild(listItem);

        }
        // add the newly created entries to the page

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);



    }
}