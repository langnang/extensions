<?php

/**
 * 
 */
class FilterController
{
	
	function __construct($argument)
	{
		# code...
	}
	function index(){
		$Filter=array(
			"filter_has_var()"=>"检查是否存在指定输入类型的变量。",
			"filter_id()"=>"返回指定过滤器的 ID 号。",
			"filter_input(input_type, variable[, filter[, options]])"=>"从脚本外部获取输入，并进行过滤。",
			"filter_input_array()"=>"从脚本外部获取多项输入，并进行过滤。",
			"filter_list()"=>"返回包含所有得到支持的过滤器的一个数组。",
			"filter_var_array(array[, args])"=>"获取多个变量，并进行过滤。",
			"filter_var(variable[, filter[, options]])"=>"获取一个变量，并进行过滤。"
		);
	}
	function filter_has_var($data){
	}
	function filter_id($data){
		return success(filter_id($data->filter_name));
	}
	function filter_list(){
		return success(filter_list());
	}
	function filter_var_array($data){
		return success(filter_var_array($data->array,$data->args));
	}
	function filter_var($data){

	}
}
?>