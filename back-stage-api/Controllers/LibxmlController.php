<?php 

/**
 * 
 */
class LibxmlController
{
	
	function __construct($argument)
	{
		# code...
	}
	function index(){
		$Libxml=array(
			"libxml_clear_errors()"=>"清空 Libxml 错误缓冲。",
			"libxml_get_errors()"=>"检索错误数组。",
			"libxml_get_last_error()"=>"从 Libxml 检索最后的错误。",
			"libxml_set_streams_context()"=>"为下一次 Libxml 文档加载或写入设置流环境。",
			"libxml_use_internal_errors()"=>"禁用 Libxml 错误，允许用户按需读取错误信息。"
		);
		return success($Libxml);
	}
}
?>