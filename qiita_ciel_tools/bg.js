window.onload=function(){
	var config=
{
	"config_version": 1,
	"source": true,
	"toppage_search": true,
	"userpage_search": true
}

	if(typeof localStorage['config'] === 'undefined' || localStorage['config'] == ''){
		localStorage['config']=JSON.stringify(config,null,' ');
		saveConfig();
	}
	var current_config=JSON.parse(localStorage['config']);
	if((current_config.config_version||0) < config.config_version){
		current_config.config_version=config.config_version;
		if(typeof current_config.source === 'undefined')current_config.source=true;
		if(typeof current_config.toppage_search === 'undefined')current_config.toppage_search=true;
		if(typeof current_config.userpage_search === 'undefined')current_config.userpage_search=true;
		localStorage['config']=JSON.stringify(current_config,null,' ');
	}
	localStorage['config_default']=JSON.stringify(config,null,' ');
};

chrome.runtime.onMessage.addListener(function(req,sender,sendres){
	var config=JSON.parse(localStorage['config']);
	sendres({result:config[req['tool']]});
});