chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details){
		var headerDone = false;
		for (var i = 0; i < details.requestHeaders.length; i++) {
			if (headerDone)break;
			if (details.requestHeaders[i].name == 'User-Agent') {
				details.requestHeaders[i].value = 'Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; SonyEricssonLT26i Build/6.0.A.3.73) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';
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

chrome.webRequest.onBeforeRequest.addListener(
	function(details){
		var url=details.url;
		var reel02_url='http://aimg.gree.jp/js/reel/Reel.js';
		var reel05_url='http://aimg.gree.jp/js/reel/Reel-0.5.js';
		var reel_url='http://aimg.gree.jp/js/reel/Reel-1.2.js';
		if(url!=reel_url&&(
			//url.substr(0,32)==reel_url.substr(0,32) ||
			url==reel02_url ||
			url==reel05_url
		))return {redirectUrl: reel_url};
	},
	{
		urls: ['<all_urls>'],
		types: ['main_frame','sub_frame','stylesheet','script','image','object','xmlhttprequest','other']
	},
	['blocking']
);
