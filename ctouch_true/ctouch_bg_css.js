chrome.webRequest.onResponseStarted.addListener(
	function(details){
		var tabId=details.tabId;
		var frameId=details.frameId;
		if(tabId<0||frameId<0)return;

		var ctouch_option=JSON.parse(localStorage['config']);
		if(ctouch_option.preferedUA!=-1){
			chrome.tabs.executeScript(tabId,{file:'ctouch_css.js',frameId:frameId,matchAboutBlank:true,runAt:'document_end'});
		}
	},
	{
		urls: ['<all_urls>'],
		types: ['main_frame','sub_frame']
	}
);
