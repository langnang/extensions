<?php

include_once($_SERVER['DOCUMENT_ROOT']."/resource/action/api/config.php");
include_once($_SERVER['DOCUMENT_ROOT']."/resource/action/mysqli/default.php");
$link=connect_mysql($mysql->host,$mysql->username,$mysql->password);
// var_dump($link);
$mysql->dbname="docs";

if(!if_exists_db($link,$mysql->dbname)){
	echo "数据库不曾存在";
	if(!create_db($link,$mysql->dbname)){
		die("数据库创建失败");
	};
}
// 选择数据库
mysqli_select_db($link,$mysql->dbname);
// $link=connect_db($link,$mysql->dbname);
// var_dump($mysql);
