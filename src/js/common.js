$(document).ready(function() {
	$('.s-ingredients__slider--lg-js').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		// fade: true,
		rtl: false,
		asNavFor: '.s-ingredients__slider--sm-js'
	});
	$('.s-ingredients__slider--sm-js').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.s-ingredients__slider--lg-js',
		dots: false,
		arrows: false,
		// centerMode: true,
		focusOnSelect: true,
		rtl: false
	});
});
