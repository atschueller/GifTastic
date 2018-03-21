var topics = ['horses', 'beagles', 'rock music', 'shopping'];


makeButtons();

//Make a function that creates buttons out of the array//
function makeButtons() {
    $('#gifButtons').empty();
    for (i = 0; i < topics.length; i++) {
        var buttons = $('<button>');
        buttons.append(topics[i]);
        $('#gifButtons').append(buttons);
    };
};


//Create an on click function to show Giphys//
$('#gifButtons').on('click', function () {
    var things = $(this).attr('data');
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
        things + "&api_key=4fsb7d1ohaJA2VY1PVRh8MBdqYD7TAh1&limit=10&offset=0&rating=PG&lang=en";
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        var stuffiLike = response.data;
        for (i = 0; i < stuffiLike.length; i++) {
            if (stuffiLike[i].rating === "pg") {
                var gifDiv = $("<div class='gif'>");
                var rating = stuffiLike[i].rating;
                var pRating = $("<p>").text("Rating: " + rating);
                var stuffImage = $("<img>");
                stuffImage.attr("src", stuffiLike[i].images.fixed_height.url);
                gifDiv.append(para);
                gifDiv.append(stuffImage);
                $("#gifAdd").prepend(gifDiv);
            };
        };
    });
})
