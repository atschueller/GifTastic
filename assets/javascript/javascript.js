var topics = ['horses', 'beagles', 'rock music', 'shopping'];
var searchInput = '';
var queryURLBase = "https://api.giphy.com/v1/gifs/search?api_key=4fsb7d1ohaJA2VY1PVRh8MBdqYD7TAh1&q=&limit=10&offset=0&rating=PG&lang=en"
var gifDiv = $("<div>");
var gifImage;
makeButtons();
//Make a function that creates buttons out of the array//
function makeButtons() {
    $('.gifButtons').empty();
    for (i = 0; i < topics.length; i++) {
        var buttons = $('<button>');
        buttons.data('topics', topics[i]);
        buttons.append(topics[i]);
        buttons.addClass('gifButtons');
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
    $('#gifSearch').empty();
});

//Create an on click function to show Giphys//
$('.gifButtons').on('click', function () {
    var things = $(this).data("topics");
    console.log(things);
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
        things + "&api_key=4fsb7d1ohaJA2VY1PVRh8MBdqYD7TAh1&limit=10&offset=0&rating=PG&lang=en";
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        console.log(queryUrl);
        console.log(response);
        var stuffiLike = response.data;
        for (var i = 0; i < stuffiLike.length; i++) {
            if (stuffiLike[i].rating === "pg" || stuffiLike[i].rating === "g") {
                var rating = stuffiLike[i].rating;
                var gifP = $('<p>').text('Rating:' + rating);
                var image = stuffiLike[i].images;
                var gifImage = $('<img>');
                gifImage.attr("src", stuffiLike[i].images.fixed_height_small_still.url);
                gifImage.attr('data-still', stuffiLike[i].images.fixed_height_small_still.url);
                gifImage.attr('data-animate', stuffiLike[i].images.fixed_height_small.url);
                gifImage.attr('data-state', stuffiLike[i].images.fixed_height_small_still.url);

                gifDiv.addClass('giphy');
                gifDiv.append(gifP);
                gifDiv.append(gifImage);
                

                $('#gifBody').prepend(gifDiv);
            };
        };
    });
});
//Create an on click function to make Giphys animate or become still//
$('.giphy').on('click', function (event) {
    var gifState = $(this).attr('data-state');
    if (gifState === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'data-animate');
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'data-still');
    };
});


