import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import CollapsibleTable from "../../../Components/CollapsibleTable";
import ItemList from "../../../Components/ItemList";
import { AppContext } from "../../context";
var DUMMYstaffCourseDetails = {
  staffId: "1234567",
  outerRows: [
    {
      course_id: "SAL003",
      course_name: "Optimising Your Brand For The Digital Spaces",
      innerRows: [
        {
          skill_name: "Customer Experience ",
          status: "In Progress",
          neededForLJ: "Yes",
        },
      ],
    },
    {
      course_id: "SAL004",
      course_name: "Stakeholder Management",
      innerRows: [
        {
          skill_name: "Customer Experience",
          status: "In Progress",
          neededForLJ: "Yes",
        },
      ],
    },
  ],
};
export const LJProgress = () => {
  const data = useContext(AppContext);
  console.log("LJProgress: ", data);
  window.sessionStorage.setItem("roleID", data.role_id);

  const [completedCourses, setCompletedCourses] = useState(
    data.myProgressData.completed_courses
  );
  const [uncompletedCourses, setUncompletedCourses] = useState(
    data.myProgressData.uncompleted_courses
  );
  const [requiredSkillsPerCourse, setRequiredSkills] = useState({});
  const [rows, setRows] = useState({ outerRows: [] });

  useEffect(() => {
    // initialise an object to pass into the collapsible table component
    var progressObj = { outerRows: [] };

    // Get registered/unregistered skills for user
    var registeredUnregisteredSkills = data.mySkillData;
    // combine registered and unregistered skills tgt
    var userSkillsList = registeredUnregisteredSkills.registered_skills.concat(
      registeredUnregisteredSkills.unregistered_skills
    );

    // Get required courses for all skills
    var requiredSkills = {};
    var url = "http://localhost:5001/SkillCourse";
    axios
      .get(url)
      .then((response) => {
        console.log("requiredSkills", response.data);
        setRequiredSkills(response.data);
        requiredSkills = response.data;
      })
      .then((response) => {
        // mapping of uncompleted courses and their attainable skill under this learning journey
        // 1. for each uncompleted course name, create a oneCourseToAdd obj
        console.log("uncompletedCourses", uncompletedCourses);
        for (const index in uncompletedCourses) {
          console.log("\n\nCurrent course:", uncompletedCourses[index]);
          var oneCourseToAdd = {
            // course_id: "",
            course_name: uncompletedCourses[index],
            innerRows: [],
          };
          var attainableSkills = [];
          // 2. loop through the userSkillsList skills
          for (const oneSkillArrIdx in userSkillsList) {
            // console.log("oneSkillArrIdx", oneSkillArrIdx);
            // 3. get the skill id and retrieve the courses under that skill
            // for skill id, if length of skillArr is 3, means its a registered skill, if its 2 means its a unregistered skill
            var oneSkillId =
              userSkillsList[oneSkillArrIdx].length == 3
                ? userSkillsList[oneSkillArrIdx][2]
                : userSkillsList[oneSkillArrIdx][1];
            // console.log("oneSkillId", oneSkillId);
            var coursesAssignedToSkill = requiredSkills[oneSkillId];
            // console.log("coursesAssignedToSkill", coursesAssignedToSkill);
            // 4. loop thru list of courses
            // 4.1. if the uncompleted course name matches the course name under the skill
            for (const oneAssignedCourseObj of coursesAssignedToSkill) {
              if (
                uncompletedCourses[index] == oneAssignedCourseObj.Course_Name
              ) {
                // 5. add the course name and course id into the oneCourseToAdd obj
                // oneCourseToAdd["course_id"] = oneAssignedCourseObj.Course_ID;
                // 5.1. convert the registered skill array into an object WITH THE STATUS
                var innerRowsSkillObj = {
                  skill_name: userSkillsList[oneSkillArrIdx][0],
                  status:
                    userSkillsList[oneSkillArrIdx].length == 3
                      ? userSkillsList[oneSkillArrIdx][1]
                      : "None",
                  neededForLJ:
                    userSkillsList[oneSkillArrIdx].length == 3
                      ? userSkillsList[oneSkillArrIdx][1] == "Completed"
                        ? "Yes" // User has attained skill thru another course
                        : "No" // User has registered for a course under this skill
                      : "No", // User has not registered for course
                };
                // 5.2. add the innerRowsSkillObj obj to the oneCourseToAdd obj
                oneCourseToAdd.innerRows.push(innerRowsSkillObj);
              }
            }
          }
          // 6. push the oneCourseToAdd obj into the progressObj.outerRows array
          progressObj.outerRows.push(oneCourseToAdd);
        }
        console.log("progressObj", progressObj);
        setRows(progressObj);
      });
  }, []);

  return (
    <>
      <Typography variant="body1" sx={{ mb: 3 }}>
        <b>Uncomplete courses</b>
      </Typography>
      <CollapsibleTable
        rows={rows}
        // rows={DUMMYstaffCourseDetails}
        mainTableHeaders={["Course Name", "Actions"]}
        innerTableHeaders={[
          "Skill Name",
          "Status",
          "Skill already attained?",
        ]}
      />
      {/* <ItemList
        listItems={uncompletedCourses}
        listPaths={["/learner", "/learner", "/learner"]}
        deletable
      /> */}

      <Typography variant="body1" sx={{ mt: 15 }}>
        <b>Completed courses</b>
      </Typography>
      <ItemList listItems={completedCourses} listPaths={["/learner"]} />
    </>
  );
};
