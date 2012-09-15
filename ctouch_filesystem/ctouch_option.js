var writeFile=function(file, data){
	window.webkitStorageInfo.requestQuota(PERSISTENT,1024*1024,function(grantedBytes){
		window.webkitRequestFileSystem(PERSISTENT,grantedBytes,function(fs){
			fs.root.getFile(file, {create: true}, function(fileEntry){
				fileEntry.createWriter(function(fileWriter){
					fileWriter.onwriteend=function(e){
						fileWriter.onwriteend=null;
						var blob = new Blob([data], {type: 'application/json'});
						fileWriter.write(blob);
					}
					fileWriter.truncate(0);
				});
			});
		});
	});
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
	$(function(){
		$("tbody").sortable();
		//$("tbody").disableSelection();
	});

	initialize();

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
		var table=document.getElementById('UA');
		var i=0;
		for(;i<table.children.length;i++){
			config.UA.push([table.children[i].children[1].children[0].value,table.children[i].children[2].children[0].value]);
			if(table.children[i].children[0].children[0].checked)config.preferedUA=i;
		}
		if(config.preferedUA>=table.children.length)config.preferedUA=-1;
		localStorage['config']=JSON.stringify(config,null,' ');
		initialize();
		writeFile('ctouch_filesystem.json',localStorage['config']);
	};

	document.getElementById('RESET').onclick=function(){
		if(!window.confirm('Are you sure to reset?'))return;
		localStorage['config']=localStorage['config_default'];
		initialize();
		writeFile('ctouch_filesystem.json',localStorage['config']);
	};

	document.getElementById('RESURRECT').onclick=function(){
		JSON.parse(document.getElementById('BACKUP').value); //exception will be thrown if error
		localStorage['config']=document.getElementById('BACKUP').value;
		initialize();
		writeFile('ctouch_filesystem.json',localStorage['config']);
	};

	//easter for debug
	document.getElementById('popup_page').onclick=function(){
		window.open(chrome.extension.getURL('ctouch_popup.html'));
	};
	document.getElementById('extensions_page').onclick=function(){
		window.open('chrome://extensions');
	};
};