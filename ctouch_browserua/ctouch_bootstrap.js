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
var enable_imitation=true;
var generate_touch=true;
var install_createtouch=false;
var inject_tag=function(id,script){
	var s=document.createElement('script');
	var innerText=('innerText' in s) ? 'innerText' : 'textContent';
	s.type='text/javascript';
	s.id=id;
	s[innerText]=window.atob(script);
	document.documentElement.appendChild(s);
};
///__BOUNDARY__///
//cTouch bootstrap core: var useragent/enable_imitation/generate_touch is defined.
if(generate_touch){
var script="\
(function(){\
var rec1=function(o,n,d,e,z){\
var sent=false;\
if(n==o||!n)return false;\
if(n[z]){n[z](e);sent=true;}\
if(rec1(n,n.parentNode,d,e,z)){sent=true;}\
return sent;\
};\
var rec2=function(o,x,y,d,e,z){\
var sent=false;\
var n = d.elementFromPoint(x,y);\
if(n==o||!n)return false;\
if(n[z]){n[z](e);sent=true;}\
var v = n.style.visibility;\
n.style.visibility = 'hidden';\
if(rec2(n,x,y,d,e,z)){sent=true;}\
n.style.visibility=v;\
return sent;\
};\
var rec=function(x,y,d,e,z){\
if(rec1(null,d.elementFromPoint(x,y),d,e,z))return true;\
return false;\
};\
var isMouseDown=null;\
var g_touchID=null;\
var preventDefault=false;\
var touchevent=function(e,type){\
var touch={\
clientX: e.clientX,\
clientY: e.clientY,\
force: 1.0,\
identifier: g_touchID,\
pageX: e.pageX,\
pageY: e.pageY,\
screenX: e.screenX,\
screenY: e.screenY,\
target: e.target,\
};\
var ev;\
try{\
throw 'TouchEvent is temporarily disabled.';\
var touches=new Array();\
touches[0]=new Touch(touch);\
ev=new TouchEvent(type,{\
touches: touches,\
changedTouches: touches,\
targetTouches: touches,\
});\
}catch(x){\
try{\
ev=document.createEvent('UIEvent');\
}catch(x){\
ev=document.createEvent('Event');\
}\
ev.initEvent(type,true,true);\
var touches=new Array();\
touches[0]=touch;\
ev.touches=touches;\
ev.changedTouches=ev.targetTouches=ev.touches;\
}\
ev.altkey=false;\
ev.bubbles=true;\
ev.cancelBubble=false;\
ev.cancelable=true;\
ev.charCode=0;\
ev.clientX=e.clientX;\
ev.clientY=e.clientY;\
ev.ctrlKey=false;\
ev.currentTarget=e.currentTarget;\
ev.keyCode=0;\
ev.metaKey=false;\
ev.offsetX=e.offsetX;\
ev.offsetY=e.offsetY;\
ev.pageX=e.pageX;\
ev.pageY=e.pageY;\
ev.returnValue=e.returnValue;\
ev.screenX=e.screenX;\
ev.screenY=e.screenY;\
ev.shiftKey=false;\
ev.srcElement=e.srcElement;\
ev.target=e.target;\
ev.timeStamp=e.timeStamp;\
ev.view=e.view;\
ev.rotation=0.0;\
ev.scale=1.0;\
if(type=='touchstart'||isMouseDown)isMouseDown=ev.touches;\
if(type=='touchend')isMouseDown=null;\
return ev;\
};\
var mouseevent=function(e){\
if(e.target.nodeName.toLowerCase()=='object'||e.target.nodeName.toLowerCase()=='embed'){\
{isMouseDown=null;preventDefault=false;}\
return true;\
}\
if(e.type=='mousedown'){\
preventDefault=false;\
var ev=touchevent(e,'touchstart');\
if(!e.shiftKey || !rec(e.clientX,e.clientY,e.target.ownerDocument,ev,'ontouchstart')){\
var b=e.target.dispatchEvent(ev);\
if(!b){\
preventDefault=true;\
e.stopPropagation();\
}\
return true;\
}else return true;\
}else if(e.type=='mousemove'){\
if(isMouseDown){\
var ev=touchevent(e,'touchmove');\
if(!e.shiftKey || !rec(e.clientX,e.clientY,e.target.ownerDocument,ev,'ontouchmove')){\
var b=e.target.dispatchEvent(ev);\
if(!b||preventDefault){\
preventDefault=true;\
e.stopPropagation();\
}\
return true;\
}else return true;\
}\
}else if(e.type=='mouseup'){\
var ev=touchevent(e,'touchend');\
if(!e.shiftKey || !rec(e.clientX,e.clientY,e.target.ownerDocument,ev,'ontouchend')){\
var b=e.target.dispatchEvent(ev);\
if(!b||preventDefault){\
preventDefault=true;\
e.stopPropagation();\
}\
return true;\
}else return true;\
}else if(e.type=='click'){\
if(window.click){window.click();preventDefault=false;return true;}\
if(preventDefault){\
}\
preventDefault=false;\
return true;\
}\
return true;\
};\
document.addEventListener('mousedown',mouseevent,true);\
document.addEventListener('mousemove',mouseevent,true);\
document.addEventListener('mouseup',mouseevent,true);\
document.addEventListener('click',mouseevent,true);\
var myself = document.getElementById('ctouch_touch_js');\
if(myself)myself.parentNode.removeChild(myself);\
})();\
";
inject_tag('ctouch_touch_js',window.btoa(script));
}

