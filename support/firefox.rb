#!/usr/bin/env ruby
### Not completed yet ###

require 'digest'
require 'json'

#KEY and SECRET as String
load File.expand_path('../../pem/firefox_config.rb',__FILE__)

#According to
#http://stackoverflow.com/questions/34608873/how-to-signing-a-firefox-extension
#self-signing is now completely disabled.
#In this file, AMO API signing is described.

def hs256(k,s)
	blksize=64
	if k.size>blksize
		k=Digest::SHA256.digest(k)
	end
	buf=[0]*blksize
	key=k.unpack('C*')
	lkey=key.size

	lkey.times{|i|buf[i]=key[i]^0x36}
	(lkey...blksize).each{|i|buf[i]=0x36}
	s=Digest::SHA256.digest(buf.pack('C*')+s)
	lkey.times{|i|buf[i]=key[i]^0x5c}
	(lkey...blksize).each{|i|buf[i]=0x5c}
	Digest::SHA256.digest(buf.pack('C*')+s)
end

header=['{"alg":"HS256","typ":"JWT"}'].pack('m0')
payload=[JSON.generate({"iss"=>KEY,"jti"=>[*"a".."z"].sample(10).join,"iat"=>Time.now.to_i,"exp"=>Time.now.to_i+300})].pack('m0')

puts [
	header,
	payload,
	[hs256(SECRET,header+'.'+payload)].pack('m0')
]*'.'
