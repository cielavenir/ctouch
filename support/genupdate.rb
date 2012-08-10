#!/usr/bin/ruby

require 'openssl'
require 'digest/sha2'

require 'pathname'
class String
	def realpath() return Pathname(self).realpath.to_s end
	def dirname() return Pathname(self).dirname.to_s end
end
require File.expand_path(__FILE__.realpath.dirname+'/genversion.rb')

KEY = %w(30 81 9F 30 0D 06 09 2A 86 48 86 F7 0D 01 01 01 05 00 03 81 8D 00).map{ |s| s.hex }.pack('C*')

# http://supercollider.dk/2010/01/calculating-chrome-extension-id-from-your-private-key-233
def pkey_to_id(pkey)
	key=''
	open(pkey+'.pem','rb'){|f|
		key=OpenSSL::PKey::RSA.new(f)
	}
	key = key.public_key.to_der
	if key.index(KEY)!=0 then key=KEY+key end #ruby 1.8 wrap

	hash = Digest::SHA256.hexdigest(key)[0...32]
	# Shift hex from 0-9a-f to a-p
	return hash.unpack('C*').map{ |c| c < 97 ? c + 49 : c + 10 }.pack('C*')
end

print <<EOM
<?xml version='1.0' encoding='UTF-8'?>
<gupdate xmlns='http://www.google.com/update2/response' protocol='2.0'>
EOM

['ctouch_standard','ctouch_fixed','ctouch_external','ctouch_browserua'].each{|e|
	puts "<app appid='#{pkey_to_id(e)}'><updatecheck codebase='https://ctouch.googlecode.com/files/#{e}-#{V}.crx' version='#{V}'/></app>"
}

print <<EOM
</gupdate>
EOM
