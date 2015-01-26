// ==UserScript==
// @name        Qiita Source
// @namespace   com.cielavenir
// @description Show link to Qiita Markdown source.
// @include     http://qiita.com/*/items/*
// @include     http://qiita.com/*/private/*
// @version     0.0.0.3
// ==/UserScript==

(function(){
	var ul=document.getElementsByClassName('itemsShowHeaderTitle_status')[0];
	if(!ul)return;
	var li=document.createElement('li');
	var a=document.createElement('a');
	a.href=location.href.split('#')[0]+'.md';
	a.textContent='Markdownを表示する';
	li.appendChild(a);
	ul.appendChild(li);
})();
