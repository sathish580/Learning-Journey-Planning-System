from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from databaseClasses2 import *


CORS(app)

#TODO CREATE learning journey and #TODO ADD new course in learning journey
#take in json of course_id,skill_id, job_role_id, staff_id
@app.route("/createLJ", methods=["POST"])
def createLJ():
    if not request.json:
        abort(400)

    lj_data = LearningJourney(Course_ID=request.get_json().get("Course_ID"),Skill_ID=request.get_json().get("Skill_ID"),Job_Role_ID=request.get_json().get("Job_Role_ID"),Staff_ID=request.get_json().get("Staff_ID"),Completion_Status="In Progress") 
    db.session.add(lj_data)
    db.session.commit()
    return str(lj_data), 201
    # print(lj_data)
    

#TODO Delete entire learning journey (all rows linked to job-role id)
# take in job_role_id and staff_id and delete all rows linked to it

@app.route("/deleteLJ", methods=['PUT'])
def deleteLJ():
    role_id = request.get_json()['Job_Role_ID']
    staff_id = request.get_json()['Staff_ID']

    print("TEST")

    exists = LearningJourney.query.filter(LearningJourney.Job_Role_ID == role_id,
                                            LearningJourney.Staff_ID == staff_id).first()

    if exists == None:
            return jsonify({
                    "message": "Unable to delete Learning Journey. "
                    }), 500

    else:
        try: 
            LearningJourney.query.filter(LearningJourney.Job_Role_ID == role_id,
                                                LearningJourney.Staff_ID == staff_id).delete()

            db.session.commit()

            return jsonify({
            "message": "Sucessfully deleted Learning Journey."
            }), 200


        except:
            return jsonify({
                    "message": "Unable to delete Learning Journey."
                    }), 500



#TODO Remove course from learning journey
@app.route("/removeCoursefromLJ/", methods=['PUT'])
def removeCoursefromLJ():
    course_id = request.get_json()['Course_ID']
    staff_id = request.get_json()['Staff_ID']
    skill_id = request.get_json()['Skill_ID']
    jrole_id = request.get_json()['Job_Role_ID']
    print(course_id)

    staff_LJ = LearningJourney.query.filter(LearningJourney.Staff_ID == staff_id).all()
    print(staff_LJ)
    for LJ in staff_LJ:
        print(LJ.Course_ID)
        if LJ.Course_ID == course_id and LJ.Staff_ID == staff_id and LJ.Skill_ID == skill_id and LJ.Job_Role_ID == jrole_id:
            LearningJourney.query.filter(LearningJourney.Course_ID == course_id, LearningJourney.Staff_ID == staff_id, LearningJourney.Skill_ID == skill_id, LearningJourney.Job_Role_ID == jrole_id).delete()
            db.session.commit()
            return jsonify({
                "message": "Unable to commit to database."
                    }), 500




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5011, debug=True)