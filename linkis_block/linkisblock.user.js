// ==UserScript==
// @name        LinkisBlock
// @namespace   com.cielavenir
// @description Redirects linkis.com to original website.
// @include     http://linkis.com/*
// @version     0.0.0.2
// ==/UserScript==

var source_main=function(){
	location.href=document.getElementById('source_site').src;
};

if(typeof 'chrome'==='undefined'){
	source_main();
}else{
	//chrome.runtime.sendMessage({tool:'source'},function(res){if(res['result']){
		source_main();
	//}});
}