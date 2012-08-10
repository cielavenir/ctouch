window.onload=function(){
	var config=
/// JSON START ///
	{
		"UA": [
			["IS01 (Donut)",
				"Mozilla/5.0 (Linux; U; Android 1.6; ja-jp; IS01 Build/S7070) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1"],
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
				"Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM30B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"],
			["Xoom (IceCreamSandwich)",
				"Mozilla/5.0 (Linux; U; Android 4.0.4; en-us; Xoom Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30"],
			["Xoom (IceCreamSandwich/Chrome)",
				"Mozilla/5.0 (Linux; Android 4.0.4; Xoom Build/IMM76D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Safari/535.19"],
			["iPhone (iOS 5.1.1)",
				"Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3"],
			["iPod Touch (iOS 5.1.1)",
				"Mozilla/5.0 (iPod; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3"],
			["iPad (iOS 5.1.1)",
				"Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3"]
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
chrome.extension.onRequest.addListener(function(message,sender,sendResponse){
	if(message.action=='getValues'){
		sendResponse({data:localStorage});
	}
});
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
