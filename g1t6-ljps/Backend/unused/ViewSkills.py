from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import relationship,sessionmaker

#tables are created in following file
from databaseClasses import *

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



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
