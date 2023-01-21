
import json
from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import relationship,sessionmaker


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

@app.route("/Skill")
def ViewSkill():
        Skill_list = Skill.query.all()
        # print(Skill_list)
        main_dict = {}
        for skill in Skill_list:
            print(skill.Skill_Name)
        
            main_dict[skill.Skill_ID] = {}
            main_dict[skill.Skill_ID]["Skill_ID"] = skill.Skill_ID
            main_dict[skill.Skill_ID]["Skill_Name"] = skill.Skill_Name
            main_dict[skill.Skill_ID]["Skill_Status"] = skill.Status

        return main_dict

                
        Dict = { }
        print("Initial nested dictionary:-")
        print(Dict)
        
        Dict['Dict1'] = {}
        
        # Adding elements one at a time
        Dict['Dict1']['name'] = 'Bob'
        Dict['Dict1']['age'] = 21
        print("\nAfter adding dictionary Dict1")
        print(Dict)
        
        # Adding whole dictionary
        Dict['Dict2'] = {'name': 'Cara', 'age': 25}
        print("\nAfter adding dictionary Dict1")
        print(Dict)
    #     return jsonify(
    #         {
    #             "Skill ID": [skill.Skill_ID for skill in Skill_list],
    #             "Skill Name": [skill.Skill_Name for skill in Skill_list],
    #             "Skill Status": [skill.Status for skill in Skill_list],
    #             # "data": [skill for skill in Skill_list]

    #         }
    # ), 200


@app.route("/RoleSkill/<string:Job_Role_ID>")
def ViewSkillsByRoleID(Job_Role_ID):
    SkillbyRole_list = Role_Skill.query.filter_by(Job_Role_ID=Job_Role_ID).all()
    print(SkillbyRole_list)
    return jsonify(
        {
            "data": {
                'Skill_ID' : [to_dict(Skill)["Skill_ID"] for Skill in SkillbyRole_list]
                }
        }
    ), 200


@app.route("/Create_Skill", methods=["POST"])
#Creating new job

def Create_Skill():
    if not request.json:
        return jsonify(
            {
                "message": "No values given"
            }
        ),400

    try:
        skill = Skill(Skill_ID=request.json.get("Skill_ID"),Skill_Name=request.json.get("Skill_Name"),Status=request.json.get("Status"))
        db.session.add(skill)
        db.session.commit()
        return jsonify(
            {
            "message": "Sucessfuly commited to database."
           } ),201

    except:
        return jsonify(
            {
            "message": "Not able to commit database."
           } ),500
   


@app.route("/edit_skill/<Skill_ID>", methods=['PUT'])
def edit_skill(Skill_ID):

    #get skill id from FE
    skill_id = request.get_json()['Skill_ID']
    skill_name= request.get_json()['Skill_Name']
    skill_status = request.get_json()['Skill_Status']

    try: 
        skill_row = Skill.query.filter_by(Skill_ID = skill_id).first()
        skill_row.Status = skill_status
        skill_row.Skill_Name = skill_name

        db.session.merge(skill_row)
        db.session.commit()

    except:
        return jsonify({
        "message": "Unable to commit to database."
            }), 500


    return jsonify({
            "message": "Successfully updated skill"
            }), 200



@app.route("/assign_role", methods=['POST'])
def assign_role():

    #get skill id from FE
    skill_id = request.get_json()['Skill_ID']
    # print(skill_id)

    
    # #get all roles associated to skill 
    skill_roles = Role_Skill.query.filter(Role_Skill.Skill_ID == skill_id).all()
    
    print(skill_roles)
    # print(roles_ids)

    if len(skill_roles) == 0:
        return jsonify(
            {
                'message': "Invalid Skill ID. Skill ID not found in the system."
            }
        )

    assigned_roles = []
    for role_id in skill_roles:
        # role_ids.append(role_id)
        role_id = to_dict(role_id)['Job_Role_ID']
        # print(role_id)

        # print(role_name)
        assigned_roles.append(role_id)

    # print(assigned_roles)

    #get all roles 
    all_roles = Job_Role.query.all()
    # print(all_roles)

    unassigned_roles = []
    for role in all_roles:
        role_id = to_dict(role)['Job_Role_ID']

        if role_id not in assigned_roles:
            role_name = to_dict(role)['Job_Role_Name']

            unassigned_roles.append({
                'Job_Role_ID': role_id,
                'Job_Role_Name' : role_name
                })

    return jsonify(
        {
            "Roles": unassigned_roles
        }
    )

