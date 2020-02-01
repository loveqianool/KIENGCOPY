<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件
function getIp() {
	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
		$ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
		$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
		$ip = $_SERVER['REMOTE_ADDR'];
	}
	return $ip;
}
function randKey($length = 12, $type = "all") {
	$int_arr = array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0");
	$letter_arr = array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l");
	$len_data = array();
	for ($i = 0; $i < $length; $i++) {
		switch ($type) {
		case "int":
			$rand = $int_arr;
			break;
		case "letter":
			$rand = $letter_arr;
			break;
		default:
			$rand = array_merge($int_arr, $letter_arr);
			break;
		}
		$len_data[] = $rand[rand(0, count($rand) - 1)];
	}
	return implode("", $len_data);
}
