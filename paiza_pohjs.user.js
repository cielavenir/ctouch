// ==UserScript==
// @name        Paiza POH JS
// @namespace   com.cielavenir
// @description Enable JavaScript in POH
// @include     https://paiza.jp/poh/*
// @run-at      document-start
// @version     0.0.0.1
// ==/UserScript==

(function(){
	document.addEventListener('DOMContentLoaded',function(){
		var select=document.getElementById('language_id');
		if(!select)return;
		var option=document.createElement('option');
		option.value='2308';
		option.textContent='JavaScript';
		select.appendChild(option);
	},false);
})();
