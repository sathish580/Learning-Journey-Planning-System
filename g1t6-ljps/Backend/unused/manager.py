import json
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import relationship,sessionmaker

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://admin:admin123' + \
                                        '@lms-2.cxvrdenw3ztb.us-east-1.rds.amazonaws.com:3306/LearningManagementDatabase'
app.config['SQLALCHEMY_BINDS'] = {
    "db2": 'mysql+mysqlconnector://admin:mypassword' + \
                                        '@spm-database-4.cikntbsa8vrm.us-east-1.rds.amazonaws.com:3306/LJPS'
}

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                           'pool_recycle': 280}

db = SQLAlchemy(app)

CORS(app)

class Staffs(db.Model):
    __tablename__ = 'Staff'

    Staff_ID = db.Column(db.Integer, primary_key=True)
    Staff_FName = db.Column(db.String(50))
    Staff_LName = db.Column(db.String(50))
    Dept = db.Column(db.String(50))
    Email = db.Column(db.String(50))
    Role = db.Column(db.Integer, db.ForeignKey('role.Role_ID'))
    # registrations = relationship('Registration', back_populates='staff')

class Registration(db.Model):
    __tablename__ = 'Registration'

    Reg_ID = db.Column(db.Integer, primary_key=True)
    Course_ID = db.Column(db.String(20))
    Staff_ID = db.Column(db.Integer, db.ForeignKey('Staff.Staff_ID'))
    Reg_Status = db.Column(db.String(20))
    Completion_Status = db.Column(db.String(20))

    # staff = relationship('Staffs',back_populates='registrations')

class Courses(db.Model):
    __tablename__ = 'Course'

    Course_ID = db.Column(db.String(20), primary_key=True)
    Course_Name = db.Column(db.String(50))
    Course_Desc =db.Column(db.String(255))
    Course_Status = db.Column(db.String(15))
    Course_Type = db.Column(db.String(10))
    Course_Category = db.Column(db.String(50))

class Manager(db.Model):
    __bind_key__ = 'db2'
    __tablename__ = 'Manager'

    Manager_ID = db.Column(db.Integer, primary_key=True)
    Staff_ID = db.Column(db.Integer, db.ForeignKey('Staff.Staff_ID'), primary_key=True)

class Skill(db.Model):
    __bind_key__ = 'db2'
    __tablename__ = 'Skill'

    Skill_ID = db.Column(db.String, primary_key=True)
    Skill_Name = db.Column(db.String)

class Skill_Course(db.Model):
    __bind_key__ = 'db2'
    __tablename__ = 'Skill_Course'

    Course_ID = db.Column(db.String, db.ForeignKey('Course.Course_ID'), primary_key=True)

    Skill_ID = db.Column(db.String, db.ForeignKey('Skill.Skill_ID'), primary_key=True)

class LearningJourney(db.Model):
    __bind_key__ = 'db2'
    __tablename__ = 'LJ_Mapping'
    
    Course_ID = db.Column(db.String, db.ForeignKey('Course.Course_ID'), primary_key = True ) 
    Skill_ID = db.Column(db.Integer, db.ForeignKey('Skill.Skill_ID'), primary_key = True ) 
    Job_Role_ID = db.Column(db.Integer, db.ForeignKey('Role_Skill.Job_Role_ID'), primary_key = True )
    Staff_ID = db.Column(db.Integer, db.ForeignKey('Staff.Staff_ID'), primary_key = True )
    Completion_Status = db.Column(db.String)

def to_dict(self):
        """
        'to_dict' converts the object into a dictionary,
        in which the keys correspond to database columns
        """
        columns = self.__mapper__.column_attrs.keys()
        result = {}
        for column in columns:
            result[column] = getattr(self, column)
        return result


@app.route("/manager", methods = ['POST'])
def view_staffs():
    manager_id= request.get_json()['manager_id']
    # print(manager_id)

    if request:
        
    
        # print(test.to_dict() for test in staffs.registrations )
        managers = Manager.query.filter(Manager.Manager_ID.contains(manager_id))
        staff_info = []
      
        for staff_id in managers:
            staff_id = to_dict(staff_id)
            # print(staff_id)
            staff_id = (staff_id)['Staff_ID']

            filtered_staffs_info = Staffs.query.filter(Staffs.Staff_ID.contains(staff_id))

            for info in filtered_staffs_info:
                info = to_dict(info)

                staff_info.append({
                    'staff_id': info['Staff_ID'],
                    'f_name': info['Staff_FName'],
                    'l_name': info['Staff_LName'],
                    'email': info['Email']
                })


        # print(staff_info)
        

        return jsonify({ 
            # "data": [staff.to_dict() for staff in staffs], 
            "data": staff_info}
        ),200

        
# @app.route("/manager/<string:staff_id>")
# def view_staff_info(staff_id):

#     staff_basic_info = to_dict(Staffs.query.filter_by(Staff_ID=staff_id).first())

#     if staff_basic_info:
#         registration_info = Registration.query.filter(Registration.Staff_ID.contains(staff_id))
#         # course_status = [regi.to_dict() for regi in registration_info]
#         course_info = []

#         for registration in registration_info:
#             registration = to_dict(registration)
#             print(registration)
#             course_id = registration['Course_ID']
#             course_status = registration['Completion_Status']
#             course_name = to_dict(Courses.query.filter(Courses.Course_ID.contains(course_id))[0])['Course_Name']
#             course_type = to_dict(Courses.query.filter(Courses.Course_ID.contains(course_id))[0])['Course_Type']
#             # print(course_name, course_status)

#             learning_journey_info = LearningJourney.query.filter(
#                                     LearningJourney.Course_ID.contains(course_id),
#                                     LearningJourney.Staff_ID.contains(staff_id))

#             for learning_journey in learning_journey_info:

#                 learning_journey = to_dict(learning_journey)
#                 # print(to_dict(learning_journey),'hello')
#                 skill_id = learning_journey['Skill_ID']
#                 skill_name = to_dict(Skill.query.filter(Skill.Skill_ID.contains(skill_id))[0])['Skill_Name']
#                 course_info.append(
#                     {
#                         "course_name": course_name,
#                         "course_status": course_status,
#                         "course_type": course_type,
#                         "skill_name": skill_name
                        
#                     }
#                 )
                



#     if staff_id:

#         return jsonify({
#             #need to return course information as well (yet to code)
#             "course_info": course_info,
#             "staff_info": staff_basic_info
            
#         })

if __name__ == "__main__":
   
    app.run(host="0.0.0.0", port=5100, debug=True)
