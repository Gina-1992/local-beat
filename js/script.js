/*
This script sets up and compiles the js template Handlebars, and accesses objects within the JSON file where necessary.
*/

$(document).ready(function(){

    // Creates a variable for the template itself
    var beatTemplate = $("#local-beat-content").html();
    
    //Create variable for the process of compiling the content within the template
	var compiledBeatTemplate = Handlebars.compile(beatTemplate);
    
   
    // Ajax call to fetch the JSON file from a server. 
    // 'My JSON' was used in this circumstance (json storage service) as using a local json file fails across some browsers due to to security.
   
    $.ajax({
        url:"https://api.myjson.com/bins/197c7s",
        method:'get',
         success: function (response) {
            $("#content-container").html(compiledBeatTemplate(response));

            /// Two JSON URLs, one with manual entry of images and other with original image entries.

              //https://api.myjson.com/bins/197c7s - in use
              //https://api.myjson.com/bins/12yad4 - manual entry
          
            
            // Function which accesses the officers array. Any image value that is empty should be replaced with a default image. Unfortunately this didn't work..

            var imageObj = response.beat.officers;

            imageObj.forEach(function(photo) {
                console.log('the photo is'  + photo.image);
                
                if (photo.image == '') {
                    photo.image = 'officer-profile';
                   // console.log('this value is null. Please replace with an image file name.');
                }
            });

            //Google maps API. API key obtained through Google Developers area once project was set up.

            //var mapPoint = response.beat.latLong;
            //console.log('the coordinates are' + mapPoint);
            //api key: AIzaSyCGVm4tStxmeEOdKhTGuN9uLYv2tzRAUWE

            // Creating a variable which accesses the latitude and longitude coordinates. Because they are both within the value, splitting them into two
            // needed to be carried out to be able to pass this through the google maps LatLng parameter. 

            var coords = response.beat.latLong.split(",");

            //Default/popular function was used to activate google maps API.

            function initMap() {
                map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 13,
                  center: new google.maps.LatLng(parseFloat(coords[0]),parseFloat(coords[1]))
                });

                // Using the variable to separate the latitude and longitude, i passed this through the coordinates parameter using the
                // parse float function to convert the string to a number. This could then be accessed by selecting each value in order via indexing.
                
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1])),
                    map: map});
            }
            
            //initialise google maps!

           initMap();

        }})
    });