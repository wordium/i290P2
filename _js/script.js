var KEY = 'apikey=bxyrp4av33rguwg65v78tyhr'; // Rotten Tomatoes API key. Documentation here: http://developer.rottentomatoes.com/docs
var BASEURL = 'http://api.rottentomatoes.com/api/public/v1.0/'; // Base URL for making calls to the RT API.

// When the DOM is ready (ie. now), init scripts.
$(document).ready(function() {

  // List of pre-defined genres to use as controlled vocabulary.
  var genres = ['Action & Adventure',
               'Animation',
               'Art House & International',
               'Classics',
               'Comedy',
               'Cult Movies',
               'Documentary',
               'Drama',
               'Faith & Spirituality',
               'Horror',
               'Kids & Family',
               'Musical & Performing Arts',
               'Mystery & Suspense',
               'Romance',
               'Science Fiction & Fantasy',
               'Special Interest',
               'Sports & Fitness',
               'Television',
               'Western'];

    var genres_autocomplete = [{
        label: 'Action & Adventure',
        value: 'Action & Adventure'
      }, {
        label: 'Animation',
        value: 'Animation'
      }, {
        label: 'Art House & International',
        value: 'Art House & International'
      }, {
        label: 'Classics',
        value: 'Classics'
      }, {
        label: 'Comedy',
        value: 'Comedy'
      }, {
        label: 'Cult Movies',
        value: 'Cult Movies'
      }, {
        label: 'Documentary',
        value: 'Documentary'
      }, {
        label: 'Drama',
        value: 'Drama'
      }, {
        label: 'Faith & Spirituality',
        value: 'Faith & Spirituality'
      }, {
        label: 'Horror',
        value: 'Horror'
      }, {
        label: 'Kids & Family',
        value: 'Kids & Family'
      }, {
        label: 'Musical & Performing Arts',
        value: 'Musical & Performing Arts'
      }, {
        label: 'Mystery & Suspense',
        value: 'Mystery & Suspense'
      }, {
        label: 'Romance',
        value: 'Romance'
      }, {
        label: 'Science Fiction & Fantasy',
        value: 'Science Fiction & Fantasy'
      }, {
        label: 'Special Interest',
        value: 'Special Interest'
      }, {
        label: 'Sports & Fitness',
        value: 'Sports & Fitness'
      }, {
        label: 'Television',
        value: 'Television'
      }, {
        label: 'Western',
        value: 'Western'               
      }
    ];

    //Load the movie details onto page    
     getMovieDetails();

     // 
     $("#autocomplete").hide();
     $("#results").hide();

     $("#autocomplete input").autocomplete({
        source: genres,
        response: function (event, ui) {
          // remove result and build search result again so that the result includes all genres.
          ui.content.splice(0, ui.content.length);
          for (var i = 0; i < genres_autocomplete.length; i++) {
            ui.content.push(genres_autocomplete[i]);
          }
        }
     });

     $("#autocomplete input").blur(function() {
        if ($.inArray(this.value, genres) === -1) {
          this.value = "";
          this.focus();
        }
     });
});

function upLoadInput(currentDiv, nextDiv) {
    var textBox;
    // Loop over the required textBoxes, looking for an empty one
     $( "#"+currentDiv + " input.reqText").each(function(){
        if ($(this).val() == "") {
          // Get the current textBox
          textBox = $(this)
          // Exit loop we
          return false;
 
        }
      })

    // Check to see if this we have an empty textBox. 
    if (textBox) {
      // Give focus to the empty textBox.
      textBox.focus();
      return;
    }

     // Close current view and open a new one
     $( "#"+currentDiv).fadeOut('slow');
     $( "#"+nextDiv).fadeIn('slow');
     // Loop over the textBoxes, checking for input and populate on results page
     $( "#"+currentDiv + " input").each(function(i){
          var srcText = $(this).val();
          if (i <3 && srcText != "") {
               $("#"+currentDiv+"List1").append('<li>' + srcText + '</li>')
          }
          else if (i < 6 && srcText != "") {
               $("#"+currentDiv+"List2").append('<li>' + srcText + '</li>')
          }
          else if (srcText != "") {
               $("#"+currentDiv+"List3").append('<li>' + srcText + '</li>')             
          }
     });
}
  
function getMovieDetails() {
    // List of movies to be loaded.
     var movies = [770672122, 770805418, 10056,10015, 13037, 771245728];

     // For each movie load the details onto page 
     $.each( movies, function(key, value) {
          $.ajax({
              url: BASEURL + 'movies/' +value +'.json?' + KEY,
              dataType: "jsonp"

          }).success(function (data) {

              if (key < 3) {
                    var divs = "freeform" + (key+1);
               }
               else {
                    var divs = "autocomplete" + (key-2)
               }

              $("#"+divs+" img").attr('src', data.posters.detailed);
              $("#"+divs+" div.movieTitle").text(data.title);
              $("#"+divs+" div.movieDesc").text(data.critics_consensus);

            })

            .error(function () { 
               console.log(error);
               console.log("Error: "+error.statusText);
               })
            ;
      });
}