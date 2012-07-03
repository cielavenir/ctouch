var s;
s = document.createElement("script");
s.type = "text/javascript";
s.id = "ctouch_css_js";
s.innerText += "\
document.getElementsByTagName('body')[0].style.overflow='visible';\
document.getElementsByTagName('body')[0].style.webkitUserSelect='auto';\
var opt=document.getElementsByTagName('option');\
if(opt)for(i=0;i<opt.length;i++)opt[i].style.color='black';\
var myself = document.getElementById('ctouch_css_js');\
myself.parentNode.removeChild(myself);";
document.documentElement.appendChild(s);
