# Carousel-Showcase

---

## Customized Code for client

### Files Needed to host

1. Contents of bxSlider Library - /lib/bxSlider
2. Custom JavaScript file for creating Carousels - custom_olapic_config.js
3. Custom CSS file for styling lightbox effect - custom_olapic_style.css
4. Style Reset file - style_reset.css
5. JQuery Library - http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js

### Instructions for Creating a Carousel

In order to create a carousel you need to create and stylize a div for it on the page. Once this is done you can create the carousel with the following JavaScript code. 

```javascript
var NEW_CAROUSEL_NAME = new olapicCarousel(DIVID_STRING, MIN_SLIDE_NUMBER, MAX_SLIDE_NUMBER);
```