<?php
/**
* 
* 
*/

function updateFileData($link,$fileData){
	$fileData=json_decode($fileData);
	// echo $fileData;
	// var_dump($fileData->report);
	$sql=sprintf("UPDATE `resources`.`file` SET  `description` = '%s', `report` = '%s' WHERE `fileurl` = '%s' ",$fileData->description,json_encode($fileData->report,JSON_UNESCAPED_UNICODE),$fileData->fileurl);
	// echo $sql;
	$result=mysqli_query($link,$sql);
	// // 判断是否执行
	if(!$result){
		return false;
	}

	return true;

}