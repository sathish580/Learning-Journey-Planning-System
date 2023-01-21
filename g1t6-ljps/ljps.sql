CREATE DATABASE  IF NOT EXISTS `LJPS` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `LJPS`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: spm-database-4.cikntbsa8vrm.us-east-1.rds.amazonaws.com    Database: LJPS
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
-- SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

-- SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `Course`
--



DROP TABLE IF EXISTS `Course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Course` (
  `Course_ID` varchar(20) NOT NULL,
  `Course_Name` varchar(50) NOT NULL,
  `Course_Desc` varchar(255) DEFAULT NULL,
  `Course_Status` varchar(15) DEFAULT NULL,
  `Course_Type` varchar(10) DEFAULT NULL,
  `Course_Category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Course_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Course`
--

LOCK TABLES `Course` WRITE;
/*!40000 ALTER TABLE `Course` DISABLE KEYS */;
INSERT INTO `Course` VALUES ('COR001','Systems Thinking and Design','This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,','Active','Internal','Core'),('COR002','Lean Six Sigma Green Belt Certification','Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics','Active','Internal','Core'),('COR004','Service Excellence','The programme provides the learner with the key foundations of what builds customer confidence in the service industr','Pending','Internal','Core'),('COR006','Manage Change','Identify risks associated with change and develop risk mitigation plans.','Retired','External','Core'),('FIN001','Data Collection and Analysis','Data is meaningless unless insights and analysis can be drawn to provide useful information for business decision-making. It is imperative that data quality, integrity and security','Active','External','Finance'),('FIN002','Risk and Compliance Reporting','Regulatory reporting is a requirement for businesses from highly regulated sectors to demonstrate compliance with the necessary regulatory provisions.','Active','External','Finance'),('FIN003','Business Continuity Planning','Business continuity planning is essential in any business to minimise loss when faced with potential threats and disruptions.','Retired','External','Finance'),('HRD001','Leading and Shaping a Culture in Learning','This training programme, delivered by the National Centre of Excellence (Workplace Learning), aims to equip participants with the skills and knowledge of the National workplace learning certification framework,','Active','External','HR'),('MGT001','People Management','enable learners to manage team performance and development through effective communication, conflict resolution and negotiation skills.','Active','Internal','Management'),('MGT002','Workplace Conflict Management for Professionals','This course will address the gaps to build consensus and utilise knowledge of conflict management techniques to diffuse tensions and achieve resolutions effectively in the best interests of the organisation.','Active','External','Management'),('MGT003','Enhance Team Performance Through Coaching','The course aims to upskill real estate team leaders in the area of service coaching for performance.','Pending','Internal','Management'),('MGT004','Personal Effectiveness for Leaders','Learners will be able to acquire the skills and knowledge to undertake self-assessment in relation to oneís performance and leadership style','Active','External','Management'),('MGT007','Supervisory Management Skills','Supervisors lead teams, manage tasks, solve problems, report up and down the hierarchy, and much more.','Retired','External','Management'),('SAL001','Risk Management for Smart Business','Apply risk management concepts to digital business','Retired','Internal','Sales'),('SAL002','CoC in Smart Living Solutions','Participants will acquire the knowledge and skills in setting up a smart living solution','Pending','External','Sales'),('SAL003','Optimising Your Brand For The Digital Spaces','Digital has fundamentally shifted communication between brands and their consumers from a one-way broadcast to a two-way dialogue. In a hastened bid to transform their businesses to be digital market-ready,','Active','External','Sales'),('SAL004','Stakeholder Management','Develop a stakeholder engagement plan and negotiate with stakeholders to arrive at mutually-beneficial arrangements.','Active','Internal','Sales'),('tch001','Print Server Setup','Setting up print server in enterprise environment','Retired','Internal','Technical'),('tch002','Canon MFC Setup','Setting up Canon ImageRUNNER series of products','Retired','Internal','Technical'),('tch003','Canon MFC Mainteance and Troubleshooting','Troubleshoot and fixing L2,3 issues of Canon ImageRUNNER series of products','Active','Internal','Technical'),('tch004','Introduction to Open Platform Communications','This course provides the participants with a good in-depth understanding of the SS IEC 62541 standard','Pending','Internal','Technical'),('tch005','An Introduction to Sustainability','The course provides learners with the multi-faceted basic knowledge of sustainability.','Active','External','Technical'),('tch006','Machine Learning DevOps Engineer†','The Machine Learning DevOps Engineer Nanodegree program focuses on the software engineering fundamentals needed to successfully streamline the deployment of data and machine-learning models','Pending','Internal','Technical'),('tch008','Technology Intelligence and Strategy','Participants will be able to gain knowledge and skills on: - establishing technology strategy with technology intelligence framework and tools','Active','External','Technical'),('tch009','Smart Sensing Technology','This course introduces sensors and sensing systems. The 5G infrastructure enables the many fast-growing IoT applications equipped with sensors','Pending','External','Technical'),('tch012','Internet of Things','The Internet of Things (IoT) is integrating our digital and physical world, opening up new and exciting opportunities to deploy, automate, optimize and secure diverse use cases and applications.','Active','Internal','Technical'),('tch013','Managing Cybersecurity and Risks','Digital security is the core of our daily lives considering that our dependence on the digital world','Active','Internal','Technical'),('tch014','Certified Information Privacy Professional','The Certified Information Privacy Professional/ Asia (CIPP/A) is the first publicly available privacy certification','Active','External','Technical'),('tch015','Network Security','Understanding of the fundamental knowledge of network security including cryptography, authentication and key distribution. The security techniques at various layers of computer networks are examined.','Active','External','Technical'),('tch018','Professional Project Management','solid foundation in the project management processes from initiating a project, through planning, execution, control,','Active','Internal','Technical'),('tch019','Innovation and Change Management','the organization that constantly reinvents itself to be relevant has a better chance of making progress','Active','External','Technical');
/*!40000 ALTER TABLE `Course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Job_Role`
--

DROP TABLE IF EXISTS `Job_Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Job_Role` (
  `Job_Role_ID` int NOT NULL AUTO_INCREMENT,
  `Job_Role_Name` varchar(50) NOT NULL,
  `Status` varchar(12) NOT NULL,
  PRIMARY KEY (`Job_Role_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5019 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Job_Role`
--

LOCK TABLES `Job_Role` WRITE;
/*!40000 ALTER TABLE `Job_Role` DISABLE KEYS */;
INSERT INTO `Job_Role` VALUES (4000,'Sales Representative','Active'),(4001,'Finance Executive','Active'),(4002,'Repair Engineer','Active'),(4003,'Senior Roving Service Engineer','Active'),(4004,'Junior Roving Service Engineer','Active'),(4005,'Operation Planning Officer','Active'),(4006,'Call Centre Officer','Active'),(5000,'Managing Director','Active'),(5001,'Sales Manager','Active'),(5002,'Finance Manager','Retired'),(5003,'Operations Manager','Active'),(5004,'HR and Admin Manager','Active'),(5012,'Sales Representative 123','Retired');
/*!40000 ALTER TABLE `Job_Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LJ_Mapping`
--

DROP TABLE IF EXISTS `LJ_Mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LJ_Mapping` (
  `Course_ID` varchar(20) NOT NULL,
  `Skill_ID` int NOT NULL,
  `Job_Role_ID` int NOT NULL,
  `Staff_ID` int NOT NULL,
  `Completion_Status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Course_ID`,`Skill_ID`,`Job_Role_ID`,`Staff_ID`),
  KEY `LJ_Mapping_FK4` (`Staff_ID`),
  KEY `LJ_Mapping_FK3` (`Job_Role_ID`),
  KEY `LJ_Mapping_FK2` (`Skill_ID`),
  CONSTRAINT `LJ_Mapping_FK1` FOREIGN KEY (`Course_ID`) REFERENCES `Skill_Course` (`Course_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `LJ_Mapping_FK2` FOREIGN KEY (`Skill_ID`) REFERENCES `Skill_Course` (`Skill_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `LJ_Mapping_FK3` FOREIGN KEY (`Job_Role_ID`) REFERENCES `Job_Role` (`Job_Role_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `LJ_Mapping_FK4` FOREIGN KEY (`Staff_ID`) REFERENCES `Staff` (`Staff_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LJ_Mapping`
--

LOCK TABLES `LJ_Mapping` WRITE;
/*!40000 ALTER TABLE `LJ_Mapping` DISABLE KEYS */;
INSERT INTO `LJ_Mapping` VALUES ('COR001',2002,4002,130002,'Completed'),('MGT001',2005,4002,130002,'In Progress'),('tch013',2000,4002,130002,'Completed'),('tch013',2010,4002,130002,'In Progress');
/*!40000 ALTER TABLE `LJ_Mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Manager`
--

DROP TABLE IF EXISTS `Manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Manager` (
  `Manager_ID` int NOT NULL,
  `Staff_ID` int NOT NULL,
  PRIMARY KEY (`Manager_ID`,`Staff_ID`),
  KEY `Manager_FK1` (`Staff_ID`),
  CONSTRAINT `Manager_FK1` FOREIGN KEY (`Staff_ID`) REFERENCES `Staff` (`Staff_ID`),
  CONSTRAINT `Manager_FK2` FOREIGN KEY (`Manager_ID`) REFERENCES `Staff` (`Staff_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Manager`
--

LOCK TABLES `Manager` WRITE;
/*!40000 ALTER TABLE `Manager` DISABLE KEYS */;
INSERT INTO `Manager` VALUES (140001,130002),(140001,140002),(140001,140003),(140001,140004);
/*!40000 ALTER TABLE `Manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Role` (
  `Role_ID` int NOT NULL,
  `Role_Name` varchar(20) NOT NULL,
  PRIMARY KEY (`Role_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES (1,'Admin'),(2,'User'),(3,'Manager'),(4,'Trainer');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Table structure for table `Skill`
--

DROP TABLE IF EXISTS `Skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Skill` (
  `Skill_ID` int NOT NULL AUTO_INCREMENT,
  `Skill_Name` varchar(50) NOT NULL,
  `Status` varchar(12) NOT NULL,
  PRIMARY KEY (`Skill_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2092 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Skill`
--

LOCK TABLES `Skill` WRITE;
/*!40000 ALTER TABLE `Skill` DISABLE KEYS */;
INSERT INTO `Skill` VALUES (90,'Medicine','Active'),(100,'Managering','Retired'),(2000,'Analytics','Active'),(2001,'Communication','Pending'),(2002,'Data Analytics','Active'),(2003,'Customer Experience ','Pending'),(2004,'People and Relations','Retired'),(2005,'Stakeholder Management','Active'),(2006,'Data collection','Active'),(2007,'Data Analysis','Retired'),(2008,'Writing compliance risk reports','Active'),(2009,'Incident Management','Active'),(2010,'Disaster Recovery','Active'),(2011,'Employee Management','Pending'),(2012,'Leadership','Active'),(2013,'Conflict Management','Retired'),(2014,'Supervisory Management','Retired'),(2015,'Risk Management','Pending'),(2016,'Smart Living Solutions','Active'),(2017,'Digital Transformation','Active'),(2018,'Vendor Management','Retired'),(2019,'Client Management','Retired'),(2020,'Print Server Setup','Active'),(2021,'Canon MFC Setup','Pending'),(2022,'Canon MFC Mainteance and Troubleshooting','Active'),(2023,'Open Platform Communications','Pending'),(2024,'Generate Sustainability in the Workplace','Active'),(2025,'Machine Learning','Pending'),(2026,'Artificial Intellige','Active'),(2027,'DevOps','Active'),(2028,'Internet of Things','Active'),(2029,'Smart Sensing Technology','Active'),(2030,'Cybersecurity','Active'),(2031,'Managing PII','Active'),(2032,'Network Security','Active'),(2033,'Project Management','Active'),(2034,'Innovation Management','Active'),(2035,'Managing Your Team','Active'),(2036,'Setting Sales Targets','Active'),(2037,'Planning Operations','Active'),(2057,'Product Management','Pending'),(2064,'Risk Management 1234','Pending'),(2090,'View Engineering','Active');
/*!40000 ALTER TABLE `Skill` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `Role_Skill`
--

DROP TABLE IF EXISTS `Role_Skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Role_Skill` (
  `Job_Role_ID` int NOT NULL,
  `Skill_ID` int NOT NULL,
  PRIMARY KEY (`Job_Role_ID`,`Skill_ID`),
  KEY `Role_Skill_FK2` (`Skill_ID`),
  CONSTRAINT `Role_Skill_FK1` FOREIGN KEY (`Job_Role_ID`) REFERENCES `Job_Role` (`Job_Role_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Role_Skill_FK2` FOREIGN KEY (`Skill_ID`) REFERENCES `Skill` (`Skill_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role_Skill`
--

LOCK TABLES `Role_Skill` WRITE;
/*!40000 ALTER TABLE `Role_Skill` DISABLE KEYS */;
INSERT INTO `Role_Skill` VALUES (4000,2000),(4002,2000),(4002,2002),(4001,2003),(4006,2003),(5000,2003),(5001,2003),(5002,2003),(5003,2003),(5004,2003),(5001,2004),(4002,2005),(4003,2005),(4004,2005),(5004,2005),(4002,2009),(4002,2010),(5001,2012),(5001,2013),(5001,2014),(4000,2023),(5001,2035);
/*!40000 ALTER TABLE `Role_Skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Skill_Course`
--

DROP TABLE IF EXISTS `Skill_Course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Skill_Course` (
  `Course_ID` varchar(20) NOT NULL,
  `Skill_ID` int NOT NULL,
  PRIMARY KEY (`Course_ID`,`Skill_ID`),
  KEY `Skill_Course_FK2` (`Skill_ID`),
  CONSTRAINT `Skill_Course_FK1` FOREIGN KEY (`Course_ID`) REFERENCES `Course` (`Course_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Skill_Course_FK2` FOREIGN KEY (`Skill_ID`) REFERENCES `Skill` (`Skill_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Skill_Course`
--

LOCK TABLES `Skill_Course` WRITE;
/*!40000 ALTER TABLE `Skill_Course` DISABLE KEYS */;
INSERT INTO `Skill_Course` VALUES ('COR004',90),('FIN001',90),('COR002',2000),('tch019',2000),('COR002',2001),('FIN001',2001),('SAL003',2001),('SAL004',2001),('tch018',2001),('COR001',2002),('COR002',2002),('COR002',2003),('COR004',2003),('SAL004',2003),('SAL004',2004),('COR004',2005),('MGT001',2005),('MGT004',2005),('SAL001',2009),('tch013',2009),('tch013',2010),('MGT004',2012),('MGT004',2013),('COR001',2014),('COR002',2014),('MGT004',2014),('SAL001',2015);
/*!40000 ALTER TABLE `Skill_Course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Staff`
--

DROP TABLE IF EXISTS `Staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Staff` (
  `Staff_ID` int NOT NULL AUTO_INCREMENT,
  `Staff_FName` varchar(50) NOT NULL,
  `Staff_LName` varchar(50) NOT NULL,
  `Dept` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Role` int DEFAULT NULL,
  PRIMARY KEY (`Staff_ID`),
  KEY `Role` (`Role`),
  CONSTRAINT `Staff_ibfk_1` FOREIGN KEY (`Role`) REFERENCES `Role` (`Role_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=171009 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Staff`
--

LOCK TABLES `Staff` WRITE;
/*!40000 ALTER TABLE `Staff` DISABLE KEYS */;
INSERT INTO `Staff` VALUES (130001,'John','Sim','Chariman','jack.sim@allinone.com.sg',1),(130002,'Jack','Sim','CEO','jack.sim@allinone.com.sg',1),(140001,'Derek','Tan','Sales','Derek.Tan@allinone.com.sg',3),(140002,'Susan','Goh','Sales','Susan.Goh@allinone.com.sg',2),(140003,'Janice','Chan','Sales','Janice.Chan@allinone.com.sg',2),(140004,'Mary','Teo','Sales','Mary.Teo@allinone.com.sg',2),(140008,'Jaclyn','Lee','Sales','Jaclyn.Lee@allinone.com.sg',2),(140015,'Oliva','Lim','Sales','Oliva.Lim@allinone.com.sg',2),(140025,'Emma','Heng','Sales','Emma.Heng@allinone.com.sg',2),(140036,'Charlotte','Wong','Sales','Charlotte.Wong@allinone.com.sg',2),(140078,'Amelia','Ong','Sales','Amelia.Ong@allinone.com.sg',2),(140102,'Eva','Yong','Sales','Eva.Yong@allinone.com.sg',2),(140103,'Sophia','Toh','Sales','Sophia.Toh@allinone.com.sg',2),(140108,'Liam','The','Sales','Liam.The@allinone.com.sg',2),(140115,'Noah','Ng','Sales','Noah.Ng@allinone.com.sg',2),(140525,'Oliver','Tan','Sales','Oliver.Tan@allinone.com.sg',2),(140736,'William','Fu','Sales','William.Fu@allinone.com.sg',2),(140878,'James','Tong','Sales','James.Tong@allinone.com.sg',2),(150008,'Eric','Loh','Ops','Eric.Loh@allinone.com.sg',3),(150065,'Noah','Goh','Ops','Noah.Goh@allinone.com.sg',4),(150075,'Liam','Tan','Ops','Liam.Tan@allinone.com.sg',4),(150076,'Oliver','Chan','Ops','Oliver.Chan@allinone.com.sg',4),(150085,'Michael','Ng','Ops','Michael.Ng@allinone.com.sg',4),(150095,'Alexander','The','Ops','Alexander.The@allinone.com.sg',4),(150096,'Ethan','Tan','Ops','Ethan.Tan@allinone.com.sg',4),(150115,'Jaclyn','Lee','Ops','Jaclyn.Lee@allinone.com.sg',4),(150118,'William','Teo','Ops','William.Teo@allinone.com.sg',4),(150125,'Mary','Teo','Ops','Mary.Teo@allinone.com.sg',4),(150126,'Oliva','Lim','Ops','Oliva.Lim@allinone.com.sg',2),(150138,'Daniel','Fu','Ops','Daniel.Fu@allinone.com.sg',4),(150142,'James','Lee','Ops','James.Lee@allinone.com.sg',4),(150143,'John','Lim','Ops','John.Lim@allinone.com.sg',4),(150148,'Jack','Heng','Ops','Jack.Heng@allinone.com.sg',4),(150155,'Derek','Wong','Ops','Derek.Wong@allinone.com.sg',4),(150162,'Jacob','Tong','Ops','Jacob.Tong@allinone.com.sg',4),(150163,'Logan','Loh','Ops','Logan.Loh@allinone.com.sg',4),(150165,'Oliver','Tan','Ops','Oliver.Tan@allinone.com.sg',2),(150166,'William','Fu','Ops','William.Fu@allinone.com.sg',2),(150168,'Jackson','Tan','Ops','Jackson.Tan@allinone.com.sg',4),(150175,'Aiden','Tan','Ops','Aiden.Tan@allinone.com.sg',4),(150192,'Emma','Heng','Ops','Emma.Heng@allinone.com.sg',2),(150193,'Charlotte','Wong','Ops','Charlotte.Wong@allinone.com.sg',2),(150198,'Amelia','Ong','Ops','Amelia.Ong@allinone.com.sg',2),(150205,'Eva','Yong','Ops','Eva.Yong@allinone.com.sg',2),(150208,'James','Tong','Ops','James.Tong@allinone.com.sg',2),(150215,'Michael','Lee','Ops','Michael.Lee@allinone.com.sg',2),(150216,'Ethan','Lim','Ops','Ethan.Lim@allinone.com.sg',2),(150232,'John','Loh','Ops','John.Loh@allinone.com.sg',2),(150233,'Jack','Tan','Ops','Jack.Tan@allinone.com.sg',2),(150238,'Derek','Tan','Ops','Derek.Tan@allinone.com.sg',2),(150245,'Benjamin','Tan','Ops','Benjamin.Tan@allinone.com.sg',2),(150258,'Daniel','Heng','Ops','Daniel.Heng@allinone.com.sg',2),(150265,'Jaclyn','Tong','Ops','Jaclyn.Tong@allinone.com.sg',2),(150275,'Mary','Fu','Ops','Mary.Fu@allinone.com.sg',2),(150276,'Oliva','Loh','Ops','Oliva.Loh@allinone.com.sg',2),(150282,'Jacob','Wong','Ops','Jacob.Wong@allinone.com.sg',2),(150283,'Logan','Ong','Ops','Logan.Ong@allinone.com.sg',2),(150288,'Jackson','Yong','Ops','Jackson.Yong@allinone.com.sg',2),(150295,'Aiden','Toh','Ops','Aiden.Toh@allinone.com.sg',2),(150318,'Emma','Tan','Ops','Emma.Tan@allinone.com.sg',2),(150342,'Charlotte','Tan','Ops','Charlotte.Tan@allinone.com.sg',2),(150343,'Amelia','Tan','Ops','Amelia.Tan@allinone.com.sg',2),(150345,'William','Heng','Ops','William.Heng@allinone.com.sg',2),(150348,'Eva','Goh','Ops','Eva.Goh@allinone.com.sg',2),(150355,'Sophia','Chan','Ops','Sophia.Chan@allinone.com.sg',2),(150356,'James','Wong','Ops','James.Wong@allinone.com.sg',2),(150398,'John','Ong','Ops','John.Ong@allinone.com.sg',2),(150422,'Jack','Yong','Ops','Jack.Yong@allinone.com.sg',2),(150423,'Derek','Toh','Ops','Derek.Toh@allinone.com.sg',2),(150428,'Benjamin','The','Ops','Benjamin.The@allinone.com.sg',2),(150435,'Lucas','Ng','Ops','Lucas.Ng@allinone.com.sg',2),(150445,'Ethan','Loh','Ops','Ethan.Loh@allinone.com.sg',2),(150446,'Daniel','Tan','Ops','Daniel.Tan@allinone.com.sg',2),(150488,'Jacob','Tan','Ops','Jacob.Tan@allinone.com.sg',2),(150512,'Logan','Tan','Ops','Logan.Tan@allinone.com.sg',2),(150513,'Jackson','Goh','Ops','Jackson.Goh@allinone.com.sg',2),(150518,'Aiden','Chan','Ops','Aiden.Chan@allinone.com.sg',2),(150525,'Samuel','Teo','Ops','Samuel.Teo@allinone.com.sg',2),(150555,'Jaclyn','Wong','Ops','Jaclyn.Wong@allinone.com.sg',2),(150565,'Benjamin','Ong','Ops','Benjamin.Ong@allinone.com.sg',4),(150566,'Oliva','Ong','Ops','Oliva.Ong@allinone.com.sg',2),(150585,'Samuel','Tan','Ops','Samuel.Tan@allinone.com.sg',4),(150608,'Emma','Yong','Ops','Emma.Yong@allinone.com.sg',2),(150615,'Sophia','Toh','Ops','Sophia.Toh@allinone.com.sg',2),(150632,'Charlotte','Toh','Ops','Charlotte.Toh@allinone.com.sg',2),(150633,'Amelia','The','Ops','Amelia.The@allinone.com.sg',2),(150638,'Eva','Ng','Ops','Eva.Ng@allinone.com.sg',2),(150645,'Sophia','Tan','Ops','Sophia.Tan@allinone.com.sg',2),(150655,'Lucas','Goh','Ops','Lucas.Goh@allinone.com.sg',2),(150695,'William','Tan','Ops','William.Tan@allinone.com.sg',2),(150705,'Samuel','The','Ops','Samuel.The@allinone.com.sg',2),(150765,'Liam','Teo','Ops','Liam.Teo@allinone.com.sg',2),(150776,'Lucas','Yong','Ops','Lucas.Yong@allinone.com.sg',4),(150796,'Susan','Goh','Ops','Susan.Goh@allinone.com.sg',4),(150826,'Liam','The','Ops','Liam.The@allinone.com.sg',2),(150845,'Henry','Tan','Ops','Henry.Tan@allinone.com.sg',2),(150866,'Henry','Chan','Ops','Henry.Chan@allinone.com.sg',2),(150916,'Susan','Ng','Ops','Susan.Ng@allinone.com.sg',2),(150918,'Henry','Toh','Ops','Henry.Toh@allinone.com.sg',4),(150935,'Susan','Lee','Ops','Susan.Lee@allinone.com.sg',2),(150938,'Janice','Chan','Ops','Janice.Chan@allinone.com.sg',4),(150968,'Noah','Ng','Ops','Noah.Ng@allinone.com.sg',2),(150976,'Noah','Lee','Ops','Noah.Lee@allinone.com.sg',2),(151008,'Alexander','Teo','Ops','Alexander.Teo@allinone.com.sg',2),(151055,'Liam','Fu','Ops','Liam.Fu@allinone.com.sg',2),(151056,'Alexander','Fu','Ops','Alexander.Fu@allinone.com.sg',2),(151058,'Janice','Tan','Ops','Janice.Tan@allinone.com.sg',2),(151118,'Oliver','Lim','Ops','Oliver.Lim@allinone.com.sg',2),(151146,'Janice','Lim','Ops','Janice.Lim@allinone.com.sg',2),(151198,'Michael','Tong','Ops','Michael.Tong@allinone.com.sg',2),(151266,'Noah','Tong','Ops','Noah.Tong@allinone.com.sg',2),(151288,'Mary','Heng','Ops','Mary.Heng@allinone.com.sg',2),(151408,'Oliver','Loh','Ops','Oliver.Loh@allinone.com.sg',2),(160008,'Sally','Loh','HR','Sally.Loh@allinone.com.sg',1),(160065,'John','Tan','HR','John.Tan@allinone.com.sg',1),(160075,'James','Tan','HR','James.Tan@allinone.com.sg',1),(160076,'Jack','Goh','HR','Jack.Goh@allinone.com.sg',1),(160118,'Derek','Chan','HR','Derek.Chan@allinone.com.sg',1),(160135,'Jaclyn','Ong','HR','Jaclyn.Ong@allinone.com.sg',2),(160142,'Benjamin','Teo','HR','Benjamin.Teo@allinone.com.sg',1),(160143,'Lucas','Lee','HR','Lucas.Lee@allinone.com.sg',1),(160145,'Mary','Wong','HR','Mary.Wong@allinone.com.sg',2),(160146,'Oliva','Yong','HR','Oliva.Yong@allinone.com.sg',2),(160148,'Henry','Lim','HR','Henry.Lim@allinone.com.sg',1),(160155,'Alexander','Heng','HR','Alexander.Heng@allinone.com.sg',1),(160188,'Emma','Toh','HR','Emma.Toh@allinone.com.sg',2),(160212,'Charlotte','The','HR','Charlotte.The@allinone.com.sg',2),(160213,'Amelia','Ng','HR','Amelia.Ng@allinone.com.sg',2),(160218,'Eva','Tan','HR','Eva.Tan@allinone.com.sg',2),(160225,'Sophia','Fu','HR','Sophia.Fu@allinone.com.sg',2),(160258,'Michael','Tong','HR','Michael.Tong@allinone.com.sg',2),(160282,'Ethan','Loh','HR','Ethan.Loh@allinone.com.sg',2),(170166,'David','Yap','Finance','David.Yap@allinone.com.sg',3),(170208,'Daniel','Tan','Finance','Daniel.Tan@allinone.com.sg',2),(170215,'Mary','Wong','Finance','Mary.Wong@allinone.com.sg',2),(170216,'Jaclyn','Ong','Finance','Jaclyn.Ong@allinone.com.sg',2),(170232,'Jacob','Tan','Finance','Jacob.Tan@allinone.com.sg',2),(170233,'Logan','Goh','Finance','Logan.Goh@allinone.com.sg',2),(170238,'Jackson','Chan','Finance','Jackson.Chan@allinone.com.sg',2),(170245,'Aiden','Teo','Finance','Aiden.Teo@allinone.com.sg',2),(170655,'Samuel','Lee','Finance','Samuel.Lee@allinone.com.sg',2),(170866,'Susan','Lim','Finance','Susan.Lim@allinone.com.sg',2),(171008,'Janice','Heng','Finance','Janice.Heng@allinone.com.sg',2);
/*!40000 ALTER TABLE `Staff` ENABLE KEYS */;
UNLOCK TABLES;
-- SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-10 10:12:31
