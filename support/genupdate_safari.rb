#!/usr/bin/env ruby

DOMAIN='com.cielavenir'
DEVID='ZMS86BA3S8'

require 'pathname'
class String
	def realpath() return Pathname(self).realpath.to_s end
	def dirname() return Pathname(self).dirname.to_s end
end
require File.expand_path(__FILE__.realpath.dirname+'/genversion.rb')

print <<EOM
<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE plist PUBLIC '-//Apple//DTD PLIST 1.0//EN' 'http://www.apple.com/DTDs/PropertyList-1.0.dtd'>
<plist version='1.0'>
<dict>
<key>Extension Updates</key>
<array>
EOM

['ctouch'].each{|e|
	print <<EOM
	<dict>
		<key>CFBundleIdentifier</key>
		<string>#{DOMAIN}.#{e}</string>
		<key>Developer Identifier</key>
		<string>#{DEVID}</string>
		<key>CFBundleVersion</key>
		<string>#{V}</string>
		<key>CFBundleShortVersionString</key>
		<string>#{V}</string>
		<key>URL</key>
		<string>http://master.dl.sourceforge.net/project/ctouch/#{V}/#{e}.safariextz</string>
	</dict>
EOM
}

print <<EOM
</array>
</dict>
</plist>
EOM

__END__
https://ctouch.googlecode.com/files/#{e}-#{V}.safariextz
http://master.dl.sourceforge.net/project/ctouch/#{V}/#{e}.safariextz
