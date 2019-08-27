<?php
/**
*
*/

function insertFileData($link,$fileData){
	$fileData=json_decode($fileData);
	// echo $fileData;
	$sql=sprintf("INSERT INTO `resources`.`file`(`id`, `fileurl`, `report`) VALUES (replace(UUID(),'-',''), '%s', '%s')",$fileData->fileurl,'{"thinking":[],"development":[],"feedback":[]}');
	// echo $sql;
	$result=mysqli_query($link,$sql);
	// // 判断是否执行
	if(!$result){
		return false;
	}

	return true;
}
// function insert