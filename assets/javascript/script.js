$(document).ready(function () {

    //variables
    num = 10;
    var searchterm;
    var topics = ["Adventure Time", "Spongebob", "Fairly OddParents", "Powerpuff Girls", "Family Guy", "South Park", "The Simpsons", "Tom and Jerry", "Teenage Mutant Ninja Turtles", "Avatar: The Last Airbender"];

    //function to create now giff creating buttons
    function createButtons() {
        var button = "";
        topics.forEach(function (topic) {
            button += `<button type="button" class="btn btn-outline-dark mt-2 gifButton" id = "${topic}">${topic}</button> `;
        });
        $("#buttonArea").html(button);
    }
    createButtons();



    $("#newButtonMaker").on("click", function NewButtonMakerClick() {
        var newButton = $("#buttonInput").val();

        if (newButton) {
            topics.push(newButton);
            $("#buttonArea").empty();
            document.getElementById("form").reset();
            createButtons();
        }
    });

    $("#buttonInput").on("keypress", function(e){
        if(e.which == 13){
            var newButton = $("#buttonInput").val();

        if (newButton) {
            topics.push(newButton);
            $("#buttonArea").empty();
            document.getElementById("form").reset();
            createButtons();
        }
        }
    });


    $("#buttonArea").on("click", ".gifButton", function () {
        $("#gifArea").empty();
        $("#jokeDiv").empty();
        $("#loadMore").empty();

        searchTerm = $(this).attr("id");
        window.searchTerm = searchTerm;
        console.log(searchTerm)
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=TBxfYQsStw6XpZp4RtzXaPa38rSfVCyY&limit=" + num;


        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                console.log(results);

                function createGifCard() {
                    var insert = "";
                    results.forEach(function (result, i) {
                        insert +=
                            `<div class="col-lg-4 col-md-6" id="card${i}">
                        <div class="card my-2" style="width: 18rem;">
                            <img class="card-img-top gif" src="${result.images.fixed_width_still.url}" alt="${result.title}" state = "still" still="${result.images.fixed_width_still.url}" animate="${result.images.fixed_width.url}">
                            <div class="card-body">
                                <h5 class="card-title">${result.title}</h5>
                                <p class="card-text">Rating: ${result.rating}</p>
                                <a href="${result.images.original.webp}" download>
                                    <button type="button">Download!</button>
                                </a>
                                <button type="button" class="favorite" id="${i}">Favorite!</button>
                            </div>
                        </div>
                  </div>`

                    })

                    $("#gifArea").html(insert);
                }
                createGifCard();

            })

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


        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                console.log(results);

                function createGifCard() {
                    var insert = "";
                    results.forEach(function (result) {
                        insert +=
                            `<div class="col-lg-4 col-md-6">
                        <div class="card my-2" style="width: 18rem;">
                            <img class="card-img-top gif" src="${result.images.fixed_width_still.url}" alt="${result.title}" state = "still" still="${result.images.fixed_width_still.url}" animate="${result.images.fixed_width.url}">
                            <div class="card-body">
                                <h5 class="card-title">${result.title}</h5>
                                <p class="card-text">Rating: ${result.rating}</p>
                            </div>
                        </div>
                  </div>`

                    })

                    $("#gifArea").html(insert);
                }
                createGifCard();

            })


    })

    $("#gifArea").on("click", ".favorite", function () {
        console.log(this.id);
        

    });


})