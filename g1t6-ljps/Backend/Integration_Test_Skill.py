import unittest
import flask_testing
import json
from skills import * 


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

class TestAssignCourse(TestApp):
    
    def testAssignCourse_Pass(self):

        course_1 = Courses(Course_ID = 'COR001', Course_Name='Manage Change')
        course_2 = Courses(Course_ID = 'COR002', Course_Name='Service Excellence', Course_Status='Active',Course_Category='Core' )
        skill_course_1 = Skill_Course(Course_ID='COR001', Skill_ID=2000)

        db.session.add(course_1)
        db.session.add(course_2)
        db.session.add(skill_course_1)
        db.session.commit()

        request_body = {
        "Skill_ID": 2000
        }

        response = self.client.post("/assign_course",
                                    data=json.dumps(request_body),
                                    content_type='application/json')


        self.assertEqual(response.json, {
        "Unassigned_Courses":[{
            "Course_ID": 'COR002',
            "Course_Name": "Service Excellence",
            "Course_Status": "Active",
            "Course_Category": "Core"

            
        }]
        })

    def testAssignCourse_Fail(self):

        course_1 = Courses(Course_ID = 'COR002', Course_Name='Service Excellence', Course_Status='Active',Course_Category='Core' )

        db.session.add(course_1)
        db.session.commit()

        request_body = {
        "Skill_ID": 2000
        }

        response = self.client.post("/assign_course",
                                    data=json.dumps(request_body),
                                    content_type='application/json')


        self.assertEqual(response.json, {
        "Unassigned_Courses":[{
            "Course_ID": 'COR002',
            "Course_Name": "Service Excellence"
        }]
        })

class TestAssignCourseSave(TestApp):
    
    def testAssignCourseSave_Pass(self):
        
        request_body = {
            "Courses": ["COR001", "COR002"],
            "Skill_ID": 2014
        }

        response = self.client.put("assign_course/save", data=json.dumps(request_body),
                                content_type = 'application/json')

        
        self.assertEqual(response.json, {
            "message": "Sucessfully commited to database"
             })


    #fail not testable as it has to do with DB connection 


class TestUnassignCourse(TestApp):
    def testUnassignCourse_Pass(self):



        course_1 = Courses(Course_ID = 'COR001', Course_Name='Manage Change', Course_Status='Active',Course_Category='Finance')
        course_2 = Courses(Course_ID = 'COR002', Course_Name='Service Excellence', Course_Status='Active',Course_Category='Core' )
        skill_course_1 = Skill_Course(Course_ID='COR001', Skill_ID=2000)
        skill_course_2 = Skill_Course(Course_ID='COR002', Skill_ID=2000)

        db.session.add(course_1)
        db.session.add(course_2)
        db.session.add(skill_course_1)
        db.session.add(skill_course_2)
        db.session.commit()

        request_body = {
        "Skill_ID": 2000
        }


        response = self.client.post("/unassign_course",
                                    data=json.dumps(request_body),
                                    content_type='application/json')


        self.assertEqual(response.json, {
        "Assigned_Courses":[{
            "Course_ID": 'COR001',
            "Course_Name": "Manage Change",
            "Course_Status": "Active",
            "Course_Category": "Finance"
        },
        {
            "Course_ID": 'COR002',
            "Course_Name": "Service Excellence",
            "Course_Status": "Active",
            "Course_Category": "Core"
        }]
        })

    def testUnassignCourse_Fail(self):


        request_body = {
        "Skill_ID": 2000
        }


        response = self.client.post("/unassign_course",
                                    data=json.dumps(request_body),
                                    content_type='application/json')


        self.assertEqual(response.json, {
            "Message": "No course found. Please assign a course."
            })

    def testUnassignCourseSave_Pass(self):

        skill_course_1 = Skill_Course(Course_ID='COR001', Skill_ID=2000)
        skill_course_2 = Skill_Course(Course_ID='COR002', Skill_ID=2000)

        db.session.add(skill_course_1)
        db.session.add(skill_course_2)
        db.session.commit()

        request_body = {
            "Courses": ["COR001", "COR002"],
            "Skill_ID": 2000
        }

        response = self.client.put("unassign_course/save", data=json.dumps(request_body),
                                content_type = 'application/json')

        
        self.assertEqual(response.json, {
            "message": "Sucessfully removed skill from course."
            })


    def testUnassignCourseSave_Fail(self):

        request_body = {
            "Courses": ["COR001", "COR002"],
            "Skill_ID": 2000
        }

        response = self.client.put("unassign_course/save", data=json.dumps(request_body),
                                content_type = 'application/json')

        
        self.assertEqual(response.json, {
                        "message": "Unable to remove skill from course. "
                        })


