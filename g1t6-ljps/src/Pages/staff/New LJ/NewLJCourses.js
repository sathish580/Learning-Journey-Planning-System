import React, { useEffect } from "react";
import axios from "axios";
import Table from "../../../Components/Table";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Typography } from "@mui/material";
import Popup from "../../../Components/Popup";
import LoadingCircle from "../../../Components/LoadingCircle";


function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }

  return false;
}

export const NewLJCourses = (props) => {
  // const { skillID, routeToSkills, roleName } = props;
  const loc = useLocation().pathname;
  const navigate = useNavigate();

  var skillID = loc.split("/")[loc.split("/").length - 1];
  var routeToSkills = "";
  var roleID = window.sessionStorage.getItem("roleID");
  var roleName = window.sessionStorage.getItem("roleName");
  var staffID = window.sessionStorage.getItem("userID");

  const [availCourseRows, setAvailCourseRows] = React.useState([]);
  const [addedCourses, setAddedCourses] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [skillName, setSkillName] = React.useState('')

  const headers = [
    "Course ID",
    "Course Name",
    "Course Type",
    "Course Category",
  ];

  const buttons = [["Add Course"]];

  useEffect(() => {
    var courseRows = [];
    var coursesAssigned = [];
    // TODO: get courses by skill route
    var url = "http://localhost:5001/SkillCourse/" + skillID;
    axios
      .get(url)
      .then((response) => {
        coursesAssigned = response.data[skillID];
        console.log(coursesAssigned);

        // setSkillName(allSkills[skillID].Skill_Name);
        // for (const skillIDKey in allSkills) {
        //   // console.log(allRoles[jobRoleNameKey].Job_Role_ID)
        //   allSkillsList.push(skillIDKey);
        // }
        // setAllSkillsIDs(allSkillsList);
        // window.sessionStorage.setItem("allSkillsList", allSkillsList);
        var url = "http://localhost:5200/Skill";
        axios
          .get(url)
          .then((response) => {
            // setRows(staffList);
            console.log(response.data);
            formatData(Object.values(response.data));
          })
          .catch((error) => {
            console.log("Error:", error.message);
          });
    
      })
      .then((response) => {
        for (let row of coursesAssigned) {
          console.log("already added? ", containsObject(row, addedCourses));
          if (
            row.Course_Status == "Active" &&
            !containsObject(row, addedCourses)
          ) {
            courseRows.push({
              Course_ID: row.Course_ID,
              Course_Name: row.Course_Name,
              Course_Type: row.Course_Type,
              Course_Category: row.Course_Category,
            });
          }
        }
        setAvailCourseRows(courseRows);
        setLoading(false)
      });
  }, []);

  const formatData = (allSkills) => {
    for (let skill of allSkills) {
      if (skill['Skill_ID'] === parseInt(skillID)) {
        setSkillName(skill['Skill_Name'])
      }
    }
  }

  const tableName =
    "Courses you can take to attain the " + skillName + " skill";

  function returnToSkills() {
    // console.log("loc return to skill", loc)
    var pathArr = loc.split("/");
    pathArr.splice(-1);
    var pathToSkills = pathArr.join("/");
    // console.log(pathToSkills)
    navigate(pathToSkills);
  }

  const handleAddCourse = (newRow) => {
    console.log("newRow", newRow);
    const rownew = newRow;
    // add to "Courses to add" table
    if (!containsObject(rownew, addedCourses)) {
      setAddedCourses([...addedCourses, rownew]);
    }
    // remove from the "Courses you can take" table
    if (containsObject(rownew, availCourseRows)) {
      setAvailCourseRows(availCourseRows.filter((row) => row !== newRow));
    }
  };

  const handleRemoveCourse = (removeRow) => {
    console.log(removeRow);
    // remove from "Courses to add" table
    setAddedCourses(addedCourses.filter((row) => row !== removeRow));

    // add to the "Courses you can take" table
    if (!containsObject(removeRow, availCourseRows)) {
      setAvailCourseRows([...availCourseRows, removeRow]);
    }
  };

  const addedCourseNames = [];
  for (let course of addedCourses) {
    addedCourseNames.push(course["Course_Name"]);
  }

  // const handleSaveLJ = () => {
  //   console.log(roleName);
  //   console.log(addedCourses);
  // };

  function handleSaveLJ() {
    var saveLJReqData = {
      api: "api_endpoint_for_saveLJ",
      course_id: "courseID",
      skill_id: parseInt(skillID),
      job_role_id: roleID,
      staff_id: staffID,
      coursesToAdd: addedCourses,
    };
    window.sessionStorage.setItem("chosenCourseForNewLJ", saveLJReqData);
    return saveLJReqData;
    // console.log(roleName)
    // console.log(addedCourses)
  }

  if (isLoading) {
    return (
      <>
        <Container sx={{ mt: 10 }}>
          <Button
            variant="text"
            sx={{ color: "gray" }}
            onClick={returnToSkills}
          >
            &#x2190; Back to skills
          </Button>
          <Typography variant="h5" gutterBottom>
            Start New {roleName} Learning Journey
          </Typography>
          <LoadingCircle/>
        </Container>
      </>
    );
  }

  return (
    <>
      {/* <h1>NewLJCourses.js</h1> */}

      <Container sx={{ mt: 10 }}>
        <Button variant="text" sx={{ color: "gray" }} onClick={returnToSkills}>
          &#x2190; Back to skills
        </Button>
        <Typography variant="h5" gutterBottom>
          Start New {roleName} Learning Journey
        </Typography>
        <Table
          tableName={tableName}
          actionBtns={buttons}
          headers={headers}
          rows={availCourseRows}
          onAddCourse={handleAddCourse}
          noButtonKey
        />
      </Container>

      <Container sx={{ mt: 10 }}>
        <Table
          tableName={"Courses to add to " + roleName + " Learning Journey"}
          headers={headers}
          rows={addedCourses}
          actionBtns={[["Remove Course"]]}
          noButtonKey
          onRemoveCourse={handleRemoveCourse}
        />
      </Container>

      <Container sx={{ mb: 10 }}>
        <Popup
          buttonText="Confirm Selection"
          header="Start New Learning Journey"
          body={
            <>
              You are adding the following courses to your {roleName} learning
              journey:
              <ul>
                {addedCourseNames.map((courseName, index) => (
                  <li key={index}>{courseName}</li>
                ))}
              </ul>
              Confirm selection?
            </>
          }
          // needed for LJ_Mapping: courseID, skillID, jobroleID, staffID, completion status
          onConfirm={{
            method: "post",
            api: "http://localhost:5011/createLJ",
            body: {
              Course_ID: "",
              Skill_ID: parseInt(skillID),
              Job_Role_ID: parseInt(roleID),
              Staff_ID: parseInt(staffID),
            },
            coursesToAdd: addedCourses,
            message: "Added to learning journey"
          }}
        />
      </Container>
    </>
  );
};
