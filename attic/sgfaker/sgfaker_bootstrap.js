var s=document.createElement('script');
s.type='text/javascript';
s.id='sgfaker_bootstrap_js';
s.innerHTML="\
(function(){\n\
	window.sgviewer=true;\n\
	var myself = document.getElementById('sgfaker_bootstrap_js');\n\
	myself.parentNode.removeChild(myself);\n\
})();\n\
";
document.documentElement.appendChild(s);
