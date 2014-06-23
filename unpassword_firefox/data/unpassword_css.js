var input=document.getElementsByTagName('input');
if(input)for(var i=0;i<input.length;i++)
	if(input[i].type.toLowerCase()=='password')input[i].type='text';