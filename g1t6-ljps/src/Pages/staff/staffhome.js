import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Container, Button } from "@mui/material";
import ItemList from "../../Components/ItemList";
// import ItemList from "../../Components/common/ItemList";
import { Link } from "react-router-dom";
import LoadingCircle from "../../Components/LoadingCircle";

const LearningJourneyData = [
  {
    Role_ID: "SAL002",
    Role_Name: "Sales Representative",
    Role_Desc: "Sales Representatives sell things",
    Role_Category: "Sales",
  },
  {
    Role_ID: "HR001",
    Role_Name: "Huamn Resources Administrator",
    Role_Desc: "HR Admin manage employees",
    Role_Category: "HR",
  },
];

const Staffhome = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [staffData, setStaffData] = React.useState([]);
  var userid = parseInt(window.sessionStorage.getItem("userID"));
  var name = window.sessionStorage.getItem("userName");

  useEffect(() => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5011/learning_journey";
    var reqData = { staff_id: parseInt(window.sessionStorage.getItem("userID")) };
    axios
      .post(url, JSON.stringify(reqData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const staffLJ = response.data.data;
        setStaffData(staffLJ);
        setLoading(false);

        // console.log(staffLJ)
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  // {progress: 100, role: 'Product Manager', role_id: 2}

  // {progress: 100, role: 'Scrum Master', role_id: 3}

  // {progress: 66.67, role: 'Project Manager', role_id: 4}

  const role_names = [];
  const list_paths = [];
  const progress = [];
  for (let role of staffData) {
    role_names.push(role.role);
    list_paths.push("/learner/" + String(role.role_id));
    progress.push(role.progress);
  }

  const handleDeleteLJ = (rolename) => {
    console.log(rolename)
  }

  if (isLoading) {
    return (
      <>
        <Container sx={{ my: 10 }}>
          <Typography variant="subtitle1" gutterBottom>
            Welcome Back, {name}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Your Learning Journey(s)
          </Typography>
        </Container>

        <Container>
          <LoadingCircle />
        </Container>
      </>
    );
  }

  return (
    <>
      <Container sx={{ my: 10 }}>
        <Typography variant="subtitle1" gutterBottom>
          Welcome Back, {name}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Your Learning Journey(s)
        </Typography>
        {staffData.length == 0 && (
          <Typography variant="subtitle1">
            You do not have any ongoing learning journeys.
          </Typography>
        )}
      </Container>

      <Container>
        {staffData.length != 0 && (
          <ItemList
            listName="Current Learning Journey"
            listItems={role_names}
            listPaths={list_paths}
            staffhome
            progress={progress}
          />
        )}

        <Link to={"/learner/new_lj"} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#818181",
              paddingTop: 10,
              paddingBottom: 10,
              width: "30%",
            }}
          >
            + Start a new Learning Journey
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default Staffhome;