class TestUnassignSkill_Role(TestApp):

    def testUnassignRole_Pass(self):

        role_skill_1 = Role_Skill(Skill_ID=2003, Job_Role_ID=4000)
        role_skill_2 = Role_Skill(Skill_ID=2003, Job_Role_ID=5001)
        job_role_1 = Job_Role(Job_Role_ID=4000,Job_Role_Name='Sales Representative')
        job_role_2 = Job_Role(Job_Role_ID=5001,Job_Role_Name='Sales Manager')


        db.session.add(role_skill_1)
        db.session.add(role_skill_2)
        db.session.add(job_role_1)
        db.session.add(job_role_2)
        db.session.commit()

        request_body = {
            "Skill_ID": 2003
        }
        
        response = self.client.post("/unassign_role",
                                    data=json.dumps(request_body),
                                    content_type='application/json')

        
        self.assertEqual(response.json, {
        "Roles":[{
            "Job_Role_ID": 4000,
            "Job_Role_Name": "Sales Representative"
        },
        {
            "Job_Role_ID": 5001,
            "Job_Role_Name": "Sales Manager"
        }]
        })

    def testUnassignRole_Fail(self):
    
        role_skill_1 = Role_Skill(Skill_ID=2003, Job_Role_ID=4000)
    
        db.session.add(role_skill_1)
        db.session.commit()

        request_body = {
            "Skill_ID": 2004
        }
        
        response = self.client.post("/unassign_role",
                                    data=json.dumps(request_body),
                                    content_type='application/json')

        
        self.assertEqual(response.json, {
                'message': "Invalid Skill ID. Skill ID not found in the system."
            })


    def test_Unassign_Skill_R_success(self):

        u_skill = Role_Skill(Skill_ID=2003, Job_Role_ID=4001)
        db.session.add(u_skill)
        db.session.commit()

        request_body = {
                        "Skill_ID": 2003,
                        "Roles": [4001]
                    }

        # print(request_body)

        response = self.client.put("/unassign_role/save",
                                    data=json.dumps(request_body),
                                    content_type='application/json')
     
        # self.assertFalse(Skill_Course.query.filter(Skill_Course.Course_ID == Skill_Course.Course_ID).exists())
        self.assertEqual(response.json, {

            "message": "Sucessfully removed roles."
            })

    def test_Unassign_Skill_R_fail(self):

        u_skill = Role_Skill(Skill_ID=2003, Job_Role_ID=4001)
        db.session.add(u_skill)
        db.session.commit()

        request_body = {
                        "Skill_ID": 2003,
                        "Roles": [9001]
                    }

        # print(request_body)

        response = self.client.put("/unassign_role/save",
                                    data=json.dumps(request_body),
                                    content_type='application/json')
     
        # self.assertFalse(Skill_Course.query.filter(Skill_Course.Course_ID == Skill_Course.Course_ID).exists())
        self.assertEqual(response.json, {
                        "message": "Unable to remove roles. "
                        })

