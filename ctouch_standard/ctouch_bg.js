window.onload=function(){
if(typeof localStorage["preferedUA"] === "undefined"){
	localStorage["UA1"]="Mozilla/5.0 (Linux; U; Android 1.6; ja-jp; IS01 Build/S7070) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1";
	localStorage["UA2"]="Mozilla/5.0 (Linux; U; Android 2.1; en-us; Nexus One Build/ERD62) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17";
	localStorage["UA3"]="Mozilla/5.0 (Linux; U; Android 2.2.2; en-us; Nexus One Build/FRG83G) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1";
	localStorage["UA4"]="Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; SonyEricssonLT26i Build/6.0.A.3.73) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1";
	localStorage["UA5"]="Mozilla/5.0 (Linux; U; Android 3.2.6; en-us; Xoom Build/HLK75H) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13";
	localStorage["UA6"]="Mozilla/5.0 (Linux; U; Android 4.0.4; en-us; Galaxy Nexus Build/IMM30B) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
	localStorage["UA7"]="Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM30B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19";
	//localStorage["UA8"]="Mozilla/5.0 (Linux; U; Android 4.0.4; en-us; Xoom Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30";
	//localStorage["UA9"]="Mozilla/5.0 (Linux; Android 4.0.4; Xoom Build/IMM76D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Safari/535.19";
	localStorage["UA8"]="Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3";
	localStorage["UA9"]="Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B176 Safari/7534.48.3";

	localStorage["preferedUA"]="0";
	localStorage["enable_imitation"]="yes";
	//localStorage["enable_touch"]="yes";
}
chrome.extension.onRequest.addListener(function(message,sender,sendResponse){
	if(message.action=="getValues"){
		sendResponse({data:localStorage});
	}
});
};

chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details){
		var headerDone = false;
		for (var i = 0; i < details.requestHeaders.length; i++) {
			if (headerDone)break;
			if (details.requestHeaders[i].name == 'User-Agent') {
				details.requestHeaders[i].value = (localStorage["preferedUA"]=="0")?navigator.userAgent:localStorage["UA"+localStorage["preferedUA"]];
				headerDone = true;
			}
		}
		return {requestHeaders: details.requestHeaders};
	},
	{
		urls: ["<all_urls>"],
		types: ["main_frame","sub_frame","stylesheet","script","image","object","xmlhttprequest","other"]
	},
	["blocking", "requestHeaders"]
);
