<?php 

/**
 * 
 */
class MailController
{
	
	function __construct($argument)
	{
		# code...
	}
	function index(){
		$Mail=array(
			"ezmlm_hash()"=>"计算 EZMLM 邮件列表系统所需的散列值。",
			"mail()"=>"允许您从脚本中直接发送电子邮件。"
		);
		return success($Mail);
	}
}
?>