<?php
/**
 * 
 */
class MiscController
{

	function MiscController(){
	}
	function connection_aborted(){
		if(connection_aborted()){
			return success("连接已终止");
		}else{
			return warning("连接未终止");
		}
	}
	function connection_status(){
		switch (connection_status())
		{
			case CONNECTION_NORMAL:
			return info("Connection is in a normal state");
			break;
			case CONNECTION_ABORTED:
			return warning("Connection aborted");
			break;
			case CONNECTION_TIMEOUT:
			return warning("Connection timed out");
			break;
			case (CONNECTION_ABORTED & CONNECTION_TIMEOUT):
			return warning("Connection aborted and timed out");
			break;
			default:
			return danger("Unknown");
			break;
		}
	}
	function constant($data){

	}
	function define(){

	}
	function defined(){

	}
	function die(){

	}
	function eval(){

	}
	function exit(){

	}
	function get_browser(){
		// return success(get_browser());
		return success(get_browser());
	}
	function highlight_file(){

	}
	function highlight_string($data){
		return success(highlight_string($data->string,TRUE));
	}
	function ignore_user_abort(){

	}
	function pack($data){
		return success(pack("C3",80,72,80));
	}
	function strip_whitespace(){

	}
	function show_source($data){
		highlight_file($data);
	}
	function sleep($data){

	}
	function time_nanosleep(){

	}
	function time_sleep_until(){

	}
	function uniqid($data){
		return success(uniqid($data->prefix,$data->more_entropy));
	}
	function unpack(){

	}
	function usleep(){

	}
}



?>