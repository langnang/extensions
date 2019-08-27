<?php

/**
 * @name DirectoryController
 */
class DirectoryController
{
	
	function index()
	{
		// echo "DirectoryController.php  :  index";
		// print_r($_SERVER);
		// echo json_encode($_SERVER);
		$Directory= array(
			"chdir()"=>"改变当前的目录。",
			"chroot()"=>"改变根目录。",
			"closedir()"=>"关闭目录句柄。",
			"dir()"=>"返回 Directory 类的实例。",
			"getcwd()"=>"返回当前工作目录。",
			"opendir()"=>"打开目录句柄。",
			"readdir()"=>"返回目录句柄中的条目。",
			"rewinddir()"=>"重置目录句柄。",
			"scandir()"=>"返回指定目录中的文件和目录的数组。"
		);
		print_r($Directory);
	}
	function opendir($data)
	{
		if(property_exists($data,"type")&&$data->type=="relative"){
			if (is_dir($data->dir)){
				if ($dh = opendir($data->dir)){
					$files=array();
					while (($file = readdir($dh)) !== false){
						if($file!=="."&&$file!==".."){
							array_push($files,array(
								"filename"=>$file,
								"fileatime"=>fileatime($data->dir."/".$file),
								"filectime"=>filectime($data->dir."/".$file),
								"filegroup"=>filegroup($data->dir."/".$file),
								"fileinode"=>fileinode($data->dir."/".$file),
								"filemtime"=>filemtime($data->dir."/".$file),
								"fileowner"=>fileowner($data->dir."/".$file),
								"filperms"=>fileperms($data->dir."/".$file),
								"filesize"=>filesize($data->dir."/".$file),
								"filetype"=>filetype($data->dir."/".$file)
							));
						}
					}
				// echo json_encode($files);
					closedir($dh);
					return success($files);
				}

			}
			return error($data->dir." 不是文件目录");
		}else{
			if (is_dir($_SERVER['DOCUMENT_ROOT'].$data->dir)){
				if ($dh = opendir($_SERVER['DOCUMENT_ROOT'].$data->dir)){
					$files=array();
					while (($file = readdir($dh)) !== false){
						if($file!=="."&&$file!==".."){
							array_push($files,array(
								"filename"=>$file,
								"fileatime"=>fileatime($_SERVER['DOCUMENT_ROOT'].$data->dir."/".$file),
								"filectime"=>filectime($_SERVER['DOCUMENT_ROOT'].$data->dir."/".$file),
								"filegroup"=>filegroup($_SERVER['DOCUMENT_ROOT'].$data->dir."/".$file),
								"fileinode"=>fileinode($_SERVER['DOCUMENT_ROOT'].$data->dir."/".$file),
								"filemtime"=>filemtime($_SERVER['DOCUMENT_ROOT'].$data->dir."/".$file),
								"fileowner"=>fileowner($_SERVER['DOCUMENT_ROOT'].$data->dir."/".$file),
								"filperms"=>fileperms($_SERVER['DOCUMENT_ROOT'].$data->dir."/".$file),
								"filesize"=>filesize($_SERVER['DOCUMENT_ROOT'].$data->dir."/".$file),
								"filetype"=>filetype($_SERVER['DOCUMENT_ROOT'].$data->dir."/".$file)
							));
						}
					}
				// echo json_encode($files);
					closedir($dh);
					return success($files);
				}

			}
			return error($_SERVER['DOCUMENT_ROOT'].$data->dir." 不是文件目录");
		}
		
	}

	function scandir($data)
	{
		if (is_dir($_SERVER['DOCUMENT_ROOT'].$data->dir)){
			return json_encode(scandir($_SERVER['DOCUMENT_ROOT'].$data->dir));
		}
	}
}