jQuery(document).ready(function($){

	//svg для IE и некромантов
	svg4everybody();

	//подстраиваем высоту баннеров
	function bannerHeight() {
		var bHeight = $('.promo-item.big').innerHeight();
		$('.promo-midi').css('height',bHeight);

		var gridAllHeight = $('.grid-items .grid-item.mini:first').innerHeight();
		$('.grid-items .grid-all').css('height',gridAllHeight);
	}
	$(window).on("load resize",bannerHeight);


	//вешаем классы на итемы в беннерной сетке на главной
	var j = 0;
	$('.grid-items .grid-item').each(function(){
		j++;
		$(this).addClass('grid-item-'+j);
	});
	var k = 0;
	$('.grid-items .grid-item.midi').each(function(){
		k++;
		$(this).addClass('grid-midi-'+k);
	});


	//разворачиваем мобильное меню
	$('.h-mm-toggler').on('click', function(){
		$(this).toggleClass('opened');
		$('.main-menu').toggleClass('opened');
	});
	$(document).mouseup(function (e) {
    if ($('.header .inner .flex').has(e.target).length === 0){
    	$('.h-mm-toggler').removeClass('opened');
      $('.main-menu').removeClass('opened');
    }
	});


	//ищем li с дочерними подпонктами
	$('.main-menu > ul > li').each(function(){
		var mLi = $(this),
				mUl = $(this).find('ul');

		if (mUl.length) {
			mLi.addClass('childs-in').append('<i class="childs-toggler"></i>');
		}
	});


	//разворачиваем подпункты меню
	$('.childs-toggler').on('click', function(){
		$(this).toggleClass('opened');
		$(this).prev('ul').toggleClass('opened');
	});


	//перемещаем сайдбар
	if(matchMedia) {
		var screen880 = window.matchMedia('(max-width:880px)');
		screen880.addListener(changes);
		changes(screen880);
	}
	function changes(screen880) {
		if(screen880.matches) {
			// console.log('<880');

			$('.inner #sideRight').insertAfter($('#content'));

		} else {
			// console.log('>880');
			$('#content + #sideRight').prependTo($('#container > .inner'));
		}
	}

});//ready close