@app.route("/assign_role/save", methods=['POST'])
def assign_roles_save():
    role_ids_add = request.get_json()['Roles']
    skill_id = request.get_json()['Skill_ID']

    print(role_ids_add, skill_id)

    for role_id in role_ids_add:
        print(role_id)

        #commit new role_id to skill
        try: 
            print("test")

            new_skill_link = Role_Skill(Job_Role_ID = role_id, Skill_ID = skill_id)
            print(new_skill_link)
            db.session.add(new_skill_link)
            db.session.commit()

        except:
            return jsonify({
            "message": "Unable to commit to database."
             }), 500


    return jsonify({
            "message": "Sucessfully commited to database"
             }), 200

# @app.route("/unassign_role", methods=['POST'])
# def assign_course():

#     #get skill id from FE
#     skill_id = request.get_json()['Skill_ID']
#     # print(skill_id)

    
#     # #get all course associated to skill 
#     skill_course = Skill_Course.query.filter(Skill_Course.Skill_ID == skill_id).all()
    
#     print(skill_course)


#     if len(skill_course) == 0:
#         return jsonify(
#             {
#                 'message': "Invalid Skill ID. Skill ID not found in the system."
#             }
#         )

#     assigned_course = []
#     for Course_ID in skill_course:

#         Course_ID = to_dict(Course_ID)['Course_ID']
#         # print(Course_ID)


#         assigned_course.append(Course_ID)
#     print(assigned_course)

#     all_courses = Courses.query.all()
#     # print(all_courses)

#     unassigned_courses = []
#     for course in all_courses:
#         Course_ID = to_dict(course)['Course_ID']

#         if Course_ID not in assigned_course:
#             Course_Name = to_dict(course)['Course_Name']

#             unassigned_courses.append({
#                 'Course_ID': Course_ID,
#                 'Course_Name' : Course_Name
#                 })

#     return jsonify(
#         {
#             "Courses": unassigned_courses
#         }
#     )


@app.route("/unassign_role", methods=['POST'])
def unassign_role():

    #get skill id from FE
    skill_id = request.get_json()['Skill_ID']
    # print(skill_id)

    
    # #get all roles associated to skill 
    skill_roles = Role_Skill.query.filter(Role_Skill.Skill_ID == skill_id).all()
    
    print(skill_roles)
    # print(roles_ids)

    if len(skill_roles) == 0:
        return jsonify(
            {
                'message': "Invalid Skill ID. Skill ID not found in the system."
            }
        )

    assigned_roles = []
    for role_id in skill_roles:
        # role_ids.append(role_id)
        role_id = to_dict(role_id)['Job_Role_ID']
        # print(role_id)

        # print(role_name)
        assigned_roles.append(role_id)

    # print(assigned_roles)

    #get all roles 
    all_roles = Job_Role.query.all()
    # print(all_roles)

    assigned_roles_return = []
    for role in all_roles:
        role_id = to_dict(role)['Job_Role_ID']

        if role_id in assigned_roles:
            role_name = to_dict(role)['Job_Role_Name']

            assigned_roles_return.append({
                'Job_Role_ID': role_id,
                'Job_Role_Name' : role_name
                })

    return jsonify(
        {
            "Roles": assigned_roles_return
        }
    )


#unassign skill from role 
@app.route("/unassign_role/save", methods=['PUT'])
def unassign_roles_save():
    role_ids_remove = request.get_json()['Roles']
    skill_id = request.get_json()['Skill_ID']

    print(role_ids_remove, skill_id)

    for role_id in role_ids_remove:
        print(role_id)

        #commit new role_id to skill
        print("test")

        print(type(skill_id), type(role_id))

        exists = Role_Skill.query.filter(Role_Skill.Job_Role_ID == role_id,
                                            Role_Skill.Skill_ID == skill_id).first()

        # print(exists)

        if exists == None:
                return jsonify({
                        "message": "Unable to remove roles. "
                        }), 500

        else:
            Role_Skill.query.filter(Role_Skill.Job_Role_ID == role_id,
                                            Role_Skill.Skill_ID == skill_id).delete()
            db.session.commit()

    return jsonify({

            "message": "Sucessfully removed roles."
            }), 200


