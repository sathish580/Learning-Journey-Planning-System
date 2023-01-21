-- Drop table
DROP TABLE `LJPS`.`LJ_Mapping`;

-- Drop DATABASE 
DROP DATABASE LJPS;

-- Role-Skill NEW insert statements, Linking tables, 
INSERT INTO `Skill` (Skill_ID, Skill_Name) VALUES
(01,"Managering");

INSERT INTO `Job_Role` (Job_Role_ID, Job_Role_Name) VALUES
(02,"Project manager");

INSERT INTO `Role_Skill` (Job_Role_ID,Skill_ID) VALUES
(02,01);

-- Select data from 3 tables
SELECT s.skill_name, j.Job_Role_Name, r.Job_Role_ID, r.Skill_ID
FROM Role_Skill r
INNER JOIN Skill s ON r.Skill_ID= s.Skill_ID
INNER JOIN Job_Role j ON j.Job_Role_ID= r.Job_Role_ID;

Select * from Course;

-- Skill Course, insertdata 
INSERT INTO `Skill_Course` (Course_ID,Skill_ID) VALUES
('1110',01);

-- Skill Course, select data from 3 tables
SELECT s.skill_name, c.course_name, c.course_id, s.Skill_ID
FROM Skill_Course sc
INNER JOIN Skill s ON sc.Skill_ID= s.Skill_ID
INNER JOIN Course c ON c.Course_ID= sc.Course_ID;


-- SELECT FROM 2 DIFF DB 
SELECT 
tb_1.*,
tb_2.*
FROM [database_1].[dbo].[products] tb_1
LEFT JOIN [database_2].[dbo].[prices] tb_2 ON tb_1.product_id = tb_2.product_id

SELECT sid from spm_LMS.student
SELECT * FROM spm_LMS.student

