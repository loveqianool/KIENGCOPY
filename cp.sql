/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50553
 Source Host           : localhost:3306
 Source Schema         : cp

 Target Server Type    : MySQL
 Target Server Version : 50553
 File Encoding         : 65001

 Date: 01/02/2020 01:01:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for data
-- ----------------------------
DROP TABLE IF EXISTS `data`;
CREATE TABLE `data`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `file_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `num` int(5) NOT NULL DEFAULT 10 COMMENT '0为阅读后销毁',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `add_time` datetime NOT NULL COMMENT '添加时间',
  `end_time` datetime NOT NULL COMMENT '过期时间',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of data
-- ----------------------------
INSERT INTO `data` VALUES (20, '8T9T', '/', 9, '&lt;p&gt;&amp;lt;script&amp;gt;alert(1)&amp;lt;/script&amp;gt;&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;11&lt;/strong&gt;&lt;/p&gt;', '2020-02-01 00:51:48', '2020-02-02 00:51:48', NULL);
INSERT INTO `data` VALUES (21, '0GhV', '/uploads/20200201/5d5ab169574a030dc434e6af272b9d31.png', 10, NULL, '2020-02-01 00:58:30', '2020-02-02 00:58:30', '1.png');
INSERT INTO `data` VALUES (22, 'dV0f', '/uploads/20200201/39e66a0a615b9b143fd2e4393b7dd7f3.png', 10, NULL, '2020-02-01 00:58:41', '2020-02-02 00:58:41', '1.png');

SET FOREIGN_KEY_CHECKS = 1;
