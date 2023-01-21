from flask import Flask, request, jsonify, render_template
from sqlalchemy import Column, ForeignKey, Integer, Table, MetaData, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://admin:mypassword' + \
                                        '@spm-database-1.cikntbsa8vrm.us-east-1.rds.amazonaws.com:3306/LJPS'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                           'pool_recycle': 280}

db = SQLAlchemy(app)
Base = declarative_base()

CORS(app)

#Info from UI
user_input = {
}

# create skills page > select job role(s) to link it to > create skill > update skill > then update roles skills
#adding foreign key constraints in sqlalchemy 
#https://docs.sqlalchemy.org/en/14/core/constraints.html
#https://flask-sqlalchemy.palletsprojects.com/en/3.0.x/models/


#associative entity SQL alchemy for LJmapping https://docs.sqlalchemy.org/en/14/orm/basic_relationships.html
class Skill(db.Model):

    __tablename__ = 'Skill'

    Skill_ID = db.Column(db.String, primary_key=True)
    Skill_Name = db.Column(db.String)


class JobRole(db.Model):

    __tablename__ = 'Job_Role'
    
    Job_Role_ID = db.Column(db.Integer,primary_key=True)
    Job_Role_Name = db.Column(db.String(20))

class RoleSkill(db.Model):

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


@app.route("/Create_Role_Skill", methods=["POST"])
#Creating new job

def Create_Role_Skill():
    if not request.json:
        abort(400)

    Role_ID = request.json.get("Job_Role_ID")
    new_Skill_ID=request.json.get("Skill_ID")
    print(Role_ID, new_Skill_ID)
    
    new_role_skill = RoleSkill(Job_Role_ID = Role_ID, Skill_ID = new_Skill_ID)

    db.session.add(new_role_skill)
    db.session.commit()

    return jsonify(
        {
            'status':"Skill and roles created"
        }
    )

    # RoleSkill = Role_Skill(Job_Role=request.json.get("Job_Role_ID"),Skill_ID=request.json.get("Skill_ID"))
    # db.session.add(RoleSkill)
    # db.session.commit()
    # return str(RoleSkill), 201

# def upgrade(migrate_engine):

#     meta.bind = migrate_engine

#     meta.reflect() # <------ Obtain all tables here.

#     aggregate_metadata.create()
#     aggregate_hosts.create()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5008, debug=True)
