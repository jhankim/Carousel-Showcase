//Olapic Carousel constructor
var olapicCarousel = olapicCarousel || function(divID) {
	this.targetDiv = divID;

	this.init();
};

//Function for Logging Debug Messages
olapicCarousel.prototype.log = function(type, message, argsArray){
	var  debug = true
		, identifier = 'OLAPIC CAROUSEL: ';

	if(debug){
		if(!type) console.error(identifier + 'Missing Log Type');
		if(!message) console.error(identifier + 'Missing Log Message');

		switch (type){
			case 'log':
				console.log(identifier + message, argsArray);
				break;
			case 'debug':
				console.debug(identifier + message, argsArray);
				break;
			case 'info':
				console.info(identifier + message, argsArray);
				break;
			case 'warn':
				console.warn(identifier + message, argsArray);
				break;
			case 'error':
				console.error(identifier + message, argsArray);
				break;
			default:
				console.log(identifier + message, argsArray);
		}
	}
};

//Function for making the API Call
olapicCarousel.prototype.api = function(callback){
	var apiKey = '0a40a13fd9d531110b4d6515ef0d6c529acdb59e81194132356a1b8903790c18'
		, mediaEndpoint = 'https://photorankapi-a.akamaihd.net/customers/215757/media/recent'
		, apiCall = '?auth_token=' + apiKey
    	, request = mediaEndpoint + apiCall;

    var that = this;

    // Fire AJAX :)
    $.ajax({  
        type: "GET", // define type of HTTP request
        url: request, // define request URL from above
        dataType: "json", // define data type that we're going to be receiving
        success: function (e) {
        	if(callback){
        		callback(e.data._embedded);
        	}
        	else {
        		that.log('error', 'No callback defined for API call');
        	}
        },  
		error: function(msg) {
			that.log('error', 'API call failed' , [msg])
		}
     });
};
//TO-DO: Create Function to Create Carousel based on an array
//TO-DO: Create Function to Handle Carousel Movement
//TO-DO: Create Function to Handle light box image view
//TO-DO: Create init function.
olapicCarousel.prototype.init = function(){
	//TEMP: Test API function
	this.api(function(e){console.log(e);});
};


var test = new olapicCarousel();