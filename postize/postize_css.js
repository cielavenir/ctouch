var s=document.createElement('script');
s.type='text/javascript';
s.id='postize_css_js';
s.innerHTML="\
(function(){\n\
	var frm=document.getElementsByTagName('form');\n\
	if(frm)for(var i=0;i<frm.length;i++)if(frm[i].method.toLowerCase()=='get'){\n\
		var elem=frm[i].elements;\n\
		if(elem)for(var j=0;j<elem.length;j++)if(elem[j].type.toLowerCase()=='password'){frm[i].method='post';break;}\n\
	}\n\
	var myself = document.getElementById('postize_css_js');\n\
	myself.parentNode.removeChild(myself);\n\
})();\n\
";
document.documentElement.appendChild(s);
