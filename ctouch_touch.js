//ctouch_touch: execute anytime
function rec1(o,n,d,e,z){
	var sent=false;
	if(n==o||!n)return false;
	if(n[z]){n[z](e);sent=true;}
	if(rec1(n,n.parentNode,d,e,z)){sent=true;}
	return sent;
}

function rec2(o,x,y,d,e,z){
	var sent=false;
	var n = d.elementFromPoint(x,y); //
	if(n==o||!n)return false;
	if(n[z]){n[z](e);sent=true;}
	var v = n.style.visibility; //
	n.style.visibility = 'hidden'; //
	if(rec2(n,x,y,d,e,z)){sent=true;}
	n.style.visibility=v; //
	return sent;
}

function rec(x,y,d,e,z){
	if(rec1(null,d.elementFromPoint(x,y),d,e,z))return true;
	//if(rec2(null,x,y,d,e,z))return true;
	return false;
}

/** キーボード */
var KEYBOARD = 0;
/** マウス */
var MOUSE = 1;
/** キーボードインターバルフラグ */
var key_repeat_flag = 0;
/** マウスインターバル */
var mouse_repeat_flag = 0;
/** キーイベント保持用 */
var repeatEvent;

/** キーイベント保持用 */
var reMouseEventDown;
/** キーイベント保持用 */
var reMouseEventUp;


/** リピートID */
var repeat_ID = new Array();
/** リピート用のマウスイベント */
var repeatMouse;
/** リピート用のマウスイベント */
var repeatKey;



/**
 * マウスイベントからタッチイベントへ変更
 */
var mouse2touch = function(event)
{
	var eventType = "";
	//docmentからeventの作成
	var docEvent = document.createEvent("Event");
	//イベントタイプの判定
	if(event.type == "mousedown"){//ボタンが押された
		//マウスイベントの偽装
		docEvent = setEvent(event,"touchstart");
		if(!event.shiftKey || !rec(event.clientX,event.clientY,event.target.ownerDocument,docEvent,'ontouchstart'))
		event.target.dispatchEvent(docEvent);//
	}else if(event.type == "mouseup"){//ボタンが放された
		docEvent = setEvent(event,"touchend");
		
		//Alt+ClickでもEnterをリピートさせる
		if(event.altKey){//Altキー押下状態
			//イベントの保持
			repeatEvent = event;
			key_repeat_flag = 1;//リピートフラグを立てる
			startRepeat(KEYBOARD);//リピートの開始
			
		}//あえて抜けない
		if(!event.shiftKey || !rec(event.clientX,event.clientY,event.target.ownerDocument,docEvent,'ontouchend'))
		event.target.dispatchEvent(docEvent);//
	}else if(event.type == "mousemove"){//マウスが動いた
		docEvent = setEvent(event,"touchmove");
		if(!event.shiftKey || !rec(event.clientX,event.clientY,event.target.ownerDocument,docEvent,'ontouchmove'))
		event.target.dispatchEvent(docEvent);//
	}else if(event.type == "keydown"){
		if(key_repeat_flag == 1){//リピート状態のキー押下(Any)
			if(!event.altKey && event.keyIdentifier != "Enter"){//Altキー押下状態でない
				stopRepeat(KEYBOARD);//リピートを止める
				key_repeat_flag = 0;//リピートフラグを下げる
			}
		}else{
			if(event.altKey){//Altキー押下状態
				if(event.keyIdentifier == "Enter"){
					//イベントの保持
					repeatEvent = event;
					key_repeat_flag = 1;//リピートフラグを立てる
					startRepeat(KEYBOARD);//リピートの開始
					
				}
			}else{//Altキー押されていない
			}
		}
	}else{
		return;//処理を抜ける
	}
	
	
	//作成中
//	
//	if(event.type == "mousedown"){//ボタンが押された
//		if(event.altKey){//Altキー押下状態なら
//			reMouseEventDown = event;//ドキュメントイベントを保持する
//		}
//	}else if(event.type == "mouseup"){//ボタンが放された
//		if(event.altKey){//Altキー押下状態
//			//ドキュメントイベントを保持する
//			reMouseEventUp = event;
//			//リピートの開始
//			startRepeat(MOUSE);
//			//リピートフラグを立てる
//			mouse_repeat_flag = 1;
//		}
//	}
}


