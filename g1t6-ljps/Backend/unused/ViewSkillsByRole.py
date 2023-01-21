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

class Role(db.Model):
    __tablename__ = 'Role'

    Role_ID = db.Column(db.Integer, primary_key=True)
    Role_Name = db.Column(db.String(20)),

    def json(self):
        dataToObject = {
            'Role_ID': self.Role_ID,
            'Role_Name': self.Role_Name,
        }
        return dataToObject


class Skill(db.Model):
    __tablename__ = 'Skill'

    Skill_ID = db.Column(db.Integer, primary_key=True)
    Skill_Name = db.Column(db.String(30))

    def json(self):
        dataToObject = {
            'Skill_ID': self.Skill_ID,
            'Skill_Name': self.Skill_Name,
        }
        return dataToObject

class RoleSkill(db.Model):
    __tablename__ = 'Role_Skill'

    Job_Role_ID = db.Column(db.Integer, primary_key=True)
    Skill_ID = db.Column(db.Integer, foreign_key =True)

    def json(self):

        dataToObject = {
            'Job_Role_ID': self.Job_Role_ID,
            'Skill_ID': self.Skill_ID
        }

        return dataToObject

@app.route("/Role")
def ViewRole():
    Role_list = Role.query.all()
    return jsonify(
        {
            "data": [Role_list.json()
                     for Role in Role_list]
        }
    ), 200

@app.route("/RoleSkill/<string:Job_Role_ID>")
def ViewSkillsByRoleID(Job_Role_ID):
    SkillbyRole_list = RoleSkill.query.filter_by(Job_Role_ID=Job_Role_ID).all()
    return jsonify(
        {
            "data": {
                'Skill_ID' : [Skill.json()['Skill_ID'] for Skill in SkillbyRole_list]
                }
        }
    ), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004, debug=True)
