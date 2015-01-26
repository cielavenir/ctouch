// ==UserScript==
// @name        Qiita UserPage Search
// @namespace   com.cielavenir
// @description Tag Type in user page is searchable.
// @include     http://qiita.com/*
// @version     0.0.0.2
// ==/UserScript==

(function(){
	var span=document.querySelector('.userPage_heading > span');
	if(!span)return;
	var user_name=span.textContent;
	var tspan=document.getElementsByTagName('tspan');
	for(var i=0;i<tspan.length;i++){
		var tag=tspan[i].textContent.replace(/.*? - /,'');
		if(tag=='Others')continue;
		var a=document.createElementNS('http://www.w3.org/2000/svg','a');
		a.setAttributeNS('http://www.w3.org/1999/xlink','href','https://qiita.com/search?q=user%3A'+encodeURIComponent(user_name)+'+tag%3A'+encodeURIComponent(tag));
		a.textContent=tspan[i].textContent;
		tspan[i].textContent='';
		tspan[i].appendChild(a);
	}
})();
