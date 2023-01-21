from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import relationship,sessionmaker

#tables are created in following file
from databaseClasses import *

CORS(app)


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



if __name__ == "__main__":
   
    app.run(host="0.0.0.0", port=5201, debug=True)
