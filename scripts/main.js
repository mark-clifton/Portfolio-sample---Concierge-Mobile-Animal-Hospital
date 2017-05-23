/* ====================================================================================================================
    Consolidated UI scripts
==================================================================================================================== */

/* Hide elements for fade in */
$("html").addClass("js");

$(document).ready(function(){

	/* ====================================================================================================================
        Reload page on resize, to reset responsive elements
    ==================================================================================================================== */

	var winWidth = $(window).width();

	function responsiveresize(){
        window.location.reload();
	};
	var resizeTimer;
	$(window).resize(function() {
		//New height and width
		var winNewWidth = $(window).width();
		// compare the new height and width with old one
		if(winWidth!=winNewWidth) {
			//Reload after timeout
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(responsiveresize, 100);
		}
		//Update the width and height
		winWidth = winNewWidth;

	});

	/* ====================================================================================================================
        Navigation
    ==================================================================================================================== */

	function toggleMenu(){
		$(".site-nav").toggleClass("open");
		$(".nav-overlay").toggleClass("open");
		$("body").toggleClass("open");
	};
	// Load on small screens only
	if(Modernizr.mq('screen and (max-width:1003px)')) {
		// Add toggle buttons
		$(".nav-container").prepend("<div class=\"nav-toggle\"><img src=\"images/icon-nav.svg\" alt=\"Menu\" class=\"menu-icon icon\"><span>Menu</span></div>");
		$("body").append("<div class=\"nav-overlay\"></div>");
		// Toggle button
		$(".nav-toggle").click(function(){
			 toggleMenu();
		});
		$(".nav-overlay").click(function(){
			 toggleMenu();
		});
	}

	/* ====================================================================================================================
        Move elements
    ==================================================================================================================== */

	// Clone hero background image and add to hero to act as a shim to match the hero height to the fixed-position background height
	$('.hero-background img').clone().prependTo('.hero');
	// Move phone number to .mobile-contact container on small screens
	if(Modernizr.mq('screen and (max-width:1003px)')) {
		$('.mobile-contact').append($('.header-phone span'));
	}

});

/* ====================================================================================================================
	Sticky header
==================================================================================================================== */

function stickyElement(element, sticky_navigation_offset_top) {
    // Load on larger screens only
    if(Modernizr.mq('screen and (min-width:1004px)')) {
        // our function that decides weather the navigation bar should have "fixed" css position or not.
        var sticky_navigation = function(){
            var scroll_top = $(window).scrollTop(); // our current vertical position from the top
            // if we've scrolled more than the navigation, toggle its class
            if (scroll_top > sticky_navigation_offset_top) {
                $(element).addClass('stuck');
            } else {
                $(element).removeClass('stuck');
            }
        };    // run our function on load
        sticky_navigation();
        // and run it again every time you scroll
        $(window).scroll(function() {
            sticky_navigation();
        });
    }
}
$(function() {
	/* Make header sticky */
	var header_offset = $('.site-header').height();
	stickyElement('.site-header', header_offset);
});

/*====================================================================================================================
	Off-canvas mobile nav
==================================================================================================================== */

// Close menu on click outside menu
$(document).on("click", ".main.open", function () {
	var mainOffset = $(this).css("left").replace("px", "");
	if (mainOffset > 0) {
		$(".nav-toggle").removeClass("open");
		$(".main").removeClass("open");
		$(".menu").removeClass("open");
		$(".nav-container").removeClass("show-sub");
		$(".has-sub-nav").removeClass("active");
	};
});

/*====================================================================================================================
	Custom Google Map API
==================================================================================================================== */

function initMap() {
	/* Map styles */
	var customMapType = new google.maps.StyledMapType([
		{
			stylers: [
				{hue: '#0083c1'},
				{visibility: 'simplified'}
			]
		},
		{
			featureType: 'landscape',
			stylers: [{color: '#0083c1'}]
		},
		{
			featureType: 'poi',
			stylers: [{visibility: 'off'}]
		},
		{
			featureType: 'transit',
			stylers: [{visibility: 'off'}]
		},
		{
			featureType: 'all',
			elementType: 'labels.text',
			stylers: [{color: '#ffffff'}]
		},
		{
			featureType: 'road',
			elementType: 'geometry',
			stylers: [{color: '#97e2ed'}]
		},
		{
			featureType: 'road',
			elementType: 'labels.icon',
			"stylers": [
				{hue: '#00283b'},
				{saturation: 60},
				{lightness: -50}
			]
		},
		{
			featureType: 'water',
			stylers: [{color: '#00588a'}]
		}
	], {
	name: 'Custom Style'
	});
	var customMapTypeId = 'custom_style';
	/* Create map */
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 33.8622366, lng: -118.3995194}, // Center map on Hermosa Beach, CA
		zoom: 11,
		mapTypeControl: false,
		streetViewControl: false,
		scrollwheel: false,
		draggable: false,
		zoomControl: false
	});
	/* Apply styles to map */
	map.mapTypes.set(customMapTypeId, customMapType);
	map.setMapTypeId(customMapTypeId);
	/* Create polygon overlay from Fusion Tables coordinate data */
	var layer = new google.maps.FusionTablesLayer({
		query: {
			select: 'Boundaries',
			from: '1yCePEQvnbNFGHEMoPT0HAgHIQET-ueIMaYWahwk7'
		},
		suppressInfoWindows: true,
		styles: [{
			polygonOptions: {
				clickable: false,
				fillColor: '#a3feff',
				fillOpacity: 0.5,
				strokeColor: '#a3feff',
				strokeOpacity: 0.01
			}
		}]
	});
	layer.setMap(map);
}
