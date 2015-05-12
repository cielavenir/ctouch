#!/usr/bin/env ruby

# https://USER:PASS@code.google.com/p/PROJ/
# https://USER:PASS@PROJ.googlecode.com/hg/

# svn: use "svn info"
# git: .git/config url=
# hg:  .hg/hgrc default=

File.open('.git/config','rb'){|f|
	s=f.read
	if s=~/:\/\/(\w+):(\w+)@/
		if ARGV[0]=='-googlecode'
			print '-u '+$1+' -w '+$2
		else
			print $1+':'+$2
		end
	else
		#perhaps ssh
	end
}
