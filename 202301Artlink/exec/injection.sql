-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: i9a202.p.ssafy.io    Database: artlink
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `artlink`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `artlink` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `artlink`;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refresh_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'$2a$10$kv4kvNWzcCXi7URh4QeE2u5jgzoikcAi6WNq02z2/eKB2WurvgMQy','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeV9hZG1pbiIsInJvbGUiOiJST0xFX0FETUlOIiwiaWQiOjEsImV4cCI6MTY5NDkwOTE5NSwidXNlcm5hbWUiOiJzc2FmeV9hZG1pbiJ9.KuHFawU_dFM3QiFQiGqmXfu7ksjB8TtdwFyShyo69SLDW5dqq6zYABWyWLi71TSgJhFdVRNiIJS5t3xXAudFcA','ssafy_admin'),(2,'$2a$10$j8mZSThzIU.HiOJAnjpHEO0gXGQmqoyZJt1016.WwaAlKx7i7kuNu','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjEiLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlkIjoyLCJleHAiOjE2OTQ5MTUyODksInVzZXJuYW1lIjoiYWRtaW4xIn0.2F9rvUxQvoeN705lfHC5d_oSlqJ3sQ3PYGx--5Qv_maYwCv2x0tOtfqECiu6PjVN8Nc5aNOzkBnKw9Ri2TmfvQ','admin1');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `art_work`
--

DROP TABLE IF EXISTS `art_work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `art_work` (
  `art_work_pk` bigint NOT NULL AUTO_INCREMENT,
  `artist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `explanation` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `paint_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `x_coor` double DEFAULT NULL,
  `y_coor` double DEFAULT NULL,
  `exhibition_pk` int DEFAULT NULL,
  PRIMARY KEY (`art_work_pk`),
  KEY `FKncrpbno747f2nrqeao9fcf16g` (`exhibition_pk`),
  CONSTRAINT `FKncrpbno747f2nrqeao9fcf16g` FOREIGN KEY (`exhibition_pk`) REFERENCES `exhibition` (`exhibition_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `art_work`
--

