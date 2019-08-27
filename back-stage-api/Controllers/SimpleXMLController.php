<?php 

/**
 * 
 */
class SimpleXMLController
{
	
	function __construct($argument)
	{
		# code...
	}
	function index(){
		$SimpleXML=array(
			"__construct()"=>"创建一个新的 SimpleXMLElement 对象。",
			"addAttribute()"=>"给 SimpleXML 元素添加一个属性。",
			"addChild()"=>"给 SimpleXML 元素添加一个子元素。",
			"asXML()"=>"格式化 XML（版本 1.0）中的 SimpleXML 对象的数据。",
			"attributes()"=>"返回 XML 标签的属性和值。",
			"children()"=>"查找指定节点的子节点。",
			"count()"=>"计算指定节点的子节点个数。",
			"getDocNamespaces()"=>"返回文档中的声明的命名空间。",
			"getName()"=>"返回 SimpleXML 元素引用的 XML 标签的名称。",
			"getNamespaces()"=>"返回文档中使用的命名空间。",
			"registerXPathNamespace()"=>"为下一个 XPath 查询创建命名空间上下文。",
			"saveXML()"=>"asXML()"=>" 的别名。",
			"simplexml_import_dom()"=>"从 DOM 节点返回 SimpleXMLElement 对象。",
			"simplexml_load_file()"=>"转换 XML 文件为 SimpleXMLElement 对象。",
			"simplexml_load_string()"=>"转换 XML 字符串为 SimpleXMLElement 对象。",
			"xpath()"=>"运行对 XML 数据的 XPath 查询。"
		);
		return success($SimpleXML);
	}
}
?>