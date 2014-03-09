# Carousel-Showcase

## Customized Code for client

### Files Needed to host

1. Contents of bxSlider Library - /lib/bxSlider
2. Custom JavaScript file for creating Carousels - custom_olapic_config.js
3. Custom CSS file for styling lightbox effect - custom_olapic_style.css
4. Style Reset file - style_reset.css
5. JQuery Library - http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js

### Instructions for Creating a Carousel

In order to create a carousel you need to create and stylize a div for it on the page. Once this is done you can create the carousel with the following JavaScript code. The MIN_SLIDE_NUMBER and MAX_SLIDE_NUMBER integers are optional. If not entered the Carousel defaults to 1 for the min and 5 for the max. The DIV_ID_STRING option is required.

```javascript
var NEW_CAROUSEL_NAME = new olapicCarousel(DIV_ID_STRING, MIN_SLIDE_NUMBER, MAX_SLIDE_NUMBER);
```

### Example Hosted on Heroku

An example of this running can be found on Heroku at (http://dry-retreat-5391.herokuapp.com/).

To enable debugging you need to add ?debug=true to the end of the url like this (http://dry-retreat-5391.herokuapp.com/?debug=true).

Once on the page you can use the below JavaScript to initialize a second carousel from the command line. You can also add the min and max slide number parameters to customize the carousel size.

```javascript
var test2 = new olapicCarousel('#carousel2');
```