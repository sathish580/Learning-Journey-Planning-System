import unittest
import flask_testing
import json
from staff import * 


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

class test_manager_view_staff_course(TestApp):
    def test_manager_view_staff_course(self):
        manager1 = Manager(Manager_ID=140001, Staff_ID=130002)
        staff1 = Staff(Staff_ID=130002, Staff_FName=  "Jack", Staff_LName= "Sim", Email="jack.sim@allinone.com.sg")
        db.session.add(manager1)
        db.session.add(staff1)
        db.session.commit()

        request_body = {
                        "manager_id" : 140001                        
                        }

        response = self.client.post("/manager",
                                    data=json.dumps(request_body),
                                    content_type = 'application/json')

        self.assertEqual(response.json, {
            "data": [
                        {
                            "email": "jack.sim@allinone.com.sg",
                            "f_name": "Jack",
                            "l_name": "Sim",
                            "staff_id": 130002
                        }
                    ]})
        # self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
