var s;
s = document.createElement("script");
s.type = "text/javascript";
s.id = "ctouch_css_js";
s.innerText += "\
document.getElementsByTagName('body')[0].style.overflow='visible';\
var myself = document.getElementById('ctouch_css_js');\
myself.parentNode.removeChild(myself);";
document.documentElement.appendChild(s);
