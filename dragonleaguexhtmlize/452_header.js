chrome.webRequest.onHeadersReceived.addListener(
	function(details){
		var headers=details.responseHeaders;
		for(var i=0;i<headers.length;i++){
			if(headers[i].name.toLowerCase()=='content-type'){
				headers[i].value=headers[i].value.toLowerCase().replace('text/html','application/xhtml+xml');
				break;
			}
		}
		return {responseHeaders: headers};
	},
	{
		urls: ['http://doragon.asobism.co.jp/*'],
		types: ['main_frame','sub_frame']
	},
	['blocking','responseHeaders']
);