#returns all the skills that have yet to be assigned to a course
@app.route("/assign_course", methods=['POST'])
def assign_course_to_skill():

    #get course id from FE
    skill_id = request.get_json()['Skill_ID']
 
    
    # #get all courses associated to skill 
    course_skills = Skill_Course.query.filter(Skill_Course.Skill_ID == skill_id).all()
    

    unassigned_courses = []
    if len(course_skills) == 0:
        print("0 relations")
        courses = Courses.query.all()

        for course in courses:
            course = to_dict(course)
            unassigned_courses.append({
                "Course_ID": course['Course_ID'],
                "Course_Name": course['Course_Name']
            })

        return jsonify({
            "Unassigned_Courses": unassigned_courses
            })

    else:
        # print("Has relations")
        
       assigned_course_id = []
       for course in course_skills:
           assigned_course_id.append(to_dict(course)['Course_ID'])

       courses = Courses.query.all()
       for course in courses:
           course_id = to_dict(course)["Course_ID"]
           
           if course_id not in assigned_course_id:
               course = to_dict(course)
               unassigned_courses.append({
                    "Course_ID": course['Course_ID'],
                    "Course_Name": course['Course_Name'],
                    "Course_Status": course['Course_Status'],
                    "Course_Category": course['Course_Category']
                })

       return jsonify(
            {
                "Unassigned_Courses": unassigned_courses
            }
        )



@app.route("/assign_course/save", methods=['PUT'])
def assign_course_save():
    course_id_add = request.get_json()['Courses']
    skill_id = request.get_json()['Skill_ID']
    
    print(course_id_add, skill_id)

    for course_id in course_id_add:
        print(course_id)

        try: 
            print("test")

            new_skill_link = Skill_Course(Course_ID = course_id, Skill_ID = skill_id)
            print(new_skill_link)
            db.session.add(new_skill_link)
            db.session.commit()

        except:
            return jsonify({
            "message": "Unable to commit to database."
             }), 500


    return jsonify({
            "message": "Sucessfully commited to database"
             }), 200

#returns all the courses assigned to a skill 
@app.route("/unassign_course", methods=['POST'])
def unassign_course_to_skill():

    #get course id from FE
    skill_id = request.get_json()['Skill_ID']
 
    
    # #get all courses associated to skill 
    course_skills = Skill_Course.query.filter(Skill_Course.Skill_ID == skill_id).all()
    

    assigned_courses = []
    if len(course_skills) == 0:


        return jsonify({
            "Message": "No course found. Please assign a course."
            })

    else:
        # print("Has relations")
        
       assigned_course_id = []
       for course in course_skills:
           assigned_course_id.append(to_dict(course)['Course_ID'])

       courses = Courses.query.all()
       for course in courses:
           course_id = to_dict(course)["Course_ID"]
           
           if course_id in assigned_course_id:
               course = to_dict(course)
               assigned_courses.append({
                    "Course_ID": course['Course_ID'],
                    "Course_Name": course['Course_Name'],
                    "Course_Status": course['Course_Status'],
                    "Course_Category": course['Course_Category']
                })

       return jsonify(
            {
                "Assigned_Courses": assigned_courses
            }
        )





#unassign skill from course 
@app.route("/unassign_course/save", methods=['PUT'])
def unassign_course_save():
    course_ids_remove = request.get_json()['Courses']
    skill_id = request.get_json()['Skill_ID']

    print(course_ids_remove, skill_id)

    for course_id in course_ids_remove:
        print(course_id)

        #commit new role_id to skill    
        # print("test")

        print(type(skill_id), type(course_id))

        exists = Skill_Course.query.filter(Skill_Course.Course_ID == course_id,
                                            Skill_Course.Skill_ID == skill_id).first()

        print(exists)

        if exists == None:
                return jsonify({
                        "message": "Unable to remove skill from course. "
                        }), 500

        else:
            Skill_Course.query.filter(Skill_Course.Course_ID == course_id,
                                            Skill_Course.Skill_ID == skill_id).delete()
            db.session.commit()

    return jsonify({
            "message": "Sucessfully removed skill from course."
            }), 200

@app.route("/viewAllSkillsPerRole/<string:Job_Role_ID>")
def viewAllSkillsPerRole(Job_Role_ID):
    ##TODO GET SKILL LIST
        Role_skill_list = Role_Skill.query.all()
        main_dict = {}
        list1 = []
        for i in range(0, len(Role_skill_list)):
            row = Role_skill_list[i]
            if (row.Job_Role_ID == int(Job_Role_ID)):
                Skill_Name = Skill.query.filter(Skill.Skill_ID == row.Skill_ID).first()
                # print(to_dict(Skill_Name))
                Skill_Name = to_dict(Skill_Name)['Skill_Name']

                print(Skill_Name)
                list1.append({
                    'Skill_ID': row.Skill_ID,
                    'Skill_Name':Skill_Name })
        jobList = []
        request = Job_Role.query.filter_by(Job_Role_ID=Job_Role_ID).all()
        for item in request:
            jobList.append(to_dict(item))
        
        main_dict["jobDetails"] = jobList
        main_dict["skills"] = list1

        return main_dict

if __name__ == "__main__":
   
    app.run(host="0.0.0.0", port=5200, debug=True)
