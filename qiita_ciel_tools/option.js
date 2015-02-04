var initialize=function(){
	var lst=['source','toppage_search','userpage_search'];
	var config=JSON.parse(localStorage['config']);
	var table=document.getElementById('opt');
	var i;
	while(table.children.length>0)table.removeChild(table.children[0]);
	for(var i=0;i<lst.length;i++){
		var tr=document.createElement('tr');
		var td,input;
		td=document.createElement('td');
		td.textContent=lst[i];
		tr.appendChild(td);
		td=document.createElement('td');
			input=document.createElement('input');
			input.type='checkbox';
			input.name=lst[i];
			if(config[lst[i]])input.checked=true;
			td.appendChild(input);
		tr.appendChild(td);
		table.appendChild(tr);
	}
};

window.onload=function(){
	initialize();

	document.getElementById('SAVE').onclick=function(){
		var config=JSON.parse(localStorage['config']);
		var table=document.getElementById('opt');
		for(var i=0;i<table.children.length;i++){
			config[table.children[i].children[0].textContent]=table.children[i].children[1].children[0].checked;
		}
		if(config.preferedUA>=table.children.length)config.preferedUA=-1;
		localStorage['config']=JSON.stringify(config,null,' ');
		initialize();
	};

	document.getElementById('RESET').onclick=function(){
		if(!window.confirm('Are you sure to reset?'))return;
		localStorage['config']=localStorage['config_default'];
		initialize();
	};
};