/**
 * マウスイベントとタッチイベントのすり替えを行う
 */
function setEvent(event,type){
	var e = document.createEvent("Event");
	//イベントの設定
	e.initEvent(type,true,true);
	//イベント座標の受け渡し
	e.screenX = event.screenX;
	e.screenY = event.screenY;
	e.pageX = event.pageX;
	e.pageY = event.pageY;
	e.clientX = event.clientX;
	e.clientY = event.clientY;
	//タッチイベントの初期化
	e.touches = new Array();
	e.touches[0] = {
		screenX: event.screenX,
		screenY: event.screenY,
		pageX: event.pageX,
		pageY: event.pageY,
		clientX: event.clientX,
		clientY: event.clientY
	};
	return(e);
}




/** リピートの開始 */
function startRepeat(ID){
	if(ID == MOUSE){
		//０．１秒毎に呼ばれる
		repeat_ID[ID] = setInterval("mouseRepeatDOWN()",100);
		repeat_ID[ID+1] = setInterval("mouseRepeatUP()",100);
	}else if(ID == KEYBOARD){
		//０．１秒毎に呼ばれる
		repeat_ID[ID] = setInterval("keyRepeat()",100);
	}
	
}
/** リピートの停止 */
function stopRepeat(ID){
	clearInterval(repeat_ID[ID]);
	if(ID == MOUSE){
		clearInterval(repeat_ID[ID+1]);
	}
}
/** リピート本体 */
function keyRepeat(){
	//Enter押下を擬似的に発生させる
	
	//Chromeの仕様というかDOMの仕様を理解していないので
	//ネットのソース丸コピ
	//参考サイト
	//http://groups.google.com/group/chrome-api-developers-jp/browse_thread/thread/9d9816fdceb576fb?fwc=1
	
	//KeyboardEventの作成
	var e = document.createEvent('KeyboardEvent');
	//入力パラメータの作成
	var o = { 
			type:'keydown',
			canBubble: true,
			cancelable: true,
			view: window, 
			keyIdentifier: 'Enter',
			keyLocation: 0,
			ctrlKey: false,
			shiftKey: 
			false,
			altKey: false,
			metaKey: false,
			altGraphKey: 
			false
		};
	//キーボードイベントを作成する
	e.initKeyboardEvent(o.type, o.canBubble, o.cancelable, o.view,o.keyIdentifier, o.keyLocation, o.ctrlKey, o.shiftKey, o.altKey,o.metaKey, o.altGraphKey);document.dispatchEvent(e); 
}
/** マウスリピート本体 */
function mouseRepeatDOWN(){
	
	//作成中
//	var e = document.createEvent("Event");
//	//イベントの設定
//	e.initEvent("touchstart",true,true);
//	//イベント座標の受け渡し
//	e.screenX = event.screenX;
//	e.screenY = event.screenY;
//	e.pageX = event.pageX;
//	e.pageY = event.pageY;
//	e.clientX = event.clientX;
//	e.clientY = event.clientY;
//	//タッチイベントの初期化
//	e.touches = new Array();
//	e.touches[0] = {
//		screenX: event.screenX,
//		screenY: event.screenY,
//		pageX: event.pageX,
//		pageY: event.pageY,
//		clientX: event.clientX,
//		clientY: event.clientY
//	};
//	
	
}


/** マウスリピート本体 */
function mouseRepeatUP(){
	//作成中
//	event.target.dispatchEvent(reMouseEventDown);//Downイベント
//	event.target.dispatchEvent(reMouseEventUp);//Upイベント
//	event = reMouseEventUp;
}











//イベントリスナーのセット
document.addEventListener("mousedown",mouse2touch,false);
document.addEventListener("mouseup",mouse2touch,false);
document.addEventListener("mousemove",mouse2touch,false);
document.addEventListener("keydown",mouse2touch,false);




var myself = document.getElementById('ctouch_touch_js');
if(myself)myself.parentNode.removeChild(myself);
