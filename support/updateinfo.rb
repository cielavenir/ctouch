#!/usr/bin/env ruby

require 'pathname'
class String
	def realpath() return Pathname(self).realpath.to_s end
	def dirname() return Pathname(self).dirname.to_s end
end
require File.expand_path(__FILE__.realpath.dirname+'/genversion.rb')

a=[]
File.open(ARGV[0],'rb'){|f|
	a=f.readlines
}

a.map!{|e|
	if e=~/CFBundle.*Version/ then e.sub!(/[0-9.]+/,V) end
	e
}

File.open(ARGV[0],'wb'){|f|
	f.puts a.join
}
