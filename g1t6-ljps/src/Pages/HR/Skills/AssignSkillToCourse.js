import React from "react";
import Table from "../../../Components/Table";
import { Container, Button, Typography, Grid } from "@mui/material";
import Popup from "../../../Components/Popup";
import axios from "axios";
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

export const AssignSkillToCourse = (props) => {
  const { skillID, skillName, routeToSelect } = props;

  const [addedCourses, setAddedCourses] = React.useState([]);
  const [coursesData, setCoursesData] = React.useState([])
  const [emptyError, setEmptyError] = React.useState(false)
  const [isLoading, setLoading] = React.useState(true);


  React.useEffect(() => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5200/assign_course";
    var reqData = { Skill_ID: parseInt(skillID) };
    axios
      .post(url, JSON.stringify(reqData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data)
        formatData(response.data.Unassigned_Courses);
        // console.log(staffLJ)
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  function formatData(data) {
    let coursesList = []
    for (let course of data) {
      coursesList.push({
        'Course_ID': course["Course_ID"],
        'Course_Name': course["Course_Name"],
        'Course_Status': course["Course_Status"],
        'Course_Category': course["Course_Category"],
      })
    }
    setCoursesData(coursesList)
    setLoading(false);
  }


  const headers = [
    "Course ID",
    "Course Name",
    "Course Status",
    "Course Category",
  ];

  const buttons = [["Add Course"]];

  const tableName = "Courses you can Assign " + skillName + " to";


  const handleAddCourse = (newRow) => {
    setEmptyError(false);
    const rownew = newRow;
    if (!containsObject(rownew, addedCourses)) {
      setAddedCourses([...addedCourses, rownew]);
    }
  };

  const handleRemoveCourse = (removeRow) => {
    setAddedCourses(addedCourses.filter((row) => row !== removeRow));
  };

  const addedCourseNames = [];
  for (let course of addedCourses) {
    console.log(addedCourses);
    addedCourseNames.push(course["Course_Name"]);
  }

  const handleSaveAssignment = () => {
    console.log(skillName);
    console.log(addedCourses);
  };

  const handleEmpty = () => {
    setEmptyError(true);
  };

  if (isLoading) {
    return (
      <>
        <Container sx={{ my: 10 }}>
          <LoadingCircle />
        </Container>
      </>
    );
  }


  return (
    <>
      <Container sx={{ mt: 10 }}>
        <Button variant='text' sx={{ color: "gray" }} onClick={routeToSelect}>
          &#x2190; Back
        </Button>
        <Typography variant='h5' gutterBottom>
          Assign {skillName} skill to courses
        </Typography>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ my: 3 }}
        >
          <Grid item xs={2}>
            <b>Skill ID</b>
          </Grid>
          <Grid item xs={10}>
            {skillID}
          </Grid>
          <Grid item xs={2}>
            <b>Skill Name</b>
          </Grid>
          <Grid item xs={10}>
            {skillName}
          </Grid>
        </Grid>
        <Table
          tableName={tableName}
          actionBtns={buttons}
          headers={headers}
          rows={coursesData}
          onAddCourse={handleAddCourse}
          noButtonKey
        />
      </Container>

      <Container sx={{ mt: 10, border: emptyError ? "1px solid red" : "none" }}>
        <Table
          tableName={"Courses you have selected for assignment"}
          headers={headers}
          rows={addedCourses}
          actionBtns={[["Remove Course"]]}
          noButtonKey
          onRemoveCourse={handleRemoveCourse}
        />
      </Container>
      {emptyError && (
        <Typography sx={{ mb: 3 }} variant='subtitle1' color='red'>
          You have not selected any courses for assignment!
        </Typography>
      )}

      <Container sx={{ mb: 10 }}>
        <Popup
          buttonText='Confirm Assignment'
          header='Assign Skill to Courses'
          body={
            <>
              You are about to assign the "{skillName}" skill to the following
              courses:
              <ul>
                {addedCourseNames.map((courseName, index) => (
                  <li key={index}>{courseName}</li>
                ))}
              </ul>
              Confirm assignment?
            </>
          }
          onConfirm={{
            body: {
              Skill_ID: parseInt(skillID),
              Courses: addedCourses.map((a) => a.Course_ID),
            },
            method: "put",
            api: "http://localhost:5200/assign_course/save",
            message: "Assignment Successful",
          }}
          error={addedCourses.length === 0}
          onError={handleEmpty}
        />
      </Container>
    </>
  );
};
