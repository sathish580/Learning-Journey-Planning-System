from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://admin:mypassword' + \
                                        '@spm-database-4.cikntbsa8vrm.us-east-1.rds.amazonaws.com:3306/LJPS'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                           'pool_recycle': 280}

db = SQLAlchemy(app)

CORS(app)


class Course(db.Model):
    __tablename__ = 'Course'

    Course_ID = db.Column(db.String(20), primary_key=True)
    Course_Name = db.Column(db.String(50))
    Course_Desc =db.Column(db.String(255))
    Course_Status = db.Column(db.String(15))
    Course_Type = db.Column(db.String(10))
    Course_Category = db.Column(db.String(50))

    def json(self):
        dataToObject = {
            'Course_ID': self.Course_ID,
            'Course_Name': self.Course_Name,
            'Course_Desc': self.Course_Desc,
            'Course_Status': self.Course_Status,
            'Course_Type': self.Course_Type,
            'Course_Category': self.Course_Category,

        }

        return dataToObject


@app.route("/Course")
def ViewCourse():
    Course_list = Course.query.all()
    return jsonify(
        {
            "data": [Course.json() for Course in Course_list]
        }
    ), 200

@app.route("/Course/<string:Course_ID>")
def ViewOneCourse(Course_ID):
    course = Course.query.filter_by(Course_ID=Course_ID).first()
    return jsonify(
        {
            "data": Course.json(course)
        }
    ), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
