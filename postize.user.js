// ==UserScript==
// @name        POSTize
// @namespace   com.cielavenir
// @description Patch HTML form to use POST if it uses GET and has password.
// @include     https://ssl.doctorqube.com/*
// @version     0.0.3.1
// ==/UserScript==

(function(){
	var frm=document.getElementsByTagName('form');
	if(frm)for(var i=0;i<frm.length;i++)if(frm[i].method.toLowerCase()=='get'){
		var elem=frm[i].elements;
		if(elem)for(var j=0;j<elem.length;j++)if(elem[j].type.toLowerCase()=='password'){frm[i].method='post';break;}
	}
})();
