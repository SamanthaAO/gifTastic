$(document).ready(function () {

    var topics = ["Adventure Time", "Spongebob", "Fairly OddParents", "Powerpuff Girls", "Family Guy", "South Park", "The Simpsons", "Tom and Jerry", "Teenage Mutant Ninja Turtles", "Avatar"];

    function createButtons() {
        var button = "";
        topics.forEach(function (topic) {
            button += `<button type="button" class="btn btn-primary mt-2 gifButton">${topic}</button> `;
        });
        $("#buttonArea").html(button);
    }
    createButtons();

    $("#newButtonMaker").on("click", function(){
        
        var newButton = $("#buttonInput").val();
        
        if(newButton !== ""){
        topics.push(newButton);
        $("#buttonArea").empty();
        document.getElementById("form").reset();
        createButtons();
        }
    });

    $("#buttonArea").on("click", ".gifButton", function(){
        
    });

})