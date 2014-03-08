//Olapic Carousel constructor
var olapicCarousel = olapicCarousel || function(divID) {
	this.targetDiv = divID || 'olapicCarousel';
	this.imageArray = [];

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

//Function for making the API Call to Olapic to get Images
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
        		that.log('error', 'No callback defined for API call.');
        	}
        },  
		error: function(msg) {
			that.log('error', 'API call failed.' , [msg])
		}
     });
};

//TO-DO: Create Function to process API response to Carousel Array
olapicCarousel.prototype.processApiResponse = function(apiArray, imageArray, callback){
	for(var i in apiArray){
		var imageObject = {};

		imageObject.identifier = apiArray[i]._analytics.oid;
		imageObject.captions = apiArray[i].caption;
		imageObject.images = apiArray[i].images;

		imageArray.push(imageObject);
	}

	if(callback) callback();
};

//TO-DO: Create Function to Create Carousel based on an array
olapicCarousel.prototype.createCarousel = function(targetDiv, imageArray){
	if(!imageArray) this.log('error', 'No imageArray passed to createCarousel.')

	var carouselHTML = ''
		, openingHTML = '<ul class="bxslider">'
		, closingHTML = '</ul>'
		, imageURL = ''
		, imageTitle = '';

	carouselHTML += openingHTML;

	for(i in imageArray){
		imageURL = imageArray[i].images.square;
		imageTitle = imageArray[i].captions;

		carouselHTML += '<li><img src="' + imageURL + '" title="' + imageTitle + '" /></li>';
	}

	carouselHTML += closingHTML;

	var that = this;

	$(function() {
		that.log('log', 'Created Carousel targetDiv', [targetDiv]);
		that.log('log', 'Created Carousel HTMl', [carouselHTML]);
	    $(targetDiv).html(carouselHTML);

	    $('.bxslider').bxSlider({
			minSlides: 1,
			maxSlides: 5,
			slideWidth: 90,
			slideMargin: 5
		});
	});
};

//TO-DO: Create Function to Handle light box image view

//TO-DO: Create init function.
olapicCarousel.prototype.init = function(){
	var imageArray = this.imageArray
		, targetDiv = this.targetDiv
		, that = this;
	//TEMP: Test API function
	this.api(function(apiArray){
		that.log('log', 'Raw apiArray', [apiArray]);
		that.processApiResponse(apiArray, imageArray, function(){
			that.log('log', 'Processed imageArray', [imageArray]);
			that.log('log', 'Create Carousel in targetDiv', [targetDiv])
			that.createCarousel(targetDiv, imageArray);
		})
	});
};


var test = new olapicCarousel('#carousel1');