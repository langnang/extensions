<?php

/**
 * 
 */
class MathController
{
	
	function index()
	{
		$Math=array(
			"abs()"=>"返回一个数的绝对值。",
			"acos()"=>"返回一个数的反余弦。",
			"acosh()"=>"返回一个数的反双曲余弦。",
			"asin()"=>"返回一个数的反正弦。",
			"asinh()"=>"返回一个数的反双曲正弦。",
			"atan()"=>"返回一个数的反正切。",
			"atan2()"=>"返回两个变量 x 和 y 的反正切。",
			"atanh()"=>"返回一个数的反双曲正切。",
			"base_convert()"=>"在任意进制之间转换数字。",
			"bindec()"=>"把二进制数转换为十进制数。",
			"ceil()"=>"向上舍入为最接近的整数。",
			"cos()"=>"返回一个数的余弦。",
			"cosh()"=>"返回一个数的双曲余弦。",
			"decbin()"=>"把十进制数转换为二进制数。",
			"dechex()"=>"把十进制数转换为十六进制数。",
			"decoct()"=>"把十进制数转换为八进制数。",
			"deg2rad()"=>"将角度值转换为弧度值。",
			"exp()"=>"返回 Ex 的值。",
			"expm1()"=>"返回 Ex - 1 的值。",
			"floor()"=>"向下舍入为最接近的整数。",
			"fmod()"=>"返回 x/y 的浮点数余数。",
			"getrandmax()"=>"返回通过调用 rand() 函数显示的随机数的最大可能值。",
			"hexdec()"=>"把十六进制数转换为十进制数。",
			"hypot()"=>"计算直角三角形的斜边长度。",
			"is_finite()"=>"判断是否为有限值。",
			"is_infinite()"=>"判断是否为无限值。",
			"is_nan()"=>"判断是否为非数值。",
			"lcg_value()"=>"返回范围为 (0, 1) 的一个伪随机数。",
			"log()"=>"返回一个数的自然对数（以 E 为底）。",
			"log10()"=>"返回一个数的以 10 为底的对数。",
			"log1p()"=>"返回 log(1+number)",
			"max()"=>"返回一个数组中的最大值，或者几个指定值中的最大值。",
			"min()"=>"返回一个数组中的最小值，或者几个指定值中的最小值。",
			"mt_getrandmax()"=>"返回通过调用 mt_rand() 函数显示的随机数的最大可能值。",
			"mt_rand([min[,max]])"=>"使用 Mersenne Twister 算法生成随机整数。",
			"mt_srand()"=>"播种 Mersenne Twister 随机数生成器。",
			"octdec()"=>"把八进制数转换为十进制数。",
			"pi()"=>"返回圆周率 PI 的值。",
			"pow()"=>"返回 x 的 y 次方。",
			"rad2deg()"=>"把弧度值转换为角度值。",
			"rand([mix[,max]])"=>"返回随机整数。",
			"round()"=>"对浮点数进行四舍五入。",
			"sin()"=>"返回一个数的正弦。",
			"sinh()"=>"返回一个数的双曲正弦。",
			"sqrt()"=>"返回一个数的平方根。",
			"srand()"=>"播种随机数生成器。",
			"tan()"=>"返回一个数的正切。",
			"tanh()"=>"返回一个数的双曲正切。"
		);
		print_r($Math);
	}
	function mt_rand($data){
		return success(mt_rand($data->min,$data->max));

	}
	function rand($data){
		return success(rand($data->min,$data->max));

	}
}