chrome.webRequest.onBeforeRequest.addListener(
	function(details){
		var url=details.url;
		var reel_url='http://aimg.gree.jp/js/reel/Reel-1.2.js';
		if(url!=reel_url&&url.substr(0,32)==reel_url.substr(0,32))return {redirectUrl: reel_url};
	},
	{
		urls: ['<all_urls>'],
		types: ['main_frame','sub_frame','stylesheet','script','image','object','xmlhttprequest','other']
	},
	['blocking']
);
