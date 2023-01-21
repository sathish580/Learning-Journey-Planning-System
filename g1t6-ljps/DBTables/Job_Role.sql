CREATE TABLE `Job_Role` (
  `Job_Role_ID` int NOT NULL,
  `Job_Role_Name` varchar(50) NOT NULL,
  `Status` varchar(12) NOT NULL,
  PRIMARY KEY (`Job_Role_ID`)
)
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