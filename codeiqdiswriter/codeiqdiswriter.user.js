// ==UserScript==
// @name        CodeIQ Diswriter
// @namespace   com.cielavenir
// @description Relax CodeIQ's GitHub OAuth2 permission from scope=user to scope=user:email.
// @include     https://github.com/login/oauth/authorize?client_id=9f04cf6862b4a8cfe07e&redirect_uri=https%3A%2F%2Fcodeiq.jp%2Flogin_gh.php&scope=user
// @version     0.0.0.1
// ==/UserScript==

var replace=function(s){
	return s.replace('scope=user','scope=user:email');
}

if(typeof 'chrome'==='undefined'){
	location.href=replace(location.href);
}else{
	chrome.webRequest.onBeforeRequest.addListener(
		function(details){
			return {redirectUrl: replace(details.url)};
		},
		{
			urls: ['https://github.com/login/oauth/authorize?client_id=9f04cf6862b4a8cfe07e&redirect_uri=https%3A%2F%2Fcodeiq.jp%2Flogin_gh.php&scope=user'],
			types: ['main_frame','sub_frame']
		},
		['blocking']
	);
}