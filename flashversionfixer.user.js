// ==UserScript==
// @name        Flash version fixer
// @namespace   com.cielavenir
// @description Fix flash version to 9.0 (some buggy websites checks the right before '.')
// @include     *://*/*
// @run-at      document-start
// @version     0.0.0.2
// ==/UserScript==

var run=function(){
	var plugin=navigator.plugins['Shockwave Flash'];
	if(!plugin)return;

	var flash={};
	flash.description='Shockwave Flash';
	flash.suffixes='swf';
	flash.type='application/x-shockwave-flash';
	flash.enabledPlugin={};
	flash.enabledPlugin.description='Shockwave Flash 9.0';
	flash.enabledPlugin.__proto__=plugin;
	navigator.mimeTypes["application/x-shockwave-flash"]=flash;
	navigator.plugins['Shockwave Flash']=flash.enabledPlugin;
};

(function(){
	var script = document.createElement('script');
	script.textContent = '('+run.toString()+')();';
	document.documentElement.appendChild(script);
})();
