import json
from flask import Flask, request, jsonify
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

@app.route("/manager", methods = ['POST'])
def view_staffs():
    manager_id= request.get_json()['manager_id']
    print(manager_id)

    if request:
        
    
        # print(test.to_dict() for test in staffs.registrations )
        managers = Manager.query.filter(Manager.Manager_ID.contains(manager_id))
        staff_info = []
      
        for staff_id in managers:
            staff_id = to_dict(staff_id)
            print(staff_id)
            staff_id = (staff_id)['Staff_ID']

            filtered_staffs_info = Staff.query.filter(Staff.Staff_ID.contains(staff_id))

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
            "data": staff_info}
        ),200

if __name__ == "__main__":
   
    app.run(host="0.0.0.0", port=5100, debug=True)
