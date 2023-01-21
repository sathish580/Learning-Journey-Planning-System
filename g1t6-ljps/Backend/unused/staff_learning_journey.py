import json
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import relationship,sessionmaker

app = Flask(__name__)
#LMS Connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://admin:admin123' + \
                                        '@lms-2.cxvrdenw3ztb.us-east-1.rds.amazonaws.com:3306/LearningManagementDatabase'

#LJPS Connection
app.config['SQLALCHEMY_BINDS'] = {
    "db2": 'mysql+mysqlconnector://admin:mypassword' + \
                                        '@spm-database-4.cikntbsa8vrm.us-east-1.rds.amazonaws.com:3306/LJPS'
}

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                           'pool_recycle': 280}

db = SQLAlchemy(app)

CORS(app)

class LearningJourney(db.Model):
    __bind_key__ = 'db2'
    __tablename__ = 'LJ_Mapping'
    
    Course_ID = db.Column(db.String, db.ForeignKey('Course.Course_ID'), primary_key = True ) 
    Skill_ID = db.Column(db.Integer, db.ForeignKey('Skill.Skill_ID'), primary_key = True ) 
    Job_Role_ID = db.Column(db.Integer, db.ForeignKey('Role_Skill.Job_Role_ID'), primary_key = True )
    Staff_ID = db.Column(db.Integer, db.ForeignKey('Staff.Staff_ID'), primary_key = True )
    Completion_Status = db.Column(db.String)

class Job_Role(db.Model):
    __bind_key__ = 'db2'
    __tablename__ = 'Job_Role'

    Job_Role_ID = db.Column(db.Integer, primary_key = True ) 
    Job_Role_Name = db.Column(db.String) 

class Courses(db.Model):
    __tablename__ = 'Course'

    Course_ID = db.Column(db.String(20), primary_key=True)
    Course_Name = db.Column(db.String(50))
    Course_Desc =db.Column(db.String(255))
    Course_Status = db.Column(db.String(15))
    Course_Type = db.Column(db.String(10))
    Course_Category = db.Column(db.String(50))

class Skill(db.Model):
    __bind_key__ = 'db2'
    __tablename__ = 'Skill'

    Skill_ID = db.Column(db.String, primary_key=True)
    Skill_Name = db.Column(db.String)

class Role_Skill(db.Model):
    __bind_key__ = 'db2'
    __tablename__ = 'Role_Skill'

    Job_Role_ID = db.Column(db.Integer, primary_key=True)
    Skill_ID = db.Column(db.Integer, primary_key=True)


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

@app.route("/learning_journey", methods = ['POST'])
def view_learning_journey():

    staff_id = request.get_json()['staff_id']
    # print(staff_id)

    learning_journeys = LearningJourney.query.filter(LearningJourney.Staff_ID.contains(staff_id)).all()
    # print((job_roles))


    if len(learning_journeys) != 0:
        
        job_roles = []
        for journey in learning_journeys:
            job_role_id = to_dict(journey)['Job_Role_ID']
            
            # print(job_role_id)
            role = to_dict(Job_Role.query.filter(Job_Role.Job_Role_ID.contains(job_role_id)).first())
            # print(role)

            if role not in job_roles:
                job_roles.append(role)


        job_role_progress = []
        for role in job_roles:
            
            print(role['Job_Role_ID'])
            
            role_learning_journey = LearningJourney.query.filter(
                                    LearningJourney.Staff_ID.contains(staff_id), 
                                    LearningJourney.Job_Role_ID.contains(role['Job_Role_ID'])).all()
            total_courses = len(role_learning_journey)
            completed_courses = 0

            for courses in role_learning_journey:
                course_status = to_dict(courses)['Completion_Status']
                
                if course_status == 'Completed':
                    completed_courses += 1

            job_role_progress.append(
                {
                    "role": role['Job_Role_Name'],
                    "role_id": role['Job_Role_ID'],
                    "progress": round(((completed_courses/ total_courses) * 100), 2)
                }
            )
            # print(job_role_progress)
            
        return jsonify(
            {
                "data": job_role_progress
            }
        )
    return jsonify(
    {
        "data": []
    }
) 
            
@app.route("/learning_journey/progress", methods = ['POST'])
def learning_journey_progress():       

    role_info = request.get_json()
    print(role_info)

    role_learning_journey = LearningJourney.query.filter(
                            LearningJourney.Staff_ID.contains(role_info['staff_id']), 
                            LearningJourney.Job_Role_ID.contains(role_info['role_id'])).all()
    completed_courses = []
    uncompleted_courses = []

    for courses in role_learning_journey:
                course_status = to_dict(courses)['Completion_Status']
                
                if course_status == 'Completed':

                    course_id = to_dict(courses)['Course_ID']
                    course_name = to_dict(Courses.query.filter(Courses.Course_ID.contains(course_id)).first())['Course_Name']

                    completed_courses.append(course_name)

                else:
                    course_id = to_dict(courses)['Course_ID']
                    course_name = to_dict(Courses.query.filter(Courses.Course_ID.contains(course_id)).first())['Course_Name']

                    uncompleted_courses.append(course_name)

    return jsonify(
        {
            "completed_courses": completed_courses,
            "uncompleted_courses": uncompleted_courses
        }
    )

@app.route("/learning_journey/progress/skills", methods = ['POST'])
def learning_journey_progress_skills():
    skill_info = request.get_json()
    print(skill_info)

    role_learning_journey = LearningJourney.query.filter(
                            LearningJourney.Staff_ID.contains(skill_info['staff_id']), 
                            LearningJourney.Job_Role_ID.contains(skill_info['role_id'])).all()

    unregistered_skills = []
    registered_skills = []
    registered_skill_id = []
    for skill_tracking in role_learning_journey:

        skill_status = to_dict(skill_tracking)['Completion_Status']
        skill_id = to_dict(skill_tracking)['Skill_ID']
        registered_skill_id.append(skill_id)
        skill_name = to_dict(Skill.query.filter(Skill.Skill_ID.contains(skill_id)).first())['Skill_Name']
        print(skill_status, skill_name)
        registered_skills.append(
            [skill_name, skill_status, skill_id]
        )

    role_skills_required = Role_Skill.query.filter(Role_Skill.Job_Role_ID.contains(skill_info['role_id'])).all()

    for skill in role_skills_required:
        skill = to_dict(skill)['Skill_ID']

        if skill not in registered_skill_id:
            skill_name = to_dict(Skill.query.filter(Skill.Skill_ID.contains(skill)).first())['Skill_Name']
            unregistered_skills.append(
            [skill_name, skill]
        )

    
    print(len(role_skills_required),'H')
    return jsonify(
        {
            "registered_skills": registered_skills,
            "unregistered_skills": unregistered_skills
        }
    )
        
if __name__ == "__main__":
   
    app.run(host="0.0.0.0", port=5101, debug=True)
