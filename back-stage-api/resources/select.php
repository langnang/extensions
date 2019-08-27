<?php
/**
* 
* 
* 
* 
* 
* 
* 
* 
*/

function selectAllFileUrl($link){
	$sql="SELECT DISTINCT `fileurl` FROM `file`";
	$result=mysqli_query($link,$sql);
	if(!$result){
		return "数据查询失败";
	}else{
		$data=array();
		while($row=mysqli_fetch_array($result)){
			array_push($data,$row);
		}
		return json_encode($data);
	}
}
function selectFileInfo($link,$fileUrl){
	$sql=sprintf("select * from file where `fileurl`='%s'",$fileUrl);
	// echo $sql;
	$result=mysqli_query($link,$sql);
	if(!$result){
		return "数据查询失败";
	}else{
		// var_dump($result);
		$data=array();
		while($row=mysqli_fetch_array($result)){
			// print_r($row);
			array_push($data,$row);
		}
		return json_encode($data);
	}
	// echo $sql;
}

function selectFileReport($link,$id){
	$sql=sprintf("select * from report where `id`='%s'",$id);
	$result=mysqli_query($link,$sql);
	if(!$result){
		return "数据查询失败";
	}else{
		// var_dump($result);
		$data=array();
		while($row=mysqli_fetch_array($result)){
			// print_r($row);
			switch($row["type"]){
				case "thinking":$data["thinking"]=json_decode($row["content"]);break;
				case "development":$data["development"]=json_decode($row["content"]);break;
				case "feedback":$data["feedback"]=json_decode($row["content"]);break;
				default: break;
			}
			// array_push($data,$row);
		}
		return $data;
	}
}