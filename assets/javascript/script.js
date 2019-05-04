//variables
num = 10;
var searchterm;
var topics = ["Adventure Time", "Spongebob", "Fairly OddParents", "Powerpuff Girls", "Family Guy", "South Park", "The Simpsons", "Tom and Jerry", "Teenage Mutant Ninja Turtles", "Avatar: The Last Airbender"];
var results = [];
var favs = [];
var storedfavs = [];

//checks to see if a card is already in favorites array
function isAlreadyFavorite(id){
    var match = favs.filter(function(fav){return id === fav.id});
    //if already exists the obj will already be in the favs array therefore match.length > 0
    return match.length > 0
}

//function to create gif creating buttons
function createButtons() {
    var button = "";
    topics.forEach(function (topic) {
        button += `<button type="button" class="btn btn-outline-dark mt-2 gifButton" id = "${topic}">${topic}</button> `;
    });
    $("#buttonArea").html(button);
}

//calls the api with ajax then sets results and triggers createGifCard
function apiCall(queryUrl){
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {
            results = response.data;
            
            createGifCard(true);
        })
}

//creates gifCards for gifs displayed from api and favorites
function createGifCard(isApiCall) {
    var insert = "";
    //looks to see which set of data to use to create cards with
    var thisArray = (isApiCall) ? results : storedfavs;

    //creates one card for each 
    thisArray.forEach(function (result, i) {
        //gets rid of favorite button if card already in favorites
        var btnHtml = (!isAlreadyFavorite(result.id)) ? `<button type="button" class="btn btn-outline-dark favorite" id="${i}">Add to Favorites</button>` : '';
        insert +=
            `<div class="col-lg-4 col-md-6" id="card${i}">
        <div class="card my-2" style="width: 18rem;">
            <img class="card-img-top gif" src="${result.images.fixed_width_still.url}" alt="${result.title}" state = "still" still="${result.images.fixed_width_still.url}" animate="${result.images.fixed_width.url}">
            <div class="card-body">
                <h5 class="card-title">${result.title}</h5>
                <p class="card-text">Rating: ${result.rating}</p>
                
                ${btnHtml}
            </div>
        </div>
  </div>`


    })

    //displays the cards on the page
    $("#gifArea").html(insert);

    //displays title for gifs
    $("#titleArea").html("<div class='jumbotron jumbotron-fluid p-0 text-center'><h1 class='display-4'>GIFs</h1></div>");
    
}

//makes sure that theere is an input when enter or create new button is clicked
function contentPresent(newButton){
    if (newButton) {
        topics.push(newButton);
        $("#buttonArea").empty();
        document.getElementById("form").reset();
        createButtons();
    }
}


$(document).ready(function () {

    //creates initial buttons from array
    createButtons();

    
    //takes input and makes it into a gif creating button
    $("#newButtonMaker").on("click", function NewButtonMakerClick() {
        var newButton = $("#buttonInput").val().trim();

        contentPresent(newButton);
        
    });

    //enter can also be used to submit
    $("#buttonInput").on("keypress", function(e){
        if(e.which == 13){
            var newButton = $("#buttonInput").val().trim();
            
            contentPresent(newButton);
        }
    });


    //on click of gif creating button (call API and create cards with gifs within from function chan starting with apiCall)
    $("#buttonArea").on("click", ".gifButton", function () {
        //sets everything back to start
        $("#gifArea").empty();
        $("#jokeDiv").empty();
        $("#loadMore").empty();

        //takes name from button and makes it search term
        searchTerm = $(this).attr("id");
        

        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=TBxfYQsStw6XpZp4RtzXaPa38rSfVCyY&limit=10";

        //gets information from api
        apiCall(queryUrl);
        
        //creates load more button
        $("#loadMore").append("<button type='button' class='btn btn-light btn-outline-dark btn-lg btn-block mt-2 ' id ='loadMore'>Load more gifs</button>");

    });

    //changes state of image from still to animate
    $("#gifArea").on("click", ".gif", function () {

        var state = $(this).attr("state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("animate"));
            $(this).attr("state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("still"));
            $(this).attr("state", "still");
        }
    });

    //functionality of load more button increases num so that more gifs are loaded
    $("#loadMore").on("click", "#loadMore", function(){

        num = num +10;
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=TBxfYQsStw6XpZp4RtzXaPa38rSfVCyY&limit=" + num;
        apiCall(queryUrl);

    })

    //favorite button on gifCard functionality
    $("#gifArea").on("click", ".favorite", function () {
        //gets specific card id in api array
        thisGif = results[this.id];

        //if it is not already in favorites  
        if (!isAlreadyFavorite(thisGif.id)) 
        {
            //add it to favorites
            favs.push(results[this.id]);
            
            //remove the add to favorites button from this card so then must re call the create gif card to now how it shown without the favorite button
            createGifCard(true);
        }

        //updates local storage with favs list
        localStorage.setItem("favs", JSON.stringify(favs));

        
    });

    //view favorites button sends you to favorite gifs screen to fiew favorite gifs
    $("#favorites").on("click", function () {
        
        //gets rid of load more button on the bottom
        $("#loadMore").empty();

        //pulls fav list from local storage
        storedfavs = JSON.parse(localStorage.getItem("favs"));

        //uses fav array to createGifCard
        createGifCard(false);

        //changes title area to say favorite gifs
        $("#titleArea").html("<div class='jumbotron jumbotron-fluid p-0 text-center'><h1 class='display-4'>Favorite GIFs</h1></div>");
    })


})