exports.conf = {
	
	logs: [{
		name : "nginx_server_1",
		log_file : "/var/log/nginx/access.log",
		
		log_format : '({remote_addr}[^ ]+) [-] ({remote_user}[^ ]+) \\[({time_local}[^\\]]+)\\] "({request}[^"]+)" ({status}[0-9]+) ({body_bytes_sent}[0-9]+) "({http_referer}[^"]+)" "({http_user_agent}[^"]+)" "({http_x_forwarded_for}[^"]+)"'
		
	}],
	
	globals : {	
		streams : {
			"mongo.js" : {
				host : "localhost",
				port : 27017,
				auth : false,
				user : "",
				pass : ""
			}
		}
	}
}

