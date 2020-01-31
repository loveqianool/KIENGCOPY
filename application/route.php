<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

use think\Route;

Route::get('/', 'index/Index/index');

Route::get('/qrwap', 'index/Index/qrwap');

Route::get('/updl/utok', 'index/Index/updl');
Route::post('/stag', 'index/Index/stag');
Route::get('/s/:key', 'index/Index/getData');
Route::get('/dl/:key', 'index/Index/dl');