#!/usr/bin/ruby
#Convert PKCS1 to PKCS8
require 'rubygems'
require 'openssl_pkcs8'
if ARGV.size<1
	$stderr.puts 'ruby pemconvert.rb pem_dir'
	exit
end
Dir.glob(ARGV[0]+'/*.pem').each{|e|
	key=OpenSSL::PKey::RSA.new(File.read(e))
	File.open(e,'wb'){|f|f<<key.to_pem_pkcs8}
}