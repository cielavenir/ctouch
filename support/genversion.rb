#!/usr/bin/ruby

T=Time.new
V="1.6.2."+sprintf("%d%02d%02d",T.year%10,T.month,T.day)

def getver
	print V
end
