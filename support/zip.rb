#!/usr/bin/ruby
#target.crx target.pem dir...

require 'rubygems'
require 'zipruby'
require 'openssl'
require 'find'
require 'pathname'

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
		key=OpenSSL::PKey::RSA.generate(KEY_SIZE)
		open(pkey,'wb'){|f|
			keybody=key.export()
			f<<keybody
		}
	end

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

	File.open(crx,'wb'){|f|
        f << zip_buffer
	}
end

run(ARGV)
