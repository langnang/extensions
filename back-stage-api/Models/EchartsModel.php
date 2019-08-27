<?php



function grapEchartsExampleList(){
    set_time_limit(0);
		$html = file_get_contents("https://echarts.baidu.com/examples/index.html");
	    echo "<textarea style='width:1000px;height:300px;'>" . $html . "</textarea>";
}

grapEchartsExampleList();