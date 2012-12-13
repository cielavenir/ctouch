chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details){
		var headers=details.requestHeaders;
		for(var i=0;i<headers.length;i++){
			if(headers[i].name=='User-Agent'){
				var config=JSON.parse(localStorage['config']);
				headers[i].value='Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; Nexus S Build/GWK74) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';
				if(headers[i].value.indexOf('Chrome')==-1&&headers[i].value.indexOf('CrMo')==-1){
					for(var j=0;j<headers.length;j++){
						if(headers[j].name == 'Accept-Encoding'){
							var a=headers[j].value.replace(/ /g,'').split(',');
							for(var k=a.length-1;k>=0;k--)if(a[k].substr(0,4)=='sdch')a.splice(k,1);
							headers[j].value = a.join(',');
							break;
						}
					}
				}
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
