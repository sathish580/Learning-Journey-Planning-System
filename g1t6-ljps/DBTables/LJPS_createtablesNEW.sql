-- TABLES FROM LMS
CREATE DATABASE IF NOT EXISTS `LJPS` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `LJPS`;
-- Role (LMS)
CREATE TABLE Role (
    Role_ID int primary key,
	Role_Name varchar(20 )Not Null
);

-- Course (LMS)
CREATE TABLE Course (
    Course_ID varchar(20) primary key,
	Course_Name varchar(50)Not Null,
	Course_Desc varchar(255),
	Course_Status varchar(15),
    Course_Type varchar(10),
    Course_Category varchar(50)
);

-- Staff (LMS)
CREATE TABLE Staff (
    Staff_ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Staff_FName varchar(50) NOT NULL,
    Staff_LName varchar(50) NOT NULL,
    Dept varchar(50) NOT NULL,
	Email varchar(50) NOT NULL,
	Role int, 
	foreign key(Role) references Role(Role_ID)
);
-- REGISTRATION (LMS)??

-- Skill
CREATE TABLE Skill (
    Skill_ID int primary key,
	Skill_Name varchar(20 )Not Null
);
-- Job_Role 
CREATE TABLE Job_Role (
    Job_Role_ID int primary key,
	Job_Role_Name varchar(20 )Not Null
);
-- Role_Skill
CREATE TABLE Role_Skill (
    Job_Role_ID int not null,
    Skill_ID int not null,
    constraint Role_Skill_PK primary key(Job_Role_ID, Skill_ID),
	constraint Role_Skill_FK1 foreign key(Job_Role_ID) references Job_Role(Job_Role_ID),
	constraint Role_Skill_FK2 foreign key(Skill_ID) references Skill(Skill_ID));

-- Skill_Course
CREATE TABLE Skill_Course (
    Course_ID varchar(20) not null,
    Skill_ID int not null,
    constraint Skill_Course_PK primary key(Course_ID, Skill_ID),
	constraint Skill_Course_FK1 foreign key(Course_ID) references Course(Course_ID),
	constraint Skill_Course_FK2 foreign key(Skill_ID) references Skill(Skill_ID));

-- LJ_Mapping
CREATE TABLE LJ_Mapping (
    Course_ID varchar(20) not null,
    Skill_ID int not null,
    Job_Role_ID int not null,
    Staff_ID int not null,
    Completion_Status varchar(20) not null,
    constraint LJ_Mapping_PK primary key(Course_ID, Skill_ID,Job_Role_ID, Staff_ID),
	constraint LJ_Mapping_FK1 foreign key(Course_ID) references Skill_Course(Course_ID),
	constraint LJ_Mapping_FK2 foreign key(Skill_ID) references Skill_Course(Skill_ID),
    constraint LJ_Mapping_FK3 foreign key(Job_Role_ID) references Role_Skill(Job_Role_ID),
    constraint LJ_Mapping_FK4 foreign key(Staff_ID) references Staff(Staff_ID));

-- Manager
CREATE TABLE Manager(
    Manager_ID int not null,
    Staff_ID int not null,
    constraint Manager_PK primary key(Manager_ID,Staff_ID),
	constraint Manager_FK1 foreign key(Staff_ID) references Staff(Staff_ID),
    constraint Manager_FK2 foreign key(Manager_ID) references Staff(Staff_ID));


-- Old Insert

INSERT INTO `Staff` (Staff_ID, Staff_FName,Staff_LName,Dept,Email, Role) VALUES
(0001,"Sathish", "Kumar", "HR","sathish@aio.com",01),
(0002,"Keith","Teo","Sales","keith@aio.com",02),
(0003, "Nolin", "Ho","Finance","nolin@aio.com",03 );

INSERT INTO `Role` (Role_ID, Role_Name) VALUES
(01,"Admin"),
(02,"User"),
(03,"Manager");

INSERT INTO `Course` (Course_ID, Course_Name, Course_Desc, Course_Status, Course_Type,Course_Category  ) VALUES
(1110,"Google Data Analytics", "This is your path to a career in data analytics. In this program, you’ll learn in-demand skills that will have you job-ready in less than 6 months. No degree or experience required."
, "Active", "External", "Technical"),
(1111,"Social Media Management", "This course equips you with critical content creation and management skills. You’ll learn how to create effective social media posts and how to create a strong brand to help you build a social media presence. ",
 "Active", "Internal", "Marketing");

INSERT INTO `Registration` (Course_ID, Staff_ID, Reg_Status, Completion_Status) VALUES
(1110,0001,"Registered","Completed"),
(1111,0002,'Failed',"Waitlist"),
(1110,0003,'Registered',"In Progress");


