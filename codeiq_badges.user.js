// ==UserScript==
// @name        CodeIQ Badges
// @namespace   com.cielavenir
// @description Azicore's badges viewer with UserScript
// @include     https://codeiq.jp/my_*.php*
// @run-at      document-start
// @version     0.0.0.1
// ==/UserScript==

//http://azisava.sakura.ne.jp/_contact/codeiq/badge.html
var run=function($){
    var g = $('img.tTip')
       ,b = $('body')
       ,w = $(window).width()
       ,n = g.size()
       ,k = Math.ceil(n / Math.ceil(n / 10))
       ,s = g.width() + 8;
    b.append(
        $('<div>').css({
            width     : w,
            height    : b.height(),
            position  : 'absolute',
            left      : 0,
            top       : 0,
            background: '#fff'
        }).append(
            $('<p>').css({
                textAlign: 'center',
                marginTop: '64px',
                fontSize : '48px'
            }).html('You have ' + n + ' badges!')
        ).click(function() {
            $('.b').remove()
        }).addClass('b')
    );
    g.each(function(i) {
        b.append(
            $(this).clone().toggleClass('tTip b').css({
                position: 'absolute',
                left    : i % k * s + (w - k * s + 8) / 2,
                top     : (i / k | 0) * s + 150
            })
        )
    })
};

(function(){
	document.addEventListener('DOMContentLoaded',function(){
		var dt=document.getElementsByTagName('dt')[1];
		dt.addEventListener('click',function(e){
			var script = document.createElement('script');
			script.textContent = '('+run.toString()+')(jQuery);';
			document.body.appendChild(script);
		},false);
		dt.style.textDecoration='underline';
		dt.setAttribute('title','クリックするとバッジ一覧が画面いっぱいに表示されます。再びクリックすると戻ります。');
	},false);
})();
