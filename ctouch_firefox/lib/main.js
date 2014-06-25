var { Ci } = require('chrome');
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require('sdk/panel');
var pageMod = require('sdk/page-mod');
var self = require('sdk/self');
var tabs = require('sdk/tabs');
var ss = require('sdk/simple-storage');
var events = require('sdk/system/events');

var default_config=
///__BOUNDARY__///
{
	"UA": [
		["Android Astro/1.0",
			"Mozilla/5.0 (Linux; U; Android 1.0; en-us; dream) AppleWebKit/525.10 (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2"],
		["Android Bender/1.1",
			"Mozilla/5.0 (Linux; U; Android 1.1; en-us; dream) AppleWebKit/525.10+ (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2"],
		["HTC Magic (Cupcake/1.5)",
			"Mozilla/5.0 (Linux; U; Android 1.5; en-us; HTC Magic Build/CRC24) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1"],
		["HTC Magic (Donut/1.6)",
			"Mozilla/5.0 (Linux; U; Android 1.6; en-us; HTC Magic Build/DRD20) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1"],
		["Nexus One (Eclair/2.1-update1)",
			"Mozilla/5.0 (Linux; U; Android 2.1-update1; en-us; Nexus One Build/EPF21B) AppleWebkit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17"],
		["Nexus One (Froyo/2.2.3)",
			"Mozilla/5.0 (Linux; U; Android 2.2.3; en-us; Nexus One Build/FRK76C) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"],
		["Nexus S (Gingerbread/2.3.7)",
			"Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; Nexus S Build/GWK74) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"],
		["Xoom (Honeycomb/3.2.6)",
			"Mozilla/5.0 (Linux; U; Android 3.2.6; en-us; Xoom Build/HLK75H) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13"],
		["Galaxy Nexus (IceCreamSandwich/4.0.4)",
			"Mozilla/5.0 (Linux; U; Android 4.0.4; en-us; Galaxy Nexus Build/IMM76L) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"],
		["Galaxy Nexus (IceCreamSandwich/4.0.4 Chrome)",
			"Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.141 Mobile Safari/537.36"],
		["Xoom (IceCreamSandwich/4.0.4)",
			"Mozilla/5.0 (Linux; U; Android 4.0.4; en-us; Xoom Build/IMM76L) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30"],
		["Xoom (IceCreamSandwich/4.0.4 Chrome)",
			"Mozilla/5.0 (Linux; Android 4.0.4; Xoom Build/IMM76L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.141 Safari/537.36"],
		["Galaxy Nexus (JellyBean/4.3)",
			"Mozilla/5.0 (Linux; U; Android 4.3; en-us; Galaxy Nexus Build/JWR66Y) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"],
		["Galaxy Nexus (JellyBean/4.3 Chrome)",
			"Mozilla/5.0 (Linux; Android 4.3; Galaxy Nexus Build/JWR66Y) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.141 Mobile Safari/537.36"],
		["Nexus 10 (JellyBean/4.3)",
			"Mozilla/5.0 (Linux; U; Android 4.3; en-us; Nexus 10 Build/JWR66Y) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30"],
		["Nexus 10 (JellyBean/4.3 Chrome)",
			"Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JWR66Y) AppleWebKit/537.36 (KHTML like Gecko) Chrome/35.0.1916.141 Safari/537.36"],
		["Nexus 5 (KitKat/4.4.4)",
			"Mozilla/5.0 (Linux; Android 4.4.4; Nexus 5 Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36"],
		["Nexus 5 (KitKat/4.4.4 Chrome)",
			"Mozilla/5.0 (Linux; Android 4.4.4; Nexus 5 Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.141 Mobile Safari/537.36"],
		["Nexus 10 (KitKat/4.4.4)",
			"Mozilla/5.0 (Linux; Android 4.4.4; Nexus 10 Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Safari/537.36"],
		["Nexus 10 (KitKat/4.4.4 Chrome)",
			"Mozilla/5.0 (Linux; Android 4.4.4; Nexus 10 Build/KTU84P) AppleWebKit/537.36 (KHTML like Gecko) Chrome/35.0.1916.141 Safari/537.36"],
		["iPhone (iOS 3.1.3)",
			"Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_1_3 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7E18 Safari/528.16"],
		["iPod Touch (iOS 3.1.3)",
			"Mozilla/5.0 (iPod; U; CPU iPhone OS 3_1_3 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7E18 Safari/528.16"],
		["iPad (iOS 3.2.2)",
			"Mozilla/5.0 (iPad; U; CPU OS 3_2_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B500 Safari/531.21.10"],
		["iPhone (iOS 4.3.5)",
			"Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5"],
		["iPod Touch (iOS 4.3.5)",
			"Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5"],
		["iPad (iOS 4.3.5)",
			"Mozilla/5.0 (iPad; U; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5"],
		["iPhone (iOS 5.1.1)",
			"Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3"],
		["iPod Touch (iOS 5.1.1)",
			"Mozilla/5.0 (iPod; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3"],
		["iPad (iOS 5.1.1)",
			"Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3"],
		["iPhone (iOS 6.1.3)",
			"Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25"],
		["iPod Touch (iOS 6.1.3)",
			"Mozilla/5.0 (iPod; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25"],
		["iPad (iOS 6.1.3)",
			"Mozilla/5.0 (iPad; CPU OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25"],
		["iPhone (iOS 7.1.1)",
			"Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D201 Safari/9537.53"],
		["iPod Touch (iOS 7.1.1)",
			"Mozilla/5.0 (iPod touch; CPU iPhone OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D201 Safari/9537.53"],
		["iPad (iOS 7.1.1)",
			"Mozilla/5.0 (iPad; CPU OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D201 Safari/9537.53"],
		["Android Firefox Mobile 30.0",
			"Mozilla/5.0 (Android; Mobile; rv:30.0) Gecko/26.0 Firefox/30.0"],
		["Android Firefox Tablet 30.0",
			"Mozilla/5.0 (Android; Tablet; rv:30.0) Gecko/26.0 Firefox/30.0"]
	],
	"config_version": 3,
	"preferedUA": -1,
	"enable_imitation": true,
	"generate_touch": true,
	"external_daemon_chrome": false,
	"external_daemon_id": "abmbnealdnngelmgbiiblpcpbapmmlkd",
	"install_createtouch": false
}
///__BOUNDARY__///
;
if(!ss.storage.config)ss.storage.config=default_config;

