#!/usr/bin/env ruby

#this won't work if update_url is specified. lol...
open(ARGV[0],'rb'){|fin|
	size=fin.size
	fin.sysread(8)
	key_size=fin.sysread(4).unpack('V')[0]
	sig_size=fin.sysread(4).unpack('V')[0]
	fin.sysread(key_size+sig_size)
	open(ARGV[1],'wb'){|fout|
		fout << fin.sysread(size-fin.pos)
	}
}
