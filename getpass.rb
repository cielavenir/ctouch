#!/usr/bin/ruby

#https://USER:PASS@code.google.com/p/PROJ/
open(".hg/hgrc","rb"){|f|
	s=f.read
	s=~/:(\w+)@/
	print $1
}
