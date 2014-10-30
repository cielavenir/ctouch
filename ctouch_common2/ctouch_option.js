var ctouch_ualist_url='http://ctouch.googlecode.com/hg/src/ctouch_ualist.json';

var initialize=function(){
	var config=JSON.parse(localStorage['config']);
	var table=document.getElementById('UA');
	var i;
	while(document.getElementById('UA').children.length>0)document.getElementById('UA').removeChild(document.getElementById('UA').children[0]);
	for(i=0;i<config.UA.length;i++){
		var tr=document.createElement('tr');
		var td,input;
		td=document.createElement('td');
		td.style.width='18px';
			input=document.createElement('input');
			input.type='radio';
			input.name='ua';
			if(i==config.preferedUA)input.checked=true;
			td.appendChild(input);
		tr.appendChild(td);
		td=document.createElement('td');
		td.style.width='30%';
		td.style.marginLeft='0px';
		td.style.marginRight='0px';
		td.style.paddingLeft='3px';
		td.style.paddingRight='10px';
		//td.style.borderLeft='0px';
		//td.style.borderRight='0px';
			input=document.createElement('input');
			input.type='text';
			input.style.width='100%';
			input.value=config.UA[i][0];
			td.appendChild(input);
		tr.appendChild(td);
		td=document.createElement('td');
		td.style.marginLeft='0px';
		td.style.marginRight='0px';
		td.style.paddingLeft='3px';
		td.style.paddingRight='10px';
		//td.style.borderLeft='0px';
		//td.style.borderRight='0px';
			input=document.createElement('input');
			input.type='text';
			input.style.width='100%';
			input.value=config.UA[i][1];
			td.appendChild(input);
		tr.appendChild(td);
		td=document.createElement('td');
		td.style.width='65px';
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
	var innerText=('innerText' in document.documentElement) ? 'innerText' : 'textContent';
	$(function(){
		$("tbody").sortable();
		//$("tbody").disableSelection();
	});
	document.getElementById('title')[innerText]=chrome.app.getDetails().name;
	document.getElementById('extensions_page')[innerText]=chrome.app.getDetails().name+' '+chrome.app.getDetails().version;
	var flash_plugin=null;
	var flash=navigator.mimeTypes['application/x-shockwave-flash'];
	if(flash)flash_plugin=flash.enabledPlugin;
	if(!flash_plugin)document.getElementById('flash_state')[innerText]='Flash is not installed.';
	if(flash_plugin)document.getElementById('flash_state')[innerText]=flash_plugin.filename+' should be '+(flash_plugin.filename.toLowerCase().indexOf('pep')==-1?'NPAPI.':'PPAPI.');

	initialize();

	document.getElementById('UNSET').onclick=function(){
		var table=document.getElementById('UA');
		var i=0;
		for(;i<table.children.length;i++){
			table.children[i].children[0].children[0].checked=false;
		}
	}

	document.getElementById('ADD').onclick=function(){
		var table=document.getElementById('UA');
		var tr=document.createElement('tr');
		var td,input;
		td=document.createElement('td');
		td.style.width='18px';
			input=document.createElement('input');
			input.type='radio';
			input.name='ua';
			td.appendChild(input);
		tr.appendChild(td);
		td=document.createElement('td');
		td.style.width='30%';
		td.style.marginLeft='0px';
		td.style.marginRight='0px';
		td.style.paddingLeft='3px';
		td.style.paddingRight='10px';
		//td.style.borderLeft='0px';
		//td.style.borderRight='0px';
			input=document.createElement('input');
			input.type='text';
			input.style.width='100%';
			input.value='';
			td.appendChild(input);
		tr.appendChild(td);
		td=document.createElement('td');
		td.style.marginLeft='0px';
		td.style.marginRight='0px';
		td.style.paddingLeft='3px';
		td.style.paddingRight='10px';
		//td.style.borderLeft='0px';
		//td.style.borderRight='0px';
			input=document.createElement('input');
			input.type='text';
			input.style.width='100%';
			input.value='';
			td.appendChild(input);
		tr.appendChild(td);
		td=document.createElement('td');
		td.style.width='65px';
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
		config.preferedUA=-1;
		var table=document.getElementById('UA');
		var i=0;
		for(;i<table.children.length;i++){
			config.UA.push([table.children[i].children[1].children[0].value,table.children[i].children[2].children[0].value]);
			if(table.children[i].children[0].children[0].checked)config.preferedUA=i;
		}
		if(config.preferedUA>=table.children.length)config.preferedUA=-1;
		localStorage['config']=JSON.stringify(config,null,' ');
		initialize();
		saveConfig();
	};

	document.getElementById('RESET').onclick=function(){
		if(!window.confirm('Are you sure to reset?'))return;
		localStorage['config']=localStorage['config_default'];
		initialize();
		saveConfig();
	};

	document.getElementById('RESURRECT').onclick=function(){
		JSON.parse(document.getElementById('BACKUP').value); //exception will be thrown if error
		if(!window.confirm('Are you sure to cast resurrection spell?'))return;
		localStorage['config']=document.getElementById('BACKUP').value;
		initialize();
		saveConfig();
	};

	document.getElementById('DLUALIST').onclick=function(){
		var AJAX=null;
		if(window.XMLHttpRequest){
			AJAX=new XMLHttpRequest();
		}else{
			console.log("run_at: document_start isn't suitable");
			//AJAX=new ActiveXObject('Microsoft.XMLHTTP'); //ignore IE
		}
		if(!AJAX)return;
		AJAX.open('GET', ctouch_ualist_url, true);
		AJAX.onreadystatechange=function(){
			if(AJAX.readyState==4&&AJAX.status==200){
				document.getElementById('BACKUP').value=AJAX.responseText;
			}
		};
		AJAX.send(null);
	};

	document.getElementById('plugins_page').onclick=function(){
		//window.open('chrome://plugins');
		chrome.tabs.create({url:'chrome://plugins'});
	};

	//easter for debug
	document.getElementById('popup_page').onclick=function(){
		window.open(chrome.extension.getURL(chrome.app.getDetails().browser_action.default_popup));
	};
	document.getElementById('extensions_page').onclick=function(){
		//window.open('chrome://extensions');
		chrome.tabs.create({url:'chrome://extensions'});
	};
};
