CREATE TABLE `Skill` (
  `Skill_ID` int NOT NULL,
  `Skill_Name` varchar(50) NOT NULL,
  `Status` varchar(12) NOT NULL,
  PRIMARY KEY (`Skill_ID`)
)
INSERT INTO LJPS.Skill(Skill_ID,Skill_Name,Status) VALUES
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