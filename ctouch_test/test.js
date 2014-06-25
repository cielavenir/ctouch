test("[WebKit] 'WebKitAnimationEvent' in window",function(){
	ok('WebKitAnimationEvent' in window);
});

test("[cTouch 1.0.1] 'navigator.userAgent is mobile",function(){
	ok(/Android|iPhone|iPod|iPhone/.test(navigator.userAgent));
});

test("[cTouch 1.7.3] navigator.appCodeName+'/'+navigator.appVersion==navigator.userAgent",function(){
	deepEqual(navigator.appCodeName+'/'+navigator.appVersion,navigator.userAgent);
});

try{
if(typeof(navigator.__proto__.userAgent)=='string')
test("navigator.userAgent==navigator.__proto__.userAgent",function(){
	deepEqual(navigator.userAgent,navigator.__proto__.userAgent);
});
}catch(e){}

test("[cTouch 1.0.1] navigator.platform is mobile",function(){
	ok(/Linux arm|iPhone|iPod|iPhone/.test(navigator.platform));
	deepEqual(navigator.userAgent.indexOf('Simulator'),-1);
});

//try{
//if(typeof(navigator.__proto__.platform)=='string')
//test("navigator.platform==navigator.__proto__.platform",function(){
//	equal(navigator.platform,navigator.__proto__.platform);
//});
//}catch(e){}

test("[cTouch 1.4.1] 'ontouchstart' in document",function(){
	ok('ontouchstart' in document);
});

test("[mpw] window.orientation is number",function(){
	deepEqual(typeof window.orientation,'number');
});

if(typeof document.createTouch == 'function')
test("[cTouch 1.8.6] document.createTouch is not fake",function(){
	deepEqual(document.createTouch.name,'createTouch');
});

if(typeof document.createTouchList == 'function')
test("[cTouch 1.8.6] document.createTouchList is not fake",function(){
	deepEqual(document.createTouchList.name,'createTouchList');
});

test("[cTouch 2.0.0] navigator is not fake",function(){
	deepEqual(typeof(navigator.__lookupGetter__('platform')),'undefined');
	//ok(Object.prototype.toString.apply(navigator).indexOf('Navigator')!=-1);
});

test("[cTouch 1.8.6] window.chrome is true only when Android Chrome",function(){
	deepEqual(
		!!window.chrome,
		navigator.userAgent.indexOf("CrMo")!=-1||navigator.userAgent.indexOf("Chrome")!=-1
	);
});

test("[cTouch 1.8.6] 'chrome' in window is true only when Android Chrome",function(){
	deepEqual(
		"chrome" in window,
		navigator.userAgent.indexOf("CrMo")!=-1||navigator.userAgent.indexOf("Chrome")!=-1
	);
});

if(navigator.userAgent.match(/iPhone|iPod|iPhone/)){
	test("[cTouch 1.4.1] iOS has ongesturestart",function(){ok('ongesturestart' in document);});
	test("[cTouch 1.8.2] iOS does not have flash",function(){ok(!navigator.plugins||!navigator.plugins.length||!'application/x-shockwave-flash' in navigator.mimeTypes);});
}else{
	test("Android does not have ongesturestart",function(){ok(!('ongesturestart' in document));});
}

if(navigator.userAgent.indexOf("CrMo")!=-1||navigator.userAgent.indexOf("Chrome")!=-1)
test("[cTouch 1.9.0] Android Chrome does not have flash",function(){ok(!navigator.plugins||!navigator.plugins.length||!'application/x-shockwave-flash' in navigator.mimeTypes);});

test("[mpw] DOM is not tainted",function(){
	var count=0;
	for(var i=0;i<document.documentElement.childNodes.length;i++)
	if(document.documentElement.childNodes[i].type != undefined)count++;
	deepEqual(count,0);
});

test("[cTouch 1.8.6] window.screen.availTop is 0",function(){
	deepEqual(window.screen.availTop,0);
});

test("[cTouch 1.8.6] window.screen.availLeft is 0",function(){
	deepEqual(window.screen.availLeft,0);
});

test("[cTouch 2.1.2] 'sgviewer' in window is false :p",function(){
	deepEqual('sgviewer' in window,false);
});

if(typeof document.createTouch == 'function')
test("[cTouch 2.0.9] document.createTouch is native",function(){
	ok(
		document.createTouch.toString().indexOf('[native code]')>=0 &&
		document.createTouch.toString().indexOf(';')==-1
	);
});

if(typeof document.createTouchList == 'function')
test("[cTouch 2.0.9] document.createTouchList is native",function(){
	ok(
		document.createTouchList.toString().indexOf('[native code]')>=0 &&
		document.createTouchList.toString().indexOf(';')==-1
	);
});

test("[cTouch 2.1.1] document.createElement is native",function(){
	ok(
		document.createElement.toString().indexOf('[native code]')>=0 &&
		document.createElement.toString().indexOf(';')==-1
	);
});

test("[cTouch 2.1.3] document.appendChild is native",function(){
	ok(
		document.appendChild.toString().indexOf('[native code]')>=0 &&
		document.appendChild.toString().indexOf(';')==-1
	);
	ok(
		document.createElement('script').appendChild.toString().indexOf('[native code]')>=0
	);
});

test("[cTouchZ 0.0.1] HTMLDocument.prototype.createElement is not tainted",function(){
	var good=true;
	for(var x in HTMLDocument.prototype.createElement)good=false;
	ok(good);
	deepEqual(Object.hasOwnProperty.apply(HTMLDocument.prototype.createElement,['toString']),false);
});

test("[cTouchZ 0.0.1] document.ontouchstart is write-protected lv1",function(){
	deepEqual(document.ontouchstart,null);
	document.ontouchstart=undefined;
	deepEqual(document.ontouchstart,null);
});

test("[cTouchZ 0.0.1] document.ontouchstart is write-protected lv2",function(){
	deepEqual(document.ontouchstart,null);
	document.ontouchstart=function(){};
	deepEqual(typeof(document.ontouchstart),'function');
});

test("[cTouch 2.5.1] window.ontouchstart is write-protected lv1",function(){
	deepEqual(window.ontouchstart,null);
	window.ontouchstart=undefined;
	deepEqual(window.ontouchstart,null);
});

test("[cTouch 2.5.1] window.ontouchstart is write-protected lv2",function(){
	deepEqual(window.ontouchstart,null);
	window.ontouchstart=function(){};
	deepEqual(typeof(window.ontouchstart),'function');
});

test("Chrome PDF Viewer is not loaded",function(){
	ok(!navigator.plugins['Chrome PDF Viewer'] && !navigator.plugins['WebKit built-in PDF'] && !navigator.plugins['WebKit \u5185\u8535 PDF']);
});

//this test must be performed lastly.
test("[cTouch 2.0.5] generated iframe is patched lv2",function(){
	var d=document.createElement('iframe');
	d.height=d.width=0;
	var s=document.createElement('script');
	var innerText=('innerText' in s) ? 'innerText' : 'textContent';
	s.type='text/javascript';
	s[innerText]='parent.test("generated iframe is patched lv1",function(){parent.ok(/Linux arm|iPhone|iPod|iPhone/.test(navigator.platform));});';
	d.appendChild(s);
	document.documentElement.appendChild(d);
	ok(/Linux arm|iPhone|iPod|iPhone/.test(d.contentWindow.navigator.platform));
	deepEqual(d.contentWindow.screen.width,window.screen.width);
	deepEqual(d.contentWindow.screen.height,window.screen.height);
});
