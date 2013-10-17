var KEY = 'apikey=bxyrp4av33rguwg65v78tyhr'; // Rotten Tomatoes API key. Documentation here: http://developer.rottentomatoes.com/docs
var BASEURL = 'http://api.rottentomatoes.com/api/public/v1.0/'; // Base URL for making calls to the RT API.
var SIMILARMOVIES =[];   //Array to store movies for autocomplete
var MOVIEGENRE= [];
$(document).ready(function() {

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

     getMovieDetails();

     $("#autocomplete").hide();
     $("#results").hide();

     $("#autocomplete input").autocomplete({
        source: genres

     });

});

function upLoadInput(currentDiv, nextDiv) {
     $( "#"+currentDiv).hide();
     $( "#"+nextDiv).show();
     $( "#"+currentDiv + " input").each(function(i,e){
          var srcText = $(this).val();
          //var liText = $(("#"+currentDiv+"List1 li").index(i))
          //console.log(liText)
          if (i <3) {
               $("#"+currentDiv+"List1").append('<li>' + srcText + '</li>')
          }
          else if (i < 6) {
               $("#"+currentDiv+"List2").append('<li>' + srcText + '</li>')
          }
          else {
               $("#"+currentDiv+"List3").append('<li>' + srcText + '</li>')             
          }
     });
}
  
function getMovieDetails() {
     var movies = [770672122, 770805418, 10056,10015, 13037, 771245728];
     var $deferreds = [];
     $.each( movies, function(key, value) {
          $deferreds[key] = $.ajax({
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