var inject_tag=function(id,script){
	var s=document.createElement('script');
	var innerText=('innerText' in s) ? 'innerText' : 'textContent';
	s.type='text/javascript';
	s.id=id;
	s[innerText]=window.atob(script);
	document.documentElement.appendChild(s);
};
///__BOUNDARY__///
var script="\
(function(){\
var body=document.getElementsByTagName('body');\
if(body&&body[0]){\
if(document.defaultView.getComputedStyle(body[0],'').overflow=='hidden')\
body[0].style.overflow='scroll';\
body[0].style.webkitUserSelect='auto';\
}\
var opt=document.getElementsByTagName('option');\
if(opt)for(var i=0;i<opt.length;i++)opt[i].style.color='black';\
var swiff=document.getElementsByClassName('swiff');\
if(swiff)for(var i=0;i<swiff.length;i++){\
if(swiff[i].tagName.toLowerCase()=='div'&&swiff[i].getAttribute('data-src'))swiff[i].style.textAlign='left';\
}\
var scr=document.getElementsByTagName('script');\
var innerText=('innerText' in scr) ? 'innerText' : 'textContent';\
if(scr)for(var i=0;i<scr.length;i++){\
if(scr[i].src&&scr[i].src.substr(0,32)=='http://aimg.gree.jp/js/reel/Reel'){\
for(var j=0;j<scr.length;j++){\
if(scr[j][innerText].match(/\\.setContainer\\((.+?),/)){\
var str=RegExp.$1;\
try{\
var elem=eval(str);\
elem.style.textAlign='left';\
}catch(e){\
console.log('failed to eval '+str);\
}\
}\
}\
break;\
}\
}\
if('FastClick' in window){\
if(FastClick.prototype.onTouchStart)FastClick.prototype.onTouchStart=function(event){return true;};\
if(FastClick.prototype.onTouchEnd)FastClick.prototype.onTouchEnd=function(event){return true;};\
if(FastClick.prototype.onTouchCancel)FastClick.prototype.onTouchCancel=function(event){return true;};\
}\
var myself = document.getElementById('ctouch_css_js');\
myself.parentNode.removeChild(myself);\
})();\
";
inject_tag('ctouch_css_js',window.btoa(script));
///__BOUNDARY__///
;