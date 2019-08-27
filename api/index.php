<?php
/** 
 * @name PHP路由功能简单实现
 * @desc PHP简单实现MVC路由功能
 * @Auth TSORA
 */ 


// var_dump(substr($_SERVER["REQUEST_URI"],strlen($_SERVER["SCRIPT_NAME"])+1));
if($_SERVER["REQUEST_URI"]===$_SERVER["SCRIPT_NAME"]||strlen($_SERVER["REQUEST_URI"])<strlen($_SERVER["SCRIPT_NAME"])){
	include_once("Views/index.html");
	return;
}
$router=explode("/",substr($_SERVER["REQUEST_URI"],strlen($_SERVER["SCRIPT_NAME"])+1));
// var_dump($router);
// var_dump(count($router));
if(count($router)===1){
	$router["controller"]=ucfirst($router[0]);
	$router["function"]=ucfirst("index");
	$router["param"]="";
}else if(count($router)===2){
	$router["controller"]=ucfirst($router[0]);
	$router["function"]=ucfirst($router[1]);
	$router["param"]="";
}else{
	$router["controller"]=ucfirst($router[0]);
	$router["function"]=ucfirst($router[1]);
	$router["param"]=$router[2];
}
// var_dump(strlen($_SERVER["SCRIPT_NAME"]));
// var_dump(strripos($_SERVER["REQUEST_URI"],$_SERVER["SCRIPT_NAME"]));
// var_dump(substr($_SERVER["REQUEST_URI"],strlen($_SERVER["SCRIPT_NAME"])+1));

// $rules=array(
//	"controller"=>ucfirst(explode("/",substr($_SERVER["REQUEST_URI"],strlen($_SERVER["SCRIPT_NAME"])+1))[0]),
//	"class"=>explode("/",substr($_SERVER["REQUEST_URI"],strlen($_SERVER["SCRIPT_NAME"])+1))[1]
// );
// var_dump($rules);
// var_dump($rules["controller"]);

include_once("Controllers/".$router["controller"]."Controller.php");

//首字母大写
// var_dump(ucfirst($rules["controller"]));


call_user_func_array(array($router["controller"]."Controller",$router["function"]),array($router["param"],0));




?>
