INSERT INTO `Course` (Course_ID, Course_Name, Course_Desc, Course_Status, Course_Type,Course_Category  ) VALUES
(1110,"Google Data Analytics", "This is your path to a career in data analytics. In this program, you’ll learn in-demand skills that will have you job-ready in less than 6 months. No degree or experience required."
, "Active", "External", "Technical"),
(1111,"Social Media Management", "This course equips you with critical content creation and management skills. You’ll learn how to create effective social media posts and how to create a strong brand to help you build a social media presence. ",
 "Active", "Internal", "Marketing");


DELETE FROM Course WHERE Course_ID in [1110, 1111] ;


