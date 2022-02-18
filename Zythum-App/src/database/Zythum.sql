-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: zythum
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `postal_code` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Andes'),(2,'Corona'),(3,'Heineken'),(4,'Isenbeck'),(5,'Imperial'),(6,'Budweiser'),(7,'Schneider'),(8,'Quilmes'),(9,'Salta'),(10,'Miller');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `banner` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Rubia','x'),(2,'Negra','x'),(3,'Roja','x');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `state` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brandId` int(11) NOT NULL,
  `subcategoryId` int(11) NOT NULL,
  `sizeId` int(11) NOT NULL,
  `tasteId` int(11) NOT NULL,
  `alcohol` int(10) NOT NULL,
  `amargor` int(10) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `density` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `brandId` (`brandId`),
  KEY `subcategoryId` (`subcategoryId`),
  KEY `sizeId` (`sizeId`),
  KEY `tasteId` (`tasteId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brandId`) REFERENCES `brands` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`subcategoryId`) REFERENCES `subcategories` (`id`),
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`sizeId`) REFERENCES `sizes` (`id`),
  CONSTRAINT `products_ibfk_4` FOREIGN KEY (`tasteId`) REFERENCES `tastes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,3,8,1,3,56,66,66,0,666,'Esto es un update','beer1.png',NULL,'2022-02-10 16:38:44',56),(3,4,1,4,2,13,19,678,82,207,'Nunc purus.','beer2.png',NULL,NULL,9),(4,7,5,4,2,7,9,600,84,144,'Praesent blandit lacinia erat.','default-img.png',NULL,NULL,7),(5,1,4,1,3,13,8,519,34,631,'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.','default-img.png',NULL,NULL,11),(6,10,5,3,2,8,9,444,7,740,'Morbi non quam nec dui luctus rutrum.','default-img.png',NULL,NULL,7),(7,4,2,1,1,11,5,233,5,649,'Vestibulum ac est lacinia nisi venenatis tristique.','default-img.png',NULL,NULL,5),(8,5,5,2,1,8,15,661,27,344,'Vivamus vel nulla eget eros elementum pellentesque.','default-img.png',NULL,NULL,7),(9,4,3,3,3,9,5,140,18,593,'Sed ante.','default-img.png',NULL,NULL,14),(10,3,5,4,2,7,15,370,76,267,'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.','default-img.png',NULL,NULL,5),(11,2,4,1,1,7,14,555,1,116,'Mauris lacinia sapien quis libero.','default-img.png',NULL,NULL,10),(12,5,2,1,1,10,9,672,66,253,'Sed vel enim sit amet nunc viverra dapibus.','default-img.png',NULL,NULL,11),(13,10,2,4,2,11,14,330,14,550,'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.','default-img.png',NULL,NULL,6),(14,2,5,1,3,9,7,592,61,191,'Etiam pretium iaculis justo.','default-img.png',NULL,NULL,5),(15,7,6,4,3,11,7,420,21,602,'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.','default-img.png',NULL,NULL,9),(17,9,5,2,1,11,12,399,98,153,'Morbi ut odio.','default-img.png',NULL,NULL,7),(18,2,1,5,1,9,11,392,15,471,'Mauris sit amet eros.','default-img.png',NULL,NULL,14),(20,4,5,3,2,13,18,163,39,755,'Duis aliquam convallis nunc.','default-img.png',NULL,NULL,12),(21,6,1,3,2,8,9,242,70,134,'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.','default-img.png',NULL,NULL,10),(22,7,8,2,1,13,17,466,20,288,'Donec semper sapien a libero.','default-img.png',NULL,NULL,7),(23,1,4,5,3,12,7,617,99,591,'Proin at turpis a pede posuere nonummy.','default-img.png',NULL,NULL,5),(24,6,8,2,2,11,6,345,46,619,'Morbi non quam nec dui luctus rutrum.','default-img.png',NULL,NULL,6),(25,6,7,1,2,11,16,566,12,480,'Aliquam quis turpis eget elit sodales scelerisque.','default-img.png',NULL,NULL,7),(26,5,4,2,2,10,7,137,24,538,'Duis mattis egestas metus.','default-img.png',NULL,NULL,11),(27,6,4,2,3,13,11,156,43,537,'Pellentesque eget nunc.','default-img.png',NULL,NULL,11),(28,4,2,4,2,8,10,367,48,400,'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.','default-img.png',NULL,NULL,14),(29,1,3,1,1,6,17,241,20,477,'Aenean sit amet justo.','default-img.png',NULL,NULL,13),(30,1,6,4,2,12,8,683,81,678,'Aenean lectus.','default-img.png',NULL,NULL,13),(31,5,3,3,3,11,19,260,1,252,'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.','default-img.png',NULL,NULL,11),(32,2,8,4,2,10,10,265,74,648,'In est risus, auctor sed, tristique in, tempus sit amet, sem.','default-img.png',NULL,NULL,6),(33,3,6,5,1,9,10,513,77,460,'Integer tincidunt ante vel ipsum.','default-img.png',NULL,NULL,14),(34,4,2,3,1,9,20,482,30,453,'Nulla justo.','default-img.png',NULL,NULL,5),(35,5,8,1,1,7,20,508,98,921,'Nulla nisl.','default-img.png',NULL,NULL,8),(36,6,2,3,1,12,19,234,61,657,'Aenean lectus.','default-img.png',NULL,NULL,13),(37,1,6,5,3,8,10,577,30,215,'Nam tristique tortor eu pede.','default-img.png',NULL,NULL,13),(38,2,4,1,3,8,15,229,63,358,'Praesent lectus.','default-img.png',NULL,NULL,11),(39,6,8,2,2,9,5,628,39,247,'Sed vel enim sit amet nunc viverra dapibus.','default-img.png',NULL,NULL,12),(40,10,5,5,3,12,10,120,82,373,'Nunc nisl.','default-img.png',NULL,NULL,7),(41,10,6,3,1,12,16,630,57,871,'Nam tristique tortor eu pede.','default-img.png',NULL,NULL,6),(42,1,3,3,3,13,19,277,62,455,'Morbi porttitor lorem id ligula.','default-img.png',NULL,NULL,6),(43,2,2,3,2,13,16,147,93,461,'Pellentesque viverra pede ac diam.','default-img.png',NULL,NULL,5),(44,10,4,2,1,13,15,134,66,106,'Nulla suscipit ligula in lacus.','default-img.png',NULL,NULL,5),(45,2,7,1,3,10,9,698,22,384,'In hac habitasse platea dictumst.','default-img.png',NULL,NULL,7),(46,5,7,4,2,8,10,698,53,728,'Sed vel enim sit amet nunc viverra dapibus.','default-img.png',NULL,NULL,7),(47,5,7,5,2,9,20,119,72,946,'Nulla ac enim.','default-img.png',NULL,NULL,14),(48,6,5,1,1,8,10,467,44,923,'Praesent blandit.','default-img.png',NULL,NULL,9),(49,10,7,2,1,11,19,339,37,217,'Praesent lectus.','default-img.png',NULL,NULL,11),(50,2,7,1,1,13,18,585,44,844,'Duis aliquam convallis nunc.','default-img.png',NULL,NULL,6),(52,8,3,5,1,8,16,621,85,904,'Nunc nisl.','default-img.png',NULL,NULL,6),(53,6,2,2,2,9,17,460,44,693,'Aenean fermentum.','default-img.png',NULL,NULL,5),(54,3,4,2,3,8,20,593,30,105,'Morbi ut odio.','default-img.png',NULL,NULL,12),(55,3,2,2,1,12,12,190,92,450,'Pellentesque ultrices mattis odio.','default-img.png',NULL,NULL,13),(56,10,2,4,2,11,6,605,56,384,'Etiam vel augue.','default-img.png',NULL,NULL,10),(57,3,6,4,2,9,16,450,72,439,'Cras non velit nec nisi vulputate nonummy.','default-img.png',NULL,NULL,14),(58,6,6,2,2,10,8,182,8,975,'Maecenas tincidunt lacus at velit.','default-img.png',NULL,NULL,6),(59,10,1,4,2,7,9,648,87,229,'Integer ac neque.','default-img.png',NULL,NULL,14),(60,7,8,2,3,7,13,613,5,954,'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.','default-img.png',NULL,NULL,11),(61,7,6,5,3,8,15,129,78,331,'In hac habitasse platea dictumst.','default-img.png',NULL,NULL,14),(62,8,8,4,1,8,11,284,71,785,'Phasellus id sapien in sapien iaculis congue.','default-img.png',NULL,NULL,11),(63,4,5,2,1,12,12,131,58,890,'Vestibulum sed magna at nunc commodo placerat.','default-img.png',NULL,NULL,14),(64,3,8,3,3,9,8,637,90,714,'Quisque ut erat.','default-img.png',NULL,NULL,6),(65,5,1,2,2,6,11,643,79,403,'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.','default-img.png',NULL,NULL,6),(66,5,4,3,1,12,20,426,5,936,'Cras in purus eu magna vulputate luctus.','default-img.png',NULL,NULL,12),(67,2,5,2,1,12,7,228,40,431,'Nullam sit amet turpis elementum ligula vehicula consequat.','default-img.png',NULL,NULL,12),(68,4,1,1,2,7,17,375,3,520,'Duis ac nibh.','default-img.png',NULL,NULL,7),(70,5,5,5,3,13,10,567,27,582,'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.','default-img.png',NULL,NULL,9),(71,4,8,3,2,13,6,202,88,298,'Donec vitae nisi.','default-img.png',NULL,NULL,6),(72,1,5,2,3,11,16,237,90,770,'Morbi vel lectus in quam fringilla rhoncus.','default-img.png',NULL,NULL,10),(73,1,3,4,2,8,19,325,77,927,'In hac habitasse platea dictumst.','default-img.png',NULL,NULL,6),(74,4,7,2,1,6,19,213,18,451,'In hac habitasse platea dictumst.','default-img.png',NULL,NULL,11),(75,8,1,3,2,8,19,256,37,399,'Donec vitae nisi.','default-img.png',NULL,NULL,12),(76,7,7,2,1,7,19,456,27,957,'Donec vitae nisi.','default-img.png',NULL,NULL,14),(77,10,7,1,3,11,14,631,74,896,'In hac habitasse platea dictumst.','default-img.png',NULL,NULL,11),(78,6,4,3,2,12,14,633,99,802,'Duis mattis egestas metus.','default-img.png',NULL,NULL,5),(79,5,3,2,3,12,11,527,65,380,'Maecenas ut massa quis augue luctus tincidunt.','default-img.png',NULL,NULL,10),(80,3,5,3,2,10,17,347,21,272,'Fusce consequat.','default-img.png',NULL,NULL,9),(81,8,2,2,3,6,10,531,74,758,'Duis consequat dui nec nisi volutpat eleifend.','default-img.png',NULL,NULL,11),(83,7,6,4,3,13,8,305,63,568,'Nulla suscipit ligula in lacus.','default-img.png',NULL,NULL,14),(85,6,3,1,1,11,20,347,38,800,'Integer non velit.','default-img.png',NULL,NULL,12),(86,4,7,4,2,8,8,630,39,565,'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.','default-img.png',NULL,NULL,5),(87,10,2,1,1,11,16,683,92,200,'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.','default-img.png',NULL,NULL,6),(88,6,3,1,1,13,9,316,61,314,'Quisque porta volutpat erat.','default-img.png',NULL,NULL,8),(89,7,2,4,3,12,10,335,43,113,'Vestibulum sed magna at nunc commodo placerat.','default-img.png',NULL,NULL,14),(90,5,8,3,1,8,15,528,97,855,'In est risus, auctor sed, tristique in, tempus sit amet, sem.','default-img.png',NULL,NULL,13),(91,3,7,2,2,12,6,136,8,972,'Suspendisse potenti.','default-img.png',NULL,NULL,13),(93,2,6,5,3,7,16,359,59,601,'Donec vitae nisi.','default-img.png',NULL,NULL,11);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sizes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `measure` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,269),(2,330),(3,473),(4,710),(5,1000);
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'lager',1,NULL,NULL),(2,'pilsener',1,NULL,NULL),(3,'IPA',1,NULL,NULL),(4,'block',2,NULL,NULL),(5,'porter',2,NULL,NULL),(6,'stout',2,NULL,NULL),(7,'amber',3,NULL,NULL),(8,'irish',3,NULL,NULL);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tastes`
--

DROP TABLE IF EXISTS `tastes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tastes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tastes`
--

LOCK TABLES `tastes` WRITE;
/*!40000 ALTER TABLE `tastes` DISABLE KEYS */;
INSERT INTO `tastes` VALUES (1,'fuerte'),(2,'ligero'),(3,'suave');
/*!40000 ALTER TABLE `tastes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(60) NOT NULL,
  `pass` varchar(60) NOT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `rol` int(2) NOT NULL DEFAULT 0,
  `avatar` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Marco Antonio','Aleman','new@mail.com','$2a$10$1zlplAjAUy6vZ9IiUhaLDuzB29qTBPohZHY6i6b9h4nU6VbE8/tiq','454545',1,'1644168156975_user-img.jpeg','2022-02-06 17:22:37','2022-02-18 05:10:22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'zythum'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18  2:22:41