if(enable_imitation){
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
if(platform=='none')return; //not smartphone

var script = '(function(){';

if(install_createtouch){
script += "\
document.createTouch = function createTouch(){'[native code]';};\
document.createTouch.toString=function(){return 'function createTouch() { [native code] }';};\
document.createTouchList = function createTouchList(){'[native code]';};\
document.createTouchList.toString=function(){return 'function createTouchList() { [native code] }';};\
";
}

script += "\
document.ondragstart = function(){return false;};\
window.ondragstart = function(){return false;};\
window.orientation = 0;\
window.ondeviceorientation = null;\
window.ondevicemotion = null;\
window.onorientationchange = null;\
\
/*self test about ontouchstart*/\
document.ontouchstart=undefined;\
if(document.ontouchstart!==null){\
	/*chrome native touch simulation not available; patch required*/\
	Object.defineProperty(document,'ontouchstart',{\
		writable: false,\
		value: null,\
	});\
	Object.defineProperty(document.documentElement,'ontouchstart',{\
		writable: false,\
		value: null,\
	});\
	\
	Object.defineProperty(document,'ontouchmove',{\
		writable: false,\
		value: null,\
	});\
	Object.defineProperty(document.documentElement,'ontouchmove',{\
		writable: false,\
		value: null,\
	});\
	\
	Object.defineProperty(document,'ontouchend',{\
		writable: false,\
		value: null,\
	});\
	Object.defineProperty(document.documentElement,'ontouchend',{\
		writable: false,\
		value: null,\
	});\
}\
window.ontouchstart=undefined;\
if(window.ontouchstart!==null){\
	window.ontouchstart = null;\
	window.ontouchmove = null;\
	window.ontouchend = null;\
}\
";

if(useragent.indexOf('Chrome')==-1&&useragent.indexOf('CrMo')==-1){ //un-chrome-ize
	//unfortunately "delete" will fail...
	script+="if('chrome' in window){window.chrome = undefined;delete window.chrome;}";
}

if(vendor=='Apple Computer, Inc.'){
script += '\
document.ongesturestart = null;\
document.documentElement.ongesturestart = null;\
window.ongesturestart = null;\
document.ongestureend = null;\
document.documentElement.ongestureend = null;\
window.ongestureend = null;\
';
}

// http://jsdo.it/wakuworks/userAgent.test
// not required in webkit
/*
script += "\
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
";
*/

script += "\
if(navigator.__defineGetter__){\
	navigator.__defineGetter__('platform',function(){return '"+platform+"';});\
}else{\
	navigator.platform = '"+platform+"';\
}\
if(navigator.platform!='"+platform+"'){\
	var navigator_original = navigator;\
	navigator = {};\
	navigator.__proto__ = navigator_original;\
	var window_screen_original = window.screen;\
	window.screen = {};\
	window.screen.__proto__ = window_screen_original;\
}\
if(navigator.__defineGetter__){\
	navigator.__defineGetter__('userAgent',function(){return '"+useragent+"';});\
	navigator.__defineGetter__('vendor',function(){return '"+vendor+"';});\
	navigator.__defineGetter__('platform',function(){return '"+platform+"';});\
	navigator.__defineGetter__('appCodeName',function(){return '"+appCodeName+"';});\
	navigator.__defineGetter__('appVersion',function(){return '"+appVersion+"';});\
	if(navigator.__lookupGetter__)navigator.__proto__.__lookupGetter__=function __lookupGetter__(){return undefined;};\
}else{\
	navigator.userAgent = '"+useragent+"';\
	navigator.vendor = '"+vendor+"';\
	navigator.platform = '"+platform+"';\
	navigator.appCodeName = '"+appCodeName+"';\
	navigator.appVersion = '"+appVersion+"';\
}\
if(window.screen.__defineGetter__){\
	window.screen.__defineGetter__('width',function(){return window.outerWidth;});\
	window.screen.__defineGetter__('height',function(){return window.outerHeight;});\
	/*window.screen.__defineGetter__('availHeight',function(){return window.screen.height;});*/\
	window.screen.__defineGetter__('availWidth',function(){return window.screen.width;});\
	window.screen.__defineGetter__('availLeft',function(){return 0;});\
	window.screen.__defineGetter__('availTop',function(){return 0;});\
	if(window.screen.__lookupGetter__)window.screen.__proto__.__lookupGetter__=function __lookupGetter__(){return undefined;};\
}else{\
	window.screen.width=document.documentElement.clientWidth;\
	window.screen.height=document.documentElement.clientHeight;\
	/*window.screen.availHeight=window.screen.height;*/\
	window.screen.availWidth=window.screen.width;\
	window.screen.availLeft=0;\
	window.screen.availTop=0;\
}\
";

if(vendor=='Apple Computer, Inc.' || useragent.indexOf('Chrome')!=-1 || useragent.indexOf('CrMo')!=-1){ //hide plugins(flash)
script += "\
PluginArray.prototype.length=0;\
if(navigator.__defineGetter__)navigator.__defineGetter__('plugins',function(){return PluginArray.prototype;});\
else navigator.plugins=PluginArray.prototype;\
";
}

// sgfaker //
script += "\
if(document.location.href.indexOf('sgviewer.com')>=0)window.sgviewer=1;\
var myself = document.getElementById('ctouch_imitation_js');\
myself.parentNode.removeChild(myself);\
})();";

inject_tag('ctouch_imitation_js',window.btoa(script));

// Note: Chrome <=27 wrapper has been removed in cTouch r5.
}
///__BOUNDARY__///
	//}
};
init();
})();
