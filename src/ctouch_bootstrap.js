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

if(useragent.indexOf('Chrome')==-1&&useragent.indexOf('CrMo')==-1){ //un-chrome-ize
	//unfortunately "delete" will fail...
	s.innerText+="if('chrome' in window){window.chrome = undefined;delete window.chrome;}";
}

if(vendor=='Apple Computer, Inc.'){
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
	/*window.screen.availHeight=window.screen.height;*/\
	window.screen.availWidth=window.screen.width;\
	window.screen.availLeft=0;\
	window.screen.availTop=0;\
}\
";

if(vendor=='Apple Computer, Inc.' || useragent.indexOf('Chrome')!=-1 || useragent.indexOf('CrMo')!=-1){ //hide plugins(flash)
s.innerText += "\
PluginArray.prototype.length=0;\
if(navigator.__defineGetter__)navigator.__defineGetter__('plugins',function(){return PluginArray.prototype;});\
else navigator.plugins=PluginArray.prototype;\
";
}

s.innerText += "\
var myself = document.getElementById('ctouch_imitation_js');\
myself.parentNode.removeChild(myself);\
})();";

document.documentElement.appendChild(s);

///__BOUNDARY__///
//generated by ctouch_inner.rb
var s=document.createElement('script');
s.type='text/javascript';
s.id='ctouch_touch_js';
s.innerHTML="\
(function(){\n\
if(!CanvasRenderingContext2D.prototype.__ctouch_fillText){\n\
	CanvasRenderingContext2D.prototype.__ctouch_fillText=CanvasRenderingContext2D.prototype.fillText;\n\
	CanvasRenderingContext2D.prototype.fillText=function(s,x,y,l){\n\
		l = l || 0;\n\
		if(l<10)CanvasRenderingContext2D.prototype.__ctouch_fillText.call(this,s,x,y);\n\
		else CanvasRenderingContext2D.prototype.__ctouch_fillText.call(this,s,x,y,l);\n\
	};\n\
}\n\
var rec1=function(o,n,d,e,z){\n\
	var sent=false;\n\
	if(n==o||!n)return false;\n\
	if(n[z]){n[z](e);sent=true;}\n\
	if(rec1(n,n.parentNode,d,e,z)){sent=true;}\n\
	return sent;\n\
};\n\
var rec2=function(o,x,y,d,e,z){\n\
	var sent=false;\n\
	var n = d.elementFromPoint(x,y); //\n\
	if(n==o||!n)return false;\n\
	if(n[z]){n[z](e);sent=true;}\n\
	var v = n.style.visibility; //\n\
	n.style.visibility = 'hidden'; //\n\
	if(rec2(n,x,y,d,e,z)){sent=true;}\n\
	n.style.visibility=v; //\n\
	return sent;\n\
};\n\
var rec=function(x,y,d,e,z){\n\
	if(rec1(null,d.elementFromPoint(x,y),d,e,z))return true;\n\
	return false;\n\
};\n\
var isMouseDown=null;\n\
var preventDefault=false;\n\
var touchevent=function(e,type){\n\
	var ev=document.createEvent('Event');\n\
	ev.initEvent(type,true,true);\n\
	ev.altkey=false;\n\
	ev.bubbles=true;\n\
	ev.cancelBubble=false;\n\
	ev.cancelable=true;\n\
	ev.charCode=0;\n\
	ev.clientX=e.clientX;\n\
	ev.clientY=e.clientY;\n\
	ev.ctrlKey=false;\n\
	ev.currentTarget=ev.currentTarget;\n\
	ev.keyCode=0;\n\
	ev.metaKey=false;\n\
	ev.offsetX=e.offsetX;\n\
	ev.offsetY=e.offsetY;\n\
	ev.pageX=e.pageX;\n\
	ev.pageY=e.pageY;\n\
	ev.returnValue=e.returnValue;\n\
	ev.screenX=e.screenX;\n\
	ev.screenY=e.screenY;\n\
	ev.shiftKey=false;\n\
	ev.srcElement=e.srcElement;\n\
	ev.target=e.target;\n\
	ev.timeStamp=e.timeStamp;\n\
	ev.view=e.view;\n\
	ev.rotation=0.0;\n\
	ev.scale=1.0;\n\
	ev.touches=new Array();\n\
	ev.touches[0]={\n\
		clientX: e.clientX,\n\
		clientY: e.clientY,\n\
		force: 1.0,\n\
		pageX: e.pageX,\n\
		pageY: e.pageY,\n\
		screenX: e.screenX,\n\
		screenY: e.screenY,\n\
		target: e.target,\n\
	};\n\
	if(type=='touchstart'||isMouseDown)isMouseDown=ev.touches;\n\
	ev.changedTouches=ev.targetTouches=isMouseDown;\n\
	if(type=='touchend')isMouseDown=null;\n\
	return ev;\n\
};\n\
var mouseevent=function(e){\n\
	if(e.target.nodeName.toLowerCase()=='object'||e.target.nodeName.toLowerCase()=='embed'){\n\
			{isMouseDown=null;preventDefault=false;}\n\
		return true;\n\
	}\n\
	if(e.type=='mousedown'){\n\
		preventDefault=false; //in case...\n\
		var ev=touchevent(e,'touchstart');\n\
		if(!e.shiftKey || !rec(e.clientX,e.clientY,e.target.ownerDocument,ev,'ontouchstart')){\n\
			var b=e.target.dispatchEvent(ev);\n\
			if(!b){\n\
				preventDefault=true;\n\
				e.stopPropagation();\n\
			}\n\
			return true;//b;\n\
		}else return true;\n\
	}else if(e.type=='mousemove'){\n\
		if(isMouseDown){\n\
			var ev=touchevent(e,'touchmove');\n\
			if(!e.shiftKey || !rec(e.clientX,e.clientY,e.target.ownerDocument,ev,'ontouchmove')){\n\
				var b=e.target.dispatchEvent(ev);\n\
				if(!b||preventDefault){\n\
					preventDefault=true;\n\
					e.stopPropagation();\n\
				}\n\
				return true;//b;\n\
			}else return true;\n\
		}\n\
	}else if(e.type=='mouseup'){\n\
		var ev=touchevent(e,'touchend');\n\
		if(!e.shiftKey || !rec(e.clientX,e.clientY,e.target.ownerDocument,ev,'ontouchend')){\n\
			var b=e.target.dispatchEvent(ev);\n\
			if(!b||preventDefault){\n\
				preventDefault=true;\n\
				e.stopPropagation();\n\
			}\n\
			return true;//b;\n\
		}else return true;\n\
	}else if(e.type=='click'){\n\
		if(window.click){window.click();preventDefault=false;return true;}\n\
			if(preventDefault){\n\
			}\n\
			preventDefault=false;\n\
			return true;\n\
	}\n\
	return true;\n\
};\n\
	document.addEventListener('mousedown',mouseevent,true);\n\
	document.addEventListener('mousemove',mouseevent,true);\n\
	document.addEventListener('mouseup',mouseevent,true);\n\
	document.addEventListener('click',mouseevent,true);\n\
var myself = document.getElementById('ctouch_touch_js');\n\
if(myself)myself.parentNode.removeChild(myself);\n\
})();\n\
";
document.documentElement.appendChild(s);
///__BOUNDARY__///
;
