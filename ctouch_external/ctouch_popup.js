function getFile(url, passData){
	if(window.XMLHttpRequest){
		AJAX=new XMLHttpRequest();
	}else{
		AJAX=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(!AJAX)return "";
	AJAX.open("POST", url, false);
	AJAX.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	AJAX.send(passData);
	return AJAX.responseText;
}

window.onload=function(){
	document.forms["ctouch"].elements["UA1"].value=localStorage["UA1"];
	document.forms["ctouch"].elements["UA2"].value=localStorage["UA2"];
	document.forms["ctouch"].elements["UA3"].value=localStorage["UA3"];
	document.forms["ctouch"].elements["UA4"].value=localStorage["UA4"];
	document.forms["ctouch"].elements["UA5"].value=localStorage["UA5"];
	document.forms["ctouch"].elements["UA6"].value=localStorage["UA6"];
	document.forms["ctouch"].elements["UA7"].value=localStorage["UA7"];
	document.forms["ctouch"].elements["UA8"].value=localStorage["UA8"];
	document.forms["ctouch"].elements["UA9"].value=localStorage["UA9"];
	if(localStorage["enable_imitation"]){document.forms["ctouch"].elements["enable_imitation"].checked=true;}
	document.forms["ctouch"].elements["preferedUA"+localStorage["preferedUA"]].checked=true;

	document.forms["ctouch"].onsubmit=function(){
		localStorage["UA1"]=document.forms["ctouch"].elements["UA1"].value;
		localStorage["UA2"]=document.forms["ctouch"].elements["UA2"].value;
		localStorage["UA3"]=document.forms["ctouch"].elements["UA3"].value;
		localStorage["UA4"]=document.forms["ctouch"].elements["UA4"].value;
		localStorage["UA5"]=document.forms["ctouch"].elements["UA5"].value;
		localStorage["UA6"]=document.forms["ctouch"].elements["UA6"].value;
		localStorage["UA7"]=document.forms["ctouch"].elements["UA7"].value;
		localStorage["UA8"]=document.forms["ctouch"].elements["UA8"].value;
		localStorage["UA9"]=document.forms["ctouch"].elements["UA9"].value;
		localStorage["enable_imitation"]=document.forms["ctouch"].elements["enable_imitation"].checked?"yes":"";
		for(i=0;i<document.forms["ctouch"].preferedUA.length;i++){
			if(document.forms["ctouch"].preferedUA[i].checked){
				localStorage["preferedUA"]=i;break;
			}
		}
		getFile("http://localhost:12380/ctouch_external.cgi",window.btoa(JSON.stringify(localStorage,null," ")));
	};
};