///pagemod
function override(event){
	var channel = event.subject.QueryInterface(Ci.nsIHttpChannel);
	channel.setRequestHeader('User-Agent', ss.storage.config.UA[ss.storage.config.preferedUA][1], false);
};

var first_loadPageMod=true;
var pagemod;
function loadPageMod(){
	if(!first_loadPageMod)pagemod.destroy();
	pagemod=pageMod.PageMod({
		include: '*',
		contentScriptFile: self.data.url('ctouch_bootstrap.js'),
		contentScriptOptions: ss.storage.config,
		contentScriptWhen: 'start',
	});
	if(!first_loadPageMod)events.off('http-on-modify-request', override);
	if(ss.storage.config.preferedUA!=-1){
		events.on('http-on-modify-request', override);
	}
	first_loadPageMod=false;
};
loadPageMod();

pageMod.PageMod({
	include: '*',
	contentScriptFile: self.data.url('ctouch_css.js'),
	//contentScriptOptions: ss.storage.config,
	contentScriptWhen: 'ready',
});

///option page
pageMod.PageMod({
	include: self.data.url('ctouch_option.html'),
	contentScriptFile: [
		self.data.url('jqueryui-sortable.js'),
		self.data.url('ctouch_option.js'),
	],
	onAttach: function(worker){
		worker.port.emit('cTouch_selfToOption',self);
		worker.port.emit('cTouch_defaultConfigToOption',default_config);
		worker.port.emit('cTouch_configToOption',ss.storage.config);
		worker.port.on('cTouch_configFromOption',function(config){
			ss.storage.config=config;
			loadPageMod();
		});
		worker.port.on('cTouch_openFromOption',function(url){
			tabs.open({url:url.replace('rs:',self.data.url(''))});
		});
	},
});

pageMod.PageMod({
	include: self.data.url('ctouch_popup.html'),
	contentScriptFile: self.data.url('ctouch_popup.js'),
	onAttach: function(worker){
		worker.port.emit('cTouch_selfToPopup',self);
		worker.port.emit('cTouch_configToPopup',ss.storage.config);
		worker.port.on('cTouch_configFromPopup',function(config){
			ss.storage.config=config;
			loadPageMod();
		});
		worker.port.on('cTouch_openFromPopup',function(url){
			tabs.open({url:url.replace('rs:',self.data.url(''))});
		});
	},
});

///panel
var button = ToggleButton({
	id: 'ctouch',
	label: 'cTouch',
	icon: {
		'16': './icon16.png',
		'32': './icon32.png',
	},
	onChange: handleChange
});

var first_loadPanel=true;
var panel;
function loadPanel(){
	if(!first_loadPanel)panel.destroy();
	panel = panels.Panel({
		contentURL: self.data.url('ctouch_popup.html'),
		contentScriptFile: self.data.url('ctouch_popup.js'),
		onHide: handleHide
	});
	first_loadPanel=false;
}
loadPanel();

function handleChange(state){
	if(state.checked){
		panel.show({
			position: button
		});
		panel.port.emit('cTouch_selfToPopup',self);
		panel.port.emit('cTouch_configToPopup',ss.storage.config);
		panel.port.on('cTouch_configFromPopup',function(config){
			ss.storage.config=config;
			loadPageMod();
		});
		panel.port.on('cTouch_openFromPopup',function(url){
			tabs.open({url:url.replace('rs:',self.data.url(''))});
		});
	}
}
function handleHide(){
	loadPanel();
	button.state('window', {checked: false});
}
