#!/usr/bin/env ruby

T=Time.new
V='2.7.0.'+sprintf('%02d%02d%d',T.month,T.day,T.year%10)
#sprintf('%d%02d%02d',T.year%10,T.month,T.day)

#Pokemon-ish scheme is used, thus changed from YMMDD to MMDDY since 2017.
#cf: https://wiki.xn--rckteqa2e.com/wiki/ID

#def getver
if __FILE__==$0
	print V
end
