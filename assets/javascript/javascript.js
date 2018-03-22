var topics = ['horses', 'beagles', 'rock music', 'shopping'];
var searchInput = '';
var queryURLBase = "https://api.giphy.com/v1/gifs/random?api_key=4fsb7d1ohaJA2VY1PVRh8MBdqYD7TAh1&l"


makeButtons();
//Make a function that creates buttons out of the array//
function makeButtons() {
    $('#gifButtons').empty();
    for (i = 0; i < topics.length; i++) {
        var buttons = $('<button>');
        buttons.attr('data');
        buttons.append(topics[i]);
        $('#gifButtons').append(buttons);
    };
};
//Create buttons out of user input in the search form//
$('#gifInput').on('click', function (event) {
    event.preventDefault();
    searchInput = $('#gifSearch').val().trim();
    var gifSearch = searchInput;
    topics.push(gifSearch);
    makeButtons(gifSearch);
});


//Make a click function that animates them//

//Make a click function that makes them still//

//Create a function to show Giphys//
$('#gifButtons').on('click', function () {
    var things = $(this).attr("data");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
        things + "&api_key=4fsb7d1ohaJA2VY1PVRh8MBdqYD7TAh1&limit=10&offset=0&rating=PG&lang=en";
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        console.log(queryUrl);
        console.log(response);
        var stuffiLike = response.data;
        for (i = 0; i < stuffiLike.length; i++) {
            if (stuffiLike[i].rating === "pg" && stuffiLike[i].rating === "g") {
                var gifDiv = $("<div class='item'>");
                var rating = stuffiLike[i].rating;
                var gifP = $('<p>').text('Rating:' + rating);
                var image = stuffiLike[i].images;
                var gifImage = $('<img>');
                gifImage.attr("src", stuffiLike[i].images.fixed_height.url);

                gifDiv.append(gifP);
                gifDiv.append(gifImage);

                $('#gifBody').prepend(gifDiv);
            };
        };
    });
});
