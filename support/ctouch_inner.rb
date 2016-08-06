#!/usr/bin/env ruby -Ku
#coding:utf-8
if RUBY_VERSION < '1.9' then $KCODE='u' end

#usage: ctouch_inner.rb src/ctouch_touch.js > ctouch/ctouch_touch.js
id=ARGV[0].split('/')[1].sub('.','_')
script=''
while s=gets
	s.chomp!
	str=s.strip.gsub('://',':@@').split('//')[0]
	if str
		str=str.strip.gsub(':@@','://') #fixme
		if str!='' #put before //
			script+=str+"\n" #innerText
		end 
	end
end
script=[script].pack('m').gsub("\n",'')

print <<EOM
//generated by ctouch_inner.rb
inject_tag('#{id}','#{script}');
EOM

__END__

#I need to use innerHTML to handle linebreak.
print <<EOM
//generated by ctouch_inner.rb
var s=document.createElement('script');
var innerText=('innerText' in s) ? 'innerText' : 'textContent';
s.type='text/javascript';
s.id='#{id}';
s[innerText]="\\
EOM
while s=gets
	s.chomp!
	#s.gsub!("\"","'")
	s.gsub!("\\","\\\\\\") #umm... wtf?
	str=s.strip.gsub('://',':@@').split('//')[0]
	if str
		str=str.strip.gsub(':@@','://') #fixme
		if str!='' #put before //
			#puts str+"\\n\\" #innerHTML
			puts str+"\\" #innerText
		end 
	end
end

print <<EOM
";
document.documentElement.appendChild(s);
EOM
