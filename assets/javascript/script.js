//variables
num = 10;
var searchterm;
var topics = ["Adventure Time", "Spongebob", "Fairly OddParents", "Powerpuff Girls", "Family Guy", "South Park", "The Simpsons", "Tom and Jerry", "Teenage Mutant Ninja Turtles", "Avatar: The Last Airbender"];
var results = [];
var favs = [];

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

function apiCall(queryUrl){
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {
            results = response.data;
            //window.results = results;
            console.log(results);

            
            createGifCard(true);
        })
}

function createGifCard(isApiCall) {
    var insert = "";
    var thisArray = (isApiCall) ? results : favs;

    thisArray.forEach(function (result, i) {
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
    $("#gifArea").html(insert);
    
    $("#titleArea").html("<div class='jumbotron jumbotron-fluid p-0 text-center'><h1 class='display-4'>GIFs</h1></div>");
    
}

function contentPresent(newButton){
    if (newButton) {
        topics.push(newButton);
        $("#buttonArea").empty();
        document.getElementById("form").reset();
        createButtons();
    }
}






$(document).ready(function () {

    createButtons();

    
    //takes input and makes it into a gif creating button
    $("#newButtonMaker").on("click", function NewButtonMakerClick() {
        var newButton = $("#buttonInput").val();
        contentPresent(newButton);
        
    });

    //enter can also be used to submit
    $("#buttonInput").on("keypress", function(e){
        if(e.which == 13){
            var newButton = $("#buttonInput").val();
            
            contentPresent(newButton);
        }
    });


    //on click of gif creating button call API and create cards with gifs within
    $("#buttonArea").on("click", ".gifButton", function () {
        $("#gifArea").empty();
        $("#jokeDiv").empty();
        $("#loadMore").empty();
        num = 10;

        searchTerm = $(this).attr("id");
        //window.searchTerm = searchTerm;
        console.log(searchTerm)
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=TBxfYQsStw6XpZp4RtzXaPa38rSfVCyY&limit=" + num;

        apiCall(queryUrl);
        

            $("#loadMore").append("<button type='button' class='btn btn-light btn-outline-dark btn-lg btn-block mt-2 ' id ='loadMore'>Load more gifs</button>");

        // var jokeURL = "https://geek-jokes.sameerkumar.website/api";

        // $.ajax({
        //     url: jokeURL,
        //     method: "GET"
        // })
        //     .then(function (joke) {
        //         var jokeDiv = $("<div>").text(joke);
        //         jokeDiv.attr("id", "jokeDiv");
        //         $("#buttonArea").prepend(jokeDiv);
        //     })

    });

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

    $("#loadMore").on("click", "#loadMore", function(){

        console.log(searchTerm);
        num = num +10;
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=TBxfYQsStw6XpZp4RtzXaPa38rSfVCyY&limit=" + num;
        apiCall(queryUrl);

    })


    $("#gifArea").on("click", ".favorite", function () {
        
        thisGif = results[this.id];

        if (!isAlreadyFavorite(thisGif.id)) 
        {
            favs.push(results[this.id]);
            createGifCard(true);
        }

        
    });

    $("#favorites").on("click", function () {
        $("#loadMore").empty();
        createGifCard(false);
        $("#titleArea").html("<div class='jumbotron jumbotron-fluid p-0 text-center'><h1 class='display-4'>Favorite GIFs</h1></div>");
    })


})