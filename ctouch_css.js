(function(){
//var ratio=1;
var ratio=window.devicePixelRatio;
document.documentElement.style.zoom=ratio;
var body=document.getElementsByTagName('body');
if(body&&body[0]){ //lol?
	body[0].style.overflow='visible';
	//body[0].style.userSelect='auto';
	body[0].style.webkitUserSelect='auto';
	body[0].style.zoom=1;
}
var opt=document.getElementsByTagName('option');
if(opt)for(i=0;i<opt.length;i++)opt[i].style.color='black';
//var meta=document.getElementsByTagName('meta');
//if(meta)for(i=0;i<meta.length;i++)if(meta[i].name=='viewport'){meta[i].parentNode.removeChild(meta[i]);break;}
var embed=document.getElementsByTagName('embed');
if(embed&&embed.length==1){
	//console.log(embed);
	var parent=embed[0].parentNode;
	if(parent.tagName=='DIV')parent.style.height='100%';
}
var myself = document.getElementById('ctouch_css_js');
myself.parentNode.removeChild(myself);
})();
