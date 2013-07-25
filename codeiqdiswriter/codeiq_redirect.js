chrome.webRequest.onBeforeRequest.addListener(
	function(details){
		return {redirectUrl: details.url.replace('scope=user','scope=user:email')};
	},
	{
		urls: ['https://github.com/login/oauth/authorize?client_id=9f04cf6862b4a8cfe07e&redirect_uri=https%3A%2F%2Fcodeiq.jp%2Flogin_gh.php&scope=user'],
		types: ['main_frame','sub_frame']
	},
	['blocking']
);
