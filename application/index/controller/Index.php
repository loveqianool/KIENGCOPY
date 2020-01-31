<?php
namespace app\index\controller;
use Qrcode\Qrcode;
use think\Controller;
use think\Db;

class Index extends Controller {
	public function index() {
		$domain = request()->domain();
		$this->assign('domain', $domain);
		return $this->fetch('index/index');
	}

	public function qrwap() {
		header('Content-type: image/png');
		return Qrcode::Qr(request()->domain());
	}

	public function updl() {
		return json(['msg' => 'Success', 'status' => 0]);
	}

	public function stag() {
		// 判断文件类型
		$stype = request()->post('stype/s');
		// 判断是否阅读后就销毁
		$burn = request()->post('burn/s');
		$num = $burn == 'false' ? 10 : 1;
		if ($stype == 'file') {
			$file = request()->file('file');
			if ($file) {
				$info = $file->validate(['size' => 204800])->move(ROOT_PATH . 'public' . DS . 'uploads');
				if ($info) {
					$img = str_replace('\\', '/', $info->getSaveName());
					$file_path = '/uploads/' . $img;
					$key = randKey(4);
					$bool = Db::table('data')->insert([
						'tag' => $key,
						'file_path' => $file_path,
						'num' => $num,
						'name' => $file->getInfo()['name'],
						'add_time' => date('Y-m-d H:i:s'),
						'end_time' => date('Y-m-d H:i:s', strtotime('+1 day')),
					]);
					if ($bool) {
						return json(['status' => 0, 'msg' => 'ok', 'data' => ['tag' => $key, 'url' => request()->domain() . '/s/' . $key]]);
					} else {
						return json(['status' => 1, 'msg' => '数据库保存失败', 'data' => ['tag' => '', 'url' => '']]);
					}

				} else {
					// 上传失败获取错误信息
					return json(['status' => 1, 'msg' => '上传文件失败', 'data' => ['tag' => 'ssss', 'url' => $info->getError()]]);
				}
			}
		} else {
			$content = request()->post('content/s');
			$key = randKey(4);
			$file_path = '/';
			$bool = Db::table('data')->insert([
				'tag' => $key,
				'file_path' => $file_path,
				'num' => $num,
				'content' => htmlspecialchars($content),
				'add_time' => date('Y-m-d H:i:s'),
				'end_time' => date('Y-m-d H:i:s', strtotime('+1 day')),
			]);
			if ($bool) {
				return json(['status' => 0, 'msg' => 'ok', 'data' => ['tag' => $key, 'url' => request()->domain() . '/s/' . $key]]);
			} else {
				return json(['status' => 1, 'msg' => '数据库保存失败', 'data' => ['tag' => '', 'url' => '']]);
			}
		}

	}

	public function getData($key) {
		if (empty($key) || strlen($key) != 4) {
			return $this->redirect('/');
		}
		$data = Db::table('data')->where('tag', $key)->find();

		if ($data['num'] <= 0 || time() > strtotime($data['end_time']) || empty($data)) {
			$is = false;
		} else {
			$is = true;
		}
		if (!empty($data['content'])) {
			@Db::table('data')->where('tag', $key)->update(['num' => $data['num'] - 1]);
		}
		$type = empty($data['content']) ? 'file' : 'text';
		$this->assign('type', $type);
		$this->assign('is', $is);
		$this->assign('data', $data);
		return $this->fetch('index/data');
	}

	public function dl($key) {
		$token = $key;
		$data = Db::table('data')->where('tag', $token)->find();
		if ($data['num'] <= 0 || time() > strtotime($data['end_time']) || empty($data)) {
			return $this->redirect('/s/' . $key);
		} else {
			ob_clean();
			@Db::table('data')->where('tag', $token)->update(['num' => $data['num'] - 1]);
			$filepath = trim(str_replace('\\', '/', ROOT_PATH), '/') . '/public/' . $data['file_path'];
			$filename = $data['name'];
			if (!file_exists($filepath)) {
				return $this->redirect('/s/' . $key);
			}
			$filesize = filesize($filepath);
			$fp = fopen($filepath, "r");
			header("Content-type:application/octet-stream");
			header("Accept-Ranges:bytes");
			header("Accept-Length:" . $filesize);
			header("Content-Disposition: attachment; filename=" . $filename);
			$buffer = 1024;
			$buffer_count = 0;
			while (!feof($fp) && $filesize - $buffer_count > 0) {
				$data = fread($fp, $buffer);
				$buffer_count += $buffer;
				echo $data;
			}
			fclose($fp);

		}
	}
}
