import json
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# from databaseClasses import *


app = Flask(__name__)
db = SQLAlchemy(app)

#LMS Connection
if __name__ == '__main__':

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://admin:admin123' + \
                                            '@lms-2.cxvrdenw3ztb.us-east-1.rds.amazonaws.com:3306/LearningManagementDatabase'

    #LJPS Connection
    app.config['SQLALCHEMY_BINDS'] = {
        "db2": 'mysql+mysqlconnector://admin:mypassword' + \
                                            '@spm-database-4.cikntbsa8vrm.us-east-1.rds.amazonaws.com:3306/LJPS'
    }

    
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                            'pool_recycle': 280}

    
    class Registration(db.Model):

        __tablename__ = 'Registration'

        Reg_ID = db.Column(db.Integer, primary_key=True)
        Course_ID = db.Column(db.String(20))
        Staff_ID = db.Column(db.Integer, db.ForeignKey('Staff.Staff_ID'))
        Reg_Status = db.Column(db.String(20))
        Completion_Status = db.Column(db.String(20))

    # staff = relationship('Staffs',back_populates='registrations')

else:
    
    app.config['SQLALCHEMY_BINDS'] = {
        "db2": "sqlite://"
    }

    class Registration(db.Model):
        __bind_key__ = 'db2'
        __tablename__ = 'Registration'

        Reg_ID = db.Column(db.Integer, primary_key=True)
        Course_ID = db.Column(db.String(20))
        Staff_ID = db.Column(db.Integer, db.ForeignKey('Staff.Staff_ID'))
        Reg_Status = db.Column(db.String(20))
        Completion_Status = db.Column(db.String(20))
   
    
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


class Role(db.Model):
    __bind_key__ = 'db2'
    __tablename__ = 'Role'

    Role_ID = db.Column(db.Integer, primary_key=True)
    Role_Name = db.Column(db.String(20), nullable=False)
   
class Staff(db.Model):
    __bind_key__ = 'db2'
    __tablename__ = 'Staff'

    Staff_ID = db.Column(db.Integer, primary_key=True)
    Staff_FName = db.Column(db.String(50))
    Staff_LName = db.Column(db.String(50))
    Dept = db.Column(db.String(50))
    Email = db.Column(db.String(50))
    Role = db.Column(db.Integer, db.ForeignKey('Role.Role_ID'))
    # registrations = relationship('Registration', back_populates='staff')

class Courses(db.Model):
    __bind_key__ = 'db2'
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

    Skill_ID = db.Column(db.String(20), primary_key=True)
    Skill_Name = db.Column(db.String(50))
    Status = db.Column(db.String(12))

class Skill_Course(db.Model):
    __bind_key__ = 'db2'
    __tablename__ = 'Skill_Course'

    Course_ID = db.Column(db.String(20), db.ForeignKey('Course.Course_ID'), primary_key=True)
    Skill_ID = db.Column(db.String(20), db.ForeignKey('Skill.Skill_ID'), primary_key=True)

class LearningJourney(db.Model):
    __bind_key__ = 'db2'
    __tablename__ = 'LJ_Mapping'
    
    Course_ID = db.Column(db.String(20), db.ForeignKey('Course.Course_ID'), primary_key = True ) 
    Skill_ID = db.Column(db.Integer, db.ForeignKey('Skill.Skill_ID'), primary_key = True ) 
    Job_Role_ID = db.Column(db.Integer, db.ForeignKey('Role_Skill.Job_Role_ID'), primary_key = True )
    Staff_ID = db.Column(db.Integer, db.ForeignKey('Staff.Staff_ID'), primary_key = True )
    Completion_Status = db.Column(db.String(20))

class Job_Role(db.Model):
    __bind_key__ = 'db2'
    __tablename__ = 'Job_Role'
    
    Job_Role_ID = db.Column(db.Integer,primary_key=True)
    Job_Role_Name = db.Column(db.String(20))
    Status = db.Column(db.String(12))

    def json(self):
        dataToObject = {
            'Job_Role_ID': self.Job_Role_ID,
            'Job_Role_Name': self.Job_Role_Name,
            'Status': self.Status
        }
        return dataToObject

class Role_Skill(db.Model):
    __bind_key__ = 'db2'
    __tablename__ = 'Role_Skill'
    
    Job_Role_ID = db.Column(db.Integer, db.ForeignKey('Job_Role.Job_Role_ID'), primary_key=True)
    Skill_ID = db.Column(db.Integer, db.ForeignKey('Skill.Skill_ID'), primary_key=True)

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

CORS(app)


@app.route("/Course")
def ViewCourse():
    print(to_dict(Courses.query.first()))
    Course_list = Courses.query.all()

    return jsonify(
        {
            "data": [to_dict(Course) for Course in Course_list]
        }
    ), 200

