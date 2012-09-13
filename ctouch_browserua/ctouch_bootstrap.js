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
	var s;
	//s = document.createElement('script');
	//s.type = 'text/javascript';
	//s.id = 'ctouch_touch_js';
	//s.src = chrome.extension.getURL('ctouch_touch.js'); // need to embed to DOM to access x.ontouchstart().
	//document.documentElement.appendChild(s); //DOM isn't constructed yet. inserted to before any javascripts.

	//if(ctouch_option.enable_imitation && ctouch_option.preferedUA!=-1){
		//var useragent=ctouch_option.UA[ctouch_option.preferedUA];
		var useragent=navigator.userAgent;
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

		s = document.createElement('script');
		s.type = 'text/javascript';
		s.id = 'ctouch_imitation_js';
		s.innerText = '';

s.innerText += '\
document.ondragstart = function(){return false;};\
window.ondragstart = function(){return false;};\
\
document.createTouch = function createTouch(){};\
document.documentElement.createTouch = function createTouch(){};\
document.createTouchList = function createTouchList(){};\
document.documentElement.createTouchList = function createTouchList(){};\
document.ontouchstart = function(){};\
document.documentElement.ontouchstart = function(){};\
window.ontouchstart = function(){};\
\
window.orientation = 0;\
window.ondeviceorientation = function(){};\
window.ondevicemotion = function(){};\
window.onorientationchange = function(){};\
';

if(useragent.indexOf('Chrome')==-1&&useragent.indexOf('CrMo')==-1){
	s.innerText+='window.chrome = undefined;';
}

if(vendor == 'Apple Computer, Inc.'){
	s.innerText+='document.ongesturestart = function(){return;};';
	s.innerText+='document.documentElement.ongesturestart = function(){return;};';
	s.innerText+='window.ongesturestart = null;';
}

// http://jsdo.it/wakuworks/userAgent.test
s.innerText += "\
try {\
	if (!Object.prototype.__defineGetter__ &&\
		Object.defineProperty({}, 'x', { get: function(){ return true } }).x\
	) {\
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
var __original = navigator;\
var navigator = {};\
navigator.__proto__ = __original;\
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
";
		document.documentElement.appendChild(s);
	//}
};
init();
})();
