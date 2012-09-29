chrome.browserAction.onClicked.addListener(function(tab){
	chrome.tabs.sendRequest(tab.id,{});
});
