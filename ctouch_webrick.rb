#!/usr/bin/ruby
require 'webrick'
s = WEBrick::HTTPServer.new(:Port => 12380,:DocumentRoot => ENV["HOME"]+"/bin/ctouch")
trap("INT"){s.shutdown}
s.start
