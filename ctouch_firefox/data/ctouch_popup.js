var initialize=function(config){
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
				self.port.emit('cTouch_configFromPopup',config);
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
				self.port.emit('cTouch_configFromPopup',config);
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

self.port.on('cTouch_selfToPopup',function(_self){
	var title=_self.name[0]+_self.name[1].toUpperCase()+_self.name.substring(2).replace('_',' ');
	document.getElementById('title').textContent=title;
	document.getElementById('extensions_page').textContent=title+' '+_self.version;
});

self.port.on('cTouch_configToPopup',function(config){
	var flash_plugin=null;
	var flash=navigator.mimeTypes['application/x-shockwave-flash'];
	if(flash)flash_plugin=flash.enabledPlugin;
	if(!flash_plugin)document.getElementById('flash_state').textContent='Flash is not installed.';
	if(flash_plugin)document.getElementById('flash_state').textContent=flash_plugin.filename+' should be '+(flash_plugin.filename.toLowerCase().indexOf('pep')==-1?'NPAPI.':'PPAPI.');

	initialize(config);

	document.getElementById('ctouch_ua_'+config.preferedUA).checked=true;

	if(config.enable_imitation){document.getElementById('enable_imitation').checked=true;}
	document.getElementById('enable_imitation').onclick=function(){
		config.enable_imitation=!config.enable_imitation;
		self.port.emit('cTouch_configFromPopup',config);
	};
	if(config.generate_touch){document.getElementById('generate_touch').checked=true;}
	document.getElementById('generate_touch').onclick=function(){
		config.generate_touch=!config.generate_touch;
		self.port.emit('cTouch_configFromPopup',config);
	};
	if(config.install_createtouch){document.getElementById('install_createtouch').checked=true;}
	document.getElementById('install_createtouch').onclick=function(){
		config.install_createtouch=!config.install_createtouch;
		self.port.emit('cTouch_configFromPopup',config);
	};

	document.getElementById('option_page').onclick=function(){
		self.port.emit('cTouch_openFromPopup','rs:ctouch_option.html');
	};
	document.getElementById('plugins_page').onclick=function(){
		self.port.emit('cTouch_openFromPopup','about:plugins');
	};
	//easter for debug
	document.getElementById('popup_page').onclick=function(){
		self.port.emit('cTouch_openFromPopup','rs:ctouch_popup.html');
	};
	document.getElementById('extensions_page').onclick=function(){
		self.port.emit('cTouch_openFromPopup','about:addons');
	};
});
