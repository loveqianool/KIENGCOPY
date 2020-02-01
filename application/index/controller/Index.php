<?php
namespace app\index\controller;
use Qrcode\Qrcode;
use think\Controller;
use think\Db;

class Index extends Controller {
	// 首页
	public function index() {
		$domain = request()->domain();
		if (request()->isMobile()) {
			$css = true;
		} else {
			$css = false;
		}
		$this->assign('domain', $domain);
		$this->assign('css', $css);
		return $this->fetch('index/index');
	}

	// 手机端二维码(没啥用)
	public function qrwap() {
		header('Content-type: image/png');
		return Qrcode::Qr(request()->domain());
	}

	// 那个网站是阿里云oos的这个是验证token的方法,但是我这个是上传到本地的,因为是按照他的写,所以就写了这段.
	// 总结就是没啥用这个方法
	public function updl() {
		return json(['msg' => 'Success', 'status' => 0]);
	}
	// 上传文件
	public function stag() {
		// 判断文件类型
		$stype = request()->post('stype/s');
		// 判断是否阅读后就销毁
		$burn = request()->post('burn/s');
		// 立即销毁可读次数就是1 反之10
		$num = $burn == 'false' ? 10 : 1;
		if ($stype == 'file') {
			$file = request()->file('file');
			if ($file) {
				// 控制一下上传文件大小
				// ###这里没限制上传文件的后缀 可能会被上传PHP文件自己在服务器端限制一下 或者['size' => 204800]改成['size' => 204800,'ext'=>'jpg,png,zip......']
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
						'ip' => getIp(),
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
				'ip' => getIp(),
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
		if (request()->isMobile()) {
			$css = true;
		} else {
			$css = false;
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
		$this->assign('css', $css);
		return $this->fetch('index/data');
	}

	public function dl($key) {
		$token = $key;
		$data = Db::table('data')->where('tag', $token)->find();
		if ($data['num'] <= 0 || time() > strtotime($data['end_time']) || empty($data)) {
			return $this->redirect('/s/' . $key);
		} else {
			// 清空缓冲 下载
			ob_clean();
			@Db::table('data')->where('tag', $token)->update(['num' => $data['num'] - 1]);
			$filepath = THINK_PATH . '../public' . $data['file_path'];

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
