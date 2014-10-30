var writeFile=function(file, data){
	window.webkitStorageInfo.requestQuota(PERSISTENT,1024*1024,function(grantedBytes){
		window.webkitRequestFileSystem(PERSISTENT,grantedBytes,function(fs){
			fs.root.getFile(file, {create: true}, function(fileEntry){
				fileEntry.createWriter(function(fileWriter){
					fileWriter.onwriteend=function(e){
						fileWriter.onwriteend=null;
						var blob = new Blob([data], {type: 'application/json'});
						fileWriter.write(blob);
					}
					fileWriter.truncate(0);
				});
			});
		});
	});
};
var saveConfig=function(json){
	writeFile('ctouch_filesystem.json',json);
	return true;
};
