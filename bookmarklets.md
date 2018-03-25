## bookmarklets

- `pbpaste | ruby -ruri -e 'puts "javascript:"+URI.encode(gets.chomp,/[^#{URI::PATTERN::UNRESERVED}]/).gsub("(","%28").gsub(")","%29").gsub(0x27.chr,"%27")'`

### Open with UT SSL-VPN Gateway

- `(function(){var _parser_=document.createElement('a'),_parser_.href=location.href,location.href='https://gateway.itc.u-tokyo.ac.jp'+_parser_.pathname+',DanaInfo='+_parser_.hostname;})();`
- [Open with UT SSL-VPN Gateway](javascript:%28function%28%29%7Bvar%20_parser_%3Ddocument.createElement%28%27a%27%29%2C_parser_.href%3Dlocation.href%2Clocation.href%3D%27https%3A%2F%2Fgateway.itc.u-tokyo.ac.jp%27%2B_parser_.pathname%2B%27%2CDanaInfo%3D%27%2B_parser_.hostname%3B%7D%29%28%29%3B)

### Open with niconico au

- `(function(){if(location.href.indexOf('www.nicovideo.')>=0)location.href=location.href.replace('www.','ausp.');})();`
- [Open with niconico au](javascript:%28function%28%29%7Bif%28location.href.indexOf%28%27www.nicovideo.%27%29%3E%3D0%29location.href%3Dlocation.href.replace%28%27www.%27%2C%27ausp.%27%29%3B%7D%29%28%29%3B)

### CHUNITHM更新

- `(function(){var registered=window.confirm('チュウニズムスコアツールへスコアを登録します。ログイン状態でないならキャンセルして下さい(ログインページに遷移します)');if(!registered){location.href="http://www.ginjake.net/score_update/users/login";}else{var script=document.createElement('script');script.src="https://gist.githack.com/cielavenir/713658ee499470b38067/raw/chunithm.js";document.documentElement.appendChild(script);}})();`
- [CHUNITHM更新](javascript:%28function%28%29%7Bvar%20registered%3Dwindow.confirm%28%27%E3%83%81%E3%83%A5%E3%82%A6%E3%83%8B%E3%82%BA%E3%83%A0%E3%82%B9%E3%82%B3%E3%82%A2%E3%83%84%E3%83%BC%E3%83%AB%E3%81%B8%E3%82%B9%E3%82%B3%E3%82%A2%E3%82%92%E7%99%BB%E9%8C%B2%E3%81%97%E3%81%BE%E3%81%99%E3%80%82%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E7%8A%B6%E6%85%8B%E3%81%A7%E3%81%AA%E3%81%84%E3%81%AA%E3%82%89%E3%82%AD%E3%83%A3%E3%83%B3%E3%82%BB%E3%83%AB%E3%81%97%E3%81%A6%E4%B8%8B%E3%81%95%E3%81%84%28%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AB%E9%81%B7%E7%A7%BB%E3%81%97%E3%81%BE%E3%81%99%29%27%29%3Bif%28!registered%29%7Blocation.href%3D%22http%3A%2F%2Fwww.ginjake.net%2Fscore_update%2Fusers%2Flogin%22%3B%7Delse%7Bvar%20script%3Ddocument.createElement%28%27script%27%29%3Bscript.src%3D%22https%3A%2F%2Fgist.githack.com%2Fcielavenir%2F713658ee499470b38067%2Fraw%2Fchunithm.js%22%3Bdocument.documentElement.appendChild%28script%29%3B%7D%7D%29%28%29%3B)
- cf: https://gist.github.com/cielavenir/713658ee499470b38067

### chuniviewer_rm_BASADV

- 更新履歴が長くなって30譜面に収まらなくなった時用です
- `(function(){var canPost=function(){return%20$('.update_diff_score').length<=30;};for(var diff=$('.update_diff_score'),i=diff.length-1;i>=0;i--){var difficulty=diff[i].children[0].children[0].children[0].textContent;if(difficulty=='BAS'||difficulty=='ADV')diff[i].remove();}})();`
- [chuniviewer_rm_BASADV](javascript:%28function%28%29%7Bvar%20canPost%3Dfunction%28%29%7Breturn%2520%24%28%27.update_diff_score%27%29.length%3C%3D30%3B%7D%3Bfor%28var%20diff%3D%24%28%27.update_diff_score%27%29%2Ci%3Ddiff.length-1%3Bi%3E%3D0%3Bi--%29%7Bvar%20difficulty%3Ddiff%5Bi%5D.children%5B0%5D.children%5B0%5D.children%5B0%5D.textContent%3Bif%28difficulty%3D%3D%27BAS%27%7C%7Cdifficulty%3D%3D%27ADV%27%29diff%5Bi%5D.remove%28%29%3B%7D%7D%29%28%29%3B)

