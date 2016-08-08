#!/usr/bin/env ruby -Ku
#coding:utf-8
if RUBY_VERSION < '1.9' then $KCODE='u' end
BOUNDARY="///__BOUNDARY__///\n"

open(ARGV[0],'r+b'){|fout|
	a=fout.read.split(BOUNDARY)
	fout.rewind

	fout.write(a[0]+BOUNDARY+STDIN.read.gsub(BOUNDARY,'')+BOUNDARY+a[2])
	fout.truncate(fout.pos)
}
