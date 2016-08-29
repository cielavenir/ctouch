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
var preventDefault=false;\
var touchevent=function(e,type){\
var ev=document.createEvent('Event');\
ev.initEvent(type,true,true);\
ev.altkey=false;\
ev.bubbles=true;\
ev.cancelBubble=false;\
ev.cancelable=true;\
ev.charCode=0;\
ev.clientX=e.clientX;\
ev.clientY=e.clientY;\
ev.ctrlKey=false;\
ev.currentTarget=ev.currentTarget;\
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
ev.touches=new Array();\
ev.touches[0]={\
clientX: e.clientX,\
clientY: e.clientY,\
force: 1.0,\
pageX: e.pageX,\
pageY: e.pageY,\
screenX: e.screenX,\
screenY: e.screenY,\
target: e.target,\
};\
if(type=='touchstart'||isMouseDown)isMouseDown=ev.touches;\
ev.changedTouches=ev.targetTouches=isMouseDown;\
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
