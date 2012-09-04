//ctouch_touch: execute anytime
(function(){
//fix ExGame fillText issue by monkey patch.
if(!CanvasRenderingContext2D.prototype.__ctouch_fillText){
	CanvasRenderingContext2D.prototype.__ctouch_fillText=CanvasRenderingContext2D.prototype.fillText;
	CanvasRenderingContext2D.prototype.fillText=function(s,x,y,l){
		l = l || 0;
		if(l<10)CanvasRenderingContext2D.prototype.__ctouch_fillText.call(this,s,x,y);
		else CanvasRenderingContext2D.prototype.__ctouch_fillText.call(this,s,x,y,l);
	};
}

//Let's fire element.ontouchstart.
var rec1=function(o,n,d,e,z){
	var sent=false;
	if(n==o||!n)return false;
	if(n[z]){n[z](e);sent=true;}
	if(rec1(n,n.parentNode,d,e,z)){sent=true;}
	return sent;
};
var rec2=function(o,x,y,d,e,z){
	var sent=false;
	var n = d.elementFromPoint(x,y); //
	if(n==o||!n)return false;
	if(n[z]){n[z](e);sent=true;}
	var v = n.style.visibility; //
	n.style.visibility = 'hidden'; //
	if(rec2(n,x,y,d,e,z)){sent=true;}
	n.style.visibility=v; //
	return sent;
};
var rec=function(x,y,d,e,z){
	if(rec1(null,d.elementFromPoint(x,y),d,e,z))return true;
	//if(rec2(null,x,y,d,e,z))return true;
	return false;
};

//Compile touch event.
//http://kozy.heteml.jp/pukiwiki/JavaScript%2528iPhone%2529%2520%25A5%25A4%25A5%25D9%25A5%25F3%25A5%25C8/index.html
var isMouseDown=null;
var touchevent=function(e,type){
	var ev=document.createEvent('Event');
	ev.initEvent(type,true,true);
	ev.altkey=false;
	ev.bubbles=true;
	ev.cancelBubble=false;
	ev.cancelable=true;
	ev.charCode=0;
	ev.clientX=e.clientX;
	ev.clientY=e.clientY;
	//ev.clipboardData
	ev.ctrlKey=false;
	ev.currentTarget=ev.currentTarget;
	//ev.detail
	//ev.eventPhase
	ev.keyCode=0;
	//ev.layerX=e.layerX;
	//ev.layerY=e.layerY;
	ev.metaKey=false;
	ev.offsetX=e.offsetX;
	ev.offsetY=e.offsetY;
	ev.pageX=e.pageX;
	ev.pageY=e.pageY;
	//ev.preventDefault=e.preventDefault;
	//ev.returnValue=e.returnValue;
	ev.screenX=e.screenX;
	ev.screenY=e.screenY;
	ev.shiftKey=false;
	ev.srcElement=e.srcElement;
	//ev.target=e.target;
	ev.timeStamp=e.timeStamp;
	ev.view=e.view;

	ev.rotation=0.0;
	ev.scale=1.0;
	
	ev.touches=new Array();
	ev.touches[0]={
		clientX: e.clientX,
		clientY: e.clientY,
		force: 1.0,
		//identifier:
		pageX: e.pageX,
		pageY: e.pageY,
		//radiusX:
		//radiusY:
		screenX: e.screenX,
		screenY: e.screenY,
		target: e.target,
	};
	if(type=='touchstart'||isMouseDown)isMouseDown=ev.touches;
	ev.changedTouches=ev.targetTouches=isMouseDown;
	if(type=='touchend')isMouseDown=null;
	return ev;
};

//Generate touchevent and fire it. And kills inside mouse events.
var mouseevent=function(e){
	if(e.type=='mousedown'){
		var ev=touchevent(e,'touchstart');
		if(!e.shiftKey || !rec(e.clientX,e.clientY,e.target.ownerDocument,ev,'ontouchstart')){
			var b=e.target.dispatchEvent(ev);
			if(!b){
				//since mouse event is already issued,
				//I need to kill rest events using stopPropagation().
				//preventDefault() isn't OK.
				e.stopPropagation();
			}
			return b;
		}else return true;
	}else if(e.type=='mousemove'){
		if(isMouseDown){
			var ev=touchevent(e,'touchmove');
			if(!e.shiftKey || !rec(e.clientX,e.clientY,e.target.ownerDocument,ev,'ontouchmove')){
				var b=e.target.dispatchEvent(ev);
				if(!b){
					e.stopPropagation();
				}
				return b;
			}else return true;
		}
	}else if(e.type=='mouseup'){
		var ev=touchevent(e,'touchend');
		if(window.click){window.click();return true;}
		if(!e.shiftKey || !rec(e.clientX,e.clientY,e.target.ownerDocument,ev,'ontouchend')){
			var b=e.target.dispatchEvent(ev);
			if(!b){
				e.stopPropagation();
			}
			return b;
		}else return true;
	}
	return true;
};

//Finally set the event.
//var useragent=''; //meh, I'll fix after releasing ctouch_true. When? I never know.
//var platform='none';
//if(useragent.indexOf('Android')!=-1)platform='Linux armv7l';
//if(useragent.indexOf('iPhone')!=-1)platform='iPhone';
//if(useragent.indexOf('iPod')!=-1)platform='iPod';
//if(useragent.indexOf('iPad')!=-1)platform='iPad';
//if(platform!='none'){
	document.addEventListener('mousedown',mouseevent,true);
	document.addEventListener('mousemove',mouseevent,true);
	document.addEventListener('mouseup',mouseevent,true);
//}

var myself = document.getElementById('ctouch_touch_js');
if(myself)myself.parentNode.removeChild(myself);
})();