class test_update_skill_details(TestApp):
    def test_update_skill_details_success(self):

        u_skill = Skill(Skill_ID=2004, Skill_Name='People and Relations')
        db.session.add(u_skill)
        db.session.commit()

        request_body = {
            "Skill_ID": 2004,
            "Skill_Name": "Management and Engineering",
            "Skill_Status": "Active"

        }

        response = self.client.put("/edit_skill/<Skill_ID>",
                                   data=json.dumps(request_body),
                                   content_type = 'application/json')

        self.assertEqual(response.json, {
            "message": "Successfully updated skill"
            })

    def test_update_skill_details_fail(self):

        u_skill = Skill(Skill_ID=2004, Skill_Name='People and Relations')
        db.session.add(u_skill)
        db.session.commit()

        request_body = {
            "Skill_ID": 2005,
            "Skill_Name": "Management and Engineering",
            "Skill_Status": "Active"

        }

        # print(request_body)

        response = self.client.put("/edit_skill/<Skill_ID>",
                                    data=json.dumps(request_body),
                                    content_type='application/json')
     
        # self.assertFalse(Skill_Course.query.filter(Skill_Course.Course_ID == Skill_Course.Course_ID).exists())
        self.assertEqual(response.json, {
        "message": "Unable to commit to database."
            })


        
    #tests for success 'delete'. Fail 'delete' tested above
    def test_soft_delete_skill_success(self):

        u_skill = Skill(Skill_ID=2004, Skill_Name='People and Relations', Status='Active')
        db.session.add(u_skill)
        db.session.commit()

        request_body = {
            "Skill_ID": 2004,
            "Skill_Name": "Management and Engineering",
            "Skill_Status": "Retired"

        }

        # print(request_body)

        response = self.client.put("/edit_skill/<Skill_ID>",
                                    data=json.dumps(request_body),
                                    content_type='application/json')

        self.assertEqual(response.json, {
            "message": "Successfully updated skill"
            })


class TestViewAllSkill(TestApp):
    def testViewAllSkill_Pass(self):

        skill_1 = Skill(Skill_ID=2004, Skill_Name='People and Relations', Status = 'Active')
        skill_2 = Skill(Skill_ID=2005, Skill_Name='Management')


        db.session.add(skill_1)
        db.session.add(skill_2)
        db.session.commit()

        response = self.client.get("/Skill",
                                   content_type = 'application/json')

        self.assertEqual(response.json, {
                        "2004": {
                            "Skill_ID": "2004",
                            "Skill_Name": "People and Relations",
                            "Skill_Status": "Active"
                        },
                        "2005": {
                            "Skill_ID": "2005",
                            "Skill_Name": "Management",
                            "Skill_Status": None
                        }})



class TestSkillsByRoleID(TestApp):
    def testSkillsByRoleID_Pass(self):
        
        skill_role_1 = Role_Skill(Skill_ID=2000, Job_Role_ID = 4002)
        skill_role_2 = Role_Skill(Skill_ID=2002, Job_Role_ID = 4002)

        db.session.add(skill_role_1)
        db.session.add(skill_role_2)
        db.session.commit()

        response = self.client.get("/RoleSkill/4002",
                                   content_type = 'application/json')

        self.assertEqual(response.json, {
                        "data": 
                        {
                            "Skill_ID": [2000,2002]
                        }
                        })

    def testSkillsByRoleID_empty(self):
        
        skill_role_1 = Role_Skill(Skill_ID=2000, Job_Role_ID = 4002)
        skill_role_2 = Role_Skill(Skill_ID=2002, Job_Role_ID = 4002)

        db.session.add(skill_role_1)
        db.session.add(skill_role_2)
        db.session.commit()

        #should return empty list 
        response = self.client.get("/RoleSkill/4003",
                                   content_type = 'application/json')

        self.assertEqual(response.json, {
                        "data": 
                        {
                            "Skill_ID": []
                        }
                        })


class TestCreateSkill(TestApp):
    def testCreateSkill_Pass(self):

       request_body = {
        "Skill_ID": 2000,
        "Skill_Name": "Managing",
        "Status": "Active"
       } 

       response = self.client.post("/Create_Skill", data = json.dumps(request_body),
                                    content_type = 'application/json')

       self.assertEqual(response.json, {
            "message": "Sucessfuly commited to database."
           })

       

    def testCreateSkill_fail(self):

        response = self.client.post("/Create_Skill",
                                    content_type = 'application/json')

        self.assertEqual(response.json, None)
    


