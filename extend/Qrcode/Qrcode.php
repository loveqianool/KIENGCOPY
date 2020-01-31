<?php
namespace QRCode;

class Qrcode {
	static public function Qr($text) {
		return \PHPQRCode\QRcode::png($text, false, "L", 12, 3, "./temp/wjc_.jpg");
	}
}
