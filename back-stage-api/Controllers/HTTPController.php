<?php 
/**
 * 
 */
class HTTPController
{
	
	function __construct($argument)
	{
		# code...
	}
	function index(){
		$HTTP=array(
			"header()"=>"向客户端发送原始的 HTTP 报头。",
			"headers_list()"=>"返回已发送的（或待发送的）响应头部的一个列表。",
			"headers_sent()"=>"检查 HTTP 报头是否发送/已发送到何处。",
			"setcookie()"=>"向客户端发送一个 HTTP cookie。",
			"setrawcookie()"=>"不对 cookie 值进行 URL 编码，发送一个 HTTP cookie。"
		);
		return success($HTTP);
	}
}
?>