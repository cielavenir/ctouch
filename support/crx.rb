#!/usr/bin/env ruby
#target.crx target.pem dir...

#based on crxmake under MIT License.
#https://github.com/Constellation/crxmake

require 'openssl'
require 'digest/sha1'
require 'find'
require 'pathname'
require 'base64'

require 'rubygems'
#require 'zipruby'
require 'zip'

#openssl_pkcs8_pure (C) @cielavenir
#https://github.com/cielavenir/openssl_pkcs8_pure
class OpenSSL::PKey::RSA
	# Returns RSA (private) key in PKCS#8 DER format.
	def to_der_pkcs8
		#if public, just use x509 default output
		return to_der if !private?
		OpenSSL::ASN1::Sequence([
			OpenSSL::ASN1::Integer(0),
			OpenSSL::ASN1::Sequence([OpenSSL::ASN1::ObjectId("rsaEncryption"),OpenSSL::ASN1::Null.new(nil)]),
			OpenSSL::ASN1::OctetString(to_der)
		]).to_der
	end
	# Returns RSA (private) key in PKCS#8 PEM format.
	def to_pem_pkcs8
		return to_pem if !private?
		body=RUBY_VERSION<'1.9' ? Base64.encode64(to_der_pkcs8) : Base64.strict_encode64(to_der_pkcs8).chars.each_slice(64).map(&:join).join("\n")+"\n"
		"-----BEGIN PRIVATE KEY-----\n"+body+"-----END PRIVATE KEY-----\n"
	end
end

# thx masover
MAGIC = 'Cr24'

# CERT_PUBLIC_KEY_INFO struct
KEY = %w(30 81 9F 30 0D 06 09 2A 86 48 86 F7 0D 01 01 01 05 00 03 81 8D 00).map{|s| s.hex}.pack('C*')
KEY_SIZE = 1024

def get_relative base, target
	Pathname.new(target.to_s).relative_path_from(Pathname.new(base.to_s)).to_s
end

def run(argv)
	crx=argv.shift
	pkey=argv.shift
	key=nil
	begin
		File.open(pkey,'rb'){|f|
			key=OpenSSL::PKey::RSA.new(f)
		}
	rescue
		key=OpenSSL::PKey::RSA.generate(KEY_SIZE)
		File.open(pkey,'wb'){|f|
			f<<key.to_pem_pkcs8
		}
	end

=begin
	zip_buffer = ''
	Zip::Archive.open_buffer(zip_buffer, Zip::CREATE, Zip::BEST_COMPRESSION){|zipb|
		argv.each{|e|
			Find.find(e){|path|
				if path != e && !File.directory?(path)
					name=get_relative(e, path)
					File.open(path,'rb'){|f|
						zipb.add_buffer(name, f.read)
					}
				end
			}
		}
	}
=end
#=begin
	zip_buffer = (Zip::OutputStream.write_buffer{|zipb|
		argv.each{|e|
			Find.find(e){|path|
				if path != e && !File.directory?(path)
					name=get_relative(e, path)
					File.open(path,'rb'){|f|
						zipb.put_next_entry(name,nil,nil,Zip::Entry::DEFLATED,Zlib::BEST_COMPRESSION)
						zipb.write(f.read)
					}
				end
			}
		}
	}).string
#=end
	sig=key.sign(OpenSSL::Digest::SHA1.new,zip_buffer)

	key = key.public_key.to_der
	if key.index(KEY)!=0 then key=KEY+key end #ruby 1.8 wrap
	File.open(crx,'wb'){|f|
		f << MAGIC
		f << [2].pack('V')
		f << [key.size].pack('V')
		f << [sig.size].pack('V')
		f << key
		f << sig
		f << zip_buffer
	}
end

run(ARGV) if __FILE__==$0
