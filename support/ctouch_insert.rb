#!/usr/bin/ruby -Ku
#coding:utf-8
if RUBY_VERSION < '1.9.0' then $KCODE='u' end
BOUNDERY="///__BOUNDERY__///\n"

open(ARGV[0],'r+b'){|fout|
	a=fout.read.split(BOUNDERY)
	fout.rewind
	open(ARGV[1],'rb'){|fin|
		fout.write(a[0]+BOUNDERY+fin.read+BOUNDERY+a[2])
		fout.truncate(fout.pos)
	}
}