var pageMod = require('sdk/page-mod');
var self = require('sdk/self');
var menuitems = require('menuitems');

menuitems.Menuitem({
	id: 'unpassword',
	menuid: 'menu_ToolsPopup',
	label: 'Unpassword',
	onCommand: function() {
		require('sdk/tabs').activeTab.attach({
			contentScriptFile: self.data.url('unpassword_css.js')
		});
	},
	insertbefore: 'menu_pageInfo'
});