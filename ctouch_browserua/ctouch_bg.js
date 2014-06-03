//will work only if --user-agent is used. changing from Developer Tool won't work.
chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details){
		var headers=details.requestHeaders;
				if(navigator.userAgent.indexOf('Chrome')==-1&&navigator.userAgent.indexOf('CrMo')==-1)
					for(var j = 0; j < headers.length; j++){
						if(headers[j].name == 'Accept-Encoding'){
							var a=headers[j].value.replace(/ /g,'').split(',');
							for(var k = a.length-1; k >= 0; k--)if(a[k].substr(0,4) == 'sdch')a.splice(k,1);
							headers[j].value = a.join(',');
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
