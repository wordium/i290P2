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
     
     $(document).on('keypress','#autocomplete input.ui-autocomplete-input',function (event){ 
          $(this).focus().autocomplete({
               source: genres
          });     
     });
     
     //$("#theinternship-text1").autocomplete({
     //     source: genres
     //});

     //$("#autocomplete").append('<button type="button" onclick="alert('Hello world!')">Click Me!</button>');

});

function upLoadFree() {
     $( "#freeform").hide();
     $('input','#freeform').each(function(i,e){
          var srcText = $("#"+e.id).val();
          var destText = e.name +'-label'+ (e.id).slice(-1);
          $("#"+destText).text(srcText);
     });
}

function upLoadAuto() {
     $( "#autocomplete").hide();
     $('input','#autocomplete').each(function(i,e){
          var srcText = $("#"+e.id).val();
          var destText = e.name +'-label'+ (e.id).slice(-1);
          $("#"+destText).text(srcText);
     });
}

function getMovieDetails() {
     var movies = [770672122, 10056, 770805418, 10015, 769959054, 771308218];
     var $deferreds = [];
     $.each( movies, function(key, value) {
          $deferreds[key] = $.ajax({
              url: BASEURL + 'movies/' +value +'.json?' + KEY,
              dataType: "jsonp"
          }).success(function (data) { 
               var titleStr = data.title.replace(/\s+/g,"").toLowerCase();
               var textFields = $('<div class="movieText" />');
               var labelFields = textFields.clone();
               for(var i = 1; i <= 3; i++) {
                    //<span class='shortLogo'><img class='shortHistTeam' src='img/teams/"+history[key].t_name+".jpg'></span>
                    labelFields.append('<span id="'+titleStr+ '-label'+i+ '" class = "movie-labels"> genre</span>');
                    if (key < 3) {
                         textFields.append('<input id="'+titleStr+ '-text'+i+ '" name="'+titleStr+'" placeholder="type proper genre of this movie" />');
                    }
                    else {
                         textFields.append('<input class="ui-autocomplete-input" id="'+titleStr+ '-text'+i+ '" name="'+titleStr+'" placeholder="type proper genre of this movie" autocomplete="off"/>');   
                    }
                    
               }     
               var divs = $('<div class="movieItem"></div>')
                           .append('<div class="movieImage"><img src="' + data.posters.detailed + '"><p class="movieTitle">' + data.title + '</p></div>')
               var rslts =divs.clone();

               
               divs.append('<div class="movieDesc"><p>' + data.critics_consensus + '</p></div>').append(textFields);
               rslts.append(labelFields);

               if (key < 3) {
                    $("#freeform").append(divs);
               }
               else {
                    $("#autocomplete").append(divs);    
               }
               $("#results").append(rslts); })

            .error(function () { 
               console.log(error);
               console.log("Error: "+error.statusText);
               alert('gulp!'); })
            ;
      });

     $.when.apply($,$deferreds).then(function(){
             console.log("All ajax finished");
             $('#freeform').append('<button type="button" onclick="upLoadFree(); return false;">Click Me!</button>');
             console.log("freeform button created");
             $('#autocomplete').append('<button type="button" onclick="upLoadAuto(); return false;">Click Me!</button>');
             console.log("autocomplete button created");  
         });
    
}