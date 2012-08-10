#!/usr/bin/ruby
require 'webrick'
s = WEBrick::HTTPServer.new(:Port => 12380,:DocumentRoot => ENV['HOME']+'/bin/ctouch')
begin
trap('INT'){s.shutdown}
trap('BREAK'){s.shutdown}
trap('ABRT'){s.shutdown}
trap('TERM'){s.shutdown}
trap('HUP'){s.shutdown} #in case SSH?
rescue ArgumentError; end
s.start
