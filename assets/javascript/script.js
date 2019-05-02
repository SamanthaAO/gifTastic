$(document).ready(function () {

    var topics = ["Adventure Time", "Spongebob", "Fairly OddParents", "Powerpuff Girls", "Family Guy", "South Park", "The Simpsons", "Tom and Jerry", "Teenage Mutant Ninja Turtles", "Avatar"];

    function createButtons() {
        var button = "";
        topics.forEach(function (topic) {
            button += `<button type="button" class="btn btn-primary mt-2 gifButton" id = "${topic}">${topic}</button> `;
        });
        $("#buttonArea").html(button);
    }
    createButtons();

    $("#newButtonMaker").on("click", function(){
        var newButton = $("#buttonInput").val();
        
        if(newButton){
        topics.push(newButton);
        $("#buttonArea").empty();
        document.getElementById("form").reset();
        createButtons();
        }
    });

    $("#buttonArea").on("click", ".gifButton", function(){
        $("#gifArea").empty();

        var searchTerm = $(this).attr("id");
        console.log(searchTerm)
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=TBxfYQsStw6XpZp4RtzXaPa38rSfVCyY&limit=10"


        $.ajax({
            url: queryUrl,
            method: "GET"
        })
        .then(function(response){
            var results = response.data;
            console.log(results);

            function createGifCard (){
                var insert = "";
                results.forEach(function (result){
                    insert += 
                    `<div class="col-sm-4">
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

    });

    $("#gifArea").on("click", ".gif", function(){

       var state = $(this).attr("state");

    if(state === "still"){
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("state", "animate");
    }
    else{
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("state", "still");
    }
    });


})