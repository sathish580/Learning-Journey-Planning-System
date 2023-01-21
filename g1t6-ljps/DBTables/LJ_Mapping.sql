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
)

INSERT INTO LJPS.LJ_Mapping(Course_ID,Skill_ID,Job_Role_ID,Staff_ID,Completion_Status) VALUES
('COR004',2005,4002,130002,'In Progress'),
('FIN001',2002,4002,130002,'Completed'),
('FIN003',2010,4002,130002,'In Progress'),
('tch019',2009,4002,130002,'Completed');

