// ==UserScript==
// @name        Qiita UserPage Search
// @namespace   com.cielavenir
// @description Tag Type in user page is searchable.
// @include     http://qiita.com/*/items
// @version     0.0.1
// ==/UserScript==

//var find=function(a,k){
//	for(var i=0;i<a.length;i++)if(a[i].indexOf(k)==0)return a[i].substr(k.length);
//	return null;
//};
var userpage_search_main=function(){
	var user_name=location.pathname.match(/\/([^\/]*)\//)[1]
	var gg=['c3-legend-item'];//,'c3-target'];
	for(var j=0;j<gg.length;j++){
		var g=document.getElementsByClassName(gg[j]);
		for(var i=0;i<g.length;i++){
			//var tag=find(g[i].classList,gg[j]+'-');
			var tag=g[i].children[0].textContent;
			if(tag=='Others')continue;
			var a=document.createElementNS('http://www.w3.org/2000/svg','a');
			a.setAttributeNS('http://www.w3.org/1999/xlink','href','https://qiita.com/search?q=user%3A'+encodeURIComponent(user_name)+'+tag%3A'+encodeURIComponent(tag));
			a.innerHTML=g[i].innerHTML;
			g[i].innerHTML=a.outerHTML;
		}
	}
};

if(typeof 'chrome'==='undefined'){
	userpage_search_main();
}else{
	chrome.runtime.sendMessage({tool:'userpage_search'},function(res){
		if(res['result'])userpage_search_main();
	});
}