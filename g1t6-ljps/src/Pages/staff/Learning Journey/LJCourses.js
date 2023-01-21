import React, { useContext, useEffect } from "react";
import axios from "axios";
import Table from "../../../Components/Table";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Typography } from "@mui/material";
import Popup from "../../../Components/Popup";
import { AppContext } from "../../context";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { TempSkillToCourseData } from "../TempSkillToCourseData";
import { AllSkillsData } from "../AllSkillsData";

var courseBySkillData = [
  {
    Course_ID: "SAL003",
    Course_Name: "Optimising Your Brand For The Digital Spaces",
    Course_Desc:
      "Digital has fundamentally shifted communication between brands and their consumers from a one-way broadcast to a two-way dialogue. In a hastened bid to transform their businesses to be digital market-ready,",
    Course_Status: "Active",
    Course_Type: "External",
    Course_Category: "Sales",
  },
  {
    Course_ID: "COR006",
    Course_Name: "Manage Change",
    Course_Desc:
      "Identify risks associated with change and develop risk mitigation plans.",
    Course_Status: "Retired",
    Course_Type: "External",
    Course_Category: "Core",
  },
  {
    Course_ID: "SAL004",
    Course_Name: "Stakeholder Management",
    Course_Desc:
      "Develop a stakeholder engagement plan and negotiate with stakeholders to arrive at mutually-beneficial arrangements.",
    Course_Status: "Active",
    Course_Type: "Internal",
    Course_Category: "Sales",
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }

  return false;
}

