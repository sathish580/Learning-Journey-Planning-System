import unittest
import flask_testing
import json
from LearningJourney import * 
# from Roles import * 


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

class TestDelefteLJ(TestApp):
    def test_delete_LJ(self):
        staff1 = Staff(Staff_ID=140001, Staff_FName='Sathish')
        Skill1 = Skill(Skill_ID=2000)
        skillcourse1 = Skill_Course(Skill_ID=2000, Course_ID='COR002')
        jobrole1 = Job_Role(Job_Role_ID=4001)
        roleskill1 = Role_Skill(Job_Role_ID=4001, Skill_ID=2000)
        role_staff_lj_1 = LearningJourney(Course_ID='COR002', Skill_ID=2000,
                    Job_Role_ID=4001, Staff_ID=140001, Completion_Status='Completed')

        # role_staff_lj_2 = LearningJourney(Course_ID='COR004', Skill_ID=2005,
        #                     Job_Role_ID=4001, Staff_ID=140001, Completion_Status='Completed')

        db.session.add(staff1)
        db.session.add(Skill1)
        db.session.add(skillcourse1)
        db.session.add(jobrole1)
        db.session.add(roleskill1)
        db.session.add(role_staff_lj_1)
        # db.session.add(role_staff_lj_2)
        db.session.commit()

        returnv = LearningJourney.query.all()

        # for item in returnv:
        #     print(to_dict(item))

        request_body = {
                        "Job_Role_ID": 4001,
                        "Staff_ID": 140001
                    }

        response = self.client.put("/deleteLJ",
                                    data=json.dumps(request_body),
                                    content_type='application/json')
     
        self.assertEqual(response.json, {
            "message": "Sucessfully deleted Learning Journey."
            })

    def test_create_lj(self):
        staff1 = Staff(Staff_ID=140001, Staff_FName='Sathish')
        Skill1 = Skill(Skill_ID=2000)
        skillcourse1 = Skill_Course(Skill_ID=2000, Course_ID='COR002')
        jobrole1 = Job_Role(Job_Role_ID=4001)
        roleskill1 = Role_Skill(Job_Role_ID=4001, Skill_ID=2000)


        db.session.add(staff1)
        db.session.add(Skill1)
        db.session.add(skillcourse1)
        db.session.add(jobrole1)
        db.session.add(roleskill1)
        db.session.commit()
        request_body = {'Course_ID': 'COR002', 'Skill_ID': 2000, 'Job_Role_ID': 4001, 'Staff_ID': 140001, 'Completion_Status': 'Completed'}
        
        response = self.client.post("/createLJ",
                                    data=json.dumps(request_body),
                                    content_type='application/json')

        self.assertEqual(response.json, {
                "message": "Created LJ. "
            })

class test_removeCoursefromLJ(TestApp):
    def test_removeCoursefromLJ_success(self):

        print('TESTEST')

        staff1 = Staff(Staff_ID=140001, Staff_FName='Sathish')
        Skill1 = Skill(Skill_ID=2000)
        skillcourse1 = Skill_Course(Skill_ID=2000, Course_ID='COR002')
        jobrole1 = Job_Role(Job_Role_ID=4001)
        roleskill1 = Role_Skill(Job_Role_ID=4001, Skill_ID=2000)
        role_staff_lj_1 = LearningJourney(Course_ID='COR002', Skill_ID=2000,
                    Job_Role_ID=4001, Staff_ID=140001, Completion_Status='Completed')

        # role_staff_lj_2 = LearningJourney(Course_ID='COR004', Skill_ID=2005,
        #                     Job_Role_ID=4001, Staff_ID=140001, Completion_Status='Completed')

        db.session.add(staff1)
        db.session.add(Skill1)
        db.session.add(skillcourse1)
        db.session.add(jobrole1)
        db.session.add(roleskill1)
        db.session.add(role_staff_lj_1)
        # db.session.add(role_staff_lj_2)
        db.session.commit()

        request_body = {
            'Course_ID': 'COR002', 
            'Skill_ID': 2000, 
            'Job_Role_ID': 4001, 
            'Staff_ID': 140001
            }
        
        response = self.client.put("/removeCoursefromLJ",
                                    data=json.dumps(request_body),
                                    content_type='application/json')
        
        print(response)
        self.assertEqual(response.json, {
                "message": "Successfully removed course from Learning Journey."
            })

    def test_removeCoursefromLJ_fail(self):

        print('TESTEST')

        staff1 = Staff(Staff_ID=140001, Staff_FName='Sathish')
        Skill1 = Skill(Skill_ID=2000)
        skillcourse1 = Skill_Course(Skill_ID=2000, Course_ID='COR002')
        jobrole1 = Job_Role(Job_Role_ID=4001)
        roleskill1 = Role_Skill(Job_Role_ID=4001, Skill_ID=2000)
        role_staff_lj_1 = LearningJourney(Course_ID='COR002', Skill_ID=2000,
                    Job_Role_ID=4001, Staff_ID=140001, Completion_Status='Completed')

        # role_staff_lj_2 = LearningJourney(Course_ID='COR004', Skill_ID=2005,
        #                     Job_Role_ID=4001, Staff_ID=140001, Completion_Status='Completed')

        db.session.add(staff1)
        db.session.add(Skill1)
        db.session.add(skillcourse1)
        db.session.add(jobrole1)
        db.session.add(roleskill1)
        db.session.add(role_staff_lj_1)
        # db.session.add(role_staff_lj_2)
        db.session.commit()
        
        #invalid request body 
        request_body = {
            'Course_ID': 'COR002', 
            'Skill_ID': 2001, 
            'Job_Role_ID': 4001, 
            'Staff_ID': 140001
            }
        
        response = self.client.put("/removeCoursefromLJ",
                                    data=json.dumps(request_body),
                                    content_type='application/json')
        
        print(response)
        self.assertEqual(response.json, {
        "message": "Unable to commit to database."
    })

    

if __name__ == '__main__':
    unittest.main()
