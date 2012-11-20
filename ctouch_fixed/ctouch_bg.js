chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details){
		//var headerDone = false;
		for(var i = 0; i < details.requestHeaders.length; i++){
			//if(headerDone)break;
			if(details.requestHeaders[i].name == 'User-Agent'){
				var config=JSON.parse(localStorage['config']);
				details.requestHeaders[i].value = 'Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; Nexus S Build/GWK74) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';
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
