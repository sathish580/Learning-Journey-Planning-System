import React, { useState, useEffect } from "react";
import axios from "axios";

import { CourseData } from "../staff/Courses/CourseData";
import { Container } from "@mui/material";
import Table from "../../Components/Table";
import LoadingCircle from "../../Components/LoadingCircle";

export const HRHome = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const headers = [
    "Course ID",
    "Course Name",
    "Course Type",
    "Course Category",
  ];
  const buttons = [[["Assign Skills"]]];
  // let rows = []
  // for (const course of CourseData) {
  //     if (course.Course_Status == 'Active') {
  //         rows.push({
  //             Course_ID: course.Course_ID,
  //             Course_Name: course.Course_Name,
  //             Course_Type: course.Course_Type,
  //             Course_Category: course.Course_Category,
  //         })
  //     }
  // }

  useEffect(() => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5001/Course";
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.data);
        // setRows(staffList);
        formatData(response.data.data);
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  function formatData(data) {
    var formattedData = [];
    for (const oneCourse of data) {
      formattedData.push({
        Course_ID: oneCourse.Course_ID,
        Course_Name: oneCourse.Course_Name,
        Course_Type: oneCourse.Course_Type,
        Course_Category: oneCourse.Course_Category,
      });
    }
    setRows(formattedData);
    setLoading(false);
  }

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
      <Container sx={{ my: 10 }}>
        <Table
          tableName="Course Repository"
          headers={headers}
          actionBtns={[["Assign Skills", "Course_ID", "/hr/"]]}
          rows={rows}
          buttonPaths={["/learner"]}
        />
      </Container>
    </>
  );
};
