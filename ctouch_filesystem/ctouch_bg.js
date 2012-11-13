window.onload=function(){
	var config=
/// JSON START ///
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
			["Nexus S (GingerBread/2.3.7)",
				"Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; Nexus S Build/GWK74) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"],
			["Xoom (Honeycomb/3.2.6)",
				"Mozilla/5.0 (Linux; U; Android 3.2.6; en-us; Xoom Build/HLK75H) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13"],
			["Galaxy Nexus (IceCreamSandwich/4.0.4)",
				"Mozilla/5.0 (Linux; U; Android 4.0.4; en-us; Galaxy Nexus Build/IMM76L) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"],
			["Galaxy Nexus (IceCreamSandwich/4.0.4 Chrome)",
				"Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76L) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"],
			["Xoom (IceCreamSandwich/4.0.4)",
				"Mozilla/5.0 (Linux; U; Android 4.0.4; en-us; Xoom Build/IMM76L) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30"],
			["Xoom (IceCreamSandwich/4.0.4 Chrome)",
				"Mozilla/5.0 (Linux; Android 4.0.4; Xoom Build/IMM76L) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19"],
			["Galaxy Nexus (JellyBean/4.2)",
				"Mozilla/5.0 (Linux; U; Android 4.2; en-us; Nexus Build/JOP40C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"],
			["Galaxy Nexus (JellyBean/4.2 Chrome)",
				"Mozilla/5.0 (Linux; Android 4.2; Galaxy Nexus Build/JOP40C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"],
			["Xoom (JellyBean/4.2)",
				"Mozilla/5.0 (Linux; U; Android 4.2; en-us; Xoom Build/JOP40C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30"],
			["Xoom (JellyBean/4.2 Chrome)",
				"Mozilla/5.0 (Linux; Android 4.2; Xoom Build/JOP40C) AppleWebKit/535.19 (KHTML like Gecko) Chrome/18.0.1025.166 Safari/535.19"],
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
			["iPhone (iOS 6.0.1)",
				"Mozilla/5.0 (iPhone; CPU iPhone OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A523 Safari/8536.25"],
			["iPod Touch (iOS 6.0.1)",
				"Mozilla/5.0 (iPod; CPU iPhone OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A523 Safari/8536.25"],
			["iPad (iOS 6.0.1)",
				"Mozilla/5.0 (iPad; CPU OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A523 Safari/8536.25"]
		],
		"preferedUA": -1,
		"enable_imitation": true
	}
/// JSON END ///
	;
	if(typeof localStorage['config'] === 'undefined' || localStorage['config'] == ''){
		localStorage['config']=JSON.stringify(config,null,' ');
	}
	localStorage['config_default']=JSON.stringify(config,null,' ');
};

chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details){
		//var headerDone = false;
		for(var i = 0; i < details.requestHeaders.length; i++){
			//if(headerDone)break;
			if(details.requestHeaders[i].name == 'User-Agent'){
				var config=JSON.parse(localStorage['config']);
				details.requestHeaders[i].value = (config.preferedUA==-1)?navigator.userAgent:config.UA[config.preferedUA][1];
				if(details.requestHeaders[i].value.indexOf('Chrome')==-1&&details.requestHeaders[i].value.indexOf('CrMo')==-1){
					for(var j = 0; j < details.requestHeaders.length; j++){
						if(details.requestHeaders[j].name == 'Accept-Encoding'){
							var a=details.requestHeaders[j].value.replace(/ /g,'').split(',');
							for(var k = a.length-1; k >= 0; k--)if(a[k].substr(0,4) == 'sdch')a.splice(k,1);
							details.requestHeaders[j].value = a.join(',');
							break;
						}
					}
				}
				break;
				//headerDone = true;
			}
		}
		return {requestHeaders: details.requestHeaders};
	},
	{
		urls: ['<all_urls>'],
		types: ['main_frame','sub_frame','stylesheet','script','image','object','xmlhttprequest','other']
	},
	['blocking', 'requestHeaders']
);
