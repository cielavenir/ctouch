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
