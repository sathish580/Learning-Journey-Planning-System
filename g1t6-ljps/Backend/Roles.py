from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select
from flask_cors import CORS

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

#VIEW ALL ROLES
@app.route("/viewAllRoles")
def viewAllRoles():
        Job_Role_list = Job_Role.query.all()
        main_dict = {}
        for job in Job_Role_list:
            print(job.Job_Role_Name)
        
            main_dict[job.Job_Role_Name] = {}
            main_dict[job.Job_Role_Name]["Job_Role_ID"] = job.Job_Role_ID
            main_dict[job.Job_Role_Name]["Job_Role_Name"] = job.Job_Role_Name
            main_dict[job.Job_Role_Name]["Status"] = job.Status

        return main_dict, 200

#VIEW a ROLE with ID
@app.route("/getJobRole/<string:Job_Role_ID>")
def getJobRole(Job_Role_ID):
    try:
        list = []
        request = Job_Role.query.filter_by(Job_Role_ID=Job_Role_ID).all()
        for item in request:
            list.append(to_dict(item))
    except:
        print('none')
        return jsonify({
        "data" : []
            }), 500
    print(list)
    return jsonify(
    {
        "data": list
    }), 200

#soft DELETE A ROLE/ edit status
@app.route("/viewAllRoles/edit_role/<Job_Role_ID>", methods=['PUT'])
def editRole(Job_Role_ID):

    #get role id 

    role_id = request.get_json()['Job_Role_ID']
    role_name = request.get_json()['Job_Role_Name']
    role_status = request.get_json()['Status']

    # print(role_id)

    try: 
        job_role = Job_Role.query.filter_by(Job_Role_ID = role_id).first()
        job_role.Status = role_status
        job_role.Job_Role_Name = role_name

        db.session.merge(job_role)
        db.session.commit()

    except:
        return jsonify({
        "message": "Unable to commit to database."
            }), 500


    return jsonify({
            "message": "Successfully updated role"
            }), 200

#CREATE A NEW JOB ROLE
@app.route("/createJobRole", methods=["POST"])
def createJobRole():
    if not request.json:
        abort(400)

    try:
        job = Job_Role(Job_Role_ID=request.json.get("Job_Role_ID"),Job_Role_Name=request.json.get("Job_Role_Name"),Status=request.json.get("Status"))
        db.session.add(job)
        db.session.commit()
    except:
        return jsonify({
        "message": "Unable to commit to database."
            }), 501

    return jsonify({
            "message": "Successfully updated role"
            }), 201



# TODO get all rows from Role_Skill assigned to a role (Unused)
@app.route("/viewAllRoleSkill")
def viewAllRoleSkill():
        Role_skill_list = Role_Skill.query.all()
        main_dict = {}
        
        for i in range(0, len(Role_skill_list)):
            row = Role_skill_list[i]
            main_dict[i] = {}    
            main_dict[i]["Job_Role_ID"] = row.Job_Role_ID
            main_dict[i]["Skill_ID"] = row.Skill_ID
            # main_dict[i] =

        # for job in Role_skill_list:
        #     list1 = [job.Job_Role_ID,job.Skill_ID]
        #     # main_dict[job.Job_Role_ID] = {}
        #     main_dict["role"] = (list1)
        #     # main_dict[job.Job_Role_ID]["Job_Role_ID"] = job.Job_Role_ID
        #     # main_dict[job.Job_Role_ID]["Skill_ID"] = job.Skill_ID
        #     # main_dict[job.Role_Skill_Name]["Skill_ID"] = job.Skill_ID
        return main_dict


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, debug=True)
