#!/usr/bin/ruby -Ku
#coding:utf-8
if RUBY_VERSION < '1.9.0' then $KCODE='u' end
BOUNDARY="///__BOUNDARY__///\n"

open(ARGV[0],'r+b'){|fout|
	a=fout.read.split(BOUNDARY)
	fout.rewind
	open(ARGV[1],'rb'){|fin|
		fout.write(a[0]+BOUNDARY+fin.read+BOUNDARY+a[2])
		fout.truncate(fout.pos)
	}
}
