-- SKILL TABLE
CREATE TABLE `Skill` (
  `Skill_ID` int NOT NULL,
  `Skill_Name` varchar(50) NOT NULL,
  `Status` varchar(12) NOT NULL,
  PRIMARY KEY (`Skill_ID`)
);
INSERT INTO LJPS.Skill(Skill_ID,Skill_Name,Status) VALUES
 (2000,'Analytics','Active')
 (2001,'Analysing system problems','Active')
,(2002,'Lean Six Sigma','Active')
,(2003,'Customer Experience Management','Pending')
,(2004,'People and Relations,'Retired')
,(2005,'Stakeholder Management','Active') #COR004
,(2006,'Data collection','Active')
,(2007,'Data Analysis','Retired')
,(2008,'Writing compliance risk reports','Active')
,(2009,'Incident Management','Active') # tch019
,(2010,'Disaster Recovery','Active') #FIN003
,(2011,'Employee Management','Pending')
,(2012,'Leadership','Active')
,(2013,'Conflict Management','Retired')
,(2014,'Supervisory Management','Retired')
,(2015,'Risk Management','Pending')
,(2016,'Smart Living Solutions','Active')
,(2017,'Digital Transformation','Active')
,(2018,'Vendor Management','Retired')
,(2019,'Client Management','Retired')
,(2020,'Print Server Setup','Active')
,(2021,'Canon MFC Setup','Pending')
,(2022,'Canon MFC Mainteance and Troubleshooting','Active')
,(2023,'Open Platform Communications','Pending')
,(2024,'Generate Sustainability in the Workplace','Active')
,(2025,'Machine Learning','Pending')
,(2026,'Artificial Intelligence','Active')
,(2027,'DevOps','Active')
,(2028,'Internet of Things','Active')
,(2029,'Smart Sensing Technology','Active')
,(2030,'Cybersecurity','Active')
,(2031,'Managing PII','Active')
,(2032,'Network Security','Active')
,(2033,'Project Management','Active')
,(2034,'Innovation Management','Active')
,(2035,'Managing Your Team','Active')
,(2036,'Setting Sales Targets','Active')
,(2037,'Planning Operations','Active');


-- ROLE TABLE
CREATE TABLE `Job_Role` (
  `Job_Role_ID` int NOT NULL,
  `Job_Role_Name` varchar(50) NOT NULL,
  `Status` varchar(12) NOT NULL,
  PRIMARY KEY (`Job_Role_ID`)
);
INSERT INTO Job_Role(Job_Role_ID,Job_Role_Name,Status) VALUES
 (5000,'Managing Director','Active')
,(5001,'Sales Manager','Active')
,(4000,'Sales Representative','Active')
,(5002,'Finance Manager','Active')
,(4001,'Finance Executive','Active')
,(5003,'Operations Manager','Active')
,(4002,'Repair Engineer','Active')
,(4003,'Senior Roving Service Engineer','Active')
,(4004,'Junior Roving Service Engineer','Active')
,(5004,'HR and Admin Manager','Active')
,(4005,'Operation Planning Officer','Active')
,(4006,'Call Centre Officer','Active');


-- ROLE_SKILL TABLE
CREATE TABLE `Role_Skill` (
  `Job_Role_ID` int NOT NULL,
  `Skill_ID` int NOT NULL,
  PRIMARY KEY (`Job_Role_ID`,`Skill_ID`),
  KEY `Role_Skill_FK2` (`Skill_ID`),
  CONSTRAINT `Role_Skill_FK1` FOREIGN KEY (`Job_Role_ID`) REFERENCES `Job_Role` (`Job_Role_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Role_Skill_FK2` FOREIGN KEY (`Skill_ID`) REFERENCES `Skill` (`Skill_ID`)
);
INSERT INTO LJPS.Role_Skill(Job_Role_ID,Skill_ID) VALUES
(4000,2003),
(4000,2004),
(4000,2005),
(4000,2019),
(4000,2023),
(4002,2002),
(4002,2005),
(4002,2009),
(4002,2010),
(5000,2012),
(5001,2003),
(5001,2004),
(5001,2005),
(5001,2012),
(5001,2013),
(5001,2014),
(5001,2019),
(5001,2035),
(5002,2012),
(5003,2012),
(5004,2012);


-- SKILL_COURSE TABLE
CREATE TABLE `Skill_Course` (
  `Course_ID` varchar(20) NOT NULL,
  `Skill_ID` int NOT NULL,
  PRIMARY KEY (`Course_ID`,`Skill_ID`),
  KEY `Skill_Course_FK2` (`Skill_ID`),
  CONSTRAINT `Skill_Course_FK1` FOREIGN KEY (`Course_ID`) REFERENCES `Course` (`Course_ID`),
  CONSTRAINT `Skill_Course_FK2` FOREIGN KEY (`Skill_ID`) REFERENCES `Skill` (`Skill_ID`) ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO LJPS.Skill_Course(Course_ID,Skill_ID) VALUES
 ('COR002',2000),
 ('COR006',2000),
 ('tch019',2000),
 ('SAL003',2001),
 ('MGT001',2001),
 ('MGT002',2001),
 ('MGT003',2001),
 ('SAL004',2001),
 ('tch018',2001),
 ('FIN001',2002),
 ('SAL004',2003),
 ('SAL003',2003),
 ('MGT001',2004),
 ('SAL004',2004),
 ('SAL004',2005),
 ('tch019',2009),
 ('tch019',2010),
 ('MGT004',2012),
 ('MGT004',2013),
 ('MGT004',2014),
 ('MGT004',2035);


-- LJ_MAPPING TABLE
CREATE TABLE `LJ_Mapping` (
  `Course_ID` varchar(20) NOT NULL,
  `Skill_ID` int NOT NULL,
  `Job_Role_ID` int NOT NULL,
  `Staff_ID` int NOT NULL,
  `Completion_Status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Course_ID`,`Skill_ID`,`Job_Role_ID`,`Staff_ID`),
  KEY `LJ_Mapping_FK2` (`Skill_ID`),
  KEY `LJ_Mapping_FK4` (`Staff_ID`),
  KEY `LJ_Mapping_FK3` (`Job_Role_ID`),
  CONSTRAINT `LJ_Mapping_FK1` FOREIGN KEY (`Course_ID`) REFERENCES `Skill_Course` (`Course_ID`),
  CONSTRAINT `LJ_Mapping_FK2` FOREIGN KEY (`Skill_ID`) REFERENCES `Skill_Course` (`Skill_ID`),
  CONSTRAINT `LJ_Mapping_FK3` FOREIGN KEY (`Job_Role_ID`) REFERENCES `Job_Role` (`Job_Role_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `LJ_Mapping_FK4` FOREIGN KEY (`Staff_ID`) REFERENCES `Staff` (`Staff_ID`)
);
INSERT INTO LJPS.LJ_Mapping(Course_ID,Skill_ID,Job_Role_ID,Staff_ID,Completion_Status) VALUES
('COR002',2000,4002,130002,'Completed'),
('SAL004',2005,4002,130002,'In Progress'), 
('FIN001',2002,4002,130002,'Completed'),
('tch019',2010,4002,130002,'In Progress'), 
('COR002',2000,4001,140001,'Completed'),
('SAL004',2005,4001,140001,'Completed'), 
('SAL003',2003,5001,140004,'In Progress'),
('SAL004',2003,5001,140004,'In Progress');


