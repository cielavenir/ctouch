/*
 * cTouch (to mimic smartphone) [browserUA] by ciel.
 * javascript imitation / touch event / modifying UserAgent -> all in one.
 * 
 * [Potion Notice]
 * ctouch_touch.js is rewritten based on mouse2touch (@jkumo).
 * navigator.* writer (C) wakuworks under MIT license.
*/

(function(){
//if(typeof sessionStorage['config'] === 'undefined')document.location.href=document.location.href; //reload...
//var ctouch_option=JSON.parse(sessionStorage['config']);

var init=function(){
	//var s;
	//s = document.createElement('script');
	//s.type = 'text/javascript';
	//s.id = 'ctouch_touch_js';
	//s.src = chrome.extension.getURL('ctouch_touch.js'); // need to embed to DOM to access x.ontouchstart().
	//document.documentElement.appendChild(s); //DOM isn't constructed yet. inserted to before any javascripts.

	//if(ctouch_option.enable_imitation && ctouch_option.preferedUA!=-1){
//var useragent=ctouch_option.UA[ctouch_option.preferedUA];
var useragent=navigator.userAgent;
///__BOUNDERY__///
//cTouch bootstrap core: var useragent is defined.
var platform='none';
var vendor='';
//var appName='Netscape'; //I believe WebKit always uses Netscape.
var appCodeName_idx=useragent.indexOf('/',0);
var appCodeName=useragent.substr(0,appCodeName_idx);
var appVersion=useragent.substr(appCodeName_idx+1);
if(useragent.indexOf('Android')!=-1){
	vendor='Google, Inc.';
	//platform='Linux i686'; //Android Atom machine :p
	platform='Linux armv7l';
}
if(useragent.indexOf('iPhone')!=-1){
	vendor='Apple Computer, Inc.';
	platform='iPhone';
}
if(useragent.indexOf('iPod')!=-1){
	vendor='Apple Computer, Inc.';
	platform='iPod';
}
if(useragent.indexOf('iPad')!=-1){
	vendor='Apple Computer, Inc.';
	platform='iPad';
}
if(platform=='none')return;

var s = document.createElement('script');
s.type = 'text/javascript';
s.id = 'ctouch_imitation_js';
s.innerText = '(function(){';

s.innerText += '\
document.ondragstart = function(){return false;};\
window.ondragstart = function(){return false;};\
\
document.createTouch = function createTouch(){};\
document.createTouchList = function createTouchList(){};\
document.ontouchstart = null;\
document.documentElement.ontouchstart = null;\
window.ontouchstart = null;\
document.ontouchmove = null;\
document.documentElement.ontouchmove = null;\
window.ontouchmove = null;\
document.ontouchend = null;\
document.documentElement.ontouchend = null;\
window.ontouchend = null;\
\
window.orientation = 0;\
window.ondeviceorientation = null;\
window.ondevicemotion = null;\
window.onorientationchange = null;\
';

if(useragent.indexOf('Chrome')==-1&&useragent.indexOf('CrMo')==-1){
	//unfortunately "delete" will fail...
	s.innerText+="if('chrome' in window){window.chrome = undefined;delete window.chrome;}";
}

if(vendor == 'Apple Computer, Inc.'){
s.innerText += '\
document.ongesturestart = null;\
document.documentElement.ongesturestart = null;\
window.ongesturestart = null;\
document.ongestureend = null;\
document.documentElement.ongestureend = null;\
window.ongestureend = null;\
';
}

// http://jsdo.it/wakuworks/userAgent.test
s.innerText += "\
try {\
	if (!Object.prototype.__defineGetter__ &&\
		Object.defineProperty({}, 'x', { get: function(){ return true } }).x\
	) {\
		var navigator_original = navigator;\
		navigator = {};\
		navigator.__proto__ = navigator_original;\
		var window_screen_original = window.screen;\
		window.screen = {};\
		window.screen.__proto__ = window_screen_original;\
		Object.defineProperty(Object.prototype, '__defineGetter__', {\
			enumerable: false,\
			configurable: true,\
			value: function(name, func) {\
				Object.defineProperty(this,name, {\
					get: func,\
					enumerable: true,\
					configurable: true\
				});\
			}\
		});\
		Object.defineProperty(Object.prototype, '__defineSetter__', {\
			enumerable: false,\
			configurable: true,\
			value: function(name, func) {\
				Object.defineProperty(this,name, {\
					set: func,\
					enumerable: true,\
					configurable: true\
				});\
			}\
		});\
	}\
}catch(defPropException){}\
if(navigator.__defineGetter__){\
	navigator.__defineGetter__('userAgent',function(){return '"+useragent+"';});\
	navigator.__defineGetter__('vendor',function(){return '"+vendor+"';});\
	navigator.__defineGetter__('platform',function(){return '"+platform+"';});\
	navigator.__defineGetter__('appCodeName',function(){return '"+appCodeName+"';});\
	navigator.__defineGetter__('appVersion',function(){return '"+appVersion+"';});\
}else{\
	navigator.userAgent = '"+useragent+"';\
	navigator.vendor = '"+vendor+"';\
	navigator.platform = '"+platform+"';\
	navigator.appCodeName = '"+appCodeName+"';\
	navigator.appVersion = '"+appVersion+"';\
}\
if(window.screen.__defineGetter__){\
	window.screen.__defineGetter__('width',function(){return document.documentElement.clientWidth;});\
	window.screen.__defineGetter__('height',function(){return document.documentElement.clientHeight;});\
	/*window.screen.__defineGetter__('availHeight',function(){return window.screen.height;});*/\
	window.screen.__defineGetter__('availWidth',function(){return window.screen.width;});\
	window.screen.__defineGetter__('availLeft',function(){return 0;});\
	window.screen.__defineGetter__('availTop',function(){return 0;});\
}else{\
	window.screen.width=document.documentElement.clientWidth;\
	window.screen.height=document.documentElement.clientHeight;\
	/*window.screen.availHeight = window.screen.height;*/\
	window.screen.availWidth = window.screen.width;\
	window.screen.availLeft = 0;\
	window.screen.availTop = 0;\
}\
";

if(vendor == 'Apple Computer, Inc.'){ //hide flash
s.innerText += "\
if(navigator.__defineGetter__)navigator.__defineGetter__('plugins',function(){return undefined;});\
else navigator.plugins=undefined;\
";
}

s.innerText += "\
var myself = document.getElementById('ctouch_imitation_js');\
myself.parentNode.removeChild(myself);\
})();";

document.documentElement.appendChild(s);
///__BOUNDERY__///
	//}
};
init();
})();