LOCK TABLES `art_work` WRITE;
/*!40000 ALTER TABLE `art_work` DISABLE KEYS */;
INSERT INTO `art_work` VALUES (1,'박건희','Favorite Drawing 1','산 위에서의 구름 풍경','https://a202-s3-bucket.s3.ap-northeast-2.amazonaws.com/artworks/1/32b0a149-7705-4608-96e4-8ed3b8dce1fb-%22%EC%82%B0%20%EC%9C%84%EC%97%90%EC%84%9C%EC%9D%98%20%EA%B5%AC%EB%A6%84%20%ED%92%8D%EA%B2%BD%22',0,7.5,1),(2,'김수현','Favorite Drawing 2','비행기의 이륙','https://a202-s3-bucket.s3.ap-northeast-2.amazonaws.com/artworks/1/977f1cc2-0bcf-4b9c-9d3f-a899d4f84f52-%EB%B9%84%ED%96%89%EA%B8%B0%EC%9D%98%20%EC%9D%B4%EB%A5%99',0,4.8,1),(3,'조재웅','Favorite Drawing 3','골짜기','https://a202-s3-bucket.s3.ap-northeast-2.amazonaws.com/artworks/1/6cd0be03-7690-4300-96e2-ce1ccc2f2988-%EA%B3%A8%EC%A7%9C%EA%B8%B0',0,1.8,1),(4,'배정원','Favorite Drawing 4','피리부는 소년','https://a202-s3-bucket.s3.ap-northeast-2.amazonaws.com/artworks/1/21a0af4c-9152-4c10-b245-d452ef599459-%ED%94%BC%EB%A6%AC%EB%B6%80%EB%8A%94%20%EC%86%8C%EB%85%84',7.7,3.15,1),(5,'조준하','Favorite Drawing 5','야경','https://a202-s3-bucket.s3.ap-northeast-2.amazonaws.com/artworks/1/cc74e3b9-6080-4de6-9db4-bb7a512f4d2d-%EC%95%BC%EA%B2%BD',7.7,6.3,1),(6,'작가1','설명1','작품1','https://a202-s3-bucket.s3.ap-northeast-2.amazonaws.com/artworks/3/dbb34492-8639-44a3-bb93-44a5ad757455-%EC%9E%91%ED%92%881',123,234,3);
/*!40000 ALTER TABLE `art_work` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `device_pk` bigint NOT NULL AUTO_INCREMENT,
  `device_id` bigint NOT NULL,
  `phone_number` bigint NOT NULL,
  `exhibition_pk` int DEFAULT NULL,
  `gallery_pk` int DEFAULT NULL,
  PRIMARY KEY (`device_pk`),
  KEY `FKds9xffjdmd8u4bp48v5db4ml5` (`exhibition_pk`),
  KEY `FK7n1q84l4ew6gmvx5qegtptnhf` (`gallery_pk`),
  CONSTRAINT `FK7n1q84l4ew6gmvx5qegtptnhf` FOREIGN KEY (`gallery_pk`) REFERENCES `gallery` (`gallery_pk`),
  CONSTRAINT `FKds9xffjdmd8u4bp48v5db4ml5` FOREIGN KEY (`exhibition_pk`) REFERENCES `exhibition` (`exhibition_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exhibition`
--

DROP TABLE IF EXISTS `exhibition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exhibition` (
  `exhibition_pk` int NOT NULL AUTO_INCREMENT,
  `created_at` date DEFAULT NULL,
  `exhibition_explanation` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exhibition_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `exhibition_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `poster_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gallery_gallery_pk` int DEFAULT NULL,
  PRIMARY KEY (`exhibition_pk`),
  KEY `FK5lslph3i2xrj6qqem2fx97tf0` (`gallery_gallery_pk`),
  CONSTRAINT `FK5lslph3i2xrj6qqem2fx97tf0` FOREIGN KEY (`gallery_gallery_pk`) REFERENCES `gallery` (`gallery_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exhibition`
--

LOCK TABLES `exhibition` WRITE;
/*!40000 ALTER TABLE `exhibition` DISABLE KEYS */;
INSERT INTO `exhibition` VALUES (1,'2023-08-18','The best art','ssafy_exhibition',NULL,'https://a202-s3-bucket.s3.ap-northeast-2.amazonaws.com/exhibition/1/2eb73f8e-ca0b-4e83-9e0a-85487da6cc4f-ssafy_exhibition',1),(2,'2023-08-18','The best art','exhibition1',NULL,'https://a202-s3-bucket.s3.ap-northeast-2.amazonaws.com/exhibition/2/7d5c8d91-b510-4004-ad4b-65050dca66c3-exhibition1',1),(3,'2023-08-18','전시회 1입니다','Exhibition1',NULL,'https://a202-s3-bucket.s3.ap-northeast-2.amazonaws.com/exhibition/3/89a3be7f-61c5-4ae6-bf34-fff2111c5297-Exhibition1',2);
/*!40000 ALTER TABLE `exhibition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `gallery_pk` int NOT NULL AUTO_INCREMENT,
  `accepted` bit(1) DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gallery_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refresh_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`gallery_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (1,_binary '','','ssafy_gallery','$2a$10$iTlR1Nkel4z9ssLHDqHv0e2p.FyFYy3P/vsQZdm9Elx17LPqpTSGa',NULL,'ssafy_gallery'),(2,_binary '','','gallery1','$2a$10$9VLA9ud7deUrjom.Aw6Ls.K0bW.6giT56ZQTmPiFEAeVJUrFzhCP.',NULL,'gallery1');
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_event`
--

DROP TABLE IF EXISTS `post_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_event` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `art_work_pk` bigint DEFAULT NULL,
  `exhibition_pk` int DEFAULT NULL,
  `gallery_pk` int DEFAULT NULL,
  `userkey_pk` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK778r7mgjrgn4c45o914ykx9o` (`art_work_pk`),
  KEY `FK3hr3h32o1fehflmeve6maf5dn` (`exhibition_pk`),
  KEY `FKt602gxweuq350a27kiytose5w` (`gallery_pk`),
  KEY `FKpkt3jfy0a9ugbe6io7dwr8t0i` (`userkey_pk`),
  CONSTRAINT `FK3hr3h32o1fehflmeve6maf5dn` FOREIGN KEY (`exhibition_pk`) REFERENCES `exhibition` (`exhibition_pk`),
  CONSTRAINT `FK778r7mgjrgn4c45o914ykx9o` FOREIGN KEY (`art_work_pk`) REFERENCES `art_work` (`art_work_pk`),
  CONSTRAINT `FKpkt3jfy0a9ugbe6io7dwr8t0i` FOREIGN KEY (`userkey_pk`) REFERENCES `user_key` (`userkey_pk`),
  CONSTRAINT `FKt602gxweuq350a27kiytose5w` FOREIGN KEY (`gallery_pk`) REFERENCES `gallery` (`gallery_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_event`
--

LOCK TABLES `post_event` WRITE;
/*!40000 ALTER TABLE `post_event` DISABLE KEYS */;
INSERT INTO `post_event` VALUES (1,1,NULL,NULL,1),(2,3,NULL,NULL,1),(3,4,NULL,NULL,1),(4,5,NULL,NULL,1);
/*!40000 ALTER TABLE `post_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `selection`
--

DROP TABLE IF EXISTS `selection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `selection` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `time_stamp` datetime(6) DEFAULT NULL,
  `art_work_pk` bigint DEFAULT NULL,
  `device_pk` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK43wd39i66bf1wn6407e43ankc` (`art_work_pk`),
  KEY `FKean0y57mf7p8iq4nbge9k41v` (`device_pk`),
  CONSTRAINT `FK43wd39i66bf1wn6407e43ankc` FOREIGN KEY (`art_work_pk`) REFERENCES `art_work` (`art_work_pk`),
  CONSTRAINT `FKean0y57mf7p8iq4nbge9k41v` FOREIGN KEY (`device_pk`) REFERENCES `device` (`device_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selection`
--

LOCK TABLES `selection` WRITE;
/*!40000 ALTER TABLE `selection` DISABLE KEYS */;
/*!40000 ALTER TABLE `selection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_pk` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` bigint DEFAULT NULL,
  `profile_picture_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refresh_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ppsrac','$2a$10$t.dwNi0PS5YztPqAA51xl.o7o8GFYJ9gLtFs82MZYdnR6sbSdyeBC',8201024909170,'http://i9a202.p.ssafy.io:8080/static/default_profile.png','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsInJvbGUiOiJST0xFX1VTRVIiLCJpZCI6MSwiZXhwIjoxNjk0OTE1MzYyLCJ1c2VybmFtZSI6InVzZXIxIn0.urNwmLG57x59l6jMJzQJF0MJPQ_4pgLW37k9IbixGHmZxcvB173W3Y2oBmVMZwTgdFmUj5mwS7oXbHltQcc_IA','user1'),(2,'ssafy','$2a$10$1eoyrZMI./F2jRSzPIc8HOzDjJb/MK7rDkLWDRfj/JOY4krhl389W',8201012123434,'http://i9a202.p.ssafy.io:8080/static/default_profile.png','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FmeV91c2VyIiwicm9sZSI6IlJPTEVfVVNFUiIsImlkIjoyLCJleHAiOjE2OTQ5MTU1NjksInVzZXJuYW1lIjoic3NhZnlfdXNlciJ9.qq1Pbr4s_aSlr13cUHKZGzLHSuGvxUmhYKYu6r1ea_xh54bVdpl0_97mVOKsIEFoM5agGS8KPuU_wYEcxm8zNQ','ssafy_user'),(3,'admin','$2a$10$8IECQl.RQSAmkPcRjwiQ0e50t5d4llfK2p4m5dL.jt1PTFj8V54Eu',821011111111,'http://i9a202.p.ssafy.io:8080/static/default_profile.png','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJST0xFX1VTRVIiLCJpZCI6MywiZXhwIjoxNjk0OTE1MjE1LCJ1c2VybmFtZSI6ImFkbWluIn0.zyYHKLD0F_x3gr2l6IDRolODnIo7DQntXgMK5Rm-2V89xmI41yrCesN7EYqY2OOVs4yqo4FhcT7vhJph9sQoPg','admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_key`
--

DROP TABLE IF EXISTS `user_key`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_key` (
  `userkey_pk` bigint NOT NULL AUTO_INCREMENT,
  `hash_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` bigint DEFAULT NULL,
  `visit_date` date DEFAULT NULL,
  `exhibition_pk` int DEFAULT NULL,
  `gallery_pk` int DEFAULT NULL,
  `user_pk` int DEFAULT NULL,
  PRIMARY KEY (`userkey_pk`),
  KEY `FKau7eo498ej5iu8hsgq04e8oah` (`exhibition_pk`),
  KEY `FKiv7mkrlnuj9uebj6nos4yhijb` (`gallery_pk`),
  KEY `FKsg5w59qeinhtyuy07oo7y3fx` (`user_pk`),
  CONSTRAINT `FKau7eo498ej5iu8hsgq04e8oah` FOREIGN KEY (`exhibition_pk`) REFERENCES `exhibition` (`exhibition_pk`),
  CONSTRAINT `FKiv7mkrlnuj9uebj6nos4yhijb` FOREIGN KEY (`gallery_pk`) REFERENCES `gallery` (`gallery_pk`),
  CONSTRAINT `FKsg5w59qeinhtyuy07oo7y3fx` FOREIGN KEY (`user_pk`) REFERENCES `user` (`user_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_key`
--

LOCK TABLES `user_key` WRITE;
/*!40000 ALTER TABLE `user_key` DISABLE KEYS */;
INSERT INTO `user_key` VALUES (1,'4',NULL,'2023-08-18',1,1,2);
/*!40000 ALTER TABLE `user_key` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'artlink'
--

--
-- Current Database: `bridge`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `bridge` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `bridge`;

--
-- Table structure for table `anchor`
--

DROP TABLE IF EXISTS `anchor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anchor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `anchorid` int NOT NULL,
  `coorx` double NOT NULL,
  `coory` double NOT NULL,
  `exhibition_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `anchor_exhibition_id_a28c2a0e_fk_exhibition_id` (`exhibition_id`),
  CONSTRAINT `anchor_exhibition_id_a28c2a0e_fk_exhibition_id` FOREIGN KEY (`exhibition_id`) REFERENCES `exhibition` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anchor`
--

LOCK TABLES `anchor` WRITE;
/*!40000 ALTER TABLE `anchor` DISABLE KEYS */;
INSERT INTO `anchor` VALUES (1,1786,0.55,0,1),(2,1787,7.1,0,1),(3,1788,4.45,7.7,1);
/*!40000 ALTER TABLE `anchor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artwork`
--

DROP TABLE IF EXISTS `artwork`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artwork` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `artworkid` int NOT NULL,
  `coorx` double NOT NULL,
  `coory` double NOT NULL,
  `exhibition_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `artwork_exhibition_id_004f1d9e_fk_exhibition_id` (`exhibition_id`),
  CONSTRAINT `artwork_exhibition_id_004f1d9e_fk_exhibition_id` FOREIGN KEY (`exhibition_id`) REFERENCES `exhibition` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artwork`
--

LOCK TABLES `artwork` WRITE;
/*!40000 ALTER TABLE `artwork` DISABLE KEYS */;
INSERT INTO `artwork` VALUES (1,1,0,7.5,1),(2,2,0,4.8,1),(3,3,0,1.8,1),(4,4,7.7,3.15,1),(5,5,7.7,6.3,1),(6,6,123,234,3);
/*!40000 ALTER TABLE `artwork` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add anchor',7,'add_anchor'),(26,'Can change anchor',7,'change_anchor'),(27,'Can delete anchor',7,'delete_anchor'),(28,'Can view anchor',7,'view_anchor'),(29,'Can add voronoiresult',8,'add_voronoiresult'),(30,'Can change voronoiresult',8,'change_voronoiresult'),(31,'Can delete voronoiresult',8,'delete_voronoiresult'),(32,'Can view voronoiresult',8,'view_voronoiresult'),(33,'Can add voronoipoint',9,'add_voronoipoint'),(34,'Can change voronoipoint',9,'change_voronoipoint'),(35,'Can delete voronoipoint',9,'delete_voronoipoint'),(36,'Can view voronoipoint',9,'view_voronoipoint'),(37,'Can add artwork',10,'add_artwork'),(38,'Can change artwork',10,'change_artwork'),(39,'Can delete artwork',10,'delete_artwork'),(40,'Can view artwork',10,'view_artwork'),(41,'Can add exhibition',11,'add_exhibition'),(42,'Can change exhibition',11,'change_exhibition'),(43,'Can delete exhibition',11,'delete_exhibition'),(44,'Can view exhibition',11,'view_exhibition');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `object_repr` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(10,'artwork','artwork'),(9,'artwork','voronoipoint'),(8,'artwork','voronoiresult'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(7,'device','anchor'),(11,'exhibition','exhibition'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-08-18 00:05:53.966509'),(2,'auth','0001_initial','2023-08-18 00:05:55.350850'),(3,'admin','0001_initial','2023-08-18 00:05:55.594980'),(4,'admin','0002_logentry_remove_auto_add','2023-08-18 00:05:55.610042'),(5,'admin','0003_logentry_add_action_flag_choices','2023-08-18 00:05:55.624831'),(6,'exhibition','0001_initial','2023-08-18 00:05:55.678873'),(7,'artwork','0001_initial','2023-08-18 00:05:56.162560'),(8,'contenttypes','0002_remove_content_type_name','2023-08-18 00:05:56.322105'),(9,'auth','0002_alter_permission_name_max_length','2023-08-18 00:05:56.443958'),(10,'auth','0003_alter_user_email_max_length','2023-08-18 00:05:56.485963'),(11,'auth','0004_alter_user_username_opts','2023-08-18 00:05:56.500653'),(12,'auth','0005_alter_user_last_login_null','2023-08-18 00:05:56.601636'),(13,'auth','0006_require_contenttypes_0002','2023-08-18 00:05:56.611351'),(14,'auth','0007_alter_validators_add_error_messages','2023-08-18 00:05:56.629872'),(15,'auth','0008_alter_user_username_max_length','2023-08-18 00:05:56.748547'),(16,'auth','0009_alter_user_last_name_max_length','2023-08-18 00:05:56.872525'),(17,'auth','0010_alter_group_name_max_length','2023-08-18 00:05:56.918602'),(18,'auth','0011_update_proxy_permissions','2023-08-18 00:05:56.936643'),(19,'auth','0012_alter_user_first_name_max_length','2023-08-18 00:05:57.044020'),(20,'device','0001_initial','2023-08-18 00:05:57.186575'),(21,'sessions','0001_initial','2023-08-18 00:05:57.292644');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exhibition`
--

DROP TABLE IF EXISTS `exhibition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exhibition` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `exhibitionid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `exhibitionid` (`exhibitionid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exhibition`
--

LOCK TABLES `exhibition` WRITE;
/*!40000 ALTER TABLE `exhibition` DISABLE KEYS */;
INSERT INTO `exhibition` VALUES (1,1),(2,2),(3,3);
/*!40000 ALTER TABLE `exhibition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voronoipoint`
--

DROP TABLE IF EXISTS `voronoipoint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voronoipoint` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pointid` int NOT NULL,
  `coorx` double NOT NULL,
  `coory` double NOT NULL,
  `exhibition_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `voronoipoint_exhibition_id_fc3bd96a_fk_exhibition_id` (`exhibition_id`),
  CONSTRAINT `voronoipoint_exhibition_id_fc3bd96a_fk_exhibition_id` FOREIGN KEY (`exhibition_id`) REFERENCES `exhibition` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voronoipoint`
--

LOCK TABLES `voronoipoint` WRITE;
/*!40000 ALTER TABLE `voronoipoint` DISABLE KEYS */;
INSERT INTO `voronoipoint` VALUES (3,0,3.70536,3.3,1),(4,1,4.01071,4.725,1),(5,2,3.73312,6.15,1);
/*!40000 ALTER TABLE `voronoipoint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voronoiresult`
--

DROP TABLE IF EXISTS `voronoiresult`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voronoiresult` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `point1id` int NOT NULL,
  `point2id` int NOT NULL,
  `cwartworkid` int NOT NULL,
  `ccwartworkid` int NOT NULL,
  `exhibition_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `voronoiresult_exhibition_id_b880df91_fk_exhibition_id` (`exhibition_id`),
  CONSTRAINT `voronoiresult_exhibition_id_b880df91_fk_exhibition_id` FOREIGN KEY (`exhibition_id`) REFERENCES `exhibition` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voronoiresult`
--

LOCK TABLES `voronoiresult` WRITE;
/*!40000 ALTER TABLE `voronoiresult` DISABLE KEYS */;
INSERT INTO `voronoiresult` VALUES (8,-1,0,3,4,1),(9,0,-1,3,2,1),(10,-1,1,4,5,1),(11,0,1,2,4,1),(12,2,-1,2,1,1),(13,1,2,2,5,1),(14,2,-1,1,5,1);
/*!40000 ALTER TABLE `voronoiresult` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bridge'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18 10:55:48
