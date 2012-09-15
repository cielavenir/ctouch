window.onload=function(){
	var config=
/// JSON START ///
	{
		"UA": [
			["HTC Magic (Cupcake)",
				"Mozilla/5.0 (Linux; U; Android 1.5; en-us; HTC Magic Build/CRB43) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1"],
			["HTC Magic (Donut)",
				"Mozilla/5.0 (Linux; U; Android 1.6; en-us; HTC Magic Build/DRD08) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1"],
			["Nexus One (Eclair)",
				"Mozilla/5.0 (Linux; U; Android 2.1; en-us; Nexus One Build/ERD62) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17"],
			["Nexus One (Froyo)",
				"Mozilla/5.0 (Linux; U; Android 2.2.2; en-us; Nexus One Build/FRG83G) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"],
			["Xperia S (GingerBread)",
				"Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; SonyEricssonLT26i Build/6.0.A.3.73) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"],
			["Xoom (Honeycomb)",
				"Mozilla/5.0 (Linux; U; Android 3.2.6; en-us; Xoom Build/HLK75H) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13"],
			["Galaxy Nexus (IceCreamSandwich)",
				"Mozilla/5.0 (Linux; U; Android 4.0.4; en-us; Galaxy Nexus Build/IMM30B) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"],
			["Galaxy Nexus (IceCreamSandwich/Chrome)",
				"Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM30B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"],
			["Xoom (IceCreamSandwich)",
				"Mozilla/5.0 (Linux; U; Android 4.0.4; en-us; Xoom Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30"],
			["Xoom (IceCreamSandwich/Chrome)",
				"Mozilla/5.0 (Linux; Android 4.0.4; Xoom Build/IMM76D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19"],
			["Galaxy Nexus (JellyBean)",
				"Mozilla/5.0 (Linux; U; Android 4.1.1; en-us; Galaxy Nexus Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"],
			["Galaxy Nexus (JellyBean/Chrome)",
				"Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"],
			["Xoom (JellyBean)",
				"Mozilla/5.0 (Linux; U; Android 4.1.1; en-us; Xoom Build/JRO03H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30"],
			["Xoom (JellyBean/Chrome)",
				"Mozilla/5.0 (Linux; Android 4.1.1; Xoom Build/JRO03H) AppleWebKit/535.19 (KHTML like Gecko) Chrome/18.0.1025.166 Safari/535.19"],
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
			["iPhone (iOS 6.0)",
				"Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25"],
			["iPod Touch (iOS 6.0)",
				"Mozilla/5.0 (iPod; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25"],
			["iPad (iOS 6.0)",
				"Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25"]
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
		var headerDone = false;
		for (var i = 0; i < details.requestHeaders.length; i++) {
			if (headerDone)break;
			if (details.requestHeaders[i].name == 'User-Agent') {
				var config=JSON.parse(localStorage['config']);
				details.requestHeaders[i].value = (config.preferedUA==-1)?navigator.userAgent:config.UA[config.preferedUA][1];
				headerDone = true;
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
