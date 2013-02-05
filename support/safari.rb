#!/usr/bin/ruby
#target.crx target.pem dir...

XAR=ENV['HOME']+'/bin/xar'

=begin
#SIGLEN=`</dev/null openssl dgst -sign pem/ctouch_safari.pem -binary | wc -c`
SIGLEN=256
~/bin/xar -cf bin/ctouch.safariextz ctouch.safariextension/
~/bin/xar --sign -f bin/ctouch.safariextz --data-to-sign sha1_hash.dat --sig-size $SIGLEN --cert-loc pem/ctouch_safari.der --cert-loc certs/appleca --cert-loc certs/rootca
(echo "3021300906052B0E03021A05000414" | xxd -r -p; cat sha1_hash.dat) |openssl rsautl -sign -inkey pem/ctouch_safari.pem > signature.dat
~/bin/xar --inject-sig signature.dat -f bin/ctouch.safariextz
rm -f sha1_hash.dat signature.dat
=end

require 'openssl'
require 'digest/sha1'
require 'open3'
require 'tempfile'

KEY = %w(30 21 30 09 06 05 2B 0E 03 02 1A 05 00 04 14).map{|s| s.hex}.pack('C*')

def run(argv)
	name=argv.shift
	pkey=argv.shift
	pder=argv.shift
	key=''
	begin
		open(pkey,'rb'){|f|
			key=OpenSSL::PKey::RSA.new(f)
		}
	rescue
		STDERR.puts pkey+' not found.'
		STDERR.puts 'Generated key will not be accepted by Safari.'
		STDERR.puts 'If you have not, you need to register Safari Development Program, which is free.'
		exit 1
	end
	siglen=key.sign(OpenSSL::Digest::SHA1.new,'').size

	system(%Q("#{XAR}" -cf "bin/#{name}.safariextz" --compression=gzip --distribution "#{name}.safariextension/"))

	#I'd like perform this kind of signature handling without using exe...
	sha1=''
	file = Tempfile.new('sha1')
	file.close
	system(%Q("#{XAR}" --sign -f "bin/#{name}.safariextz" --data-to-sign "#{file.path}" --sig-size #{siglen} --cert-loc #{pder} --cert-loc certs/appleca --cert-loc certs/rootca))
	file.open
	sha1=file.read
	file.close!
	#Open3.popen3(%Q("#{XAR}" --sign -f "bin/#{name}.safariextz" --data-to-sign /dev/stderr --sig-size #{siglen} --cert-loc #{pder} --cert-loc certs/appleca --cert-loc certs/rootca)){|stdin,stdout,stderr|
	#	sha1=stderr.read
	#}
	signature=key.private_encrypt(KEY+sha1)

	file = Tempfile.new('sign')
	begin
		file.write(signature)
		file.close
		system(%Q("#{XAR}" --inject-sig "#{file.path}" -f "bin/#{name}.safariextz"))
	ensure
		file.close!
	end
	#Open3.popen3(%Q("#{XAR}" --inject-sig /dev/stdin -f ctouch.safariextz)){|stdin,stdout,stderr|
	#	stdin.write(signature)
	#	stdin.close
	#}

=begin
	open(argv.shift,'rb'){|f|
		certs.push(OpenSSL::X509::Certificate.new(f))
	}
=end

end

run(ARGV) if __FILE__==$0
