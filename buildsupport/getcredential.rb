#!/usr/bin/ruby

# https://USER:PASS@code.google.com/p/PROJ/
# https://USER:PASS@PROJ.googlecode.com/hg/

# svn: use "svn info"
# git: .git/config url=
# hg:  .hg/hgrc default=

open(".hg/hgrc","rb"){|f|
	s=f.read
	s=~/:\/\/(\w+):(\w+)@/
	print "-u "+$1+" -w "+$2
}
