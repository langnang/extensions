<?php 

/**
 * 
 */
class XMLController
{
	
	function __construct($argument)
	{
		# code...
	}
	function index(){
		$XML=array(
			"utf8_decode()"=>"把 UTF-8 字符串解码为 ISO-889-1。",
			"utf8_encode()"=>"把 ISO-889-1 字符串编码为 UTF-8。",
			"xml_error_string()"=>"获取 XML 解析器的错误字符串。",
			"xml_get_current_byte_index()"=>"获取 XML 解析器的当前字节索引。",
			"xml_get_current_column_number()"=>"获取 XML 解析器的当前列号。",
			"xml_get_current_line_number()"=>"获取 XML 解析器的当前行号。",
			"xml_get_error_code()"=>"获取 XML 解析器的错误代码。",
			"xml_parse()"=>"解析 XML 文档。",
			"xml_parse_into_struct()"=>"把 XML 数据解析到数组中。",
			"xml_parser_create_ns()"=>"创建带有命名空间支持的 XML 解析器。",
			"xml_parser_create()"=>"创建 XML 解析器。",
			"xml_parser_free()"=>"释放 XML 解析器。",
			"xml_parser_get_option()"=>"从 XML 解析器获取选项。",
			"xml_parser_set_option()"=>"为 XML 解析器设置选项。",
			"xml_set_character_data_handler()"=>"建立字符数据处理器。",
			"xml_set_default_handler()"=>"建立默认处理器。",
			"xml_set_element_handler()"=>"建立起始和终止元素处理器。",
			"xml_set_end_namespace_decl_handler()"=>"建立终止命名空间声明处理器。",
			"xml_set_external_entity_ref_handler()"=>"建立外部实体处理器。",
			"xml_set_notation_decl_handler()"=>"建立符号声明处理器。",
			"xml_set_object()"=>"在对象中使用 XML 解析器。",
			"xml_set_processing_instruction_handler()"=>"建立处理指令（PI）处理器。",
			"xml_set_start_namespace_decl_handler()"=>"建立起始命名空间声明处理器。",
			"xml_set_unparsed_entity_decl_handler()"=>"建立未解析实体声明处理器。"
		);
		return success($XML);
	}
}
?>