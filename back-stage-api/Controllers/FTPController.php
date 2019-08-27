<?php
/**
  * 
  */
class FTPController
{

	function __construct($argument)
	{
 		# code...
	}
	function index(){
		$FTP=array(
			"ftp_alloc()"=>"为要上传到 FTP 服务器的文件分配空间。",
			"ftp_cdup()"=>"把当前目录改变为 FTP 服务器上的父目录。",
			"ftp_chdir()"=>"改变 FTP 服务器上的当前目录。",
			"ftp_chmod()"=>"通过 FTP 设置文件上的权限。",
			"ftp_close()"=>"关闭 FTP 连接。",
			"ftp_connect()"=>"打开 FTP 连接。",
			"ftp_delete()"=>"删除 FTP 服务器上的一个文件。",
			"ftp_exec()"=>"在 FTP 服务器上执行一个程序/命令。",
			"ftp_fget()"=>"从 FTP 服务器上下载一个文件并保存到本地一个已经打开的文件中。",
			"ftp_fput()"=>"上传一个已经打开的文件，并在 FTP 服务器上把它保存为一个文件。",
			"ftp_get_option()"=>"返回 FTP 连接的各种运行时选项。",
			"ftp_get()"=>"从 FTP 服务器上下载文件。",
			"ftp_login()"=>"登录 FTP 服务器。",
			"ftp_mdtm()"=>"返回指定文件的最后修改时间。",
			"ftp_mkdir()"=>"在 FTP 服务器上创建一个新目录。",
			"ftp_nb_continue()"=>"连续获取/发送文件。（无阻塞）",
			"ftp_nb_fget()"=>"从 FTP 服务器上下载一个文件并保存到本地一个已经打开的文件中。（无阻塞）",
			"ftp_nb_fput()"=>"上传一个已经打开的文件，并在 FTP 服务器上把它保存为一个文件。（无阻塞）",
			"ftp_nb_get()"=>"从 FTP 服务器上下载文件。（无阻塞）",
			"ftp_nb_put()"=>"把文件上传到 FTP 服务器上。（无阻塞）",
			"ftp_nlist()"=>"返回 FTP 服务器上指定目录的文件列表。",
			"ftp_pasv()"=>"把被动模式设置为打开或关闭。",
			"ftp_put()"=>"把文件上传到 FTP 服务器上。",
			"ftp_pwd()"=>"返回当前目录名称。",
			"ftp_quit()"=>"ftp_close() 的别名。",
			"ftp_raw()"=>"向 FTP 服务器发送一个 raw 命令。",
			"ftp_rawlist()"=>"返回指定目录中文件的详细列表。",
			"ftp_rename()"=>"重命名 FTP 服务器上的文件或目录。",
			"ftp_rmdir()"=>"删除 FTP 服务器上的一个目录。",
			"ftp_set_option()"=>"设置 FTP 连接的各种运行时选项。",
			"ftp_site()"=>"向服务器发送 SITE 命令。",
			"ftp_size()"=>"返回指定文件的大小。",
			"ftp_ssl_connect()"=>"打开一个安全的 SSL-FTP 连接。",
			"ftp_systype()"=>"返回 FTP 服务器的系统类型标识符。"
		);
		return success($FTP);
	}
	function ftp_connect(){
	}
} 
?>