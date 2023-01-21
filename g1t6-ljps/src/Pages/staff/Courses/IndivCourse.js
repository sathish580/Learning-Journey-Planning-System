import { Button, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemList from "../../../Components/ItemList";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../../Components/Table";
import { SkillsData } from "../SkillsData";
import { RolesData } from "../RolesData";
import Grid from "@mui/material/Grid";
import LoadingCircle from "../../../Components/LoadingCircle";
// import { RoleSkills } from './RoleSkills';
// import { SkillCourses } from './SkillCourses';

export const IndivCourse = () => {
  const loc = useLocation().pathname;
  const navigate = useNavigate();
  const course_id = loc.slice(loc.lastIndexOf("/") + 1, loc.length);
  const [courseData, setCourseData] = useState({});
  const [isLoading, setLoading] = useState(true);
  // console.log(course_id);

  useEffect(() => {
    setLoading(true);
    var url = "http://localhost:5001/Course/" + course_id;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.data);
        setCourseData(response.data.data);
      })
      .then((response) => {
        setLoading(false);
        console.log("courseData", courseData);
      })
      .catch((error) => {
        console.log("Unable to fetch staff course data bc of", error);
      });
    // });
  }, [course_id]);

  function returnToCourses() {
    var pathArr = loc.split("/");
    pathArr.splice(-1);
    var pathToCourses = pathArr.join("/");
    navigate(pathToCourses);
  }

  if (isLoading) {
    return (
      <>
        <Container>
          <Grid
            container
            direction="row"
            style={{ justifyContent: "space-between" }}
          >
            <Grid item my={4}>
              <Button
                variant="text"
                sx={{ color: "gray" }}
                onClick={returnToCourses}
              >
                &#x2190; Back to courses
              </Button>
              <h1>Course Details</h1>
              <LoadingCircle />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <Grid
          container
          direction="row"
          style={{ justifyContent: "space-between" }}
        >
          <Grid item my={4}>
            <Button
              variant="text"
              sx={{ color: "gray" }}
              onClick={returnToCourses}
            >
              &#x2190; Back to courses
            </Button>
            <h1>Course Details</h1>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={4} sm={2}>
              <span style={{ fontWeight: "bold" }}>Course ID</span>
            </Grid>
            <Grid item xs={8} sm={10}>
              <span>{courseData["Course_ID"]}</span>
            </Grid>
            <Grid item xs={4} sm={2}>
              <span style={{ fontWeight: "bold" }}>Course Name</span>
            </Grid>
            <Grid item xs={8} sm={10}>
              <span>{courseData["Course_Name"]}</span>
            </Grid>
            <Grid item xs={4} sm={2}>
              <span style={{ fontWeight: "bold" }}>Course Description</span>
            </Grid>
            <Grid item xs={8} sm={10}>
              <span>{courseData["Course_Desc"]}</span>
            </Grid>
            <Grid item xs={4} sm={2}>
              <span style={{ fontWeight: "bold" }}>Course Category</span>
            </Grid>
            <Grid item xs={8} sm={10}>
              <span>{courseData["Course_Category"]}</span>
            </Grid>
            <Grid item xs={4} sm={2}>
              <span style={{ fontWeight: "bold" }}>Course Type</span>
            </Grid>
            <Grid item xs={8} sm={10}>
              <span>{courseData["Course_Type"]}</span>
            </Grid>
          </Grid>
        </Grid>
        {/* <LoadingCircle /> */}
      </Container>
    </>
  );
};
