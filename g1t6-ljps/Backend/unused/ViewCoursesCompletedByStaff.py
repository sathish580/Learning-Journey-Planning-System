from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://admin:admin123' + \
                                        '@lms-2.cxvrdenw3ztb.us-east-1.rds.amazonaws.com:3306/LearningManagementDatabase'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                           'pool_recycle': 280}

db = SQLAlchemy(app)

CORS(app)

class Registration(db.Model):
    __tablename__ = 'Registration'

    Reg_ID = db.Column(db.Integer, primary_key=True)
    Course_ID = db.Column(db.String(20))
    Staff_ID =db.Column(db.Integer)
    Reg_Status = db.Column(db.String(20))
    Completion_Status = db.Column(db.String(20))

    def json(self):
        dataToObject = {
            'Reg_ID': self.Reg_ID,
            'Course_ID': self.Course_ID,
            'Staff_ID': self.Staff_ID,
            'Reg_Status': self.Reg_Status,
            'Completion_Status': self.Completion_Status
        }
        return dataToObject

class Staff(db.Model):
    __tablename__ = 'Staff'

    Staff_ID = db.Column(db.Integer, primary_key=True)
    Staff_FName = db.Column(db.String(50))
    Staff_LName = db.Column(db.String(50))
    Dept = db.Column(db.String(50))
    Email = db.Column(db.String(50))
    Role = db.Column(db.Integer, db.ForeignKey('role.Role_ID'))

    def json(self):
        dataToObject = {
            'Staff_ID': self.Staff_ID,
            'Staff_FName': self.Staff_FName,
            'Staff_LName': self.Staff_LName,
            'Dept': self.Dept,
            'Email': self.Email,
            'Role': self.Role
        }
        return dataToObject


@app.route("hi")
def ViewCourseBySkillID(Staff_ID):
    CoursesCompletedByStaff_list = Registration.query.filter_by(Staff_ID=Staff_ID).all()
    
    total = []
    for x in CoursesCompletedByStaff_list: 
        if x.json()['Completion_Status'] == 'Completed':
            total.append(x.json())

    return jsonify(
        {
            "data": total
        }
    ), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005, debug=True)
