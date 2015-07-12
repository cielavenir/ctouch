chrome.webRequest.onBeforeRequest.addListener(
	function(details){
		var a=details.url.split('/');
		if(a.length<=4 || a[4].indexOf('.')==-1){
			//It looks like redo.me.uk is accessed using "normal" way.
			return {};
		}else{
			return {redirectUrl: 'http://'+a.slice(4).join('/')};
		}
	},
	{
		urls: ['*://redo.me.uk/*'],
		types: ['main_frame','sub_frame']
	},
	['blocking']
);
