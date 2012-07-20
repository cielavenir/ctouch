(function(){
document.getElementsByTagName('body')[0].style.overflow='visible';
document.getElementsByTagName('body')[0].style.webkitUserSelect='auto';
var opt=document.getElementsByTagName('option');
if(opt)for(i=0;i<opt.length;i++)opt[i].style.color='black';
//var meta=document.getElementsByTagName('meta');
//if(meta)for(i=0;i<meta.length;i++)if(meta[i].name=='viewport'){meta[i].parentNode.removeChild(meta[i]);break;}
var embed=document.getElementsByTagName('embed');
if(embed&&embed.length==1){
	console.log(embed);
	var parent=embed[0].parentNode;
	if(parent.tagName=='DIV')parent.style.height='100%';
}
CanvasRenderingContext2D.prototype.__fillText=CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText=function(s,x,y,l){
	l = l || 0;
	if(l<10)CanvasRenderingContext2D.prototype.__fillText.call(this,s,x,y);
	else CanvasRenderingContext2D.prototype.__fillText.call(this,s,x,y,l);
};
var myself = document.getElementById('ctouch_css_js');
myself.parentNode.removeChild(myself);
})();
