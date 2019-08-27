<?php


/**
 * 
 */
class DateTimeController
{
	
	function __construct($argument)
	{
		# code...
	}
	function index(){
		$Datetime=array(
			"checkdate()"=>"验证格利高里日期。",
			"date_add()"=>"添加日、月、年、时、分和秒到一个日期。",
			"date_create_from_format()"=>"返回一个根据指定格式进行格式化的新的DateTime对象。",
			"date_create()"=>"返回一个新的DateTime对象。",
			"date_date_set()"=>"设置一个新的日期。",
			"date_default_timezone_get()"=>"返回默认时区，被所有的Date/Time函数使用。",
			"date_default_timezone_set()"=>"设置默认时区，被所有的Date/Time函数使用。",
			"date_diff()"=>"返回两个日期间的差值。",
			"date_format()"=>"返回根据指定格式进行格式化的日期。",
			"date_get_last_errors()"=>"返回日期字符串中的警告/错误。",
			"date_interval_create_from_date_string()"=>"从字符串的相关部分建立一个DateInterval。",
			"date_interval_format()"=>"格式化时间间隔。",
			"date_isodate_set()"=>"设置ISO日期。",
			"date_modify()"=>"修改时间戳。",
			"date_offset_get()"=>"返回时区偏移。",
			"date_parse_from_format()"=>"根据指定的格式返回一个带有指定日期的详细信息的关联数组。",
			"date_parse()"=>"返回一个带有指定日期的详细信息的关联数组。",
			"date_sub()"=>"从指定日期减去日、月、年、时、分和秒。",
			"date_sun_info()"=>"返回一个包含有关指定日期与地点的日出/日落和黄昏开始/黄昏结束的信息的数组。",
			"date_sunrise()"=>"返回指定日期与地点的日出时间。",
			"date_sunset()"=>"返回指定日期与地点的日落时间。",
			"date_time_set()"=>"设置时间。",
			"date_timestamp_get()"=>"返回Unix时间戳。",
			"date_timestamp_set()"=>"设置基于Unix时间戳的日期和时间。",
			"date_timezone_get()"=>"返回给定DateTime对象的时区。",
			"date_timezone_set()"=>"设置DateTime对象的时区。",
			"date()"=>"格式化本地日期和时间。",
			"getdate()"=>"返回某个时间戳或者当前本地的日期/时间的日期/时间信息。",
			"gettimeofday()"=>"返回当前时间。",
			"gmdate()"=>"格式化GMT/UTC日期和时间。",
			"gmmktime()"=>"返回GMT日期的UNIX时间戳。",
			"gmstrftime()"=>"根据区域设置格式化GMT/UTC日期和时间。",
			"idate()"=>"格式化本地时间/日期为整数。",
			"localtime()"=>"返回本地时间。",
			"microtime()"=>"返回当前Unix时间戳的微秒数。",
			"mktime()"=>"返回一个日期的Unix时间戳。",
			"strftime()"=>"根据区域设置格式化本地时间/日期。",
			"strptime()"=>"解析由strftime()生成的时间/日期。",
			"strtotime()"=>"将任何英文文本的日期或时间描述解析为Unix时间戳。",
			"time()"=>"返回当前时间的Unix时间戳。",
			"timezone_abbreviations_list()"=>"返回包含夏令时、偏移量和时区名称的关联数组。",
			"timezone_identifiers_list()"=>"返回带有所有时区标识符的数值数组。",
			"timezone_location_get()"=>"返回指定时区的位置信息。",
			"timezone_name_from_abbr()"=>"根据时区缩略语返回时区名称。",
			"timezone_name_get()"=>"返回时区的名称。",
			"timezone_offset_get()"=>"返回相对于GMT的时区偏移。",
			"timezone_open()"=>"创建一个新的DateTimeZone对象。",
			"timezone_transitions_get()"=>"返回时区的所有转换。",
			"timezone_version_get()"=>"返回时区数据库的版本。"
		);
		return success($Datetime);
	}
}
?>