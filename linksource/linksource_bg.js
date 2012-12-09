chrome.contextMenus.onClicked.addListener(function(info,tab){
	window.open('view-source:'+info.linkUrl);
});
chrome.contextMenus.create({
	'title': 'Open link with view-source',
	'contexts': ['link'],
	'id': 'linksourceContextMenu',
});
