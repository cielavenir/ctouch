chrome.webRequest.onHeadersReceived.addListener(
	function(details){
	console.log(details);
		var headers=details.responseHeaders;
		for(var i=0;i<headers.length;i++){
			if(headers[i].name.toLowerCase()=='content-disposition'){
				if(headers[i].value.indexOf('attachment')==0){
					headers.splice(i,1);
					//headers[i].value='inline';
				}
				break;
			}
		}
		for(var j=0;j<headers.length;j++){
			if(headers[j].name.toLowerCase()=='content-type'){
				if(headers[j].value=='application/octet-stream'||headers[j].value=='application/x-download'){
					headers[j].value='text/plain'; //I hope Chrome is wise enough
				}
				break;
			}
		}
		return {responseHeaders: headers};
	},
	{
		urls: ['<all_urls>'],
		types: ['main_frame','sub_frame']//,'stylesheet','script','image','object','xmlhttprequest','other']
	},
	['blocking', 'responseHeaders']
);
