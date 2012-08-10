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

var initialize=function(){
	var config=JSON.parse(localStorage['config']);
	var table=document.getElementById('UA');
	var i;
	while(document.getElementById('UA').children.length>0)document.getElementById('UA').removeChild(document.getElementById('UA').children[0]);
	for(i=0;i<config.UA.length;i++){
		var tr=document.createElement('tr');
		var td,input;
		td=document.createElement('td');
		td.style.width='30%';
			input=document.createElement('input');
			input.type='text';
			input.style.width='95%';
			input.value=config.UA[i][0];
			td.appendChild(input);
		tr.appendChild(td);
		td=document.createElement('td');
			input=document.createElement('input');
			input.type='text';
			input.style.width='95%';
			input.value=config.UA[i][1];
			td.appendChild(input);
		tr.appendChild(td);
		td=document.createElement('td');
		td.style.width='70px';
			input=document.createElement('input');
			input.type='button';
			input.value='Remove';
			input.onclick=function(){
				var tr=this.parentNode.parentNode;
				tr.parentNode.removeChild(tr);
			};
			td.appendChild(input);
		tr.appendChild(td);
		table.appendChild(tr);
	}
	document.getElementById('BACKUP').value=localStorage['config'];
};

window.onload=function(){
	$(function() {
		$("tbody").sortable();
		$("tbody").disableSelection();
	});

	initialize();

	document.getElementById('ADD').onclick=function(){
		var table=document.getElementById('UA');
		var tr=document.createElement('tr');
		var td,input;
		td=document.createElement('td');
		td.style.width='30%';
			input=document.createElement('input');
			input.type='text';
			input.style.width='95%';
			input.value='';
			td.appendChild(input);
		tr.appendChild(td);
		td=document.createElement('td');
			input=document.createElement('input');
			input.type='text';
			input.style.width='95%';
			input.value='';
			td.appendChild(input);
		tr.appendChild(td);
		td=document.createElement('td');
		td.style.width='70px';
			input=document.createElement('input');
			input.type='button';
			input.value='Remove';
			input.onclick=function(){
				var tr=this.parentNode.parentNode;
				tr.parentNode.removeChild(tr);
			};
			td.appendChild(input);
		tr.appendChild(td);
		table.appendChild(tr);
	};

	document.getElementById('SAVE').onclick=function(){
		var config=JSON.parse(localStorage['config']);
		config.UA=[];
		var table=document.getElementById('UA');
		var i=0;
		for(;i<table.children.length;i++){
			config.UA.push([table.children[i].children[0].children[0].value,table.children[i].children[1].children[0].value]);
		}
		localStorage['config']=JSON.stringify(config,null,' ');
		initialize();
		postFile('http://localhost:12380/ctouch_external.cgi',window.btoa(localStorage['config']));
	};

	document.getElementById('RESET').onclick=function(){
		if(!window.confirm('Are you sure to reset?'))return;
		localStorage['config']=localStorage['config_default'];
		initialize();
		postFile('http://localhost:12380/ctouch_external.cgi',window.btoa(localStorage['config']));
	};

	document.getElementById('RESURRECT').onclick=function(){
		JSON.parse(document.getElementById('BACKUP').value); //exception will be thrown if error
		localStorage['config']=document.getElementById('BACKUP').value;
		initialize();
		postFile('http://localhost:12380/ctouch_external.cgi',window.btoa(localStorage['config']));
	};
};
