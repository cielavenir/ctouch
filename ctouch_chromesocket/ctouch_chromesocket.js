// cTouch external daemon based on:
// https://github.com/KensakuKOMATSU/chrome-httpserver/blob/master/httpserver.js

function t2ab(str /* String */) {
    var buffer = new ArrayBuffer(str.length);
    var view = new DataView(buffer);
    for(var i = 0, l = str.length; i < l; i++) {
      view.setInt8(i, str.charAt(i).charCodeAt());
    }
    return buffer;
}

function ab2t(buffer /* ArrayBuffer */) {
  var arr = new Int8Array(buffer);
  var str = "";
  for(var i = 0, l = arr.length; i < l; i++) {
    str += String.fromCharCode.call(this, arr[i]);
  }
  return str;
}

var RESPHEAD = [
  "HTTP/1.1 200 OK",
  "Content-Length: {%len%}",
  "Connection: Close",
  "Content-Type: application/json"
].join("\r\n")+"\r\n\r\n";

var response = function(str){
  var len = str.length;
  return RESPHEAD.replace("{%len%}",str.length)+str;
}

//actual code
var rtw = function(sockid){
	chrome.socket.read(sockid, 65535, function(e){
		if(e.resultCode < 0){chrome.socket.destroy(sockid);return;}
		var str=ab2t(e.data);
		var headers=str.split('\n');
		var method=headers[0].split(' ')[0];
		if(method.toLowerCase()=='post'){
			var json=atob(headers.pop());
			chrome.storage.local.set({'config':json},function(e){
				chrome.socket.write(sockid, t2ab(response(json)), function(e){});
			});
		}else{
			chrome.storage.local.get('config',function(e){
				chrome.socket.write(sockid, t2ab(response(e.config)), function(e){});
			});
		}
		//rtw(sid);
	});
}

chrome.socket.create('tcp', {}, function(e){
	var sock = e;
	chrome.socket.listen(sock.socketId, "0.0.0.0", 12380, 10, function(e){
		var accept_ = function(sockid){
			chrome.socket.accept(sockid, function(e){
				rtw(e.socketId);
				accept_(sock.socketId);
			});
		}
		accept_(sock.socketId);
	});
});

window.onload=function(){
	chrome.storage.local.get('config',function(e){
		if(typeof e === 'undefined')chrome.storage.local.set({'config':'{}'});
	});
};
