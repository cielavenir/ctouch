(function(){
//var ratio=1;
//var ratio=window.devicePixelRatio;
//document.documentElement.style.zoom=ratio;
var body=document.getElementsByTagName('body');
if(body&&body[0]){ //lol?
	if(document.defaultView.getComputedStyle(body[0],'').overflow=='hidden')
		body[0].style.overflow='scroll';
	//body[0].style.userSelect='auto';
	body[0].style.webkitUserSelect='auto';
	//body[0].style.zoom=1;
}
var opt=document.getElementsByTagName('option');
if(opt)for(var i=0;i<opt.length;i++)opt[i].style.color='black';
//monkey-patch Reel...
var swiff=document.getElementsByClassName('swiff');
if(swiff)for(var i=0;i<swiff.length;i++){
	if(swiff[i].tagName.toLowerCase()=='div'&&swiff[i].getAttribute('data-src'))swiff[i].style.textAlign='left';
}
var scr=document.getElementsByTagName('script');
if(scr)for(var i=0;i<scr.length;i++){
	if(scr[i].src&&scr[i].src.substr(0,32)=='http://aimg.gree.jp/js/reel/Reel'){
		for(var j=0;j<scr.length;j++){
			if(scr[j].innerText.match(/\.setContainer\((.+?),/)){
				var str=RegExp.$1;
				try{
					var elem=eval(str);
					elem.style.textAlign='left';
				}catch(e){
					console.log('failed to eval '+str);
				}
			}
		}
		break;
	}
}
//var meta=document.getElementsByTagName('meta');
//if(meta)for(var i=0;i<meta.length;i++)if(meta[i].name=='viewport'){meta[i].parentNode.removeChild(meta[i]);break;}
//var embed=document.getElementsByTagName('embed'); //removed: interfers with YouTube (PC)
//if(embed&&embed.length==1){
//	//console.log(embed);
//	var parent=embed[0].parentNode;
//	if(parent.tagName=='DIV')parent.style.height='100%';
//}
var myself = document.getElementById('ctouch_css_js');
myself.parentNode.removeChild(myself);
})();
