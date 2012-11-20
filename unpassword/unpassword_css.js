chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
var s=document.createElement('script');
s.type='text/javascript';
s.id='unpassword_css_js';
s.innerHTML="\
(function(){\n\
	var input=document.getElementsByTagName('input');\n\
	if(input)for(var i=0;i<input.length;i++)\n\
		if(input[i].type.toLowerCase()=='password')input[i].type='text';\n\
	var myself = document.getElementById('unpassword_css_js');\n\
	myself.parentNode.removeChild(myself);\n\
})();\n\
";
document.documentElement.appendChild(s);
});
