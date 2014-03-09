//Olapic Carousel constructor
var olapicCarousel = olapicCarousel || function(divID, minSlides, maxSlides) {
	this.targetDiv = divID || 'olapicCarousel';
	this.minSlides = minSlides || 1;
	this.maxSlides = maxSlides || 5;
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

//Function to process API response to create formated Carousel Array
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

//Function to Create Carousel based on an  formated array
olapicCarousel.prototype.createCarousel = function(targetDiv, imageArray){
	if(!imageArray) this.log('error', 'No imageArray passed to createCarousel.')

	var carouselHTML = ''
		, openingHTML = '<ul class="bxslider">'
		, closingHTML = '</ul>'
		, imageURL = ''
		, imageTitle = '';

	carouselHTML += openingHTML;

	for(i in imageArray){
		imageID = imageArray[i].identifier;
		imageURL = imageArray[i].images.square;
		imageTitle = imageArray[i].captions;

		carouselHTML += '<li><a id="' + imageID + '"><img src="' + imageURL + '" title="' + imageTitle + '" /></a></li>';
	}

	carouselHTML += closingHTML;

	var that = this;

	$(function() {
		that.log('log', 'Created Carousel targetDiv', [targetDiv]);
		that.log('log', 'Created Carousel HTMl', [carouselHTML]);
		if($(targetDiv).length == 0){
			that.log('error', 'Provided Div ID does not exist', [targetDiv]);
		}
		else {
		    $(targetDiv).html(carouselHTML);

		    var targetCarousel = $(targetDiv + ' .bxslider');

		    targetCarousel.bxSlider({
				minSlides: that.minSlides,
				maxSlides: that.maxSlides,
				slideWidth: 90,
				slideMargin: 5
				, onSliderLoad: function(){
					// do mind-blowing JS stuff here
					that.lightBoxCreate();
					$(targetDiv + ' .bxslider li a').click(function () {
						var selected = $(this).attr('id');
						that.log('log', 'Image Clicked for lightbox', [selected]);
						that.lightBoxOpen(selected);
					});
				}
			});
		}
	});
};

// Function to Handle light box image view opening
olapicCarousel.prototype.lightBoxCreate = function(selectedID){
	var that = this
		, lightbox = $('#lightbox')
		, body = $('body');

	// add lightbox/shadow <div/>'s if not previously added
	if(lightbox.size() == 0){
		var theLightbox = $('<div id="lightbox"/>');
		var theShadow = $('<div id="lightbox-shadow"/>');
		$(theShadow).click(function(e){
			that.lightBoxClose();
		});
		body.append(theShadow);
		body.append(theLightbox);
	}

	// remove any previously added content
	lightbox.empty();
};

// Function to Handle light box image view opening
olapicCarousel.prototype.lightBoxOpen = function(selectedID){
	if(!selectedID) this.log('error', 'LightBox can\'t open no ID passed', [selectedID])
	else this.log('log', 'Lightbox Opening for ', [selectedID]);

	var imageURL = null
		, imageTitle = 'Carousel Image Lightboxed';

	//Loop through imageArray and find image url for lightbox
	for(i in this.imageArray){
		if(this.imageArray[i].identifier === selectedID){
			imageURL = this.imageArray[i].images.normal;
			imageTitle = this.imageArray[i].captions
			break;
		}
	}
	if(imageURL !== null){
		var imageHTML = '<img src="' + imageURL + '" title="' + imageTitle + '" />'
			, lightbox = $('#lightbox')
			, lightboxShadow = $('#lightbox-shadow');

		// remove any previously added content
		lightbox.empty();

		// insert HTML content
		if(imageHTML != null){
			lightbox.html(imageHTML);

		}

		// move the lightbox to the current window top + 100px
		lightbox.css('top', $(window).scrollTop() + 100 + 'px');

		// display the lightbox
		lightbox.show();
		lightboxShadow.show();
	}
	else{
		this.log('error','Clicked on Image ID doesn\'t exist in imageArray',[selectedID]);
	}
};

// Function to Handle light box image view closing
olapicCarousel.prototype.lightBoxClose = function(){
	//Hide lightbox and shadow and empty lightbox contents
	$('#lightbox').hide();
	$('#lightbox-shadow').hide();
	$('#lightbox').empty();

	this.log('log', 'lightbox Closed');
};


// Initialization function.
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