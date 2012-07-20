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

var hackcanvas_cnt=0;
var hackcanvas=function(){
	var canvas=document.getElementsByTagName('canvas');
	if(canvas&&canvas.length==1){
		var ctx=canvas[0].getContext('2d');
		ctx.__proto__.__fillText=ctx.__proto__.fillText;
		ctx.__proto__.fillText=function(s,x,y,l){
			l = l || 0;
			if(l<10)ctx.__fillText.call(this,s,x,y);
			else ctx.__fillText.call(this,s,x,y,l);
		};
	}else{
		hackcanvas_cnt++;
		if(hackcanvas_cnt<5)setTimeout(hackcanvas,200);
	}
};
setTimeout(hackcanvas,200);

var myself = document.getElementById('ctouch_css_js');
myself.parentNode.removeChild(myself);
})();
