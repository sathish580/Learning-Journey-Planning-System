from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from databaseClasses import *

CORS(app)

@app.route("/SkillCourse/<string:Skill_ID>")
def ViewCourseBySkillID(Skill_ID):
    CourseBySkill_list = Skill_Course.query.filter_by(Skill_ID=Skill_ID).all()
    # print(CourseBySkill_list)
    # return jsonify(
    #     {
    #         "data": [Courses.json()['Course_ID'] for Courses in CourseBySkill_list]
    #     }
    # ), 200
    Courseslist = Courses.query.all()
    # print(Courseslist.Course_Name)
    main_dict = {}
    main_dict[Skill_ID] = []
    # course is a courseskill pair (courseID, skillID)
    for course in CourseBySkill_list:
        # print(course.Skill_ID, end=":")
        # print(course.Course_ID)
        
        # loop thru the courses list for the matching course ID to append into the list for the skillID
        for courseObj in Courseslist:
            if courseObj.Course_ID == course.Course_ID:
                # create a course obj to append to the list
                courseObjToAdd = {}
                courseObjToAdd["Course_ID"] = courseObj.Course_ID
                courseObjToAdd["Course_Name"] = courseObj.Course_Name
                courseObjToAdd["Course_Desc"] = courseObj.Course_Desc
                courseObjToAdd["Course_Status"] = courseObj.Course_Status
                courseObjToAdd["Course_Type"] = courseObj.Course_Type
                courseObjToAdd["Course_Category"] = courseObj.Course_Category

                # add course obj to list of courses under one skillID
                main_dict[Skill_ID].append(courseObjToAdd)


    return main_dict


@app.route("/SkillCourse")
def ViewCoursesAndSkills():
    CourseBySkill_list = Skill_Course.query.all()
    # print(CourseBySkill_list)
    Courseslist = Courses.query.all()
    # print(Courseslist.Course_Name)
    main_dict = {}
    # course is a courseskill pair (courseID, skillID)
    for course in CourseBySkill_list:
        # print(course.Skill_ID, end=":")
        # print(course.Course_ID)

        # if there isn't already a list for the skillID, create an empty list for it
        if course.Skill_ID not in main_dict:
            main_dict[course.Skill_ID] = []
        
        # else, loop thru the courses list for the matching course ID to append into the list for the skillID
        for courseObj in Courseslist:
            if courseObj.Course_ID == course.Course_ID:
                # create a course obj to append to the list
                courseObjToAdd = {}
                courseObjToAdd["Course_ID"] = courseObj.Course_ID
                courseObjToAdd["Course_Name"] = courseObj.Course_Name
                courseObjToAdd["Course_Desc"] = courseObj.Course_Desc
                courseObjToAdd["Course_Status"] = courseObj.Course_Status
                courseObjToAdd["Course_Type"] = courseObj.Course_Type
                courseObjToAdd["Course_Category"] = courseObj.Course_Category

                # add course obj to list of courses under one skillID
                main_dict[course.Skill_ID].append(courseObjToAdd)


    return main_dict
    # return jsonify(
    #     {
    #         "data": [Course.json()['Course_ID'] for Course in CourseBySkill_list]
    #     }
    # ), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)




