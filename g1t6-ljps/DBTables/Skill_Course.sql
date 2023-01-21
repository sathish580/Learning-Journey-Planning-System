CREATE TABLE `Skill_Course` (
  `Course_ID` varchar(20) NOT NULL,
  `Skill_ID` int NOT NULL,
  PRIMARY KEY (`Course_ID`,`Skill_ID`),
  KEY `Skill_Course_FK2` (`Skill_ID`),
  CONSTRAINT `Skill_Course_FK1` FOREIGN KEY (`Course_ID`) REFERENCES `Course` (`Course_ID`),
  CONSTRAINT `Skill_Course_FK2` FOREIGN KEY (`Skill_ID`) REFERENCES `Skill` (`Skill_ID`) ON DELETE CASCADE ON UPDATE CASCADE
)

INSERT INTO LJPS.Skill_Course(Course_ID,Skill_ID) VALUES
 ('COR002',2000)
,('SAL003',2001)
,('FIN001',2002)
,('COR006',2000)
,('tch019',2000)
,('MGT001',2001)
,('MGT002',2001)
,('MGT003',2001)
,('SAL004',2001)
,('COR004',2005)
,('tch019',2009)
,('FIN003',2010)
,('tch018',2001);