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
  PRIMARY KEY (`autogoodid`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_good
#

LOCK TABLES `tbl_good` WRITE;
/*!40000 ALTER TABLE `tbl_good` DISABLE KEYS */;
INSERT INTO `tbl_good` VALUES (1,0,'EURUSD',NULL,'Euro vs US Dollar','0',5,1E-5);
INSERT INTO `tbl_good` VALUES (2,0,'XAGUSD',NULL,'Silver vs US Dollar','0',3,0.001);
INSERT INTO `tbl_good` VALUES (3,0,'USDJPY',NULL,'US Dollar vs Japanese Yen','2',3,0.001);
INSERT INTO `tbl_good` VALUES (4,0,'AUDUSD',NULL,'Australian Dollar   vs  US Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (5,0,'USDCHF',NULL,'US Dollar vs Swiss Franc',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (6,0,'USDCAD',NULL,'US Dollar vs Canadian Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (7,0,'NZDUSD',NULL,'New Zealand Dollar  vs US Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (8,0,'EURGBP',NULL,'Euro vs Great Britain Poud',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (9,0,'EURJPY',NULL,'Euro vs Japanese Yen',NULL,3,0.001);
INSERT INTO `tbl_good` VALUES (10,0,'GBPJPY',NULL,'Great Britain Pound  vs Japanese Yen',NULL,3,0.001);
INSERT INTO `tbl_good` VALUES (11,0,'USDHKD',NULL,'US Dollar vs Hong Kong Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (12,0,'UKOUSD',NULL,'UKO vs US Dollar',NULL,3,0.001);
INSERT INTO `tbl_good` VALUES (13,0,'USOUSD',NULL,'USO vs US Dollar',NULL,5,0.001);
INSERT INTO `tbl_good` VALUES (14,0,'XAUUSD',NULL,'Gold vs US Dollar',NULL,2,0.01);
INSERT INTO `tbl_good` VALUES (15,0,'GBPUSD',NULL,'Great Britain Pound  vs US Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (16,0,'USDCNH',NULL,'US Dollar vs Chianese Unit of Currency',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (17,0,'AUDJPY',NULL,'Australian Dollar   vs  Japanese Yen',NULL,3,0.001);
INSERT INTO `tbl_good` VALUES (18,0,'CHFJPY',NULL,'Swiss Franc  vs  Japanese Yen',NULL,3,0.001);
INSERT INTO `tbl_good` VALUES (19,0,'CADJPY',NULL,'Canadian Dollar  vs  Japanese Yen',NULL,3,0.001);
INSERT INTO `tbl_good` VALUES (20,0,'NZDJPY',NULL,'New Zealand Dollar  vs Japanese Yen',NULL,3,0.001);
INSERT INTO `tbl_good` VALUES (21,0,'EURAUD',NULL,'Euro vs Australian Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (22,0,'GBPAUD',NULL,'Great Britain Pound  vs Australian Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (23,0,'EURCHF',NULL,'Euro vs Swiss Franc',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (24,0,'GBPCHF',NULL,'Great Britain Pound  vs Swiss Franc',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (25,0,'AUDCHF',NULL,'Australian Dollar   vs  Swiss Franc',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (26,0,'CADCHF',NULL,'Canadian Dollar  vs  Swiss Franc',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (27,0,'NZDCHF',NULL,'New Zealand Dollar vs Swiss Franc',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (28,0,'AUDCAD',NULL,'Australian Dollar   vs  Canadian Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (29,0,'EURCAD',NULL,'Euro vs Canadian Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (30,0,'NZDCAD',NULL,'New Zealand Dollar  vs Canadian Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (31,0,'GBPCAD',NULL,'Great Britain Pound  vs Canadian  Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (32,0,'AUDNZD',NULL,'Australian Dollar   vs  New Zealand Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (33,0,'EURNZD',NULL,'Euro vs New Zenland Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (34,0,'GBPNZD',NULL,'Great Britain Pound  vs New Zealand Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (35,0,'USDSGD',NULL,'US Dollar vs Singapoure Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (36,0,'EURUSD',NULL,'Euro vs US Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (37,0,'USDJPY',NULL,'US Dollar vs Japanese Yen',NULL,3,0.001);
INSERT INTO `tbl_good` VALUES (38,0,'GBPUSD',NULL,'Great Britain Pound  vs US Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (39,0,'USDCHF',NULL,'US Dollar vs Swiss Franc',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (40,0,'USDCAD',NULL,'US Dollar vs Canadian Dollar',NULL,5,1E-5);
INSERT INTO `tbl_good` VALUES (41,0,'XAUUSD',NULL,'Gold vs US Dollar',NULL,2,0.01);
INSERT INTO `tbl_good` VALUES (42,0,'UKOUSD',NULL,'UKO vs US Dollar',NULL,3,0.001);
INSERT INTO `tbl_good` VALUES (43,0,'USOUSD',NULL,'USO vs US Dollar',NULL,3,0.001);
INSERT INTO `tbl_good` VALUES (44,0,'XAGUSD',NULL,'Silver vs US Dollar',NULL,3,0.001);
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_historytrade
#

LOCK TABLES `tbl_historytrade` WRITE;
/*!40000 ALTER TABLE `tbl_historytrade` DISABLE KEYS */;
INSERT INTO `tbl_historytrade` VALUES (27,'1','1','USDJPY',2,1,'2015/10/10 03:06:32',-0.08,'2015/10/10 04:12:30',0,-100,50,1,NULL,NULL,NULL,'0');
INSERT INTO `tbl_historytrade` VALUES (28,'2','1','USDJPY',2,1,'2015/10/10 04:16:07',-0.08,'2015/10/10 04:45:29',0,-50,100,1,NULL,NULL,NULL,'0');
INSERT INTO `tbl_historytrade` VALUES (29,'3','1','EURUSD',0,1,'2015/10/13 23:57:43',1.13828,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1');
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
# Source for table tbl_openbarn
#

DROP TABLE IF EXISTS `tbl_openbarn`;
CREATE TABLE `tbl_openbarn` (
  `autoopenbarnid` int(11) NOT NULL AUTO_INCREMENT,
  `tradeid` bigint(20) DEFAULT NULL,
  `userid` varchar(255) DEFAULT NULL,
  `goodname` varchar(255) DEFAULT NULL,
  `tradetype` int(11) DEFAULT NULL,
  `tradenum` double DEFAULT NULL,
  `operstarttime` datetime DEFAULT NULL,
  `operstartprice` double DEFAULT NULL,
  `buyprice` double DEFAULT NULL,
  `sellprice` double DEFAULT NULL,
  `stoplossprice` double DEFAULT NULL,
  `stopgainprice` double DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`autoopenbarnid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_openbarn
#

LOCK TABLES `tbl_openbarn` WRITE;
/*!40000 ALTER TABLE `tbl_openbarn` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_openbarn` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_oper
#

LOCK TABLES `tbl_oper` WRITE;
/*!40000 ALTER TABLE `tbl_oper` DISABLE KEYS */;
INSERT INTO `tbl_oper` VALUES (1,1,'2015/10/07 16:41:52',1,'127.0.0.1','order #1 open(0) EURUSD in price 0.');
INSERT INTO `tbl_oper` VALUES (2,2,'2015/10/07 16:42:01',1,'127.0.0.1','order #2 open(0) USDJPY in price 0.');
INSERT INTO `tbl_oper` VALUES (3,3,'2015/10/07 17:11:23',1,'127.0.0.1','order #3 open(2) EURUSD in price -0.01.');
INSERT INTO `tbl_oper` VALUES (4,4,'2015/10/07 17:12:20',1,'127.0.0.1','order #4 open(3) EURUSD in price 1.01.');
INSERT INTO `tbl_oper` VALUES (5,5,'2015/10/07 17:12:44',1,'127.0.0.1','order #5 open(4) EURUSD in price 1.02.');
INSERT INTO `tbl_oper` VALUES (6,6,'2015/10/07 17:13:11',1,'127.0.0.1','order #6 open(5) EURUSD in price -0.2.');
INSERT INTO `tbl_oper` VALUES (7,7,'2015/10/09 02:12:14',1,'127.0.0.1','order #1 open(0) USDJPY in price 119.808.');
INSERT INTO `tbl_oper` VALUES (8,8,'2015/10/09 02:17:37',1,'127.0.0.1','order #1 close USDJPY in price 119.728.');
INSERT INTO `tbl_oper` VALUES (9,9,'2015/10/09 02:18:32',1,'127.0.0.1','order #2 open(0) EURUSD in price 1.13132.');
INSERT INTO `tbl_oper` VALUES (10,10,'2015/10/09 02:30:28',1,'127.0.0.1','order #3 open(0) EURUSD in price 1.12968.');
INSERT INTO `tbl_oper` VALUES (11,11,'2015/10/09 02:36:05',1,'127.0.0.1','order #4 open(0) EURUSD in price 1.12901.');
INSERT INTO `tbl_oper` VALUES (12,12,'2015/10/09 02:38:49',1,'127.0.0.1','order #5 open(0) EURUSD in price 1.12848.');
INSERT INTO `tbl_oper` VALUES (13,13,'2015/10/09 02:41:05',1,'127.0.0.1','order #6 open(0) EURUSD in price 1.12762.');
INSERT INTO `tbl_oper` VALUES (14,14,'2015/10/09 02:46:07',1,'127.0.0.1','order #7 open(0) EURUSD in price 1.12701.');
INSERT INTO `tbl_oper` VALUES (15,15,'2015/10/09 02:49:08',1,'127.0.0.1','order #1 open(0) EURUSD in price 1.1271.');
INSERT INTO `tbl_oper` VALUES (16,16,'2015/10/09 02:50:34',1,'127.0.0.1','order #1 open(0) EURUSD in price 1.12694.');
INSERT INTO `tbl_oper` VALUES (17,17,'2015/10/09 02:54:38',1,'127.0.0.1','order #2 open(1) USDJPY in price 119.92.');
INSERT INTO `tbl_oper` VALUES (18,18,'2015/10/09 03:00:29',1,'127.0.0.1','order #1 close EURUSD in price 1.12699.');
INSERT INTO `tbl_oper` VALUES (19,19,'2015/10/09 03:02:22',1,'127.0.0.1','order #2 close USDJPY in price 120.031.');
INSERT INTO `tbl_oper` VALUES (20,20,'2015/10/09 03:04:53',1,'127.0.0.1','order #3 open(2) USDJPY in price 100.');
INSERT INTO `tbl_oper` VALUES (21,21,'2015/10/09 03:10:48',1,'127.0.0.1','order #4 open(4) USDJPY in price 125.');
INSERT INTO `tbl_oper` VALUES (22,22,'2015/10/09 03:12:27',1,'127.0.0.1','order #5 open(3) USDJPY in price 150.');
INSERT INTO `tbl_oper` VALUES (23,23,'2015/10/09 03:13:11',1,'127.0.0.1','order #6 open(5) USDJPY in price 100.');
INSERT INTO `tbl_oper` VALUES (24,24,'2015/10/09 03:14:31',1,'127.0.0.1','order #3  USDJPY delete.');
INSERT INTO `tbl_oper` VALUES (25,25,'2015/10/09 03:29:07',1,'127.0.0.1','order #7 open(0) EURUSD in price 1.12758.');
INSERT INTO `tbl_oper` VALUES (26,26,'2015/10/09 03:29:11',1,'127.0.0.1','order #7 close EURUSD in price 0.');
INSERT INTO `tbl_oper` VALUES (27,27,'2015/10/09 03:34:16',1,'127.0.0.1','order #4  USDJPY delete.');
INSERT INTO `tbl_oper` VALUES (28,28,'2015/10/09 03:34:16',1,'127.0.0.1','order #5  USDJPY delete.');
INSERT INTO `tbl_oper` VALUES (29,29,'2015/10/09 03:34:16',1,'127.0.0.1','order #6  USDJPY delete.');
INSERT INTO `tbl_oper` VALUES (30,30,'2015/10/09 03:35:45',1,'127.0.0.1','order #8 open(2) USDCAD in price 1.301.');
INSERT INTO `tbl_oper` VALUES (31,31,'2015/10/09 03:37:06',1,'127.0.0.1','order #9 open(2) GBPUSD in price 1.535.');
INSERT INTO `tbl_oper` VALUES (32,32,'2015/10/09 03:37:48',1,'127.0.0.1','order #10 open(2) USDCAD in price 1.301.');
INSERT INTO `tbl_oper` VALUES (33,33,'2015/10/10 02:24:09',1,'127.0.0.1','order #10 open(5) USDJPY in price 120.2.');
INSERT INTO `tbl_oper` VALUES (34,34,'2015/10/10 02:36:41',1,'127.0.0.1','order #1 open(2) GBPUSD in price -0.0006.');
INSERT INTO `tbl_oper` VALUES (35,35,'2015/10/10 03:06:32',1,'127.0.0.1','order #1 open(2) USDJPY in price -0.08.');
INSERT INTO `tbl_oper` VALUES (36,36,'2015/10/10 04:12:31',1,'127.0.0.1','order #1 close USDJPY in price 0.');
INSERT INTO `tbl_oper` VALUES (37,37,'2015/10/10 04:16:07',1,'127.0.0.1','order #2 open(2) USDJPY in price -0.08.');
INSERT INTO `tbl_oper` VALUES (38,38,'2015/10/10 04:43:20',NULL,'127.0.0.1','order #2 close USDJPY in price 120.');
INSERT INTO `tbl_oper` VALUES (39,39,'2015/10/10 04:45:29',1,'127.0.0.1','order #2 close USDJPY in price 0.');
INSERT INTO `tbl_oper` VALUES (40,40,'2015/10/13 23:57:43',1,'127.0.0.1','order #3 open(0) EURUSD in price 1.13828.');
/*!40000 ALTER TABLE `tbl_oper` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table tbl_pendorder
#

DROP TABLE IF EXISTS `tbl_pendorder`;
CREATE TABLE `tbl_pendorder` (
  `autopendorderid` int(11) NOT NULL AUTO_INCREMENT,
  `tradeid` varchar(255) DEFAULT NULL,
  `userid` varchar(255) DEFAULT NULL,
  `goodname` varchar(255) DEFAULT NULL,
  `tradetype` int(11) DEFAULT NULL,
  `tradenum` double DEFAULT NULL,
  `pricebaseline` double DEFAULT NULL,
  `stoplossprice` double DEFAULT NULL,
  `stopgainprice` double DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  PRIMARY KEY (`autopendorderid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_pendorder
#

LOCK TABLES `tbl_pendorder` WRITE;
/*!40000 ALTER TABLE `tbl_pendorder` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_pendorder` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_recharge
#

LOCK TABLES `tbl_recharge` WRITE;
/*!40000 ALTER TABLE `tbl_recharge` DISABLE KEYS */;
INSERT INTO `tbl_recharge` VALUES (25,'20150929001915590239','1','20150929','01','RMB','102.02','succeed');
INSERT INTO `tbl_recharge` VALUES (26,'20151012002901447926','1','20151012','01','RMB','1002.02','succeed');
/*!40000 ALTER TABLE `tbl_recharge` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_trade
#

LOCK TABLES `tbl_trade` WRITE;
/*!40000 ALTER TABLE `tbl_trade` DISABLE KEYS */;
INSERT INTO `tbl_trade` VALUES (1,'3','1','EURUSD',0,1,'2015/10/13 23:57:43',1.13828,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
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
  `userAvatar` varchar(255) DEFAULT NULL,
  `reemail` varchar(255) DEFAULT NULL,
  `reemailchecksum` varchar(255) DEFAULT NULL,
  `rephone` varchar(255) DEFAULT NULL,
  `rephonechecksum` varchar(255) DEFAULT NULL,
  `repasswordchecksum` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`autouserid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

#
# Dumping data for table tbl_user
#

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (30,'1',NULL,'875161027@qq.com','hzc1','Wxt130506',NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'1','200',2204.06,'83zh','http://localhost:8087/trader/Public/userAvatar/1.jpg',NULL,NULL,NULL,NULL,'MYZZd1id');
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
