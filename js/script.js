// 1차 data- 생성
var depth01Nav = $('.nav-menu-ul > .menu');
$.each(depth01Nav, function (index, item) {
	$(item).attr('data-num', index +1);
});


var depth01NavSize = $('.menu').length; //2차메뉴
for (let i = 1; i <= depth01NavSize; i++) {
    let depth02Nav = $('.menu0'+i+' .depth02 > li');
    $.each(depth02Nav, function (index, item) {
        $(item).attr('data-num', index +1);
    });

    var depth02NavSize = $('.depth02 > .dropdown').length; //3차메뉴
    for (let j = 1; j <= depth02NavSize; j++) {
        let depth03Nav = $('.menu0'+i+' .nav0'+j+' .depth03.dropdown-menu > li');
        $.each(depth03Nav, function (index, item) {
            $(item).attr('data-num', index +1);
        });
    }
}


var pgurl = window.location.pathname;

var mn = '';
var sn = '';
var cn = '';



$("#lnb li a").each(function () {
    if ($(this).attr("href") == pgurl || $(this).attr("href") == pgurl + '.html') {
        
        if($(this).parents('.depth03').length > 0){
            cn = $(this).parent('li').attr('data-num');       
            sn = $(this).parents('.dropdown').attr('data-num');       
            mn = $(this).parents('.menu').attr('data-num');       
        }else{
            sn = $(this).parent('li').attr('data-num');       
            mn = $(this).parents('.menu').attr('data-num');  
        }
    }
    // } else if($(this).attr("href") == "/"+urlresult1){ //게시판
    //     if($('.sub.board').length > 0){
    //         sn = $(this).parent('li').attr('data-num');       
    //         mn = $(this).parents('.menu').attr('data-num');
    //     }
        
    // }
}); 



//서브페이지 네비

$(function () {
    $subnav = $("#subnav .container");
	$subnav.lnbInit();	
    $subnav.find('i').remove();
    $subnav.find('.dropdown-menu').removeClass('dropdown-menu');
    $subnav.find('.dropdown').removeClass('dropdown');
    $("#subnav .container .sbox").find('>ul').removeClass();
});




(function( $ ) {
	$.fn.lnbInit = function() {
		
		var $this = this;
		$gnb = $(document).find("#lnb").clone();
        lnb1 = mn;
		lnb2 = sn;
		lnb3 = cn;
		
		function config() {
			$target = $gnb.find("> .menu0" + lnb1 + "");
			$target1 = $target.find(".depth02 > li[data-num='"+lnb2+"']");
			$nav1 = $('#lnb').clone().find('ul').remove().end();
			$nav2 = $target.find('.depth02').clone().find('.depth03').remove().end();
			$nav3 = $target1.find('.depth03').clone();


			//해당페이지 메뉴이름
			var title1 = $target.children('a').text();
			var title2 = $target.find("> .depth02 > li[data-num='"+lnb2+"']").children('a').text();
			var title3 = $target.find("> .depth02 > li[data-num='"+lnb2+"'] .depth03 li[data-num='"+lnb3+"']").text();
			
           
			if ($target1.find('.depth03').length > 0) { //3차 메뉴 있을때
				var lnbHtml = '<ul>';
					lnbHtml += '<div class="home"><a href="/"><img src="/img/sub/snav_home.png" class="img-responsive m-auto"></a></div>';
					lnbHtml += '<li class="sbox s01"><a href="#">' + title1 + '</a></li>';
					lnbHtml += '<li class="sbox s02"><a href="#">' + title2 + '</a></li>';
					lnbHtml += '<li class="sbox s03"><a href="#">' + title3 + '</a></li>';
					lnbHtml += '</ul>';

                    
			} else { //3차 메뉴 없을때 사용  
				var lnbHtml = '<ul>';
					lnbHtml += '<div class="home"><a href="/"><img src="/img/sub/snav_home.png" class="img-responsive m-auto"></a></div>';
					lnbHtml += '<li class="sbox s01"><a href="#">' + title1 + '</a></li>';
					lnbHtml += '<li class="sbox s02"><a href="#">' + title2 + '</a></li>';
					lnbHtml += '</ul>';
			} 

			$this.empty();
			$this.append(lnbHtml);

			$this.find('> ul > li').eq(0).append($nav1);
			$this.find('> ul > li').eq(1).append($nav2);
			$this.find('> ul > li').eq(2).append($nav3);



			$this.find('> ul > li > a').on('click', function(e) {
				e.preventDefault();
				$this.find('> ul > li').not($(this).parent()).removeClass('on');
				$(this).parent().toggleClass('on');
			});

            //서브탑 자동완성
            //$('.sub_top_tit').text(title2);

		}
		config();

    };

})( jQuery );