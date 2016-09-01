chrome.webRequest.onHeadersReceived.addListener(
	function(details){
		var resp=function(name,value){
			return {responseHeaders:[{name:name,value:value}]};
		}
		var parser = document.createElement('a');
		parser.href=details.url;
		if(
			parser.hostname=='raw.github.com' ||
			parser.hostname=='raw.githubusercontent.com' ||
			(parser.hostname=='gist.github.com'&&parser.pathname.indexOf('/raw/')>=0) ||
			(parser.hostname=='bitbucket.org'&&parser.pathname.indexOf('/raw/')>=0)
		){
			if(parser.pathname.substr(-3)=='.js'){
				return resp('Content-Type','text/javascript');
			};
			if(parser.pathname.substr(-4)=='.css'){
				return resp('Content-Type','text/css');
			};
			if(parser.pathname.substr(-4)=='.htm'){
				return resp('Content-Type','text/html');
			};
			if(parser.pathname.substr(-5)=='.html'){
				return resp('Content-Type','text/html');
			};
		}
	},
	{
		urls: ['<all_urls>'],
		types: ['main_frame','sub_frame','stylesheet','script','image','font','object','xmlhttprequest','ping']
	},
	['blocking']
);

chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details){
		var req=function(name,value){
			return {requestHeaders:[{name:name,value:value}]};
		}
		var parser = document.createElement('a');
		parser.href=details.url;
		if(
			parser.hostname=='raw.github.com' ||
			parser.hostname=='raw.githubusercontent.com' ||
			(parser.hostname=='gist.github.com'&&parser.pathname.indexOf('/raw/')>=0) ||
			(parser.hostname=='bitbucket.org'&&parser.pathname.indexOf('/raw/')>=0)
		){
			if(parser.pathname.substr(-3)=='.js'){
				return req('Accept-Encoding','');
			};
			if(parser.pathname.substr(-4)=='.css'){
				return req('Accept-Encoding','');
			};
			if(parser.pathname.substr(-4)=='.htm'){
				return req('Accept-Encoding','');
			};
			if(parser.pathname.substr(-5)=='.html'){
				return req('Accept-Encoding','');
			};
		}
	},
	{
		urls: ['<all_urls>'],
		types: ['main_frame','sub_frame','stylesheet','script','image','font','object','xmlhttprequest','ping']
	},
	['blocking']
);
