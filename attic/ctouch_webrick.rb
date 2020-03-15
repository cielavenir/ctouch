#!/usr/bin/ruby

#How to generate smaller Windows executable:
#0. install RubyInstaller and install MinGW (for strip)
#1. install Ocra: gem install ocra
#2. strip ruby.exe/dll and libraries:
#   strip C:\path\to\ruby\bin\msvcrt-ruby191.dll C:\path\to\ruby\bin\ruby.exe
#   for /R C:\path\to\ruby\lib\ruby\1.9.1\i386-mingw32 %f in (*.so) do strip %f
#3. kill dependency to libeay.dll with dropping HTTP (Digest) auth.
#   edit C:\path\to\ruby\lib\ruby\1.9.1\webrick.rb to comment-out the line "require 'webrick/httpauth.rb'".
#4. finally pack with: ocra --gem-minimal --no-enc --no-autodll --no-autoload ctouch_webrick.rb

require 'webrick'
require 'base64'
class CTouchDaemon < WEBrick::HTTPServlet::AbstractServlet
	def initialize(server)
		@docroot=server.config[:DocumentRoot]
	end
	def query(f_post,request,response)
		if request.path!='/ctouch_external.cgi'
			response.status = 200
			response['Content-Type'] = 'text/html'
			response.body = '<!DOCTYPE html><head><title>cTouch</title></head><body>Please access via <a href="ctouch_external.cgi">ctouch_external.cgi</body></html>'
			return
		end
		response.status = 200
		response['Content-Type'] = 'application/json'
		response['Cache-Control'] = 'no-store, no-cache, must-revalidate'
		response['Access-Control-Allow-Origin'] = '*'
		response['Pragma'] = 'no-cache'
		response['Expires'] = '0'
		if f_post==true
			open(@docroot+'/ctouch_external.json','wb'){|f|
				f << Base64.decode64(request.body)
			}
			response.body = ''
		else
			open(@docroot+'/ctouch_external.json','rb'){|f|
				response.body = f.read
			}
		end
	end
	def do_GET(request,response) query(false,request,response) end
	def do_POST(request,response) query(true,request,response) end
end

d = File.dirname(__FILE__)
if ENV['OCRA_EXECUTABLE'] then d = File.dirname(ENV['OCRA_EXECUTABLE']) end

s = WEBrick::HTTPServer.new(:Port => 12380,:DocumentRoot => d)
s.mount('/',CTouchDaemon)
begin
trap('INT'){s.shutdown}
trap('BREAK'){s.shutdown}
trap('ABRT'){s.shutdown}
trap('TERM'){s.shutdown}
trap('HUP'){s.shutdown} #in case SSH?
rescue ArgumentError; end

if defined?(Ocra) then exit end
s.start
