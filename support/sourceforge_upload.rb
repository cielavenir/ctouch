#!/usr/bin/env ruby
if ARGV.size<2
	puts 'ruby sourceforge_upload.rb VERSION files...'
	exit
end
VERSION=ARGV.shift
Dir.chdir('bin')
system(%Q(rsync "#{ARGV.map{|e|File.basename(e)}.join('" "')}" cielavenir,ctouch@web.sourceforge.net:frs/#{VERSION}/))