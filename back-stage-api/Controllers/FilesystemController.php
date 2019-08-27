<?php
/**
 * 
 */
class FilesystemController
{
	function FilesystemController(){
	}
	function __construct($argument){
	}
	function index(){
		$Filesystem= array(
			"basename(path[,suffix])"=>"返回路径中的文件名部分。",
			"chgrp(file[,group])"=>"改变文件组。",
			"chmod(file,mode)"=>"改变文件模式。",
			"chown(file,owner)"=>"改变文件所有者。",
			"clearstatcache()"=>"清除文件状态缓存。",
			"copy(file,to_file)"=>"复制文件。",
			"delete()"=>"参见 unlink()或 unset()",
			"dirname(path)"=>"返回路径中的目录名称部分。",
			"disk_free_space(directory)"=>"返回目录的可用空间。",
			"disk_total_space(directory)"=>"返回一个目录的磁盘总容量。",
			"diskfreespace()"=>"disk_free_space() 的别名。",
			"fclose()"=>"关闭打开的文件。",
			"feof()"=>"测试文件指针是否到了文件末尾。",
			"fflush()"=>"向打开的文件刷新缓冲输出。",
			"fgetc(file)"=>"从打开的文件中返回字符。",
			"fgetcsv()"=>"从打开的文件中解析一行，校验 CSV 字段。",
			"fgets()"=>"从打开的文件中返回一行。",
			"fgetss()"=>"从打开的文件中返回一行，并过滤掉 HTML 和 PHP 标签。",
			"file()"=>"把文件读入一个数组中。",
			"file_exists()"=>"检查文件或目录是否存在。",
			"file_get_contents(path[,include_path[,context[,start[,max_length]]]])"=>"把文件读入字符串。",
			"file_put_contents(file,data[,mode[,context]])"=>"把字符串写入文件。",
			"fileatime()"=>"返回文件的上次访问时间。",
			"filectime()"=>"返回文件的上次修改时间。",
			"filegroup()"=>"返回文件的组 ID。",
			"fileinode()"=>"返回文件的 inode 编号。",
			"filemtime()"=>"返回文件内容的上次修改时间。",
			"fileowner()"=>"返回文件的用户 ID （所有者）。",
			"fileperms()"=>"返回文件的权限。",
			"filesize()"=>"返回文件大小。",
			"filetype()"=>"返回文件类型。",
			"flock()"=>"锁定或释放文件。",
			"fnmatch()"=>"根据指定的模式来匹配文件名或字符串。",
			"fopen(filename,mode[,include_path[,context]])"=>"打开一个文件或 URL。",
			"fpassthru()"=>"从打开的文件中读数据，直到文件末尾（EOF），并向输出缓冲写结果。",
			"fputcsv()"=>"把行格式化为 CSV 并写入一个打开的文件中。",
			"fputs()"=>"fwrite()的别名。",
			"fread()"=>"读取打开的文件。",
			"fscanf()"=>"根据指定的格式对输入进行解析。",
			"fseek()"=>"在打开的文件中定位。",
			"fstat()"=>"返回关于一个打开的文件的信息。",
			"ftell()"=>"返回在打开文件中的当前位置。",
			"ftruncate()"=>"把打开文件截断到指定的长度。",
			"fwrite()"=>"写入打开的文件。",
			"glob()"=>"返回一个包含匹配指定模式的文件名/目录的数组。",
			"is_dir()"=>"判断文件是否是一个目录。",
			"is_executable()"=>"判断文件是否可执行。",
			"is_file()"=>"判断文件是否是常规的文件。",
			"is_link()"=>"判断文件是否是连接。",
			"is_readable()"=>"判断文件是否可读。",
			"is_uploaded_file()"=>"判断文件是否是通过 HTTP POST 上传的。",
			"is_writable()"=>"判断文件是否可写。",
			"is_writeable()"=>"is_writable()的别名。",
			"lchgrp()"=>"改变符号连接的组所有权。",
			"lchown()"=>"改变符号连接的用户所有权。",
			"link()"=>"创建一个硬连接。",
			"linkinfo()"=>"返回有关一个硬连接的信息。",
			"lstat()"=>"返回关于文件或符号连接的信息。","mkdir()"=>"创建目录。",
			"move_uploaded_file()"=>"把上传的文件移动到新位置。",
			"parse_ini_file()"=>"解析一个配置文件。",
			"parse_ini_string()"=>"解析一个配置字符串。",
			"pathinfo()"=>"返回关于文件路径的信息。",
			"pclose()"=>"关闭由 popen()打开的进程。",
			"popen()"=>"打开一个进程。",
			"readfile()"=>"读取一个文件，并写入到输出缓冲。",
			"readlink()"=>"返回符号连接的目标。",
			"realpath()"=>"返回绝对路径名。",
			"realpath_cache_get()"=>"返回高速缓存条目。",
			"realpath_cache_size()"=>"返回高速缓存大小。",
			"rename()"=>"重命名文件或目录。",
			"rewind()"=>"倒回文件指针的位置。",
			"rmdir()"=>"删除空的目录。",
			"set_file_buffer()"=>"设置已打开文件的缓冲大小。",
			"stat()"=>"返回关于文件的信息。",
			"symlink()"=>"创建符号连接。",
			"tempnam()"=>"创建唯一的临时文件。",
			"tmpfile()"=>"创建唯一的临时文件。",
			"touch()"=>"设置文件的访问和修改时间。",
			"umask()"=>"改变文件的文件权限。",
			"unlink()"=>"删除文件。"
		);
		print_r($Filesystem);
		// echo json_encode($Filesystem);
	}
	function basename($data){
		if(property_exists($data,"path")){
			if(property_exists($data,"suffix")){
				return success(basename($data->path,$data->suffix));

			}else{
				return success(basename($data->path));
			}
		}else{
			return error("未规定path参数");
		}
	}
	function copy($data){
		if(property_exists($data,"file")){
			if(property_exists($file,"to_file")){
				if(copy($data->file,$data->to_file)){
					success("文件复制成功");
				}else{
					warning("文件复制失败");
				}
			}else{
				return error("未规定to_file参数");
			}
		}else{
			return error("未规定file参数");
		}
	}
	function dirname($data){
		if(property_exists($data,"path")){
			return success(dirname($data->path));
		}else{
			return error("未规定path参数");
		}
	}
	function disk_free_space($data){
		if(property_exists($data,"directory")){
			return success(disk_free_space($data->directory));
		}else{
			return error("未规定directory参数");
		}
	}
	function disk_total_space($data){
		if(property_exists($data,"directory")){
			echo disk_total_space($data->directory);
		}else{
			die("ERROR:未规定检查目录");
		}
	}
	function file_exists($data){
		if(property_exists($data,"path")){
			echo file_exists($data->path);
		}else{
			die("ERROR:未规定检查路径");
		}
	}
	function fopen($data){

	}
	function is_dir($data){
		if(property_exists($data,"file")){
			if(is_dir($data->file)){
				echo "$data->file is a directory";
			}else{
				echo "$data->file is not a directory";
			}
		}else{
			die("ERROR:未规定检查文件");

		}
	}
	function is_executable($data){

	}
	function is_file($data){

	}
	function is_link($data){

	}
	function mkdir($data){

	}
	function rename($data){

	}
	function unlink($data){

	}
	function file_get_contents($data){
		echo file_get_contents($data->url);
	}

}