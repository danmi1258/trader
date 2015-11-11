# MySQL-Front 5.1  (Build 4.2)

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE */;
/*!40101 SET SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES */;
/*!40103 SET SQL_NOTES='ON' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;


# Host: 127.0.0.1    Database: db_trader
# ------------------------------------------------------
# Server version 5.5.15

DROP DATABASE IF EXISTS `db_trader`;
CREATE DATABASE `db_trader` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `db_trader`;

#
# Source for table tbl_company
#

DROP TABLE IF EXISTS `tbl_company`;
CREATE TABLE `tbl_company` (
  `autocompanyid` int(11) NOT NULL AUTO_INCREMENT,
  `companyid` varchar(255) DEFAULT NULL,
  `certificate` varchar(255) DEFAULT NULL,
  `rechargemodel` varchar(255) DEFAULT NULL,
  `rechargeurl` varchar(255) DEFAULT NULL,
  `backurl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`autocompanyid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_company
#

LOCK TABLES `tbl_company` WRITE;
/*!40000 ALTER TABLE `tbl_company` DISABLE KEYS */;
INSERT INTO `tbl_company` VALUES (1,'000015','GDgLwwdK270Qj1w4xho8lyTpRQZV9Jm5x4NwWOTThUa4fMhEBK9jOXFrKRT6xhlJuU2FEa89ov0ryyjfJuuPkcGzO5CeVx5ZIrkkt1aBlZV36ySvHOMcNv8rncRiy3DQ','0','https://pay.ips.net.cn/ipayment.aspx','http://127.0.0.1:8087/pay/index.php/Home/Recharge/redirect_callback');
/*!40000 ALTER TABLE `tbl_company` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table tbl_drawcharge
#

DROP TABLE IF EXISTS `tbl_drawcharge`;
CREATE TABLE `tbl_drawcharge` (
  `autooperid` int(11) NOT NULL AUTO_INCREMENT,
  `drawid` varchar(255) DEFAULT NULL,
  `userid` varchar(255) DEFAULT NULL,
  `drawdate` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `bankcardnum` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`autooperid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_drawcharge
#

LOCK TABLES `tbl_drawcharge` WRITE;
/*!40000 ALTER TABLE `tbl_drawcharge` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_drawcharge` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table tbl_good
#

DROP TABLE IF EXISTS `tbl_good`;
CREATE TABLE `tbl_good` (
  `autogoodid` int(11) NOT NULL AUTO_INCREMENT,
  `goodid` int(11) NOT NULL DEFAULT '0',
  `goodname` varchar(255) DEFAULT NULL,
  `goodtype` varchar(255) DEFAULT NULL,
  `gooddesc` varchar(255) DEFAULT NULL,
  `swaptype` varchar(255) DEFAULT NULL,
  `digits` int(11) DEFAULT NULL,
  `point` double DEFAULT NULL,
  `contractsize` int(11) DEFAULT NULL,
  `calway` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`autogoodid`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_good
#

LOCK TABLES `tbl_good` WRITE;
/*!40000 ALTER TABLE `tbl_good` DISABLE KEYS */;
INSERT INTO `tbl_good` VALUES (1,0,'EURUSD',NULL,'Euro vs US Dollar','0',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (4,0,'AUDUSD',NULL,'Australian Dollar   vs  US Dollar','0',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (7,0,'NZDUSD',NULL,'New Zealand Dollar  vs US Dollar','0',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (8,0,'EURGBP',NULL,'Euro vs Great Britain Poud','4',5,1E-5,100000,'NO');
INSERT INTO `tbl_good` VALUES (9,0,'EURJPY',NULL,'Euro vs Japanese Yen','3',3,0.001,100000,'NO');
INSERT INTO `tbl_good` VALUES (10,0,'GBPJPY',NULL,'Great Britain Pound  vs Japanese Yen','2',3,0.001,100000,NULL);
INSERT INTO `tbl_good` VALUES (11,0,'USDHKD',NULL,'US Dollar vs Hong Kong Dollar','1',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (13,0,'USOUSD',NULL,'USO vs US Dollar','0',5,0.001,100000,NULL);
INSERT INTO `tbl_good` VALUES (16,0,'USDCNH',NULL,'US Dollar vs Chianese Unit of Currency','1',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (17,0,'AUDJPY',NULL,'Australian Dollar   vs  Japanese Yen','3',3,0.001,100000,NULL);
INSERT INTO `tbl_good` VALUES (18,0,'CHFJPY',NULL,'Swiss Franc  vs  Japanese Yen','2',3,0.001,100000,NULL);
INSERT INTO `tbl_good` VALUES (19,0,'CADJPY',NULL,'Canadian Dollar  vs  Japanese Yen','2',3,0.001,100000,NULL);
INSERT INTO `tbl_good` VALUES (20,0,'NZDJPY',NULL,'New Zealand Dollar  vs Japanese Yen','3',3,0.001,100000,NULL);
INSERT INTO `tbl_good` VALUES (21,0,'EURAUD',NULL,'Euro vs Australian Dollar','4',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (22,0,'GBPAUD',NULL,'Great Britain Pound  vs Australian Dollar','4',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (23,0,'EURCHF',NULL,'Euro vs Swiss Franc','3',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (24,0,'GBPCHF',NULL,'Great Britain Pound  vs Swiss Franc','3',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (25,0,'AUDCHF',NULL,'Australian Dollar   vs  Swiss Franc','3',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (26,0,'CADCHF',NULL,'Canadian Dollar  vs  Swiss Franc','2',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (27,0,'NZDCHF',NULL,'New Zealand Dollar vs Swiss Franc','3',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (28,0,'AUDCAD',NULL,'Australian Dollar   vs  Canadian Dollar','3',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (29,0,'EURCAD',NULL,'Euro vs Canadian Dollar','3',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (30,0,'NZDCAD',NULL,'New Zealand Dollar  vs Canadian Dollar','3',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (31,0,'GBPCAD',NULL,'Great Britain Pound  vs Canadian  Dollar','3',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (32,0,'AUDNZD',NULL,'Australian Dollar   vs  New Zealand Dollar','4',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (33,0,'EURNZD',NULL,'Euro vs New Zenland Dollar','4',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (34,0,'GBPNZD',NULL,'Great Britain Pound  vs New Zealand Dollar','4',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (37,0,'USDJPY',NULL,'US Dollar vs Japanese Yen','1',3,0.001,100000,NULL);
INSERT INTO `tbl_good` VALUES (38,0,'GBPUSD',NULL,'Great Britain Pound  vs US Dollar','0',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (39,0,'USDCHF',NULL,'US Dollar vs Swiss Franc','1',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (40,0,'USDCAD',NULL,'US Dollar vs Canadian Dollar','1',5,1E-5,100000,NULL);
INSERT INTO `tbl_good` VALUES (41,0,'XAUUSD',NULL,'Gold vs US Dollar','0',2,0.01,100000,NULL);
INSERT INTO `tbl_good` VALUES (42,0,'UKOUSD',NULL,'UKO vs US Dollar','0',3,0.001,100000,NULL);
INSERT INTO `tbl_good` VALUES (43,0,'USOUSD',NULL,'USO vs US Dollar','0',3,0.001,100000,NULL);
INSERT INTO `tbl_good` VALUES (44,0,'XAGUSD',NULL,'Silver vs US Dollar','0',3,0.001,100000,NULL);
/*!40000 ALTER TABLE `tbl_good` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table tbl_historytrade
#

DROP TABLE IF EXISTS `tbl_historytrade`;
CREATE TABLE `tbl_historytrade` (
  `autotradeid` int(11) NOT NULL AUTO_INCREMENT,
  `tradeid` varchar(255) DEFAULT NULL,
  `userid` varchar(255) DEFAULT NULL,
  `goodname` varchar(255) DEFAULT NULL,
  `tradetype` int(11) DEFAULT NULL,
  `tradenum` double DEFAULT NULL,
  `operstarttime` varchar(255) DEFAULT NULL,
  `operstartprice` double DEFAULT NULL,
  `operendtime` varchar(255) DEFAULT NULL,
  `operendprice` double DEFAULT NULL,
  `stoplossprice` double DEFAULT NULL,
  `stopgainprice` double DEFAULT NULL,
  `gainedmoney` double DEFAULT NULL,
  `commission` double DEFAULT NULL,
  `interest` double DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `istrade` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`autotradeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_historytrade
#

LOCK TABLES `tbl_historytrade` WRITE;
/*!40000 ALTER TABLE `tbl_historytrade` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_historytrade` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table tbl_news
#

DROP TABLE IF EXISTS `tbl_news`;
CREATE TABLE `tbl_news` (
  `autonewsid` int(11) NOT NULL AUTO_INCREMENT,
  `goodid` int(11) DEFAULT NULL,
  `askprice` double DEFAULT NULL,
  `bidprice` double DEFAULT NULL,
  `newsdate` datetime DEFAULT NULL,
  PRIMARY KEY (`autonewsid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_news
#

LOCK TABLES `tbl_news` WRITE;
/*!40000 ALTER TABLE `tbl_news` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_news` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table tbl_oper
#

DROP TABLE IF EXISTS `tbl_oper`;
CREATE TABLE `tbl_oper` (
  `autoperid` int(11) NOT NULL AUTO_INCREMENT,
  `operid` int(11) DEFAULT NULL,
  `operdate` varchar(255) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `ipaddr` varchar(11) DEFAULT NULL,
  `opercontent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`autoperid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_oper
#

LOCK TABLES `tbl_oper` WRITE;
/*!40000 ALTER TABLE `tbl_oper` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_oper` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table tbl_recharge
#

DROP TABLE IF EXISTS `tbl_recharge`;
CREATE TABLE `tbl_recharge` (
  `autooperid` int(11) NOT NULL AUTO_INCREMENT,
  `rechargeid` varchar(255) DEFAULT NULL,
  `userid` varchar(255) DEFAULT NULL,
  `rechargedate` varchar(255) DEFAULT NULL,
  `rechargetype` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`autooperid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_recharge
#

LOCK TABLES `tbl_recharge` WRITE;
/*!40000 ALTER TABLE `tbl_recharge` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_recharge` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table tbl_sysuser
#

DROP TABLE IF EXISTS `tbl_sysuser`;
CREATE TABLE `tbl_sysuser` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_sysuser
#

LOCK TABLES `tbl_sysuser` WRITE;
/*!40000 ALTER TABLE `tbl_sysuser` DISABLE KEYS */;
INSERT INTO `tbl_sysuser` VALUES (1,'admin','admin@qq.com','123456');
/*!40000 ALTER TABLE `tbl_sysuser` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table tbl_trade
#

DROP TABLE IF EXISTS `tbl_trade`;
CREATE TABLE `tbl_trade` (
  `autotradeid` int(11) NOT NULL AUTO_INCREMENT,
  `tradeid` varchar(255) DEFAULT NULL,
  `userid` varchar(255) DEFAULT NULL,
  `goodname` varchar(255) DEFAULT NULL,
  `tradetype` int(11) DEFAULT NULL,
  `tradenum` double DEFAULT NULL,
  `operstarttime` varchar(255) DEFAULT NULL,
  `operstartprice` double DEFAULT NULL,
  `operendtime` varchar(255) DEFAULT NULL,
  `operendprice` double DEFAULT NULL,
  `stoplossprice` double DEFAULT NULL,
  `stopgainprice` double DEFAULT NULL,
  `gainedmoney` double DEFAULT NULL,
  `commission` double DEFAULT NULL,
  `interest` double DEFAULT NULL,
  `limitpricetype` int(11) DEFAULT NULL,
  `limitprice` double DEFAULT NULL,
  `deadline` varchar(255) DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`autotradeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_trade
#

LOCK TABLES `tbl_trade` WRITE;
/*!40000 ALTER TABLE `tbl_trade` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_trade` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table tbl_user
#

DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user` (
  `autouserid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) DEFAULT '',
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `petname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `postcode` varchar(255) DEFAULT NULL,
  `phonenum` varchar(255) DEFAULT NULL,
  `mobilenum` varchar(255) DEFAULT NULL,
  `identitynum` varchar(255) DEFAULT NULL,
  `ischeck` varchar(255) DEFAULT NULL,
  `levenum` varchar(255) DEFAULT NULL,
  `balance` double DEFAULT NULL,
  `authnum` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `reemail` varchar(255) DEFAULT NULL,
  `reemailchecksum` varchar(255) DEFAULT NULL,
  `rephone` varchar(255) DEFAULT NULL,
  `rephonechecksum` varchar(255) DEFAULT NULL,
  `repasswordchecksum` varchar(255) DEFAULT NULL,
  `bindbank` varchar(255) DEFAULT NULL,
  `bindcardnum` varchar(255) DEFAULT NULL,
  `usertype` varchar(255) DEFAULT NULL,
  `userstatus` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`autouserid`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_user
#

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (42,'1','user','user@qq.com','user','123456',NULL,NULL,NULL,NULL,NULL,'13313334567','',NULL,'1','100',2000,'8qr6','/trader/Public/userAvatar/0.jpg',NULL,NULL,NULL,NULL,NULL,'中国工商银行','32118319890220321','注册用户','审核通过');
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
