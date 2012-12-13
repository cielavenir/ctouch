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
	document.getElementById('title').innerText=chrome.app.getDetails().name;
	document.getElementById('extensions_page').innerText=chrome.app.getDetails().name+' '+chrome.app.getDetails().version;
	var flash_plugin=null;
	var flash=navigator.mimeTypes['application/x-shockwave-flash'];
	if(flash)flash_plugin=flash.enabledPlugin;
	if(!flash_plugin)document.getElementById('flash_state').innerText='Flash is not installed.';
	if(flash_plugin)document.getElementById('flash_state').innerText=flash_plugin.filename+' should be '+(flash_plugin.filename.toLowerCase().indexOf('pep')==-1?'NPAPI.':'PPAPI.');

	initialize();

	document.getElementById('ctouch_ua_'+config.preferedUA).checked=true;

	if(config.enable_imitation){document.getElementById('enable_imitation').checked=true;}
	document.getElementById('enable_imitation').onclick=function(){
		config.enable_imitation=!config.enable_imitation;
		localStorage['config']=JSON.stringify(config,null,' ');
		saveConfig();
	};
	if(config.generate_touch){document.getElementById('generate_touch').checked=true;}
	document.getElementById('generate_touch').onclick=function(){
		config.generate_touch=!config.generate_touch;
		localStorage['config']=JSON.stringify(config,null,' ');
		saveConfig();
	};

	document.getElementById('option_page').onclick=function(){
		window.open(chrome.extension.getURL(chrome.app.getDetails().options_page));
	};
	document.getElementById('plugins_page').onclick=function(){
		window.open('chrome://plugins');
	};
	//easter for debug
	document.getElementById('popup_page').onclick=function(){
		window.open(chrome.extension.getURL(chrome.app.getDetails().browser_action.default_popup));
	};
	document.getElementById('extensions_page').onclick=function(){
		window.open('chrome://extensions');
	};
};
