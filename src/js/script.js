jQuery(document).ready(function($){

	if (window.devicePixelRatio == 1) {
		$('html').addClass('no-retina');
	}

	if ($('.header-bg img').length){
		$('.header-bg').addClass('js');
		$('#header').css('backgroundImage','url('+$('.header-bg').find('img').attr('src')+')');
	}

	if ($('.catalog-product').length) {
		$('#header').addClass('product-page');
		$('#footer').addClass('product-page');
	}

	//галлерея для фотографий
  $('body').lightGallery({
  	selector: '.lightgallery'
  });


 	if($('.slick-article .item').length > 1) {
 		var slickArticle = $('.slick-article');
 		slickArticle.slick({
 			items: 1,
 			dots: false
 		});
 	}

 	$('.slick-screen .screen-slide:first .about img').remove();
 	$('.slick-screen .screen-slide:first .about .item').append('<object id="my-svg" type="image/svg+xml" data="images/slogan.svg"></object>');


 	var slickScreen = $('.slick-screen');
 	var slidesLength = $('.slick-screen .screen-slide').length;
 	slickScreen.slick({
 		infinite: false,
 		items: 1,
 		dots: false,
 		arrows: false,
 		lazyLoad: 'ondemand',
 		autoplay: true,
 		autoplaySpeed: 10000
 	});
 	var lazyCounter = 0;
 	slickScreen.on('lazyLoaded',function(event, slick, image, imageSource){
 		var parent = image.closest('.slick-slide'),
 				bgSrc = $(parent).find('.bg img').attr('src'),
 				imgs = $(parent).find('[data-lazy]').length;
 		lazyCounter++;
 		if (lazyCounter >= imgs) {
 			$(parent).find('.bg').css({
 				'backgroundImage':'url('+bgSrc+')'
 			});
 			$(parent).addClass('imgs-loaded');
 			$(parent).find('.preload').remove();

 			if ($(parent).find('#my-svg').length){
 				setTimeout(function(){
	 				var myAnimation = new Vivus('my-svg', {
				    type: 'oneByOne',
				    duration: 225
					}, slickScreenUpdate);
	 			},1000);
 			}
 			lazyCounter = 0;
 		}
 	});
 	function slickScreenUpdate() {
 		slickScreen.slick('slickSetOption', 'autoplaySpeed', 5000);
 	}
 	slickScreen.on('afterChange',function(slick, currentSlide){

 		var slideIndex = currentSlide.currentSlide;
 		$('.slick-screen-nav .icons a').removeClass('active');
 		$('.slick-screen-nav .icons a').eq(slideIndex).addClass('active');
 		$('.slick-screen-nav .links a').removeClass('active');
	 	$('.slick-screen-nav .links a').eq(slideIndex).addClass('active');
 	});
 	$(document).on('click','.slick-screen-nav .icons a', function(){
 		var slideIndex = $(this).index();
 		if (slideIndex <= slidesLength) {
	 		slickScreen.slick('slickGoTo',+slideIndex);
	 		$('.slick-screen-nav .icons a').removeClass('active');
	 		$(this).addClass('active');
	 		$('.slick-screen-nav .links a').removeClass('active');
	 		$('.slick-screen-nav .links a').eq(slideIndex).addClass('active');
 		}
 	});
 	$(document).on('click','.slick-screen-nav .links a', function(){
 		var slideIndex = $(this).index();
 		if (slideIndex <= slidesLength) {
	 		slickScreen.slick('slickGoTo',+slideIndex);
	 		$('.slick-screen-nav .links a').removeClass('active');
	 		$(this).addClass('active');
	 		$('.slick-screen-nav .icons a').removeClass('active');
	 		$('.slick-screen-nav .icons a').eq(slideIndex).addClass('active');
 		}
 	});


 	//раскрываем подробную историю предприятия
 	$(document).on('click','.history-full-toggler .btn', function(){
 		if ($(this).find('span').text() === 'Подробнее') {
 			$('.history-full').slideDown(200);
 			$(this).find('span').text('Скрыть подробное описание');
 		} else {
 			$('.history-full').slideUp(200);
 			$(this).find('span').text('Подробнее');
 		}
 	});


 	//плавная прокурутка к карте
 	$(document).on('click', '.map-link a',function(){
 		var mapOffset = $('.contact-map').offset().top;
 		$('html,body').animate({
 			scrollTop: mapOffset
 		},300);
 	});


 	//раскрываем вакансии
 	$(document).on('click', '.collapsible-head', function(){
 		$(this).toggleClass('opened');
 		$(this).next().slideToggle(200);
 	});


 	//разворачиваем/сворачиваем полноэкранный поиск
	$(document).on('click','.search-toogler', function(){
		$('.screen-search').stop().addClass('opened');
		setTimeout(function(){
			$('.screen-search-input').focus();
		},150)
	});
	$(document).on('click','.screen-search-close', function(){
		$('.screen-search').stop().removeClass('opened');
		$('.screen-search-input').blur();
	});
	

	//функция для навешивания изображений фоном
	function backgrounded (selector) {
		$(selector).each(function(){
			var $this = $(this),
			$src = $this.find('.img img').attr('src');
			if ($this.find('.img a').length) {
				$this.find('.img a').addClass('backgrounded').css('backgroundImage','url('+$src+')');
			} else if ($this.find('.img').length) {
				$this.find('.img').addClass('backgrounded').css('backgroundImage','url('+$src+')');
			} else {
				$(selector).addClass('backgrounded').css('backgroundImage','url('+$src+')');
			}
			
		});
	}
	

	//Замена телефонов ссылками
	$('.phone-link, .tel').each(function(){
		var phone = $(this).text().replace(/[^+0-9]/g, '');
		$(this).wrapInner('<a href="tel:' + phone + '"></a>');
	});

	

	$.datetimepicker.setLocale('ru');
  $('.archieve-calendar').datetimepicker({
  	i18n:{
		  ru:{
		   months:[
		    'Январь','Февраль','Март','Апрель',
		    'Май','Июнь','Июль','Август',
		    'Сентябрь','Октябрь','Ноябрь','Декабрь',
		   ],
		   dayOfWeek:[
		    "Вс", "Пн", "Вт", "Ср", 
		    "Чт", "Пт", "Сб", 
		   ]
		  }
		},
  	inline:true,
  	dayOfWeekStart: 1,
		format:'d.m.y',
		lang:'ru',
		timepicker:false,
  });

  

	//функция для навешивания изображений фоном
	function photosBackgrounded (selector) {
		$(selector).each(function(){
			var $this = $(this),
			$src = $this.find('img').attr('src');
			$this.addClass('backgrounded').css('backgroundImage','url('+$src+')');
		});
	}
	

	//плавающие соц кнопки
	if ( $('.float-social').length) {

		$(window).scroll(function(){
			var windowOffset = $(window).scrollTop(),
					floatOffset = $('.float-social-wrp').offset().top,
					contentHeight = $('.news-content').height(),
					floatHeight = $('.float-social').height(),
					floatStop = floatOffset + contentHeight - floatHeight;

			if (windowOffset > floatOffset && windowOffset < floatStop) {
				$('.float-social').addClass('float').removeClass('flip-bottom');
			} else {
				$('.float-social').removeClass('float').addClass('flip-bottom');

				if (windowOffset < floatStop) {
	        $('.float-social').removeClass('flip-bottom');
	    	}
			}
		});
	}//if end


	//ищем и раскрываем вложенные пункты в панеле меню
	$('.slide-panel-menu li').each(function(){
		var $this = $(this);
		if($this.find('ul').length) {
			$this.addClass('childs-in');
			$this.append('<i class="childs-toggler"></i>');
		}
	});
	$(document).on('click','.childs-toggler',function(){
		$(this).parent('li').toggleClass('childs-opened');
		$(this).siblings('ul').stop().slideToggle(100);
	});

	//разворачиваем панель меню
	$(document).on('click','.menu-toggler', function(){
		$(this).toggleClass('opened');
		$('.slide-panel').stop().toggleClass('opened');
	});
	$(document).on('click','.slide-panel-close', function(){
		$('.slide-panel').stop().removeClass('opened');
		$('.menu-toggler').removeClass('opened');
	});


	//разворачиваем/сворачиваем полноэкранный поиск
	$(document).on('click','.search-toggler', function(){
		$('.screen-search').stop().addClass('opened');
		setTimeout(function(){
			$('.screen-search-input').focus();
		},150)
	});
	$(document).on('click','.screen-search-close', function(){
		$('.screen-search').stop().addClass('closed').removeClass('opened');
		$('.screen-search-input').blur();
		setTimeout(function(){
			$('.screen-search').removeClass('closed');
		},350);
		
	});
  



	//разворачиваемые блоки
	$('.toggleDown').on('click',function(e){
		e.preventDefault();
		$(this).next('.toggledDiv').slideToggle(150);
	});


	//mfp для видео
  $('.mfp-video').magnificPopup({
    // disableOn: 700,
    type: 'iframe',
    mainClass: 'magnific-video',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });
   

	
	//инициализация MFP popup для форм
	$(document).on('click','.ajax-mfp',function(){
		var a = $(this);
		$.magnificPopup.open({
			items: { src: a.attr('data-href') },
			type: 'ajax',    
			overflowY: 'scroll',
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			ajax: {
				tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
			},
			callbacks: {
				open: function () {
					setTimeout(function(){
						$('.mfp-wrap').addClass('not_delay');
						$('.white-popup').addClass('not_delay');
					},700);
				}
		  }
		});
		return false;
	});


	//стилизация элементов форм
  $(function() {
		$('input[type="checkbox"], input[type="radio"], input[type="file"], select').not('.not-styler').styler({
			singleSelectzIndex: '1',
		});
	});

	// $('.star-rating').barrating({});


	//инициализация табов
  $( function() {
  	$('.tabs-news-line a').tabs();
		$('.tabs a').tabs();
		$('.tabs-estate a').tabs();
	});


	



  //FORM VALIDATION

  //дефолтные настройки валидатора
  jQuery.validator.setDefaults({
	  debug: true,
	  errorClass: 'invalid',
		successClass: 'valid',
		focusInvalid: false,
		// onkeyup: true,
		errorElement: 'span',
		errorPlacement: function (error, element) {
      if ( element.parent().hasClass('jq-checkbox') ||  element.parent().hasClass('jq-radio')) {
        element.closest('label').after(error);
        
      } else if (element.parent().hasClass('jq-selectbox')) {
        element.closest('.jq-selectbox').after(error);
      } else {
        error.insertAfter(element);
      }
    },
    highlight: function(element, errorClass, validClass) {
	    if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
	    	$(element).parent().addClass(errorClass).removeClass(validClass);
	    } else {
	    	$(element).addClass(errorClass).removeClass(validClass);
	    }
	  },
	  unhighlight: function(element, errorClass, validClass) {
	  	if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
	    	$(element).parent().removeClass(errorClass).addClass(validClass);
	    } else {
	    	$(element).removeClass(errorClass).addClass(validClass);
	    }
	  }
	});
	//дефолтные сообщения, предупреждения
	jQuery.extend(jQuery.validator.messages, {
    required: "Обязательное поле",
    email: "Некорректный email адрес",
    url: "Некорректный URL",
    number: "Некорректный номер",
    digits: "Это поле поддерживает только числа",
    equalTo: "Поля не совпадают",
    maxlength: jQuery.validator.format('Максимальная длина поля {0} символа(ов)'),
    minlength: jQuery.validator.format('Минимальная длина поля {0} символа(ов)'),
	});
	//кастомные методы валидатора
	jQuery.validator.addMethod("lettersonly", function(value, element) {
	  return this.optional(element) || /^[a-zA-ZА-Яа-я]+$/i.test(value);
	}, "Только буквы");

	jQuery.validator.addMethod("telephone", function(value, element) {
	  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/i.test(value);
	}, "Некорректный формат");


  $("#board_add_form").validate({
		rules: {
			ba_1: {
				required: true,
				minlength: 2,
				lettersonly: true
			},
			ba_2: {
				required: true,
				telephone: true
			},
			ba_3: {
				required: true
			}
		},
		//custom messeses
		messages: {
			ba_1: {
				lettersonly: 'Мы сильно сомневаемся, что Вас так зовут'
			}
		}
		//сабмит формы
		/*submitHandler: function(){
			
		}*/
	});

});//ready close


$(window).on('load',function(){
	$('.masonry').addClass('loaded');
	$('.masonry').masonry({
	  horizontalOrder: true
	});

	

	function imgPopupShow (){
		var popupImage = document.createElement('img');
		popupImage.src = '/local/templates/template/images/images/popup-image.jpg';
		popupImage.onload = function(){
			$('body').append('<div class="popup-single-image"><div class="popup-image-bg"></div><div class="img"></div><div class=" popup-image-close"><svg class="sprite"><use xlink:href="/local/templates/template/svg/svg/symbols.svg#close"></svg></div></div>');
			var block = document.querySelector('.popup-single-image .img');
			block.appendChild(popupImage);
			setTimeout(function(){
				$('.popup-single-image').addClass('opened');
			},50);
		}

		$.cookie('imgsPopup',true,{
			expires: 1,
			path: '/'
		});
	}

	$(document).on('click','.popup-image-close, .popup-image-bg',function(){
		$('.popup-single-image').removeClass('opened')
		setTimeout(function(){
			$('.popup-single-image').remove();
		},510);
	});

	setTimeout(function(){
		// if(!$.cookie('imgsPopup')) {
			imgPopupShow();
		// }
	},2000);

});//window load end