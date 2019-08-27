<?php 

/**
 * 
 */
class ZipController
{
	
	function __construct($argument)
	{
		# code...
	}
	function index(){
		$Zip=array(
			"zip_close()"=>"关闭ZIP文件。",
			"zip_entry_close()"=>"关闭ZIP文件中的一个项目。",
			"zip_entry_compressedsize()"=>"返回ZIP文件中的一个项目的被压缩尺寸。",
			"zip_entry_compressionmethod()"=>"返回ZIP文件中的一个项目的压缩方法。",
			"zip_entry_filesize()"=>"返回ZIP文件中的一个项目的实际文件尺寸。",
			"zip_entry_name()"=>"返回ZIP文件中的一个项目的名称。",
			"zip_entry_open()"=>"打开ZIP文件中的一个项目以供读取。",
			"zip_entry_read()"=>"读取ZIP文件中的一个打开的项目。",
			"zip_open()"=>"打开ZIP文件。",
			"zip_read()"=>"读取ZIP文件中的下一个项目。"
		);
		return success($Zip);
	}
}
?>