#!/usr/bin/env ruby
#target.crx target.pem dir...

require 'rubygems'
#require 'zipruby'
require 'zip'
require 'openssl'
require 'find'
require 'pathname'

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

KEY_SIZE = 1024

def get_relative base, target
	Pathname.new(target.to_s).relative_path_from(Pathname.new(base.to_s)).to_s
end

def run(argv)
	crx=argv.shift
	pkey=argv.shift
	keybody=''
	begin
		File.open(pkey,'rb'){|f|
			keybody=f.read
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
						if name=='manifest.json'
							a=f.readlines
							a.map!{|e|
								if e=~/"update_url"/ then e='' end
								e
							}
							zipb.add_buffer(name, a.join)
						else
							zipb.add_buffer(name, f.read)
						end
					}
				end
			}
		}
		zipb.add_buffer('key.pem',keybody)
	}
=end
#=begin
	zip_buffer = (Zip::OutputStream.write_buffer{|zipb|
		argv.each{|e|
			Find.find(e){|path|
				if path != e && !File.directory?(path)
					name=get_relative(e, path)
					File.open(path,'rb'){|f|
						if name=='manifest.json'
							a=f.readlines
							a.map!{|e|
								if e=~/"update_url"/ then e='' end
								e
							}
							zipb.put_next_entry(name,nil,nil,Zip::Entry::DEFLATED,Zlib::BEST_COMPRESSION)
							zipb.write(a.join)
						else
							zipb.put_next_entry(name,nil,nil,Zip::Entry::DEFLATED,Zlib::BEST_COMPRESSION)
							zipb.write(f.read)
						end
					}
				end
			}
		}
		zipb.put_next_entry('key.pem',nil,nil,Zip::Entry::DEFLATED,Zlib::BEST_COMPRESSION)
		zipb.write(keybody)
	}).string
#=end
	File.open(crx,'wb'){|f|
		f << zip_buffer
	}
end

run(ARGV) if __FILE__==$0
