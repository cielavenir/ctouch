var postFile=function(url, passData){
	if(window.XMLHttpRequest){
		AJAX=new XMLHttpRequest();
	}else{
		//AJAX=new ActiveXObject('Microsoft.XMLHTTP'); //ignore IE
	}
	if(!AJAX)return '';
	AJAX.open('POST', url, false);
	AJAX.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	AJAX.send(passData);
	return AJAX.responseText;
};
var saveConfig=function(json){
	postFile('http://localhost:12380/ctouch_external.cgi',window.btoa(json));
	return true;
};