export const LJCourses = (props) => {
  // const { skillID, routeToSkills, roleName } = props;
  const loc = useLocation().pathname;
  const navigate = useNavigate();
  const data = JSON.parse(window.sessionStorage.getItem("LJProgress"));

  var skillID = loc.split("/")[loc.split("/").length - 1];
  var roleID = window.sessionStorage.getItem("roleID");
  var staffID = window.sessionStorage.getItem("userID");

  const [skillName, setSkillName] = React.useState("");
  const [roleName, setRoleName] = React.useState("");
  const [availCourseRows, setAvailCourseRows] = React.useState([]);
  const [addedCourses, setAddedCourses] = React.useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [alert, setAlert] = React.useState({ type: "", msg: "" });
  const [LJData, setLJData] = React.useState(data);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // let skill_name = "";

  const headers = [
    "Course ID",
    "Course Name",
    "Course Type",
    "Course Category",
  ];

  const buttons = [["Add Course"]];

  useEffect(() => {
    var skill_name = "";
    for (const skill of data.mySkillData.registered_skills) {
      if (skill[2] == skillID) {
        skill_name = skill[0];
        setSkillName(skill[0]);
      }
    }
    for (const skill of data.mySkillData.unregistered_skills) {
      if (skill[1] == skillID) {
        skill_name = skill[0];
        setSkillName(skill[0]);
      }
    }

    var coursesAssigned = [];
    var existingCourses = [];
    var availCoursesToAdd = [];
    // TODO: get skill name from data retrieved from useContext

    var url = "http://localhost:5001/SkillCourse/" + skillID;
    axios
      .get(url)
      .then((response) => {
        coursesAssigned = response.data[skillID];
        availCoursesToAdd = response.data[skillID];
        console.log(response.data[skillID]);
        setAvailCourseRows(response.data[skillID]);
      })
      .then((response) => {
        // TODO: Get all registered courses
        // check if the course has been added to the LJ alr
        var allcourses = data.myProgressData;
        // loop thru all the courses that the user has completed for this role
        for (const completedCourse of allcourses.completed_courses) {
          for (const oneCourseIdx in availCoursesToAdd) {
            // if user has completed one of the courses, add it to existingCourse list and remove from availCoursesToAdd list
            if (
              availCoursesToAdd[oneCourseIdx].Course_Name == completedCourse
            ) {
              existingCourses.push(availCoursesToAdd[oneCourseIdx]);
              availCoursesToAdd = availCoursesToAdd.filter(
                (row) => row !== availCoursesToAdd[oneCourseIdx]
              );
              break;
            }
          }
        }
        for (const uncompletedCourse of allcourses.uncompleted_courses) {
          for (const oneCourseIdx in availCoursesToAdd) {
            // if user has registered for one of the courses, add it to existingCourse list and remove from availCoursesToAdd list
            if (
              availCoursesToAdd[oneCourseIdx].Course_Name == uncompletedCourse
            ) {
              console.log("user has a registered but uncompleted course");
              existingCourses.push(availCoursesToAdd[oneCourseIdx]);
              availCoursesToAdd = availCoursesToAdd.filter(
                (row) => row !== availCoursesToAdd[oneCourseIdx]
              );
              console.log("existingCourses", existingCourses);
              console.log("availCoursesToAdd", availCoursesToAdd);
              break;
            }
          }
        }
        // format data for displaying
        setAddedCourses(formatData(existingCourses));
        setAvailCourseRows(formatData(availCoursesToAdd));
      })
      .then((response) => {
        url = "http://localhost:5003/getJobRole/" + roleID;
        axios.get(url).then((response) => {
          console.log(response.data.data[0].Job_Role_Name);
          setRoleName(response.data.data[0].Job_Role_Name);
        });
      });
  }, []);

  function formatData(data) {
    var courseRows = [];

    for (let row of data) {
      if (row.Course_Status == "Active") {
        courseRows.push({
          Course_ID: row.Course_ID,
          Course_Name: row.Course_Name,
          Course_Type: row.Course_Type,
          Course_Category: row.Course_Category,
        });
      }
    }
    return courseRows;
  }

  function updateTableAfterAddOrRemove() {
    var url = "http://localhost:5011/learning_journey/progress";
    var reqData = { staff_id: LJData.staff_id, role_id: LJData.role_id };
    axios
      .post(url, JSON.stringify(reqData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLJData((prevLJData) => {
          return { ...prevLJData, myProgressData: response.data };
        });
      })
      .then((response) => {
        url = "http://localhost:5011/learning_journey/progress/skills";
        axios
          .post(url, JSON.stringify(reqData), {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setLJData((prevLJData) => {
              return { ...prevLJData, mySkillData: response.data };
            });
          })
          .then((response) => {
            console.log("LJProgress", LJData);
            window.sessionStorage.setItem("LJProgress", JSON.stringify(LJData));
            // setLoading(false);
          });
      });
  }

  // const tableName =
  //   "Courses you can take to attain the " + skillName + " skill";

  function returnToSkills() {
    // console.log("loc return to skill", loc)
    var pathArr = loc.split("/");
    pathArr.splice(-1);
    var pathToSkills = pathArr.join("/") + "/" + roleID;
    // console.log(pathToSkills)
    navigate(pathToSkills);
  }

  const handleAddCourse = (newRow) => {
    console.log("newRow", newRow);
    const rownew = newRow;
    var reqData = {
      Course_ID: rownew.Course_ID,
      Skill_ID: parseInt(skillID),
      Job_Role_ID: parseInt(roleID),
      Staff_ID: parseInt(staffID),
    };
    console.log("REQ DATA TO SAVE LJ", reqData);
    setOpenSnackbar(true);
    setAlert((alert) => ({
      type: "info",
      msg: "Adding to learning journey...",
    }));
    // add course to db directly (user can only add one course to db at a time, instead of bulk add)
    var url = "http://localhost:5011/createLJ";
    axios
      .post(url, JSON.stringify(reqData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setOpenSnackbar(true);
        setAlert((alert) => ({
          type: "success",
          msg: "Added to learning journey",
        }));
        // add to "Courses to add" table
        if (!containsObject(rownew, addedCourses)) {
          setAddedCourses([...addedCourses, rownew]);
        }
        // remove from the "Courses you can take" table
        if (containsObject(rownew, availCourseRows)) {
          setAvailCourseRows(availCourseRows.filter((row) => row !== newRow));
        }
      })
      .then((response) => {
        // call learning journey api again to update tables
        updateTableAfterAddOrRemove();
      })
      .catch((error) => {
        console.log("Error:", error.message);
        setOpenSnackbar(true);
        setAlert((alert) => ({
          type: "error",
          msg: "Error occurred",
        }));
      });
  };

  const handleRemoveCourse = (removeRow) => {
    console.log(removeRow);
    var reqData = {
      Course_ID: removeRow.Course_ID,
      Skill_ID: parseInt(skillID),
      Job_Role_ID: parseInt(roleID),
      Staff_ID: parseInt(staffID),
    };
    console.log("REQ DATA TO REMOVE ONE COURSE FROM LJ", reqData);
    setOpenSnackbar(true);
    setAlert((alert) => ({
      type: "info",
      msg: "Removing from learning journey...",
    }));
    // add course to db directly (user can only add one course to db at a time, instead of bulk add)
    var url = "http://localhost:5011/removeCoursefromLJ";
    axios
      .put(url, JSON.stringify(reqData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setOpenSnackbar(true);
        setAlert((alert) => ({
          type: "success",
          msg: "Removed from learning journey",
        }));
        // remove from "Courses to add" table
        setAddedCourses(addedCourses.filter((row) => row !== removeRow));

        // add to the "Courses you can take" table
        if (!containsObject(removeRow, availCourseRows)) {
          setAvailCourseRows([...availCourseRows, removeRow]);
        }
      })
      .then((response) => {
        // call learning journey api again to update tables
        updateTableAfterAddOrRemove();
      })
      .catch((error) => {
        console.log("Error:", error.message);
        setOpenSnackbar(true);
        setAlert((alert) => ({
          type: "error",
          msg: "Error occurred",
        }));
      });

    // comment out once call to api is done
    // // remove from "Courses to add" tableHAHA
    // setAddedCourses(addedCourses.filter((row) => row !== removeRow));
    // // add to the "Courses you can take" table
    // if (!containsObject(removeRow, availCourseRows)) {
    //   setAvailCourseRows([...availCourseRows, removeRow]);
    // }
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

  return (
    <>
      {/* <h1>NewLJCourses.js</h1> */}

      <Container sx={{ mt: 10 }}>
        <Button variant="text" sx={{ color: "gray" }} onClick={returnToSkills}>
          &#x2190; Back to skills
        </Button>
        <Typography variant="h5" gutterBottom>
          {skillName}
        </Typography>
        {/* <Button variant="text" sx={{ color: "gray" }} onClick={returnToSkills}>
          Courses that satisfy this skill
        </Button> */}
        <Typography variant="subtitle1" color="text.secondary">
          Courses that satisfy this skill
        </Typography>
        <Table
          tableName={
            "Courses you can take to attain the " + skillName + " skill"
          }
          actionBtns={buttons}
          headers={headers}
          rows={availCourseRows}
          onAddCourse={handleAddCourse}
          noButtonKey
        />
      </Container>

      <Container sx={{ mt: 10 }}>
        <Table
          tableName={"Courses added to " + roleName + " Learning Journey"}
          headers={headers}
          rows={addedCourses}
          actionBtns={[["Remove Course"]]}
          noButtonKey
          onRemoveCourse={handleRemoveCourse}
        />
      </Container>

      {/* <Container sx={{ mb: 10 }}>
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
          }}
        />
      </Container> */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.msg}
        </Alert>
      </Snackbar>
    </>
  );
};
