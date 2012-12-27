var s=document.createElement('script');
s.type='text/javascript';
s.id='__firefoxz_css_js';
s.innerHTML="\
(function(){\n\
	navigator.__defineGetter__('mozConnection',function(){return {bandwidth:5};});\
	var myself = document.getElementById('__firefoxz_css_js');\n\
	myself.parentNode.removeChild(myself);\n\
})();\n\
";
document.documentElement.appendChild(s);
