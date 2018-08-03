var screenName = document.getElementById('twHandle');
var header = document.querySelector('header');
var section = document.querySelector('section');
// setup for json request
// store the json source URL in a variable
// use the commented version of the link with the input from the screen. for now, hardcode for testing.
// var requestURL = 'https://api.twitter.com/1.1/users/show.json?screen_name=' + screenName;
var requestURL = 'https://api.twitter.com/1.1/users/show.json?screen_name=dkreidler';

// create a variable for the XHR, which has methods(?)
var request = new XMLHttpRequest();

// HTTP method is GET as we are just retrieving data from 
// the previously stored URL
request.open('GET', requestURL);

// telling XHR to be expecting a JSON response
request.responseType = 'json';

// then we send the request with the send() method
request.send();

// wait for the response from the server, then dealing with it
// store response object in a new variable called superHeroes
// pass that object to two function calls that will fill the header and hero info
// Wrapping function in the onload handler guarantees that it won't run until the JSON request *has* completed
request.onload = function() {
    var response = request.response;
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