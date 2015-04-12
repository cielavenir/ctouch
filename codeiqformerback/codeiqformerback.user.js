// ==UserScript==
// @name        CodeIQ FormerBack
// @namespace   com.cielavenir
// @description Open old feedback link.
// @run-at      document-start
// @include     https://codeiq.jp/my_feedback.php*
// @version     0.0.0.1
// ==/UserScript==

var replace=function(s){
	var a=s.split('?');
	var b=a[1].split('&');
	for(var i=0;i<b.length;i++){
		var c=b[i].split('=');
		if(c[0]=='challenge_log_id')return 'https://codeiq.jp/my_feedback/'+c[1];
	}
	return s;
}

if(typeof 'chrome'==='undefined'){
	location.href=replace(location.href);
}else{
	chrome.webRequest.onBeforeRequest.addListener(
		function(details){
			return {redirectUrl: replace(details.url)};
		},
		{
			urls: ['https://codeiq.jp/my_feedback.php*'],
			types: ['main_frame','sub_frame']
		},
		['blocking']
	);
}