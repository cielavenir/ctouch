#!/usr/bin/ruby
#target.crx target.pem dir...

require 'rubygems'
#require 'zipruby'
require 'zip/zip'
require 'openssl'
require 'find'
require 'pathname'

begin
	require 'openssl_pkcs8'
	class OpenSSL::PKey::RSA
		alias_method :to_pem, :to_pem_pkcs8
	end
rescue LoadError
	$pkcs8_warning=1
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
		open(pkey,'rb'){|f|
			keybody=f.read
		}
	rescue
		if defined?($pkcs8_warning)
			$stderr.puts 'Warn: generated pem must be converted into PKCS8 in order to upload to Chrome WebStore.'
			$stderr.puts 'To suppress this message, do: gem install openssl_pkcs8'
		end
		key=OpenSSL::PKey::RSA.generate(KEY_SIZE)
		open(pkey,'wb'){|f|
			f<<key.to_pem
		}
	end

=begin
	zip_buffer = ''
	Zip::Archive.open_buffer(zip_buffer, Zip::CREATE, Zip::BEST_COMPRESSION){|zipb|
		argv.each{|e|
			Find.find(e){|path|
				if path != e && !File.directory?(path)
					name=get_relative(e, path)
					open(path,'rb'){|f|
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
	zip_buffer = (Zip::ZipOutputStream.write_buffer{|zipb|
		argv.each{|e|
			Find.find(e){|path|
				if path != e && !File.directory?(path)
					name=get_relative(e, path)
					open(path,'rb'){|f|
						if name=='manifest.json'
							a=f.readlines
							a.map!{|e|
								if e=~/"update_url"/ then e='' end
								e
							}
							zipb.put_next_entry(name,nil,nil,Zip::ZipEntry::DEFLATED,Zlib::BEST_COMPRESSION)
							zipb.write(a.join)
						else
							zipb.put_next_entry(name,nil,nil,Zip::ZipEntry::DEFLATED,Zlib::BEST_COMPRESSION)
							zipb.write(f.read)
						end
					}
				end
			}
		}
		zipb.put_next_entry('key.pem',nil,nil,Zip::ZipEntry::DEFLATED,Zlib::BEST_COMPRESSION)
		zipb.write(keybody)
	}).string

	File.open(crx,'wb'){|f|
        f << zip_buffer
	}
end

run(ARGV) if __FILE__==$0
