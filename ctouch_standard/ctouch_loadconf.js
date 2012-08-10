chrome.extension.sendRequest({action:'getValues'},function(response){
	for(key in response.data){sessionStorage[key] = response.data[key];}
});
