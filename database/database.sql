-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: globde
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `catalogo_cortes`
--

DROP TABLE IF EXISTS `catalogo_cortes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo_cortes` (
  `id_corte` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_corte`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_cortes`
--

LOCK TABLES `catalogo_cortes` WRITE;
/*!40000 ALTER TABLE `catalogo_cortes` DISABLE KEYS */;
INSERT INTO `catalogo_cortes` VALUES (1,'Fade bajo','Degradado suave desde la sien','fade_bajo.jpg'),(2,'Fade alto','Degradado moderno sobre la oreja','fade_alto.jpg'),(3,'Corte clasico','Estilo tradicional atemporal','clasico.jpg'),(4,'Barba perfilada','Lineas definidas con navaja','barba.jpg'),(5,'Undercut','Laterales rapados con tope largo','undercut.jpg'),(6,'Texturizado','Corte con movimiento y textura','texturizado.jpg'),(7,'Buzz cut','Corte al ras uniforme','buzz_cut.jpg'),(8,'Pompadour','Volumen frontal con laterales limpios','pompadour.jpg');
/*!40000 ALTER TABLE `catalogo_cortes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citas` (
  `id_cita` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_servicio` int NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` enum('pendiente','confirmada','cancelada','completada','no asistio') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pendiente',
  `observaciones` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_cita`),
  UNIQUE KEY `uq_barbero_horario` (`id_usuario`,`fecha`,`hora`),
  KEY `fk_citas_servicio` (`id_servicio`),
  KEY `idx_citas_fecha` (`fecha`),
  KEY `idx_citas_cliente` (`id_cliente`),
  KEY `idx_citas_estado` (`estado`),
  CONSTRAINT `fk_citas_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `fk_citas_servicio` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id_servicio`),
  CONSTRAINT `fk_citas_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
INSERT INTO `citas` VALUES (1,7,2,2,'2026-02-05','09:00:00','completada','Fade con linea en la sien'),(2,4,3,4,'2026-02-10','10:30:00','completada','Combo completo primer servicio'),(3,1,2,1,'2026-02-18','14:00:00','completada','Corte clasico corto'),(4,9,3,3,'2026-02-25','11:00:00','completada','Barba a navaja'),(5,2,4,2,'2026-03-03','09:30:00','completada','Degradado estilo moderno'),(6,7,3,2,'2026-03-08','10:00:00','completada','Fade alto con diseno'),(7,1,2,4,'2026-03-15','13:00:00','completada','Combo completo mensual'),(8,3,4,1,'2026-03-20','10:00:00','completada','Corte rapido'),(9,7,2,6,'2026-04-02','11:30:00','completada','Tinte oscuro caoba'),(10,4,3,4,'2026-04-08','14:30:00','completada','Combo segundo mes'),(11,6,4,1,'2026-04-12','09:00:00','completada','Primer visita del local'),(12,9,2,3,'2026-04-17','15:00:00','completada','Solo barba esta vez'),(13,1,3,2,'2026-04-22','10:00:00','completada','Fade con diseno en nuca'),(14,4,4,6,'2026-05-05','11:00:00','completada','Tinte rubio platino'),(15,7,2,4,'2026-05-12','09:00:00','completada','Combo tercer mes'),(16,5,2,1,'2026-04-14','10:00:00','cancelada','Cliente cancelo por trabajo'),(17,8,3,2,'2026-04-20','12:00:00','no asistio','No se presento sin avisar'),(18,6,4,3,'2026-05-02','10:00:00','cancelada','Reagendara la proxima semana'),(19,10,2,1,'2026-05-20','14:00:00','cancelada','Viaje de ultimo momento'),(20,12,3,5,'2026-05-28','09:00:00','no asistio','Sin aviso previo'),(21,1,2,2,'2026-06-10','10:00:00','confirmada','Fade bajo preferido'),(22,2,3,1,'2026-06-10','11:00:00','confirmada','Corte mensual'),(23,7,4,4,'2026-06-11','09:00:00','confirmada','Combo mensual habitual'),(24,9,2,3,'2026-06-11','11:00:00','confirmada','Solo barba perfilada'),(25,4,3,2,'2026-06-12','10:00:00','confirmada','Degradado alto'),(26,3,2,2,'2026-06-17','15:00:00','pendiente','Fade con diseno en nuca'),(27,7,3,6,'2026-06-18','10:30:00','pendiente','Retoque de tinte'),(28,4,4,4,'2026-06-20','13:00:00','pendiente','Combo cuarto mes'),(29,11,2,1,'2026-06-24','09:00:00','pendiente','Primera cita del cliente'),(30,13,3,5,'2026-06-25','11:00:00','confirmada','Corte infantil para su hijo'),(31,17,4,6,'2026-06-16','16:35:00','confirmada','Balayage dorado claro'),(32,17,2,5,'2026-06-14','17:30:00','pendiente',''),(33,20,3,1,'2026-06-17','18:00:00','pendiente','Prueba'),(34,20,3,2,'2026-06-17','18:05:00','pendiente','');
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_registro` date NOT NULL DEFAULT (curdate()),
  `puntaje` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_cliente`),
  KEY `fk_clientes_usuario` (`id_usuario`),
  CONSTRAINT `fk_clientes_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `chk_puntaje` CHECK ((`puntaje` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,5,'Pedro Gomez','3105481293','pedro.gomez01@gmail.com','2026-02-03',60),(2,6,'Laura Ramirez','3112345678','laura.ramirez@gmail.com','2026-02-10',35),(3,7,'Miguel Torres','3198765432','miguel.torres@gmail.com','2026-02-18',25),(4,8,'Sofia Herrera','3123456789','sofia.herrera@gmail.com','2026-03-01',80),(5,9,'Camilo Vargas','3134567890','camilo.vargas@gmail.com','2026-03-10',10),(6,10,'Valentina Mora','3145678901','valentina.mora@gmail.com','2026-03-22',15),(7,11,'Diego Castillo','3156789012','diego.castillo@gmail.com','2026-04-05',100),(8,12,'Natalia Ospina','3167890123','natalia.ospina@gmail.com','2026-04-12',5),(9,13,'Esteban Rios','3178901234','esteban.rios@gmail.com','2026-04-20',40),(10,14,'Juliana Perez','3189012345','juliana.perez@gmail.com','2026-05-02',20),(11,15,'Hector Ruiz','3190123456','hector.ruiz@gmail.com','2026-05-08',10),(12,16,'Manuela Jimenez','3201234567','manuela.jimenez@gmail.com','2026-05-12',0),(13,17,'Sebastian Guerrero','3212345678','sebastian.guerrero@gmail.com','2026-05-18',0),(14,18,'Daniela Moreno','3223456789','daniela.moreno@gmail.com','2026-05-20',5),(15,19,'Felipe Cardona','3234567890','felipe.cardona@gmail.com','2026-05-25',0),(16,21,'Laura Cepeda ','3126703452','laura12@gmail.com','2026-06-13',0),(17,22,'Laura Cepeda Gamba','3248765213','laura@gmail.com','2026-06-13',0),(18,23,'Maria Gomez ','3247659821','maria@globde.com','2026-06-13',0),(19,24,'Laura Daniela Cepeda ','3225605693','danielacepedagamba@gmail.com','2026-06-16',0),(20,26,'Dayanna Patiño','3222987632','criscam1611@gmail.com','2026-06-17',0);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_factura`
--

DROP TABLE IF EXISTS `detalle_factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_factura` (
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  `id_factura` int NOT NULL,
  `id_servicio` int NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `fk_detalle_factura` (`id_factura`),
  KEY `fk_detalle_servicio` (`id_servicio`),
  CONSTRAINT `fk_detalle_factura` FOREIGN KEY (`id_factura`) REFERENCES `facturas` (`id_factura`),
  CONSTRAINT `fk_detalle_servicio` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id_servicio`),
  CONSTRAINT `chk_detalle_precio` CHECK ((`precio` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_factura`
--

LOCK TABLES `detalle_factura` WRITE;
/*!40000 ALTER TABLE `detalle_factura` DISABLE KEYS */;
INSERT INTO `detalle_factura` VALUES (1,1,2,25000.00),(2,2,4,35000.00),(3,3,1,20000.00),(4,4,3,15000.00),(5,5,2,25000.00),(6,6,2,25000.00),(7,7,4,35000.00),(8,8,1,20000.00),(9,9,6,45000.00),(10,10,4,35000.00),(11,11,1,20000.00),(12,12,3,15000.00),(13,13,2,25000.00),(14,14,6,45000.00),(15,15,4,35000.00);
/*!40000 ALTER TABLE `detalle_factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturas` (
  `id_factura` int NOT NULL AUTO_INCREMENT,
  `id_cita` int NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`id_factura`),
  UNIQUE KEY `id_cita` (`id_cita`),
  CONSTRAINT `fk_facturas_cita` FOREIGN KEY (`id_cita`) REFERENCES `citas` (`id_cita`),
  CONSTRAINT `chk_total` CHECK ((`total` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
INSERT INTO `facturas` VALUES (1,1,25000.00,'2026-02-05'),(2,2,35000.00,'2026-02-10'),(3,3,20000.00,'2026-02-18'),(4,4,15000.00,'2026-02-25'),(5,5,25000.00,'2026-03-03'),(6,6,25000.00,'2026-03-08'),(7,7,35000.00,'2026-03-15'),(8,8,20000.00,'2026-03-20'),(9,9,45000.00,'2026-04-02'),(10,10,35000.00,'2026-04-08'),(11,11,20000.00,'2026-04-12'),(12,12,15000.00,'2026-04-17'),(13,13,25000.00,'2026-04-22'),(14,14,45000.00,'2026-05-05'),(15,15,35000.00,'2026-05-12');
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `id_token` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `token_hash` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_token`),
  KEY `idx_password_reset_token_hash` (`token_hash`),
  KEY `idx_password_reset_usuario` (`id_usuario`),
  CONSTRAINT `fk_password_reset_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
INSERT INTO `password_reset_tokens` VALUES (1,24,'b095ba2deca19c119e53baffa4401d71d5b373f355573f0959029fce15ce257e','2026-06-16 20:19:52',1,'2026-06-16 19:49:52'),(2,24,'a0de74fb25e03a4653454028e07e262eb4fd4b8748db17e7f431d72c9d4174a1','2026-06-16 20:23:45',1,'2026-06-16 19:53:45'),(3,24,'f4e02ace7e38d37214f71944a81747f05a98105d03cfc63b6b685f3b8d286517','2026-06-16 20:33:01',1,'2026-06-16 20:03:00'),(4,24,'72db6d1735a4c2feebbf93049185b4621148e2caee8e6ff5aca921bc6b2fb601','2026-06-16 20:40:09',1,'2026-06-16 20:10:09'),(5,24,'faba50180fc25a0328362370a5163d5e806f454d34c9261a031dcd9613fe5e43','2026-06-16 20:41:58',1,'2026-06-16 20:11:57'),(6,24,'394e336c80266a98d77d2842582bc5018da7e4fdbc07cd039b18699bf1f4e20e','2026-06-17 14:01:25',1,'2026-06-17 13:31:25');
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penalidades`
--

DROP TABLE IF EXISTS `penalidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `penalidades` (
  `id_penalidad` int NOT NULL AUTO_INCREMENT,
  `id_cita` int NOT NULL,
  `id_usuario` int NOT NULL,
  `motivo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` decimal(10,2) NOT NULL DEFAULT '0.00',
  `fecha` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`id_penalidad`),
  KEY `fk_penalidades_cita` (`id_cita`),
  KEY `fk_penalidades_usuario` (`id_usuario`),
  CONSTRAINT `fk_penalidades_cita` FOREIGN KEY (`id_cita`) REFERENCES `citas` (`id_cita`),
  CONSTRAINT `fk_penalidades_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `chk_penalidad_valor` CHECK ((`valor` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penalidades`
--

LOCK TABLES `penalidades` WRITE;
/*!40000 ALTER TABLE `penalidades` DISABLE KEYS */;
INSERT INTO `penalidades` VALUES (1,16,5,'Cancelacion sin aviso de 24h',5000.00,'2026-04-14'),(2,17,8,'No asistio a cita confirmada',8000.00,'2026-04-20'),(3,18,6,'Cancelacion el mismo dia de la cita',5000.00,'2026-05-02'),(4,19,10,'Cancelacion sin aviso de 24h',5000.00,'2026-05-20'),(5,20,12,'No asistio, segunda vez en el mes',10000.00,'2026-05-28');
/*!40000 ALTER TABLE `penalidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranking_barberos`
--

DROP TABLE IF EXISTS `ranking_barberos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranking_barberos` (
  `id_ranking` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `nivel` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Bronce',
  `porcentaje_incremento` decimal(5,2) NOT NULL DEFAULT '0.00',
  `total_citas` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_ranking`),
  UNIQUE KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `fk_ranking_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `chk_total_citas` CHECK ((`total_citas` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranking_barberos`
--

LOCK TABLES `ranking_barberos` WRITE;
/*!40000 ALTER TABLE `ranking_barberos` DISABLE KEYS */;
INSERT INTO `ranking_barberos` VALUES (1,2,'Oro',18.00,7),(2,3,'Plata',12.00,5),(3,4,'Bronce',6.00,3),(4,25,'Bronce',0.00,0);
/*!40000 ALTER TABLE `ranking_barberos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador','Control total del sistema'),(2,'Barbero','Gestiona citas y clientes'),(3,'Cliente','Agenda y consulta sus citas');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `id_servicio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `duracion_minutos` int NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_servicio`),
  CONSTRAINT `chk_duracion` CHECK ((`duracion_minutos` > 0)),
  CONSTRAINT `chk_precio` CHECK ((`precio` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'Corte clasico','Corte con maquina y tijera',20000.00,30,1),(2,'Corte degradado','Estilo fade moderno',25000.00,40,1),(3,'Arreglo de barba','Perfilado y arreglo de barba',15000.00,20,1),(4,'Corte + barba','Combo completo de corte y barba',35000.00,50,1),(5,'Corte infantil','Corte especial para ninos',18000.00,25,1),(6,'Tinte de cabello','Aplicacion de color profesional',45000.00,90,1);
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens_recuperacion`
--

DROP TABLE IF EXISTS `tokens_recuperacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens_recuperacion` (
  `id_token` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiracion` datetime NOT NULL,
  `usado` tinyint(1) NOT NULL DEFAULT '0',
  `fecha_envio` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_token`),
  UNIQUE KEY `token` (`token`),
  KEY `fk_tokens_usuario` (`id_usuario`),
  CONSTRAINT `fk_tokens_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens_recuperacion`
--

LOCK TABLES `tokens_recuperacion` WRITE;
/*!40000 ALTER TABLE `tokens_recuperacion` DISABLE KEYS */;
INSERT INTO `tokens_recuperacion` VALUES (1,6,'tok_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4','2026-04-15 10:30:00',1,'2026-04-15 09:30:00'),(2,11,'tok_b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5','2026-05-10 14:00:00',1,'2026-05-10 13:00:00'),(3,14,'tok_c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6','2026-06-12 08:00:00',0,'2026-06-11 08:00:00'),(4,6,'tok_test123','2026-06-11 23:59:00',0,'2026-06-17 12:51:07');
/*!40000 ALTER TABLE `tokens_recuperacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrasena` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_rol` int NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_creacion` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo` (`correo`),
  KEY `fk_usuarios_rol` (`id_rol`),
  CONSTRAINT `fk_usuarios_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Juan Felipe Canon','juan.canon@globde.com','JFcanon2026','3004512387',1,1,'2026-01-10'),(2,'Carlos Mendez','carlos.mendez@globde.com','CarMend98','3017854923',2,1,'2026-01-10'),(3,'Andres Salgado','andres.salgado@globde.com','SalgaBarb22','3026481395',2,1,'2026-01-10'),(4,'Ricardo Pena','ricardo.pena@globde.com','RicPena2026','3031234567',2,1,'2026-01-15'),(5,'Pedro Gomez','pedro.gomez01@gmail.com','PedroG2026','3105481293',3,1,'2026-02-03'),(6,'Laura Ramirez','laura.ramirez@gmail.com','LauraR2026','3112345678',3,1,'2026-02-10'),(7,'Miguel Torres','miguel.torres@gmail.com','MiguelT99','3198765432',3,1,'2026-02-18'),(8,'Sofia Herrera','sofia.herrera@gmail.com','SofiaH2026','3123456789',3,1,'2026-03-01'),(9,'Camilo Vargas','camilo.vargas@gmail.com','CamiloV456','3134567890',3,1,'2026-03-10'),(10,'Valentina Mora','valentina.mora@gmail.com','ValeMora88','3145678901',3,1,'2026-03-22'),(11,'Diego Castillo','diego.castillo@gmail.com','DiegoCast2026','3156789012',3,1,'2026-04-05'),(12,'Natalia Ospina','natalia.ospina@gmail.com','NataOsp99','3167890123',3,1,'2026-04-12'),(13,'Esteban Rios','esteban.rios@gmail.com','EsteR2026','3178901234',3,1,'2026-04-20'),(14,'Juliana Perez','juliana.perez@gmail.com','JuliPerez77','3189012345',3,1,'2026-05-02'),(15,'Hector Ruiz','hector.ruiz@gmail.com','HectRuiz55','3190123456',3,1,'2026-05-08'),(16,'Manuela Jimenez','manuela.jimenez@gmail.com','ManuJim2026','3201234567',3,1,'2026-05-12'),(17,'Sebastian Guerrero','sebastian.guerrero@gmail.com','SebGuerr99','3212345678',3,1,'2026-05-18'),(18,'Daniela Moreno','daniela.moreno@gmail.com','DaniMore2026','3223456789',3,1,'2026-05-20'),(19,'Felipe Cardona','felipe.cardona@gmail.com','FelipeC88','3234567890',3,1,'2026-05-25'),(20,'Jorge Muñoz','jorge.munoz@gmail.com','JorgeMu2026','3245678901',3,0,'2026-03-05'),(21,'Laura Cepeda ','laura12@gmail.com','LauraC','3126703452',3,1,'2026-06-13'),(22,'Laura Cepeda Gamba','laura@gmail.com','LauraC','3248765213',3,1,'2026-06-13'),(23,'Maria Gomez ','maria@globde.com','MariaG','3247659821',3,1,'2026-06-13'),(24,'Laura Daniela Cepeda ','danielacepedagamba@gmail.com','LauraC','3225605693',3,1,'2026-06-16'),(25,'José Rivera','jose.riv@globde.com','Jose2026','3214658793',2,1,'2026-06-16'),(26,'Dayanna Patiño','criscam1611@gmail.com','123456','3222987632',3,1,'2026-06-17');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vista_citas_detalle`
--

DROP TABLE IF EXISTS `vista_citas_detalle`;
/*!50001 DROP VIEW IF EXISTS `vista_citas_detalle`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_citas_detalle` AS SELECT 
 1 AS `id_cita`,
 1 AS `cliente`,
 1 AS `telefono_cliente`,
 1 AS `barbero`,
 1 AS `servicio`,
 1 AS `precio_cop`,
 1 AS `fecha`,
 1 AS `hora`,
 1 AS `estado`,
 1 AS `observaciones`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_clientes_resumen`
--

DROP TABLE IF EXISTS `vista_clientes_resumen`;
/*!50001 DROP VIEW IF EXISTS `vista_clientes_resumen`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_clientes_resumen` AS SELECT 
 1 AS `nombre`,
 1 AS `telefono`,
 1 AS `correo`,
 1 AS `fecha_registro`,
 1 AS `puntaje`,
 1 AS `total_citas`,
 1 AS `citas_completadas`,
 1 AS `citas_canceladas`,
 1 AS `inasistencias`,
 1 AS `citas_activas`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_ingresos_barbero`
--

DROP TABLE IF EXISTS `vista_ingresos_barbero`;
/*!50001 DROP VIEW IF EXISTS `vista_ingresos_barbero`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_ingresos_barbero` AS SELECT 
 1 AS `barbero`,
 1 AS `nivel`,
 1 AS `servicios_cobrados`,
 1 AS `total_ingresos`,
 1 AS `promedio_por_servicio`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vista_citas_detalle`
--

/*!50001 DROP VIEW IF EXISTS `vista_citas_detalle`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50001 VIEW `vista_citas_detalle` AS select `c`.`id_cita` AS `id_cita`,`cl`.`nombre` AS `cliente`,`cl`.`telefono` AS `telefono_cliente`,`u`.`nombre` AS `barbero`,`s`.`nombre` AS `servicio`,format(`s`.`precio`,0) AS `precio_cop`,`c`.`fecha` AS `fecha`,time_format(`c`.`hora`,'%H:%i') AS `hora`,`c`.`estado` AS `estado`,coalesce(`c`.`observaciones`,'-') AS `observaciones` from (((`citas` `c` join `clientes` `cl` on((`c`.`id_cliente` = `cl`.`id_cliente`))) join `usuarios` `u` on((`c`.`id_usuario` = `u`.`id_usuario`))) join `servicios` `s` on((`c`.`id_servicio` = `s`.`id_servicio`))) order by `c`.`fecha` desc,`c`.`hora` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_clientes_resumen`
--

/*!50001 DROP VIEW IF EXISTS `vista_clientes_resumen`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50001 VIEW `vista_clientes_resumen` AS select `cl`.`nombre` AS `nombre`,`cl`.`telefono` AS `telefono`,`cl`.`correo` AS `correo`,`cl`.`fecha_registro` AS `fecha_registro`,`cl`.`puntaje` AS `puntaje`,coalesce(count(`c`.`id_cita`),0) AS `total_citas`,coalesce(sum((case when (`c`.`estado` = 'completada') then 1 else 0 end)),0) AS `citas_completadas`,coalesce(sum((case when (`c`.`estado` = 'cancelada') then 1 else 0 end)),0) AS `citas_canceladas`,coalesce(sum((case when (`c`.`estado` = 'no asistio') then 1 else 0 end)),0) AS `inasistencias`,coalesce(sum((case when ((`c`.`estado` = 'pendiente') or (`c`.`estado` = 'confirmada')) then 1 else 0 end)),0) AS `citas_activas` from (`clientes` `cl` left join `citas` `c` on((`cl`.`id_cliente` = `c`.`id_cliente`))) group by `cl`.`id_cliente`,`cl`.`nombre`,`cl`.`telefono`,`cl`.`correo`,`cl`.`fecha_registro`,`cl`.`puntaje` order by `cl`.`puntaje` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_ingresos_barbero`
--

/*!50001 DROP VIEW IF EXISTS `vista_ingresos_barbero`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50001 VIEW `vista_ingresos_barbero` AS select `u`.`nombre` AS `barbero`,`rb`.`nivel` AS `nivel`,count(`f`.`id_factura`) AS `servicios_cobrados`,coalesce(sum(`f`.`total`),0) AS `total_ingresos`,coalesce(avg(`f`.`total`),0) AS `promedio_por_servicio` from (((`usuarios` `u` join `ranking_barberos` `rb` on((`u`.`id_usuario` = `rb`.`id_usuario`))) left join `citas` `c` on(((`u`.`id_usuario` = `c`.`id_usuario`) and (`c`.`estado` = 'completada')))) left join `facturas` `f` on((`c`.`id_cita` = `f`.`id_cita`))) where (`u`.`id_rol` = 2) group by `u`.`id_usuario`,`u`.`nombre`,`rb`.`nivel` order by `total_ingresos` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-22 18:55:31
