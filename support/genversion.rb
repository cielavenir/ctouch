#!/usr/bin/ruby

T=Time.new
V='2.0.0.'+sprintf('%d%02d%02d',T.year%10,T.month,T.day)

#def getver
if __FILE__==$0
	print V
end
