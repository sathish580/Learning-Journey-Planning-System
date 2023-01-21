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

export const UnassignSkillFromCourse = (props) => {
  const { skillID, skillName, routeToSelect } = props;

  const [addedCourses, setAddedCourses] = React.useState([]);
  const [coursesData, setCoursesData] = React.useState([])
  const [emptyError, setEmptyError] = React.useState(false)
  const [isLoading, setLoading] = React.useState(true);


  React.useEffect(() => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5200/unassign_course";
    var reqData = { Skill_ID: parseInt(skillID) };
    axios
      .post(url, JSON.stringify(reqData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data)
        formatData(response.data.Assigned_Courses);
        // console.log(staffLJ)
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  function formatData(data) {
    setCoursesData(data);
    setLoading(false);
  }


  const headers = [
    "Course ID",
    "Course Name",
    "Course Status",
    "Course Category",
  ];

  const buttons = [["Add Course"]];

  const tableName = "Courses you can Unassign " + skillName + " from";

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

  console.log({
    Skill_ID: parseInt(skillID),
    Courses: addedCourses.map((a) => a.Course_ID),
  })


  return (
    <>
      <Container sx={{ mt: 10 }}>
        <Button variant='text' sx={{ color: "gray" }} onClick={routeToSelect}>
          &#x2190; Back
        </Button>
        <Typography variant='h5' gutterBottom>
          Unassign {skillName} skill from courses
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
          tableName={"Courses you have selected for unassignment"}
          headers={headers}
          rows={addedCourses}
          actionBtns={[["Remove Course"]]}
          noButtonKey
          onRemoveCourse={handleRemoveCourse}
        />
      </Container>
      {emptyError && (
        <Typography sx={{ mb: 3 }} variant='subtitle1' color='red'>
          You have not selected any courses for unassignment!
        </Typography>
      )}

      <Container sx={{ mb: 10 }}>
        <Popup
          buttonText='Confirm Unassignment'
          header='Unassign Skill from Courses'
          body={
            <>
              You are about to unassign the "{skillName}" skill from the
              following courses:
              <ul>
                {addedCourseNames.map((courseName, index) => (
                  <li key={index}>{courseName}</li>
                ))}
              </ul>
              Confirm unassignment?
            </>
          }
          onConfirm={{
            body: {
              Skill_ID: parseInt(skillID),
              Courses: addedCourses.map((a) => a.Course_ID),
            },
            method: "put",
            api: "http://localhost:5200/unassign_course/save",
            message: "Unassignment Successful",
          }}
          error={addedCourses.length === 0}
          onError={handleEmpty}
        />
      </Container>
    </>
  );
};
