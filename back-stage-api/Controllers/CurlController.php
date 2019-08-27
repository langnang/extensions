<?php

/**
  * 
  */
class CurlController
{

	function __construct($argument)
	{
 		# code...
	}
	function index(){
		$Curl=array(
			"curl_close()"=>"关闭一个cURL会话。",
			"curl_copy_handle()"=>"复制一个cURL句柄和它的所有选项。",
			"curl_errno()"=>"返回最后一次的错误号。",
			"curl_error()"=>"返回一个保护当前会话最近一次错误的字符串。",
			"curl_escape()"=>"返回转义字符串，对给定的字符串进行URL编码。",
			"curl_exec()"=>"执行一个cURL会话。",
			"curl_file_create()"=>"创建一个 CURLFile 对象。",
			"curl_getinfo()"=>"获取一个cURL连接资源句柄的信息。",
			"curl_init()"=>"初始化一个cURL会话。",
			"curl_multi_add_handle()"=>"向curl批处理会话中添加单独的curl句柄。",
			"curl_multi_close()"=>"关闭一组cURL句柄。",
			"curl_multi_exec()"=>"运行当前 cURL 句柄的子连接。",
			"curl_multi_getcontent()"=>"如果设置了CURLOPT_RETURNTRANSFER，则返回获取的输出的文本流。",
			"curl_multi_info_read()"=>"获取当前解析的cURL的相关传输信息。",
			"curl_multi_init()"=>"返回一个新cURL批处理句柄。",
			"curl_multi_remove_handle()"=>"移除curl批处理句柄资源中的某个句柄资源。",
			"curl_multi_select()"=>"等待所有cURL批处理中的活动连接。",
			"curl_multi_setopt()"=>"设置一个批处理cURL传输选项。",
			"curl_multi_strerror()"=>"返回描述错误码的字符串文本。",
			"curl_pause()"=>"暂停及恢复连接。",
			"curl_reset()"=>"重置libcurl的会话句柄的所有选项。",
			"curl_setopt_array()"=>"为cURL传输会话批量设置选项。",
			"curl_setopt()"=>"设置一个cURL传输选项。",
			"curl_share_close()"=>"关闭cURL共享句柄。",
			"curl_share_init()"=>"初始化cURL共享句柄。",
			"curl_share_setopt()"=>"设置一个共享句柄的cURL传输选项。",
			"curl_strerror()"=>"返回错误代码的字符串描述。",
			"curl_unescape()"=>"解码URL编码后的字符串。",
			"curl_version()"=>"获取cURL版本信息。"
		);
		return success($Curl);
	}
} 
?>