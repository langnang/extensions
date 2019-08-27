<?php

/**
 * 
 */
class ErrorLoggingController
{
	
	function index()
	{
		$ErrorLogging=array(
			"debug_backtrace()"=>"生成 backtrace。",
			"debug_print_backtrace()"=>"打印 backtrace。",
			"error_get_last()"=>"获得最后发生的错误。",
			"error_log()"=>"向服务器错误记录、文件或远程目标发送一个错误。",
			"error_reporting()"=>"规定报告哪个错误。",
			"restore_error_handler()"=>"恢复之前的错误处理程序。",
			"restore_exception_handler()"=>"恢复之前的异常处理程序。",
			"set_error_handler()"=>"设置用户自定义的错误处理函数。",
			"set_exception_handler()"=>"设置用户自定义的异常处理函数。",
			"trigger_error()"=>"创建用户自定义的错误消息。",
			"user_error()"=>"trigger_error() 的别名。"
		);
		print_r($ErrorLogging);
	}
}