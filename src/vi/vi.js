;
$.fn.removeClassMask = function(mask) {
  return this.removeClass(function(index, cls) {
      var re = mask.replace(/\*/g, '\\S+');
      return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
  });
};

jQuery(document).ready(function($) {
	

	var viStartBtn = '<a class="vi-start-btn"><i class="i-eye"></i><span>Версия для слабовидящих</span></a>';

	$('.f-contacts-items').append(viStartBtn);

	var viBg = '<div class="vi-panel-group">'+
		'<div class="vi-group-title">Цвет сайта</div>'+
		'<div class="vi-group-btns">'+
			'<a href="#" class="vi-bg vi-bg-white active" data-bg="white">A</a>'+
			'<a href="#" class="vi-bg vi-bg-black" data-bg="black">A</a>'+
			'<a href="#" class="vi-bg vi-bg-brown" data-bg="brown">A</a>'+
		'</div></div>';

	var viFz = '<div class="vi-panel-group">'+
		'<div class="vi-group-title">Размер шрифта</div>'+
		'<div class="vi-group-btns">'+
			'<a href="#" class="vi-font-plus">+</a>'+
			'<a href="#" class="vi-font-minus"></a>'+
		'</div></div>';

	var viLs = '<div class="vi-panel-group">'+
		'<div class="vi-group-title">Межбуквенный интервал</div>'+
		'<div class="vi-group-btns">'+
			'<a href="#" class="vi-ls active" data-ls="0">1</a>'+
			'<a href="#" class="vi-ls" data-ls="25">1.25</a>'+
			'<a href="#" class="vi-ls" data-ls="50">1.5</a>'+
		'</div></div>';

	var viLh = '<div class="vi-panel-group">'+
		'<div class="vi-group-title">Междустрочный интервал</div>'+
		'<div class="vi-group-btns">'+
			'<a href="#" class="vi-lh active" data-lh="1">1</a>'+
			'<a href="#" class="vi-lh" data-lh="15">1.5</a>'+
			'<a href="#" class="vi-lh" data-lh="2">2</a>'+
		'</div></div>';

	var viImg = '<div class="vi-panel-group">'+
		'<div class="vi-group-title">Изображения</div>'+
		'<div class="vi-group-btns">'+
			'<a href="#" class="vi-img active" data-img="nobright">Приглушенные</a>'+
			'<a href="#" class="vi-img" data-img="colored">Цветные</a>'+
			'<a href="#" class="vi-img" data-img="gray">Ч/б</a>'+
			'<a href="#" class="vi-img" data-img="off">Откл</a>'+
		'</div></div>';

	var viBtns = viBg + viFz + viLs + viLh + viImg;

	var viPanel = '<div class="vi-panel"><div class="inner"><div class="flex">'+viBtns+'</div></div></div>';


	var viToggler = '<span class="devider"></span><span class="vi-toggler"></span>';

	$('#wrapper').before(viPanel);
	$('#header .navigation').append(viToggler);

	//настройки версии для слабовидящих
	var viConfig = {
		mode: false,
		bg: 'white',
		fz: 18,
		ls: 0,
		lh: 1,
		imgs: 'nobright'
	};
	//настройки хранимые в LS
	var viCookie;


	//проверяем активность версии + настройки
	setTimeout(function(){
		if( localStorage.getItem('vi') ) {
			viCookie = JSON.parse(localStorage.getItem('vi'));

			if ( viCookie.mode === true ) {
				$('.vi-start-btn').addClass('active');
				$('.vi-start-btn span').text('Обычная версия сайта');
				
				viConfig = viCookie;
				$('.vi-panel').addClass('opened');
				$('html').addClass('vi');
				$('html').addClass('vi-fz-'+viCookie.fz);

				if( viCookie.bg !== '' ) {
					$('html').addClass('vi-bg-'+viCookie.bg);
					$('a.vi-bg').removeClass('active');
					$('a.vi-bg[data-bg='+viCookie.bg+']').addClass('active');
				}
				if ( viCookie.imgs !== '' ) {
					$('html').addClass('vi-img-'+viCookie.imgs);
					$('a.vi-img').removeClass('active');
					$('a.vi-img[data-img='+viCookie.imgs+']').addClass('active');
				}
				if ( viCookie.ls !== '' ) {
					$('html').addClass('vi-ls-'+viCookie.ls);
					$('a.vi-ls').removeClass('active');
					$('a.vi-ls[data-ls='+viCookie.ls+']').addClass('active');
				}
				if ( viCookie.lh !== '' ) {
					$('html').addClass('vi-lh-'+viCookie.lh);
					$('a.vi-lh').removeClass('active');
					$('a.vi-lh[data-lh='+viCookie.lh+']').addClass('active');
				}
			}
		}
	},0);
	

	//активируем
	$(document).on('click', '.vi-start-btn',function(e){
		e.preventDefault();
		var span = $(this).find('span');
		
		// if (span.text() === 'Версия для слабовидящих') {
		if (!localStorage.getItem('vi')) {
			$(this).addClass('active');
			$('html').addClass('vi vi-fz-18 vi-bg-white');
			$('.vi-panel').addClass('opened');
			
			
			viConfig.mode = true;
			localStorage.setItem('vi',JSON.stringify(viConfig));
			span.text('Обычная версия сайта');
		} else {
			$(this).removeClass('active');
			$('html').removeClass('vi');
			$('html').removeClassMask('vi-*');
			$('.vi-panel').removeClass('opened');
			
			viConfig.mode = false;
			localStorage.removeItem('vi');
			span.text('Версия для слабовидящих');
		}
	});
	$(document).on('click', '.vi-toggler',function(e){
		e.preventDefault();
		
		if (!localStorage.getItem('vi')) {
			$(this).addClass('active');
			$('html').addClass('vi vi-fz-18 vi-bg-white');
			$('.vi-panel').addClass('opened');
			
			viConfig.mode = true;
			localStorage.setItem('vi',JSON.stringify(viConfig));
		} else {
			$(this).removeClass('active');
			$('html').removeClass('vi');
			$('html').removeClassMask('vi-*');
			$('.vi-panel').removeClass('opened');
			
			viConfig.mode = false;
			localStorage.removeItem('vi');
		}
	});

	/*$(document).on('click','.vi-panel-off',function(){
		$('html').removeClass('vi');
		$('html').removeClassMask('vi-*');
		$('.vi-panel').removeClass('opened');
		viConfig.mode = false;
		localStorage.removeItem('vi');
	});*/

	$(document).on('click','.vi-group-btns a:not(.vi-font-plus, .vi-font-minus)',function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});


	//шрифт +
	$(document).on('click','a.vi-font-plus',function(){
		var curFz = viConfig.fz + 1;
		console.log(curFz);
		if (curFz > 10 && curFz < 28) {
			$('html').removeClassMask('vi-fz-*');
			$('html').addClass('vi-fz-'+curFz);
			viConfig.fz = curFz;
			localStorage.setItem('vi',JSON.stringify(viConfig));
		}
	});

	//шрифт -
	$(document).on('click','a.vi-font-minus',function(){
		var curFz = viConfig.fz - 1;
		if (curFz > 10 && curFz < 28) {
			$('html').removeClassMask('vi-fz-*');
			$('html').addClass('vi-fz-'+curFz);
			viConfig.fz = curFz;
			localStorage.setItem('vi',JSON.stringify(viConfig));
		}

	});

	$(document).on('click','a.vi-bg',function(){
		var $bg = $(this).data('bg');
		$('html').removeClassMask('vi-bg-*');
		$('html').addClass('vi-bg-'+$bg);
		viConfig.bg = $bg;
		localStorage.setItem('vi',JSON.stringify(viConfig));
		// $.cookie('vi', JSON.stringify(viConfig), { expires: 1, path: '/' });
	});

	$(document).on('click','a.vi-ls',function(){
		var $ls = $(this).data('ls');
		$('html').removeClassMask('vi-ls-*');
		$('html').addClass('vi-ls-'+$ls);
		viConfig.ls = $ls;
		localStorage.setItem('vi',JSON.stringify(viConfig));
	});

	$(document).on('click','a.vi-lh',function(){
		var $lh = $(this).data('lh');
		$('html').removeClassMask('vi-lh-*');
		$('html').addClass('vi-lh-'+$lh);
		viConfig.lh = $lh;
		localStorage.setItem('vi',JSON.stringify(viConfig));
	});

	$(document).on('click','a.vi-img',function(){
		var $img = $(this).data('img');
		$('html').removeClassMask('vi-img-*');
		$('html').addClass('vi-img-'+$img);
		viConfig.imgs = $img;
		localStorage.setItem('vi',JSON.stringify(viConfig));
	});

	
	if($('.slick-screen').length) {
		$('#container').append(viMain);
	}

var viMain = `<div class="inner"><main class="vi-main content">
	<div class="vi-main-short">
		<p>УП «Борисовский комбинат хлебопродуктов» ОАО «Минскоблхлебопродукт» является одним из крупнейших зерноперерабатывающих предприятий Республики Беларусь, производителем мукомольно-крупяной, комбикормовой продукции и макаронных изделий под товарными знаками «Уладар», «Пастораль», «PastaSolare» и «БАКС».</p>
		<h2 class="h3">УП «Борисовский комбинат хлебопродуктов» в цифрах и фактах:</h2>
	</div>

	<div class="vi-main-group">
		<h2 class="vi-main-title">Мука</h2>
		<div class="flex-row">
			<div class="flx-6 flx-x-12">
				<div class="vi-main-col">
					Производим <div class="digits">62 700</div> тонн в год<br>высококачественной муки
				</div>
			</div>
			<div class="flx-6 flx-x-12">
				<div class="vi-main-col">
					В том числе<div class="digits">45 750</div> тонн<br>пшеничного помола
				</div>
			</div>
		</div>
	</div>

	<div class="vi-main-group">
		<h2 class="vi-main-title">Макароны</h2>
		<div class="flex-row">
			<div class="flx-6 flx-x-12">
				<div class="vi-main-col">
					Лидер<br> макаронной промышленности <div class="digits">74%</div> <small>общегодового объема<br>производства в Беларуси</small>
				</div>
			</div>
			<div class="flx-6 flx-x-12">
				<div class="vi-main-col">
					Годовой объем <br>производства<div class="digits">300 000<br>тонн</div> 
				</div>
			</div>
		</div>
	</div>


	<div class="vi-main-group">
		<h2 class="vi-main-title">Комбикорма</h2>
		<div class="flex-row">
			<div class="flx-6 flx-x-12">
				<div class="vi-main-col">
					Современное высококачественное<br>производство комбикормов <div class="digits">135 000</div>тонн в год
				</div>
			</div>
			<div class="flx-6 flx-x-12">
				<div class="vi-main-col">
					Комбикорм<br>полнорационный для<div class="digits midi">КРС, свиней, птиц, собак</div> 
				</div>
			</div>
		</div>
	</div>

	<div class="vi-main-group">
		<h2 class="vi-main-title">Молочная продукция</h2>
		<div class="flex-row">
			<div class="flx-6 flx-x-12">
				<div class="vi-main-col">
					Поголовье крупного рогатого<br>скота составляет <div class="digits">1 540</div>голов
				</div>
			</div>
			<div class="flx-6 flx-x-12">
				<div class="vi-main-col">
					Производство <br>молока<div class="digits">13 500</div> тонн в год
				</div>
			</div>
		</div>
	</div>

	<div class="vi-main-group">
		<h2 class="vi-main-title">Полуфабрикаты</h2>
		<div class="flex-row">
			<div class="flx-4 flx-x-12">
				<div class="vi-main-col">
					Полуфабрикаты<br>мучных изделий<div class="digits">237 000</div>килограмм
				</div>
			</div>
			<div class="flx-4 flx-x-12">
				<div class="vi-main-col">
					Крупа манная<div class="digits">470 000</div> килограмм
				</div>
			</div>
			<div class="flx-4 flx-x-12">
				<div class="vi-main-col">
					Фасуем крупянную<br>продукцию<div class="digits">600 000</div> килограмм в год
				</div>
			</div>
		</div>
	</div>

	<div class="vi-main-group">
		<h2 class="vi-main-title">Зернохранение</h2>
		<div class="flex-row">
			<div class="flx-4 flx-x-12">
				<div class="vi-main-col">
					Объем хранения<br>зерновых культур<div class="digits">158 000</div>тонн
				</div>
			</div>
			<div class="flx-4 flx-x-12">
				<div class="vi-main-col">
					В том числе <br>Столбцовское Хлебоприемное предприятие<div class="digits">21 500</div> тонн
				</div>
			</div>
			<div class="flx-4 flx-x-12">
				<div class="vi-main-col">
					Городейское <br>Хлебоприемное предприятие<div class="digits">18 000</div> тонн
				</div>
			</div>
		</div>
	</div>

	<div class="vi-main-group">
		<h2 class="vi-main-title">Растениеводство</h2>
		<div class="flex-row">
			<div class="flx-6 flx-x-12">
				<div class="vi-main-col">
					Производим зерновых<br>и зернобобовых культур<div class="digits">13 000</div>тонн в год
				</div>
			</div>
			<div class="flx-6 flx-x-12">
				<div class="vi-main-col">
					Рапса<div class="digits">15 000</div> тонн в год
				</div>
			</div>
		</div>
	</div>

	<div class="vi-main-group">
		<h2 class="vi-main-title">Мясопереработка</h2>
		<div class="vi-main-col">Перерабатываем<div class="digits">70 000</div>голов в год <br><small>на собственных убойных площадках</small></div>
	</div>

	<div class="vi-main-group">
		<h2 class="vi-main-title">Фирменная торговля</h2>
		<div class="vi-main-col">Фирменная торговая сеть<div class="digits">27 объектов</div></div>
	</div>

	<div class="vi-main-group">
		<h2 class="vi-main-title">Производство мяса</h2>
		<div class="flex-row">
			<div class="flx-6 flx-x-12">
				<div class="vi-main-col">
					Поголовье<div class="digits">113 000</div>свиней
				</div>
			</div>
			<div class="flx-6 flx-x-12">
				<div class="vi-main-col">
					Среднегодовая реализация мяса<div class="digits">16 000</div>тонн
				</div>
			</div>
		</div>
	</div>
</main><!--.vi-main-->
</div>`;

});