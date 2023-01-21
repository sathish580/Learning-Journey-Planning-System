import unittest
import flask_testing
import json
from courses import * 
#hello


class TestApp(flask_testing.TestCase):
    app.config['SQLALCHEMY_BINDS'] = {
        "db2": "sqlite://"
    }
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {}
    app.config['TESTING'] = False

    def create_app(self):

        return app

    def setUp(self):
  
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

class TestCourses(TestApp):

   

    # Get all courses http://localhost:5001/Course
    def test_getAllCourses(self):
        course_data1 = Courses(Course_ID='COR001', Course_Name='Systems Thinking and Design',Course_Desc='This is a foundational course',Course_Status='Active',Course_Type='Internal', Course_Category='Core')
        db.session.add(course_data1)
        db.session.commit()
        response = self.client.get("/Course", content_type='application/json')
        self.assertEqual(response.json, 
            {
            "data": [
                {
                    "Course_Category": "Core",
                    "Course_Desc": "This is a foundational course",
                    "Course_ID": "COR001",
                    "Course_Name": "Systems Thinking and Design",
                    "Course_Status": "Active",
                    "Course_Type": "Internal"
            }]}
        )

    # Get courses assigned to one skill http://localhost:5001/SkillCourse/<string:Skill_ID>
    def test_getOneCourse(self):
        course_data1 = Courses(Course_ID='COR001', Course_Name='Systems Thinking and Design',Course_Desc='This is a foundational course',Course_Status='Active',Course_Type='Internal', Course_Category='Core') 

        db.session.add(course_data1)
        db.session.commit()

        response = self.client.get("/Course/COR001", content_type = 'application/json')

        self.assertEqual(response.json, {
             "data": {
        "Course_Category": "Core",
        "Course_Desc": "This is a foundational course",
        "Course_ID": "COR001",
        "Course_Name": "Systems Thinking and Design",
        "Course_Status": "Active",
        "Course_Type": "Internal"
    }
        })

    def test_getOneCoursefail(self):
        course_data1 = Courses(Course_ID='COR001', Course_Name='Systems Thinking and Design',Course_Desc='This is a foundational course',Course_Status='Active',Course_Type='Internal', Course_Category='Core') 

        db.session.add(course_data1)
        db.session.commit()

        response = self.client.get("/Course/COR002", content_type = 'application/json')

        self.assertEqual(response.json, {
            "message": "No Course found"
        })


    def test_getSkillCourse(self):
        course_data1 = Courses(Course_ID='COR001', Course_Name='Systems Thinking and Design',Course_Desc='This is a foundational course',Course_Status='Active',Course_Type='Internal', Course_Category='Core') 
        skill_1 = Skill(Skill_ID=2004, Skill_Name='People and Relations', Status = 'Active')
        skill_courses = Skill_Course(Skill_ID=2004, Course_ID='COR001')
        db.session.add(course_data1)
        db.session.add(skill_1)
        db.session.add(skill_courses)
        db.session.commit()

        response = self.client.get("/SkillCourse", content_type = 'application/json')

        self.assertEqual(response.json, {
            "2004":[
                {
                     "Course_Category": "Core",
                        "Course_Desc": "This is a foundational course",
                        "Course_ID": "COR001",
                        "Course_Name": "Systems Thinking and Design",
                        "Course_Status": "Active",
                        "Course_Type": "Internal"
                }
            ]
        })

    
    #TODO get courses by skill ID
    def test_getCoursesBySkill(self):
        course_data1 = Courses(Course_ID='COR001', Course_Name='Systems Thinking and Design',Course_Desc='This is a foundational course',Course_Status='Active',Course_Type='Internal', Course_Category='Core') 
        skill_1 = Skill(Skill_ID=2004, Skill_Name='People and Relations', Status = 'Active')
        skill_courses = Skill_Course(Skill_ID=2004, Course_ID='COR001')
        db.session.add(course_data1)
        db.session.add(skill_1)
        db.session.add(skill_courses)
        db.session.commit()

        response = self.client.get("/SkillCourse/2004", content_type = 'application/json')

        self.assertEqual(response.json, {
            "2004":[
                {
                     "Course_Category": "Core",
                        "Course_Desc": "This is a foundational course",
                        "Course_ID": "COR001",
                        "Course_Name": "Systems Thinking and Design",
                        "Course_Status": "Active",
                        "Course_Type": "Internal"
                }
            ]
        })
    
    def test_getCoursesBySkillfail(self):
        course_data1 = Courses(Course_ID='COR001', Course_Name='Systems Thinking and Design',Course_Desc='This is a foundational course',Course_Status='Active',Course_Type='Internal', Course_Category='Core') 
        skill_1 = Skill(Skill_ID=2004, Skill_Name='People and Relations', Status = 'Active')
        skill_courses = Skill_Course(Skill_ID=2004, Course_ID='COR001')
        db.session.add(course_data1)
        db.session.add(skill_1)
        db.session.add(skill_courses)
        db.session.commit()

        response = self.client.get("/SkillCourse/2004", content_type = 'application/json')

        self.assertNotEquals(response.json, {
            "2005":[
                {
                     "Course_Category": "Core",
                        "Course_Desc": "This is a foundational course",
                        "Course_ID": "COR001",
                        "Course_Name": "Systems Thinking and Design",
                        "Course_Status": "Active",
                        "Course_Type": "Internal"
                }
            ]
        })

    #  Get courses completed by staff /manager/<string:staff_id> 14001
    
    def test_getCoursesbyStaff(self):
        
        
        role1= Role(Role_ID = 1, Role_Name ='Role1')
        staff1 = Staff(Staff_ID=130002, Staff_FName=  "Jack", Staff_LName= "Sim", Email="jack.sim@allinone.com.sg", Dept='1',Role=1)
        skill_1 = Skill(Skill_ID=2004, Skill_Name='People and Relations', Status = 'Active')
        course_data1 = Courses(Course_ID='COR001', Course_Name='Systems Thinking and Design',Course_Desc='This foundation module aims to teach',Course_Status='Active',Course_Type='Internal', Course_Category='Core') 
        job_role_1 = Job_Role(Job_Role_ID=4000, Job_Role_Name='Sales Representative', Status='Active' )

        LJ = LearningJourney(Course_ID='COR001', Skill_ID=2004,
                    Job_Role_ID=4000, Staff_ID=130002, Completion_Status='Completed')
        skillcourse1 = Skill_Course(Skill_ID=2004, Course_ID='COR001')
        registration_data = Registration(Reg_ID=1, Course_ID='COR001',Staff_ID=130002,Completion_Status='Completed')
        roleskill1 = Role_Skill(Job_Role_ID=4000, Skill_ID=2004)

 

        db.session.add(staff1)
        db.session.add(role1)
        db.session.add(skill_1)
        db.session.add(course_data1)
        db.session.add(job_role_1)
        db.session.add(LJ)
        db.session.add(skillcourse1)
        db.session.add(registration_data)
        db.session.add(roleskill1)
        db.session.commit()

        response = self.client.get("/manager/130002", content_type = 'application/json')

        print(response.json)
        print('HELLLLOOOOOOOOO')
        self.assertEqual(response.json, {
            "course_info":[
                 {
            "course_name": "Systems Thinking and Design",
            "course_status": "Completed",
            "course_type": "Internal",
            "skill_name": "People and Relations"
        }
            ],
             "staff_info": {
        "Dept": '1',
        "Email": "jack.sim@allinone.com.sg",
        "Role": 1,
        "Staff_FName": "Jack",
        "Staff_ID": 130002,
        "Staff_LName": "Sim"
            }
        })

    def test_getCoursesbyStaffFair(self):
        
        
        role1= Role(Role_ID = 1, Role_Name ='Role1')
        staff1 = Staff(Staff_ID=130002, Staff_FName=  "Jack", Staff_LName= "Sim", Email="jack.sim@allinone.com.sg", Dept='1',Role=1)
        skill_1 = Skill(Skill_ID=2004, Skill_Name='People and Relations', Status = 'Active')
        course_data1 = Courses(Course_ID='COR001', Course_Name='Systems Thinking and Design',Course_Desc='This foundation module aims to teach',Course_Status='Active',Course_Type='Internal', Course_Category='Core') 
        job_role_1 = Job_Role(Job_Role_ID=4000, Job_Role_Name='Sales Representative', Status='Active' )

        LJ = LearningJourney(Course_ID='COR001', Skill_ID=2004,
                    Job_Role_ID=4000, Staff_ID=130002, Completion_Status='Completed')
        skillcourse1 = Skill_Course(Skill_ID=2004, Course_ID='COR001')
        registration_data = Registration(Reg_ID=1, Course_ID='COR001',Staff_ID=130002,Completion_Status='Completed')
        roleskill1 = Role_Skill(Job_Role_ID=4000, Skill_ID=2004)

 

        db.session.add(staff1)
        db.session.add(role1)
        db.session.add(skill_1)
        db.session.add(course_data1)
        db.session.add(job_role_1)
        db.session.add(LJ)
        db.session.add(skillcourse1)
        db.session.add(registration_data)
        db.session.add(roleskill1)
        db.session.commit()

        response = self.client.get("/manager/130002", content_type = 'application/json')

        print(response.json)
        print('HELLLLOOOOOOOOO')
        self.assertNotEquals(response.json, {
            "course_info":[
                 {
            "course_name": "Systems Thinking and Desigan",
            "course_status": "Completed",
            "course_type": "Internal",
            "skill_name": "People and Relations"
        }
            ],
             "staff_info": {
        "Dept": '1',
        "Email": "jack.sim@allinone.com.sg",
        "Role": 1,
        "Staff_FName": "Jack",
        "Staff_ID": 130002,
        "Staff_LName": "Sim"
            }
        })


    # skill = Skill(Skill_ID=2002, Skill_Name='People and Relations', Status = 'Active')
    # skill_course = Skill_Course(Skill_Course=2002, Course_ID ='COR002')

    # def test_getAllCourses_Fail(self):
    #     course_data1 = Courses(Course_ID='COR001', Course_Name='Systems Thinking and Design',Course_Desc='This foundation module aims to teach',Course_Status='Active',Course_Type='Internal', Course_Category='Core')
    #     db.session.add(course_data1)
    #     db.session.commit()

    #     response = self.client.get("/Course/353", content_type='application/json')

    #     self.assertIsNone(response)




    # Get one course http://localhost:5001/Course/<string:course_id>

    # def test_delete_Role_success(self):
        
    #     job_role_1 = Job_Role(Job_Role_ID=4000, Job_Role_Name='Sales Representative', Status='Active' )
    #     db.session.add(job_role_1)
    #     db.session.commit()



    #     request_body = {
    #                     "Job_Role_ID": 4000,
    #                     "Job_Role_Name": "Sales Representative",
    #                     "Status": "Retired"
    #                 }

    #     response = self.client.put("/viewAllRoles/edit_role/<Job_Role_ID>",
    #                                 data=json.dumps(request_body),
    #                                 content_type='application/json')
     
    #     self.assertEqual(response.json, {
    #         "message": "Successfully updated role"
    #         })



    # def test_delete_Role_fail(self):
    
    #     job_role_1 = Job_Role(Job_Role_ID=4000, Job_Role_Name='Sales Representative', Status='Active' )
        
    #     db.session.add(job_role_1)
    #     db.session.commit()

    #     #fails when role does not exist in the system 
    #     request_body = {
    #                     "Job_Role_ID": 4001,
    #                     "Job_Role_Name": "Sales Representative",
    #                     "Status": "Active"
    #                 }

    #     response = self.client.put("/viewAllRoles/edit_role/<Job_Role_ID>",
    #                                 data=json.dumps(request_body),
    #                                 content_type='application/json')
     
    #     self.assertEqual(response.json, {
    #         "message": "Unable to commit to database."
    #         })
    
    # def testUpdateRole(self):

    #     role1 = Job_Role(Job_Role_ID=4000, Job_Role_Name='Sales Representative', Status='Active')
    #     db.session.add(role1)
    #     db.session.commit()


    #     request_body = {
    #                     "Job_Role_ID":4000,
    #                     "Job_Role_Name":'Sales Representativeee',
    #                     "Status":'Active'
    #                     }

    #     response = self.client.put("/viewAllRoles/edit_role/<Job_Role_ID>",
    #                                 data=json.dumps(request_body),
    #                                 content_type='application/json')

    #     self.assertEqual(response.status_code, 200)
    
    # def testUpdateRoleFail(self):

    #     role1 = Job_Role(Job_Role_ID=4000, Job_Role_Name='Sales Representative', Status='Active')
    #     db.session.add(role1)
    #     db.session.commit()


    #     request_body = {
    #                     "Job_Role_ID":5979,
    #                     "Job_Role_Name":'Hello',
    #                     "Status":'Active'
    #                     }

    #     response = self.client.put("/viewAllRoles/edit_role/<Job_Role_ID>",
    #                                 data=json.dumps(request_body),
    #                                 content_type='application/json')

    #     self.assertEqual(response.status_code, 500)



if __name__ == '__main__':
    unittest.main()
