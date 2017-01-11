// ==UserScript==
// @name        AtCoder Ciel Tools
// @namespace   com.cielavenir
// @description AtCoder Ciel Tools
// @include     http://*.contest.atcoder.jp/*
// @run-at      document-start
// @version     0.0.0.1
// ==/UserScript==

(function(){
	//statistics button
	var a=document.createElement('a');
	a.href='/statistics';
	var i=document.createElement('i');
	i.className='icon-list';
	a.appendChild(i);
	var span=document.createElement('span');
	span.className='lang';
	var span2=document.createElement('span');
	span2.className='lang-en';
	span2.textContent='Statistics';
	span.appendChild(span2);
	span2=document.createElement('span');
	span2.className='lang-ja';
	span2.textContent='統計';
	span.appendChild(span2);
	a.appendChild(span);
	var li=document.createElement('li');
	li.appendChild(a);
	li.id='__atcoder_ciel_statistics__';
	li.style.visibility='hidden';
	document.documentElement.appendChild(li);

	document.addEventListener('DOMContentLoaded',function(){
		var li=document.getElementById('__atcoder_ciel_statistics__');
		li.id='';
		document.getElementsByClassName('nav-tabs')[0].appendChild(li);
		li.style.visibility='';

		//fix pagination
		var _parser_=document.createElement('a');
		_parser_.href=location.href;
		//only negative sort
		if(_parser_.search.indexOf('order_by=!')<0&&_parser_.search.indexOf('order_by=%21')<0)return;
		var paths = _parser_.pathname.split('/');
		var page=parseInt(paths[paths.length-1]);
		if(!page){
			page=1;
		}else{
			paths.pop();
		}
		var li=document.getElementsByClassName('pagination')[0].children[0].children;
		for(var i=0;i<li.length;i++){
			var a=li[i].children[0];
			var newpage=parseInt(a.textContent);
			if(!newpage){
				if(a.textContent=='→')newpage=page+1;
				else if(a.textContent=='←')newpage=page-1;
			}
			if(!!newpage)a.href=paths.join('/')+'/'+newpage+_parser_.search;
		}
	},false);
})();
