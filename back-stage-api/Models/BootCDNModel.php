<?php


/**
 * 
 */
class BootCDNModel
{
	public $id;
	public $name;
	public $description;
	public $heat;
	public $content;
	public $time;

	function grab_bootcdn_all_data(){
		set_time_limit(0);
		$html = file_get_contents("https://www.bootcdn.cn/all/");
	    // echo "<textarea style='width:1000px;height:300px;'>" . $html . "</textarea>";

	    // 匹配正则表达式
		preg_match_all('/<main class=packages-list-container id=all-packages>(.*)<\/main>/i',$html,$step1_main);
	    // var_dump($step1_main);
	    // echo "<textarea style='width:1000px;height:300px;'>" . $step1_main[0][0] . "</textarea>";


	    // 匹配正则表达式
		preg_match_all('/<a href=\/(.*?)\/ class="package list-group-item" target=_blank onclick="(.*?)"><div class=row><div class=col-md-3><h4 class=package-name>(.*?)<\/h4><\/div><div class="col-md-9 hidden-xs"><p class=package-description>(.*?)<\/p><\/div><div class="package-extra-info col-md-9 col-md-offset-3 col-xs-12"><span><i class="fa fa-star"><\/i>(.*?)<\/span><\/div><\/div><\/a>/i',$step1_main[0][0],$step2_a);
	    // var_dump($step2_a);
		$bootCND=array();
	    // 遍历匹配结果，将结果转化为json数组
		for($i=0;$i < count($step2_a[0]);$i++){
	    // for($i=count($step2_a[0])-5;$i < count($step2_a[0]);$i++){
	    // for($i=0;$i < 5;$i++){

			$arr_json=array('ID'=>$i+1,'name'=>$step2_a[1][$i],'description'=>$step2_a[4][$i],'heat'=>(int)$step2_a[5][$i]);
	        // var_dump($arr_json);

			array_push($bootCND,$arr_json);
	        // $sql="INSERT INTO `".$tbname."`(`id`, `name`, `description`, `heat`,`content`, `time`) VALUES (" . $arr_json["ID"]. ",'" . $arr_json["name"] . "','" . $arr_json["description"] . "'," . $arr_json["heat"] . ",'" . json_encode($arr_json["content"]) ."','" . date("Y-m-d h:i:sa") . "')";
	        // echo $sql;
	        // mysql_default($link,$sql);

	        // if($i==count($step2_a[0])){
	            // echo $i;
	        // }

		}
		return json_encode($bootCND);
	}
	function grab_bootcdn_content($url){
	    // 读取页面内容
		$html=file_get_contents($url);
	    // 匹配正则表达式
		preg_match_all('/<main class=container>(.*)<\/main>/i',$html,$step1_main);
	    // 匹配正则表达式
		preg_match_all('/<a class=version-anchor id=(.*?)><\/a><h3>(.*?)<\/h3><div class=package-version>(.*?)<\/div>/i',$step1_main[0][0],$step2_a);
		$bootCDN_list=array();
	    // 判断结果数量
		if(count($step2_a[0])>1){
	    // 遍历匹配结果，将结果转化为json数组
			for($i=0;$i < count($step2_a[0])-1;$i++){
	            // 匹配正则表达式
				preg_match_all('/<li class="list-group-item library js-https"><span class=library-url>(.*?)<\/span><\/li>/i',$step2_a[3][$i],$step3_li);

				$arr_json=array('version'=>$step2_a[1][$i],'package'=>$step3_li[1]);
				array_push($bootCDN_list,$arr_json);

			}
		}else if(count($step2_a[0])==1){
			preg_match_all('/<li class="list-group-item library js-https"><span class=library-url>(.*?)<\/span><\/li>/i',$step2_a[3][0],$step3_li);

			$arr_json=array('version'=>$step2_a[1][0],'package'=>$step3_li[1]);
			array_push($bootCDN_list,$arr_json);

		}
		
		return $bootCDN_list;
	}

}
?>