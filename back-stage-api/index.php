<?php
/** 
 * @name PHP路由功能简单实现
 * @desc PHP简单实现MVC路由功能
 * @Auth TSORA
 */ 


if($_SERVER["REQUEST_URI"]===$_SERVER["SCRIPT_NAME"]||strlen($_SERVER["REQUEST_URI"])<strlen($_SERVER["SCRIPT_NAME"])){
	include_once("Views/index.html");
	return;
}
$router=explode("/",substr($_SERVER["REQUEST_URI"],strlen($_SERVER["SCRIPT_NAME"])+1));
// var_dump($router);
if(count($router)===1){
	$router["controller"]=$router[0];
	$router["function"]="index";
	$router["data"]=array();
}else if(count($router)===2&&$router[1]=="index"){
	$router["controller"]=$router[0];
	$router["function"]=$router[1];
	$router["data"]=array();
}else if(count($router)===2&&$router[1]!=="index"){
	$router["controller"]=$router[0];
	$router["function"]=$router[1];
	// echo $_POST["data"];
	$router["data"]=json_decode($_POST["data"]);
}else{
	$router["controller"]=$router[0];
	$router["function"]=$router[1];
	$router["data"]=$router[2];
}

require_once $_SERVER['DOCUMENT_ROOT'].'/backStageAPI/Models/FeedbackModel.php';

require_once $_SERVER['DOCUMENT_ROOT']."/backStageAPI/Controllers/".$router["controller"]."Controller.php";

echo call_user_func_array(array($router["controller"]."Controller",$router["function"]),array($router["data"]));

function error($message){
	$feedback=new FeedbackModel;
	$feedback->status=0;
	$feedback->state="ERROR";
	$feedback->text=$message;
	return json_encode($feedback);
}
function success($message){
	$feedback=new FeedbackModel;
	$feedback->status=1;
	$feedback->state="SUCCESS";
	$feedback->text=$message;
	return json_encode($feedback);
}
function info($message){
	$feedback=new FeedbackModel;
	$feedback->status=2;
	$feedback->state="INFO";
	$feedback->text=$message;
	return json_encode($feedback);
}
function warning($message){
	$feedback=new FeedbackModel;
	$feedback->status=3;
	$feedback->state="WARNING";
	$feedback->text=$message;
	return json_encode($feedback);
}
function danger($message){
	$feedback=new FeedbackModel;
	$feedback->status=4;
	$feedback->state="DANGER";
	$feedback->text=$message;
	return json_encode($feedback);
}



?>
