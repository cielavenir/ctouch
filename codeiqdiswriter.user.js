// ==UserScript==
// @name        CodeIQ Diswriter
// @namespace   com.cielavenir
// @description Relax CodeIQ's GitHub OAuth2 permission from scope=user to scope=user:email.
// @include     https://github.com/login/oauth/authorize?client_id=9f04cf6862b4a8cfe07e&redirect_uri=https%3A%2F%2Fcodeiq.jp%2Flogin_gh.php&scope=user
// @version     0.0.0.1
// ==/UserScript==

(function(){
	location.href=location.href.replace('scope=user','scope=user:email');
})();
