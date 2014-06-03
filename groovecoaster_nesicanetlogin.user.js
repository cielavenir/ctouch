// ==UserScript==
// @name        GrooveCoaster nesica.net login
// @namespace   com.cielavenir
// @description member.nesica.netのカード情報ページからグルーブコースターのマイページにログインします
// @include     http://member.nesica.net/member/info/*
// @run-at      document-start
// @version     0.0.0.1
// ==/UserScript==

(function(){
	//member.nesica.netからは取得できないので適切に書き換えておくこと
	var player_name='Ciel';

	document.addEventListener('DOMContentLoaded',function(){
		var card_number=document.querySelector('#mainCont > table > tbody > tr:nth-child(1) > td:nth-child(2)').textContent;
		var cell_inject=document.querySelector('#mainCont > table > tbody > tr:nth-child(1) > td:nth-child(3)');
		cell_inject.textContent='';

		var form=document.createElement('form');
		form.action='https://mypage.groovecoaster.jp/sp/login/auth_con.php';
		form.method='post';
		form.style.margin='0';
		form.style.padding='0';
		var input1=document.createElement('input');
		input1.type='hidden';
		input1.name='nesysCardId';
		input1.value=card_number;
		form.appendChild(input1);
		var input2=document.createElement('input');
		input2.type='hidden';
		input2.name='playerName';
		input2.value=player_name;
		form.appendChild(input2);
		var submit=document.createElement('input');
		submit.type='submit';
		submit.value=player_name+'としてグルコスマイページにログイン';
		form.appendChild(submit);
		cell_inject.appendChild(form);
	},false);
})();
