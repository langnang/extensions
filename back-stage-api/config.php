<?php


include_once($_SERVER['DOCUMENT_ROOT']."/resources/action/default.php");

$mysql=array(
	"host"=>"39.108.130.236",
	"username"=>"tsora",
	"password"=>"ezRvXnXIk0bmW8en",
	"dbname"=>"tsora",
	"tbname"=>""
);

$link=connect_mysql($mysql["host"],$mysql["username"],$mysql["password"],$mysql["dbname"]);
if(!$link){
	die( "数据库链接失败！！");
}else{
	echo "连接成功"; 
}
