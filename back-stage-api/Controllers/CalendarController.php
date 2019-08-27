<?php 

/**
 * 
 */
class CalendarController
{
	function CalendarController(){
		return info(__CLASS__.__FUNCTION__);
	}
	
	function __construct($argument)
	{
		return info(__CLASS__.__FUNCTION__);
	}
	function index(){
		$Calendar=array(
			"cal_days_in_month()"=>"针对指定的年份和历法，返回一个月中的天数。",
			"cal_from_jd()"=>"把儒略日计数转换为指定历法的日期。",
			"cal_info()"=>"返回有关指定历法的信息。",
			"cal_to_jd()"=>"把指定历法的日期转换为儒略日计数。",
			"easter_date()"=>"返回指定年份的复活节午夜的 Unix 时间戳。",
			"easter_days()"=>"返回指定年份的复活节与 3 月 21 日之间的天数。",
			"frenchtojd()"=>"把法国共和历法的日期转换成为儒略日计数。",
			"gregoriantojd()"=>"把格利高里历法的日期转换成为儒略日计数。",
			"jddayofweek()"=>"返回日期在周几。",
			"jdmonthname()"=>"返回月的名称。",
			"jdtofrench()"=>"把儒略日计数转换为法国共和历法的日期。",
			"jdtogregorian()"=>"把儒略日计数转换为格利高里历法的日期。",
			"jdtojewish()"=>"把儒略日计数转换为犹太历法的日期。",
			"jdtojulian()"=>"把儒略日计数转换为儒略历法的日期。",
			"jdtounix()"=>"把儒略日计数转换为 Unix 时间戳。",
			"jewishtojd()"=>"把犹太历法的日期转换为儒略日计数。",
			"juliantojd()"=>"把儒略历法的日期转换为儒略日计数。",
			"unixtojd()"=>"把 Unix 时间戳转换为儒略日计数。"
		);
		return success($Calendar);
	}


}
?>