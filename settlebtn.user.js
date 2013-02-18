// ==UserScript==
// @name        SettleBtn
// @namespace   com.cielavenir
// @description Fix Settle button
// @include     http://settle.sp.mbga.jp/*
// @version     0.0.1
// ==/UserScript==

(function(){
	function patchBackgroundSize(tag){
		for(var i=0;i<tag.length;i++){
			if(getComputedStyle(tag[i]).webkitBackgroundSize.indexOf('auto ')>=0){
				tag[i].style.webkitBackgroundSize=getComputedStyle(tag[i]).webkitBackgroundSize.replace('auto','100%');
			}
		}
	}
	['a','h1'].map(function(e){
		patchBackgroundSize(document.getElementsByTagName(e);
	});
})();