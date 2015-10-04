window.onload=function(){
	var config=
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
			"Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.94 Mobile Safari/537.36"],
		["Xoom (IceCreamSandwich/4.0.4)",
			"Mozilla/5.0 (Linux; U; Android 4.0.4; en-us; Xoom Build/IMM76L) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30"],
		["Xoom (IceCreamSandwich/4.0.4 Chrome)",
			"Mozilla/5.0 (Linux; Android 4.0.4; Xoom Build/IMM76L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.94 Safari/537.36"],
		["Galaxy Nexus (JellyBean/4.3)",
			"Mozilla/5.0 (Linux; U; Android 4.3; en-us; Galaxy Nexus Build/JWR66Y) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"],
		["Galaxy Nexus (JellyBean/4.3 Chrome)",
			"Mozilla/5.0 (Linux; Android 4.3; Galaxy Nexus Build/JWR66Y) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.94 Mobile Safari/537.36"],
		["Nexus 10 (JellyBean/4.3)",
			"Mozilla/5.0 (Linux; U; Android 4.3; en-us; Nexus 10 Build/JWR66Y) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30"],
		["Nexus 10 (JellyBean/4.3 Chrome)",
			"Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JWR66Y) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.94 Safari/537.36"],
		["Nexus 5 (KitKat/4.4.4)",
			"Mozilla/5.0 (Linux; Android 4.4.4; Nexus 5 Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36"],
		["Nexus 5 (KitKat/4.4.4 Chrome)",
			"Mozilla/5.0 (Linux; Android 4.4.4; Nexus 5 Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.94 Mobile Safari/537.36"],
		["Nexus 10 (KitKat/4.4.4)",
			"Mozilla/5.0 (Linux; Android 4.4.4; Nexus 10 Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Safari/537.36"],
		["Nexus 10 (KitKat/4.4.4 Chrome)",
			"Mozilla/5.0 (Linux; Android 4.4.4; Nexus 10 Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.94 Safari/537.36"],
		["Nexus 5 (Lollipop/5.1.1 Chrome)",
			"Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.94 Mobile Safari/537.36"],
		["Nexus 10 (Lollipop/5.1.1 Chrome)",
			"Mozilla/5.0 (Linux; Android 5.1.1; Nexus 10 Build/LMY48M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.94 Safari/537.36"],
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
		["iPhone (iOS 7.1.2)",
			"Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53"],
		["iPod Touch (iOS 7.1.2)",
			"Mozilla/5.0 (iPod touch; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53"],
		["iPad (iOS 7.1.2)",
			"Mozilla/5.0 (iPad; CPU OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53"],
		["iPhone (iOS 8.4.1)",
			"Mozilla/5.0 (iPhone; CPU iPhone OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4"],
		["iPod Touch (iOS 8.4.1)",
			"Mozilla/5.0 (iPod touch; CPU iPhone OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4"],
		["iPad (iOS 8.4.1)",
			"Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4"],
		["iPhone (iOS 9.0.2)",
			"Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/8.0 Mobile/13A452 Safari/601.1"],
		["iPod Touch (iOS 9.0.2)",
			"Mozilla/5.0 (iPod touch; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/8.0 Mobile/13A452 Safari/601.1"],
		["iPad (iOS 9.0.2)",
			"Mozilla/5.0 (iPad; CPU OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/8.0 Mobile/13A452 Safari/601.1"],
		["Android Firefox Mobile 41.0",
			"Mozilla/5.0 (Android 4.4.4; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0"],
		["Android Firefox Tablet 41.0",
			"Mozilla/5.0 (Android 4.4.4; Tablet; rv:41.0) Gecko/41.0 Firefox/41.0"]
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
	if(typeof localStorage['config'] === 'undefined' || localStorage['config'] == ''){
		localStorage['config']=JSON.stringify(config,null,' ');
		saveConfig();
	}
	var current_config=JSON.parse(localStorage['config']);
	if((current_config.config_version||0) < config.config_version){
		current_config.config_version=config.config_version;
		if(typeof current_config.generate_touch === 'undefined')current_config.generate_touch=true;
		if(typeof current_config.external_daemon_chrome === 'undefined')current_config.external_daemon_chrome=false;
		if(typeof current_config.external_daemon_id === 'undefined')current_config.external_daemon_id='abmbnealdnngelmgbiiblpcpbapmmlkd';
		if(typeof current_config.install_createtouch === 'undefined')current_config.install_createtouch=false;

		localStorage['config']=JSON.stringify(current_config,null,' ');
		saveConfig();
	}
	localStorage['config_default']=JSON.stringify(config,null,' ');
	//external?
	if(chrome.app.getDetails().permissions.indexOf('management')>=0 && current_config.external_daemon_chrome)chrome.management.launchApp(current_config.external_daemon_id.trim());
};

chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details){
		var headers=details.requestHeaders;
		for(var i=0;i<headers.length;i++){
			if(headers[i].name=='User-Agent'){
				var config=JSON.parse(localStorage[chrome.app.getDetails().name.indexOf('true')>=0 ? details.tabId : 'config']);
				if(config.preferedUA!=-1)headers[i].value=config.UA[config.preferedUA][1];
				if(headers[i].value.indexOf('Chrome')==-1&&headers[i].value.indexOf('CrMo')==-1){
					for(var j=0;j<headers.length;j++){
						if(headers[j].name == 'Accept-Encoding'){
							var a=headers[j].value.replace(/ /g,'').split(',');
							for(var k=a.length-1;k>=0;k--)if(a[k].substr(0,4)=='sdch')a.splice(k,1);
							headers[j].value = a.join(',');
							break;
						}
					}
				}
				break;
			}
		}
		return {requestHeaders: headers};
	},
	{
		urls: ['<all_urls>'],
		types: ['main_frame','sub_frame','stylesheet','script','image','object','xmlhttprequest','other']
	},
	['blocking', 'requestHeaders']
);
