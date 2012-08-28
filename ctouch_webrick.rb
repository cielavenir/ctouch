#!/usr/bin/ruby
require 'webrick'
require 'base64'
class CTouchDaemon < WEBrick::HTTPServlet::AbstractServlet
	def initialize(server)
		@docroot=server.config[:DocumentRoot]
	end
	def query(f_post,request,response)
		if request.path!='/ctouch_external.cgi'
			response.status = 200
			response['Content-Type'] = 'text/plain'
			response.body = 'Please access via ctouch_external.cgi'
			return
		end
		response.status = 200
		response['Content-Type'] = 'text/plain'
		response['Cache-Control'] = 'no-store, no-cache, must-revalidate'
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

s = WEBrick::HTTPServer.new(:Port => 12380,:DocumentRoot => d+'/bin/ctouch')
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
