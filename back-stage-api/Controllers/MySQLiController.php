<?php
include_once($_SERVER["DOCUMENT_ROOT"]."/resources/action/api/Models/MySQLModel.php");
/**
 * 
 */
class MySQLiController extends MySQLModel
{
	function __construct($data){
		$link=mysqli_connect($data->host,$data->username,$data->password,$data->dbname);
		// print_r($link);
		self::$link=$link;
	}
	function index(){
		$MySQLi=array(
			"mysqli_affected_rows()"=>"返回前一次MySQL操作所影响的记录行数。",
			"mysqli_autocommit()"=>"打开或关闭自动提交数据库修改。",
			"mysqli_change_user()"=>"更改指定数据库连接的用户。",
			"mysqli_character_set_name()"=>"返回数据库连接的默认字符集。",
			"mysqli_close()"=>"关闭先前打开的数据库连接。",
			"mysqli_commit()"=>"提交当前事务。",
			"mysqli_connect_errno()"=>"返回上一次连接错误的错误代码。",
			"mysqli_connect_error()"=>"返回上一次连接错误的错误描述。",
			"mysqli_connect()"=>"打开一个到MySQL服务器的新的连接。",
			"mysqli_data_seek()"=>"调整结果指针到结果集中的一个任意行。",
			"mysqli_debug()"=>"执行调试操作。",
			"mysqli_dump_debug_info()"=>"转储调试信息到日志中。",
			"mysqli_errno()"=>"返回最近调用函数的最后一个错误代码。",
			"mysqli_error_list()"=>"返回最近调用函数的错误列表。",
			"mysqli_error()"=>"返回最近调用函数的最后一个错误描述。",
			"mysqli_fetch_all()"=>"从结果集中取得所有行作为关联数组，或数字数组，或二者兼有。",
			"mysqli_fetch_array()"=>"从结果集中取得一行作为关联数组，或数字数组，或二者兼有。",
			"mysqli_fetch_assoc()"=>"从结果集中取得一行作为关联数组。",
			"mysqli_fetch_field_direct()"=>"从结果集中取得某个单一字段的meta-data，并作为对象返回。",
			"mysqli_fetch_field()"=>"从结果集中取得下一字段，并作为对象返回。",
			"mysqli_fetch_fields()"=>"返回结果中代表字段的对象的数组。",
			"mysqli_fetch_lengths()"=>"返回结果集中当前行的每个列的长度。",
			"mysqli_fetch_object()"=>"从结果集中取得当前行，并作为对象返回。",
			"mysqli_fetch_row()"=>"从结果集中取得一行，并作为枚举数组返回。",
			"mysqli_field_count()"=>"返回最近查询的列数。",
			"mysqli_field_seek()"=>"把结果集中的指针设置为指定字段的偏移量。",
			"mysqli_field_tell()"=>"返回结果集中的指针的位置。",
			"mysqli_free_result()"=>"释放结果内存。",
			"mysqli_get_charset()"=>"返回字符集对象。",
			"mysqli_get_client_info()"=>"返回MySQL客户端库版本。",
			"mysqli_get_client_stats()"=>"返回有关客户端每个进程的统计。",
			"mysqli_get_client_version()"=>"将MySQL客户端库版本作为整数返回。",
			"mysqli_get_connection_stats()"=>"返回有关客户端连接的统计。",
			"mysqli_get_host_info()"=>"返回MySQL服务器主机名和连接类型。",
			"mysqli_get_proto_info()"=>"返回MySQL协议版本。",
			"mysqli_get_server_info()"=>"返回MySQL服务器版本。",
			"mysqli_get_server_version()"=>"将MySQL服务器版本作为整数返回。",
			"mysqli_info()"=>"返回有关最近执行查询的信息。",
			"mysqli_init()"=>"初始化MySQLi并返回mysqli_real_connect() 使用的资源。",
			"mysqli_insert_id()"=>"返回最后一个查询中自动生成的ID。",
			"mysql_kill()"=>"请求服务器杀死一个MySQL线程。",
			"mysqli_more_results()"=>"检查一个多查询是否有更多的结果。",
			"mysqli_multi_query()"=>"执行一个或多个针对数据库的查询。",
			"mysqli_next_result()"=>"为mysqli_multi_query() 准备下一个结果集。",
			"mysqli_num_fields()"=>"返回结果集中字段的数量。",
			"mysqli_num_rows()"=>"返回结果集中行的数量。",
			"mysqli_options()"=>"设置额外的连接选项，用于影响连接行为。",
			"mysqli_ping()"=>"进行一个服务器连接，如果连接已断开则尝试重新连接。",
			"mysqli_prepare()"=>"准备执行一个SQL语句。",
			"mysqli_query()"=>"执行某个针对数据库的查询。",
			"mysqli_real_connect()"=>"打开一个到MySQL服务器的新的链接。",
			"mysqli_real_escape_string()"=>"转义在SQL语句中使用的字符串中的特殊字符。",
			"mysqli_real_query()"=>"执行SQL查询",
			"mysqli_reap_async_query()"=>"返回异步查询的结果。",
			"mysqli_refresh()"=>"刷新表或缓存，或者重置复制服务器信息。",
			"mysqli_rollback()"=>"回滚数据库中的当前事务。",
			"mysqli_select_db()"=>"更改连接的默认数据库。",
			"mysqli_set_charset()"=>"设置默认客户端字符集。",
			"mysqli_set_local_infile_default()"=>"撤销用于loadlocalinfile命令的用户自定义句柄。",
			"mysqli_set_local_infile_handler()"=>"设置用于LOADDATALOCALINFILE命令的回滚函数。",
			"mysqli_sqlstate()"=>"返回最后一个MySQL操作的SQLSTATE错误代码。",
			"mysqli_ssl_set()"=>"用于创建SSL安全连接。",
			"mysqli_stat()"=>"返回当前系统状态。",
			"mysqli_stmt_init()"=>"初始化声明并返回mysqli_stmt_prepare() 使用的对象。",
			"mysqli_store_result()"=>"传输最后一个查询的结果集。",
			"mysqli_thread_id()"=>"返回当前连接的线程ID。",
			"mysqli_thread_safe()"=>"返回是否将客户端库编译成thread-safe。",
			"mysqli_use_result()"=>"从上次使用mysqli_real_query() 执行的查询中初始化结果集的检索。",
			"mysqli_warning_count()"=>"返回连接中的最后一个查询的警告数量。"
		);
	}

	function mysqli_connect($data){
		$link=mysqli_connect($data->host,$data->username,$data->password,$data->dbname);
		if(!$link){
			return error("数据库连接失败");
		}else{
			return success("数据库连接成功");
		}
	}
	function mysqli_db_exists($data){
		
	}
	function mysqli_tb_exists($data){
		$sql=sprintf("SHOW TABLES LIKE '%s'",$data->tbname);
		$result=mysqli_query(self::$link,$sql);
		if($result->num_rows<=0){
			return error("数据表不存在");
		}
		return success("数据表存在");
	}
	function mysqli_select_all($data){
		$sql=sprintf("SELECT * FROM `%s` LIMIT 50",$data->tbname);
		$result=mysqli_query(self::$link,$sql);
		print_r($result->num_rows);
	}
}
?>