class TestAssignRole(TestApp):
    def testAssignRole_Pass(self):

        job_role_1 = Job_Role(Job_Role_ID=4000,Job_Role_Name='Sales Representative',Status = 'Active')
        job_role_2 = Job_Role(Job_Role_ID=4001,Job_Role_Name='Finance Executive',Status = 'Active')
        role_skill = Role_Skill(Job_Role_ID=4000, Skill_ID=2000)

        db.session.add(job_role_1)
        db.session.add(job_role_2)
        db.session.add(role_skill)
        db.session.commit()

        request_body = {
            "Skill_ID": 2000
        }

        response = self.client.post("/assign_role", 
                                    data = json.dumps(request_body),
                                    content_type = 'application/json')

        self.assertEqual(response.json, {
            "Roles": [
                {
                    "Job_Role_ID": 4001,
                    "Job_Role_Name": "Finance Executive"
                }
            ]
        })

    def testAssignRole_Fail(self):
    
        job_role_1 = Job_Role(Job_Role_ID=4000,Job_Role_Name='Sales Representative',Status = 'Active')
        job_role_2 = Job_Role(Job_Role_ID=4001,Job_Role_Name='Finance Executive',Status = 'Active')
        

        db.session.add(job_role_1)
        db.session.add(job_role_2)
        db.session.commit()

        request_body = {
            "Skill_ID": 2000
        }

        response = self.client.post("/assign_role", data = json.dumps(request_body),
                                    content_type = 'application/json')

        self.assertEqual(response.json, {
            'message': "Invalid Skill ID. Skill ID not found in the system."  
        })

    def testAssignRoleSave_Pass(self):


        job_role_1 = Job_Role(Job_Role_ID=4000,Job_Role_Name='Sales Representative',Status = 'Active')
        job_role_2 = Job_Role(Job_Role_ID=4001,Job_Role_Name='Finance Executive',Status = 'Active')
        

        db.session.add(job_role_1)
        db.session.add(job_role_2)
        db.session.commit()

        request_body = {
            "Skill_ID": 2002,
            "Roles": [4000,4001]
        }

        response = self.client.post("/assign_role/save", data = json.dumps(request_body),
                                    content_type = 'application/json')

        self.assertEqual(response.json, {
            'message': "Sucessfully commited to database" 
        })

    def testAssignRoleSave_Fail(self):

        request_body = {
            "Skill_ID": 2002,
            "Roles": "4001"
        }

        response = self.client.post("/assign_role/save", data = json.dumps(request_body),
                                    content_type = 'application/json')

        self.assertEqual(response.json, {
            'message': "Unable to commit to database." 
        })


class TestviewAllSkillsPerRole(TestApp):
    def testviewAllSkillsPerRole_Pass(self):

        skill = Skill(Skill_ID=2004, Skill_Name='People and Relations', Status = 'Active')
        job_role = Job_Role(Job_Role_ID=4000,Job_Role_Name='Sales Representative', Status = 'Active')
        role_skill = Role_Skill(Job_Role_ID=4000,Skill_ID=2004)

        db.session.add(skill)
        db.session.add(job_role)
        db.session.add(role_skill)
        db.session.commit()

        response = self.client.get("/viewAllSkillsPerRole/4000",
                                            content_type = 'application/json')

        self.assertEqual(response.json, {
                        "jobDetails": [
                            {
                                "Job_Role_ID": 4000,
                                "Job_Role_Name": "Sales Representative",
                                "Status": "Active"
                            }
                        ],
                        "skills": [
                            {
                                "Skill_ID": 2004,
                                "Skill_Name": "People and Relations"
                         }]})
    def testviewAllSkillsPerRole_Fail(self):
    

        response = self.client.get("/viewAllSkillsPerRole/4000",
                                            content_type = 'application/json')

        self.assertEqual(response.json, {
                        "jobDetails": [

                        ],
                        "skills": [
                            ]})

if __name__ == '__main__':
    unittest.main()
