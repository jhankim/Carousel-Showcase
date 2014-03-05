// START OLAPIC API SCRIPT
		
$(document).ready(function() {	
	// Olapic Widget
	// Configure Olapic Widget
	var apiKey = '0a40a13fd9d531110b4d6515ef0d6c529acdb59e81194132356a1b8903790c18'; // this is tempdir: jae
	var result;
	var mediaEndpoint = 'https://photorankapi-a.akamaihd.net/customers/215757/media/recent';

	//+++++++++++++++++++++++++++++++++++++++++

    var apiCall = '?auth_token=' + apiKey;
    var request = mediaEndpoint + apiCall

    // Fire AJAX :)
    $.ajax({  
        type: "GET", // define type of HTTP request
        url: request, // define request URL from above
        dataType: "json", // define data type that we're going to be receiving
        success: function (e) {
        	$('span').append('Data received. Check console to view objects received');
            // Go through each e.data._embedded data
            $.each( e.data._embedded, function( key, value ) {
				console.log( value );
			});
        },  
		error: function(msg) {
			$('h1').append(msg.statusText).append(' - ERROR: check console.');
		}
     }); 
});