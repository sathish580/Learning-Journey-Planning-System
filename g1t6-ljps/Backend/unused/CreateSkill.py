from flask import Flask, request, jsonify, render_template
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

#Info from UI
user_input = {
}

# create skills page > select job role(s) to link it to > create skill > update skill > then update roles skills

class Skill(db.Model):
    __tablename__ = 'Skill'

    Skill_ID = db.Column(db.Integer, primary_key=True)
    Skill_Name = db.Column(db.String(30))
    Status = db.Column(db.String(12))

    def json(self):
        dataToObject = {
            'Skill_ID': self.Skill_ID,
            'Skill_Name': self.Skill_Name,
            'Status': self.Status,
        }
        return dataToObject

@app.route("/Create_Skill", methods=["POST"])
#Creating new job

def Create_Skill():
    if not request.json:
        abort(400)
    skill = Skill(Skill_ID=request.json.get("Skill_ID"),Skill_Name=request.json.get("Skill_Name"),Status=request.json.get("Status"))
    db.session.add(skill)
    db.session.commit()
    return str(skill), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5007, debug=True)
