import unittest
import flask_testing
import json
from Roles import * 


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

class TestDeleteRole(TestApp):

    
    def test_delete_Role_success(self):
      

        job_role_1 = Job_Role(Job_Role_ID=4000, Job_Role_Name='Sales Representative', Status='Active' )
        
        db.session.add(job_role_1)
        db.session.commit()


        request_body = {
                        "Job_Role_ID": 4000,
                        "Job_Role_Name": "Sales Representative",
                        "Status": "Retired"
                    }

        response = self.client.put("/viewAllRoles/edit_role/<Job_Role_ID>",
                                    data=json.dumps(request_body),
                                    content_type='application/json')
     
        self.assertEqual(response.json, {
            "message": "Successfully updated role"
            })

    def test_delete_Role_fail(self):
    
        job_role_1 = Job_Role(Job_Role_ID=4000, Job_Role_Name='Sales Representative', Status='Active' )
        
        db.session.add(job_role_1)
        db.session.commit()

        #fails when role does not exist in the system 
        request_body = {
                        "Job_Role_ID": 4001,
                        "Job_Role_Name": "Sales Representative",
                        "Status": "Active"
                    }

        response = self.client.put("/viewAllRoles/edit_role/<Job_Role_ID>",
                                    data=json.dumps(request_body),
                                    content_type='application/json')
     
        self.assertEqual(response.json, {
            "message": "Unable to commit to database."
            })

class TestCreateRole(TestApp):
    
    def test_create_Role_success(self):

        request_body = {
                        "Job_Role_ID": 4000,
                        "Job_Role_Name": "Sales Representative",
                        "Status": "Pending"
                    }

        response = self.client.post("/createJobRole",
                                    data=json.dumps(request_body),
                                    content_type='application/json')

        self.assertEqual(response.json, {
            "message": "Successfully updated role"
            }   
             )
        
    def test_create_Role_fail(self):

        response = self.client.post("/createJobRole",
                                     content_type='application/json')
     
        # self.assertEqual(response.json, {
        #         "Job_Role_Name": "Sales Representative",
        #     })
        self.assertEqual(response.json, None)

class test_update_role_details(TestApp):
    def test_update_role_details_success(self):

        job_role_1 = Job_Role(Job_Role_ID=4000, Job_Role_Name='Sales Representative', Status='Active' )
        
        db.session.add(job_role_1)
        db.session.commit()

        request_body = {
                        "Job_Role_ID": 4000,
                        "Job_Role_Name": "Sales Manager",
                        "Status": "Active"
                    }

        response = self.client.put("/viewAllRoles/edit_role/<Job_Role_ID>",
                                   data=json.dumps(request_body),
                                   content_type = 'application/json')

        self.assertEqual(response.json, {            
            "message": "Successfully updated role"
            })

    def test_update_role_details_fail(self):
    #dont work
        job_role_1 = Job_Role(Job_Role_ID=4000, Job_Role_Name='Sales Representative', Status='Active')
        
        db.session.add(job_role_1)
        db.session.commit()

        request_body = {
                        "Job_Role_ID":5979,
                        "Job_Role_Name":'Hello',
                        "Status":'Active'
                        }

        response = self.client.put("/viewAllRoles/edit_role/<Job_Role_ID>",
                                   data=json.dumps(request_body),
                                   content_type = 'application/json')

        self.assertEqual(response.json, {            
            "message": "Unable to commit to database."
            })
class test_view_all_roles(TestApp):
    def test_view_all_roles_success(self):


        job_role_1 = Job_Role(Job_Role_ID=4000, Job_Role_Name='Sales Representative', Status='Active')
        
        db.session.add(job_role_1)
        db.session.commit()

        response = self.client.get("/viewAllRoles",
                                   content_type = 'application/json')

        self.assertEqual(response.json, {
            'Sales Representative':{
            'Job_Role_ID' : 4000,
            'Job_Role_Name' : "Sales Representative",
            'Status' : "Active"
            }
        })


class test_view_a_role(TestApp):
    def test_view_a_role_success(self):
        job_role_1 = Job_Role(Job_Role_ID=4000, Job_Role_Name='Sales Representative', Status='Active' )
        db.session.add(job_role_1)
        db.session.commit()
        
        response = self.client.get("/getJobRole/4000",
                                   content_type = 'application/json'
                                   )

        self.assertEqual(response.json, {
                    "data": [
                        {
                            "Job_Role_ID": 4000,
                            "Job_Role_Name": "Sales Representative",
                            "Status": "Active"
                        }
                    ]
                })

    def test_view_a_role_fail(self):


        response = self.client.get("/getJobRole/4000",
                                   content_type = 'application/json'
                                   )
        self.assertEqual(response.json, {
        "data" : []
                })

if __name__ == '__main__':
    unittest.main()
