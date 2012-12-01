var saveConfig=function(){}
var title='cTouch r2 (sessionStorage)';
///__BOUNDARY__///
//cTouch popup core: var saveConfig/title is defined.
var config=JSON.parse(localStorage['config']);
var initialize=function(){
	var table=document.getElementById('UA');

		var tr=document.createElement('tr');
		var td,label;
		td=document.createElement('td');
			input=document.createElement('input');
			input.type='radio';
			input.name='ua';
			input.id='ctouch_ua_-1';
			input.onclick=function(){
				config.preferedUA=-1;
				localStorage['config']=JSON.stringify(config,null,' ');
				saveConfig();
			};
			td.appendChild(input);
		tr.appendChild(td);
		td=document.createElement('td');
		td.style.whiteSpace='nowrap';
			label=document.createElement('label');
			label.htmlFor='ctouch_ua_-1';
			label.innerHTML="Don't modify (original)";
			td.appendChild(label);
		tr.appendChild(td);
		table.appendChild(tr);

	var i;
	for(i=0;i<config.UA.length;i++){
		var x=i;
		var tr=document.createElement('tr');
		var td,label;
		td=document.createElement('td');
			input=document.createElement('input');
			input.type='radio';
			input.name='ua';
			input.id='ctouch_ua_'+i;
			// http://nanto.asablo.jp/blog/2006/07/08/437419
			with({i:i})input.onclick=function(){
				config.preferedUA=i;
				localStorage['config']=JSON.stringify(config,null,' ');
				saveConfig();
			};
			td.appendChild(input);
		tr.appendChild(td);
		td=document.createElement('td');
		td.style.whiteSpace='nowrap';
			label=document.createElement('label');
			label.htmlFor='ctouch_ua_'+i;
			label.innerHTML=config.UA[i][0];
			td.appendChild(label);
		tr.appendChild(td);
		table.appendChild(tr);
	}
};

window.onload=function(){
	document.getElementById('title').innerText=title;
	document.getElementById('extensions_page').innerText=title;
	var flash_plugin=null;
	var flash=navigator.mimeTypes['application/x-shockwave-flash'];
	if(flash)flash_plugin=flash.enabledPlugin;
	if(!flash_plugin)document.getElementById('flash_state').innerText='Flash is not installed.';
	if(flash_plugin)document.getElementById('flash_state').innerText=flash_plugin.filename+' should be '+(flash_plugin.filename.toLowerCase().indexOf('pep')==-1?'NPAPI.':'PPAPI.');

	initialize();

	if(config.enable_imitation){document.getElementById('enable_imitation').checked=true;}
	document.getElementById('ctouch_ua_'+config.preferedUA).checked=true;

	document.getElementById('enable_imitation').onclick=function(){
		config.enable_imitation=!config.enable_imitation;
		localStorage['config']=JSON.stringify(config,null,' ');
		saveConfig();
	};

	document.getElementById('option_page').onclick=function(){
		window.open(chrome.extension.getURL('ctouch_option.html'));
	};
	document.getElementById('plugins_page').onclick=function(){
		window.open('chrome://plugins');
	};
	//easter for debug
	document.getElementById('popup_page').onclick=function(){
		window.open(chrome.extension.getURL('ctouch_popup.html'));
	};
	document.getElementById('extensions_page').onclick=function(){
		window.open('chrome://extensions');
	};
};
///__BOUNDARY__///
;
