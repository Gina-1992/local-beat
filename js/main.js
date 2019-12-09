// JavaScript Document

(function($){
    
    "use strict";
    
	
	  //===== page animation
	
	var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
    // ... more custom settings?
});
	
	
    //===== Preloader
    
    $(window).on('load', function(event) {
        $('#preloader').delay(4000).fadeOut(500);
    });
    
    
    //===== Mobile Menu 
    
    $(".navbar-toggler").on('click', function() {
        $(this).toggleClass('active');
    });
    
    $(".navbar-nav a").on('click', function() {
        $(".navbar-toggler").removeClass('active');
    });
    
    
    //===== close navbar-collapse when a clicked
    
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
		/*if ( $(".navbar-collapse").hasClass("show")) {
			$('.navigation').css('background' , '#ffffff');
		}*/
    });
    
    
    //===== Sticky menu 
	
    
    $(window).on('scroll', function(event) {    
        var scroll = $(window).scrollTop();
        if (scroll < 10) {
            $(".navigation").removeClass("sticky");
			 $('.navbar-logo img').attr('src','images/gh-logo.svg');
			$('.navbar-logo img').stop().animate(400);
        } else{
            $(".navigation").addClass("sticky");
			 $('.navbar-logo img').attr('src','images/gh-logo-bg.svg');
			$('.navbar-logo img').animate(400);
        }
    });


	
	
     //===== Section Menu Active

    var scrollLink = $('.page-scroll');
        // Active link switching
        $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function() {

          var sectionOffset = $(this.hash).offset().top - 100;

          if ( sectionOffset <= scrollbarLocation ) {
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
          }
        });
    });
	
	//click handler for work trigger
	
		$('#work .btn').click(function() {
			console.log('button pressed');
		  //get the value of data-work-id-trigger
		  var tid = $(this).data('work-id-trigger');
		  //hide all portfolio work then show only the one's with data-work-id same as the clicked value
          var $current = $('.work-section[data-work-id="' + tid + '"]').fadeToggle(1000);
          $('.work-section').not($current).hide();

		  //if you don't want to hide the previous items
		  //$('.album-list[data-album-id="' + tid + '"]').toggle();
        });
        
        //hide project
        $('.back-to-work').click(function() {
            var tid = $('#work .btn').data('work-id-trigger');
            var $current = $('.work-section[data-work-id="' + tid + '"]');
            $current.hide();    
            $('.work-section').not($current).fadeOut("slow");
            $('html, body').animate({
                scrollTop: $("#work").offset().top + 140
            }, 1000);
            return false;
        });
    //===== Back to top
    
    // Show or hide the sticky footer button
    $(window).on('scroll', function(event) {
        if($(this).scrollTop() > 600){
            $('.back-to-top').fadeIn(200);
            $('.back-to-work').fadeIn(200);
        } else{
            $('.back-to-top').fadeOut(200);

        }
    });
    
    
    //Animate the scroll to top
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });
	
    
    
    
    
    
}(jQuery));