@app.route("/Course/<string:Course_ID>")
def ViewOneCourse(Course_ID):
    course = Courses.query.filter_by(Course_ID=Course_ID).first()
    
    if course == None:
        return jsonify({
            "message": "No Course found"
        }
        )
    return jsonify(
        {
            "data": to_dict(course)
        }
    ), 200

@app.route("/SkillCourse/<string:Skill_ID>")
def ViewCourseBySkillID(Skill_ID):
    CourseBySkill_list = Skill_Course.query.filter_by(Skill_ID=Skill_ID).all()
    # print(CourseBySkill_list)
    # return jsonify(
    #     {
    #         "data": [Courses.json()['Course_ID'] for Courses in CourseBySkill_list]
    #     }
    # ), 200
    Courseslist = Courses.query.all()
    # print(Courseslist.Course_Name)
    main_dict = {}
    main_dict[Skill_ID] = []
    # course is a courseskill pair (courseID, skillID)
    for course in CourseBySkill_list:
        # print(course.Skill_ID, end=":")
        # print(course.Course_ID)
        
        # loop thru the courses list for the matching course ID to append into the list for the skillID
        for courseObj in Courseslist:
            if courseObj.Course_ID == course.Course_ID:
                # create a course obj to append to the list
                courseObjToAdd = {}
                courseObjToAdd["Course_ID"] = courseObj.Course_ID
                courseObjToAdd["Course_Name"] = courseObj.Course_Name
                courseObjToAdd["Course_Desc"] = courseObj.Course_Desc
                courseObjToAdd["Course_Status"] = courseObj.Course_Status
                courseObjToAdd["Course_Type"] = courseObj.Course_Type
                courseObjToAdd["Course_Category"] = courseObj.Course_Category

                # add course obj to list of courses under one skillID
                main_dict[Skill_ID].append(courseObjToAdd)


    return main_dict


@app.route("/SkillCourse")
def ViewCoursesAndSkills():
    CourseBySkill_list = Skill_Course.query.all()
    # print(CourseBySkill_list)
    Courseslist = Courses.query.all()
    # print(Courseslist.Course_Name)
    main_dict = {}
    # course is a courseskill pair (courseID, skillID)
    for course in CourseBySkill_list:
        # print(course.Skill_ID, end=":")
        # print(course.Course_ID)

        # if there isn't already a list for the skillID, create an empty list for it
        if course.Skill_ID not in main_dict:
            main_dict[course.Skill_ID] = []
        
        # else, loop thru the courses list for the matching course ID to append into the list for the skillID
        for courseObj in Courseslist:
            if courseObj.Course_ID == course.Course_ID:
                # create a course obj to append to the list
                courseObjToAdd = {}
                courseObjToAdd["Course_ID"] = courseObj.Course_ID
                courseObjToAdd["Course_Name"] = courseObj.Course_Name
                courseObjToAdd["Course_Desc"] = courseObj.Course_Desc
                courseObjToAdd["Course_Status"] = courseObj.Course_Status
                courseObjToAdd["Course_Type"] = courseObj.Course_Type
                courseObjToAdd["Course_Category"] = courseObj.Course_Category

                # add course obj to list of courses under one skillID
                main_dict[course.Skill_ID].append(courseObjToAdd)


    return main_dict
    # return jsonify(
    #     {
    #         "data": [Course.json()['Course_ID'] for Course in CourseBySkill_list]
    #     }
    # ), 200

@app.route("/manager/<string:staff_id>")
def view_staff_info(staff_id):

    staff_basic_info = to_dict(Staff.query.filter_by(Staff_ID=staff_id).first())

    if staff_basic_info:
        registration_info = Registration.query.filter(Registration.Staff_ID.contains(staff_id))
        # course_status = [regi.to_dict() for regi in registration_info]
        course_info = []

        for registration in registration_info:
            registration = to_dict(registration)
            print(registration)
            course_id = registration['Course_ID']
            course_status = registration['Completion_Status']
            course_name = to_dict(Courses.query.filter(Courses.Course_ID.contains(course_id))[0])['Course_Name']
            course_type = to_dict(Courses.query.filter(Courses.Course_ID.contains(course_id))[0])['Course_Type']
            # print(course_name, course_status)

            learning_journey_info = LearningJourney.query.filter(
                                    LearningJourney.Course_ID.contains(course_id),
                                    LearningJourney.Staff_ID.contains(staff_id))

            for learning_journey in learning_journey_info:

                learning_journey = to_dict(learning_journey)
                # print(to_dict(learning_journey),'hello')
                skill_id = learning_journey['Skill_ID']
                skill_name = to_dict(Skill.query.filter(Skill.Skill_ID.contains(skill_id))[0])['Skill_Name']
                course_info.append(
                    {
                        "course_name": course_name,
                        "course_status": course_status,
                        "course_type": course_type,
                        "skill_name": skill_name
                        
                    }
                )
                



    if staff_id:

        return jsonify({
            #need to return course information as well (yet to code)
            "course_info": course_info,
            "staff_info": staff_basic_info
            
        })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
