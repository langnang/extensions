<?php

/**
*获取配置信息，匹配设置
*/


$setting=file_get_contents($_SERVER['DOCUMENT_ROOT']."/resources/setting.ini");

preg_match_all('/\n([^ #].*?)\r/',  $setting,$set);
// var_dump($set[1]);
$arr=[];
foreach($set[1] as $value){ 
// var_dump(strpos($value,"="));
// var_dump(substr($value,0,strpos($value,"=")));
// var_dump(substr($value,strpos($value,"=")+1));
	$arr[substr($value,0,strpos($value,"="))]=substr($value,strpos($value,"=")+1);
} 

echo json_encode($arr);