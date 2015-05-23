function showSlide (i) {
	var img = $('.b-slider__bg').eq(i-1);
	var text = $('.b-slider__informer-content').eq(i-1);
	var pager = $('.b-slider__controls-item').eq(i - 1);
	$('.b-slider__bg').not(img).fadeOut();
	$('.b-slider__informer-content').not(text).hide();
	$(pager).addClass('b-slider__controls-item_active').siblings().removeClass('b-slider__controls-item_active');
	img.fadeIn();
	text.fadeIn();
}

function showSliderSubmenu (elem) {
	var menu, m, mt, d, dy;

	menu = $(elem).find('.b-slider__submenu');
	m = $('.b-slider__menu').outerHeight();
	mt = $('.b-slider__menu').offset().top;
	d = (menu.outerHeight() - m)/2;

	$('.b-slider__submenu').not(menu).fadeOut(200);
	
	// check submenu placement and return css top value
	dy = d > mt ? (-mt): d > 0? (-d): 0;

	menu.css({top: dy}).fadeIn(200);
}

function hideSliderSubmenu (elem) {
	var menu = $(elem).find('.b-slider__submenu');
	menu.fadeOut(200);
}


$(document).ready(function() {
	showSlide(1);

	$('.b-slider__controls-item').on('click', function() {
		var slide = $(this).data('slide');
		showSlide(slide);
	});

	// modals
	$('.j-modal').on('click', function(e) {

		if($(window).width() > 480) {
			e.preventDefault();
			var tar = $(this).data('target');
			$(tar).arcticmodal();
		}
		
	});
	// modals close
	$('.b-modal__close').on('click', function() {
		$.arcticmodal('close');
	});


	// masked input on tel input
	$('.j-telMask').each(function() {
		$(this).mask("+ 7(999) 999-9999");
		console.log(1)
	});

	
	// submit on popup form 
	$('#recallFormSubmit').on('click', function(e) {
		if(!$('#recallForm').valid()) {
			e.preventDefault();
		}
	});	

	$('#feedbackFormSubmit').on('click', function(e) {
		if(!$('#feedbackForm').valid()) {
			e.preventDefault();
		}
	});	

	// accordion

	$('.b-accordion__title-link').on('click', function(e) {
		e.preventDefault();

		$(this).closest('.b-accordion').find('.b-accordion__content').slideToggle();
	});	
	

	
	if($(window).width() > 480) {

		// if devise is not mobile 

		$('.b-slider__menu-item').hoverIntent({
		    over: function(){showSliderSubmenu(this)},
		    out: function(){hideSliderSubmenu(this)},
		    timeout: 400
		});
	} else  {
		$('.b-slider__menu-item--link').on('click', function(e) {
			var submenu;
			e.preventDefault();
			submenu = $(this).closest('.b-slider__menu-item').find('.b-slider__submenu');
			$(submenu).slideDown(300);
		})
	};



	$(window).on('resize', function() {
		$('.b-slider__submenu').attr('style', '')
	});

	jQuery.extend(jQuery.validator.messages, {
	    required: "Пожалуйста, заполните это поле",
	    remote: "Please fix this field.",
	    email: "Please enter a valid email address.",
	    url: "Please enter a valid URL.",
	    date: "Please enter a valid date.",
	    dateISO: "Please enter a valid date (ISO).",
	    number: "Please enter a valid number.",
	    digits: "Please enter only digits.",
	    creditcard: "Please enter a valid credit card number.",
	    equalTo: "Please enter the same value again.",
	    accept: "Please enter a value with a valid extension.",
	    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
	    minlength: jQuery.validator.format("Please enter at least {0} characters."),
	    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
	    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
	    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
	    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
	});


	// form validation

	$('#recallForm').validate();

	$('#feedbackForm').validate(); 

});