import { Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";
import Table from "../../../Components/Table";
import { SkillsData } from "../SkillsData";
import { RolesData } from "../RolesData";
import LoadingCircle from "../../../Components/LoadingCircle";

// for job role id 4002
var skillsByRoleData = [
  {
    Skill_ID: "2000",
    Skill_Name: "Analytics",
    EnrollmentStatus: "None",
  },
  {
    Skill_ID: "2002",
    Skill_Name: "Data Analytics",
    EnrollmentStatus: "None",
  },
  {
    Skill_ID: "2005",
    Skill_Name: "Stakeholder Management",
    EnrollmentStatus: "None",
  },
  {
    Skill_ID: "2009",
    Skill_Name: "Incident Management",
    EnrollmentStatus: "None",
  },
  {
    Skill_ID: "2010",
    Skill_Name: "Disaster Recovery",
    EnrollmentStatus: "None",
  },
];

export const NewLJSkills = (props) => {
  const { routeToCourse } = props;
  const loc = useLocation().pathname;
  const role_id = loc.slice(loc.lastIndexOf("/") + 1, loc.length);
  let role_name = "";
  // for (let role of RolesData) {
  //   // console.log(role)
  //   if (String(role["Job_Role_ID"]) === role_id) {
  //     role_name = role["Job_Role_Name"];
  //   }
  // }

  const buttons = [["View courses", "Skill_ID"]];
  const headers = ["Skill ID", "Skill Name", "Courses Enrolled?"];
  const [isLoading, setLoading] = useState(true);
  const [roleName, setRoleName] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5003/getJobRole/" + role_id;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.data[0].Job_Role_Name);
        setRoleName(response.data.data[0].Job_Role_Name);
        window.sessionStorage.setItem("roleID", role_id);
        window.sessionStorage.setItem(
          "roleName",
          response.data.data[0].Job_Role_Name
        );
      })
      .then((response) => {
        url = "http://localhost:5200/viewAllSkillsPerRole/" + role_id;
        axios.get(url).then((response) => {
          console.log("skillsperrole", response.data.skills);
          formatData(response.data.skills)
          setLoading(false);
        });
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  function formatData(data){
    var enrolledSkills = [];
    // if user goes back to this page from the NewLJCourses page
    if(window.sessionStorage.getItem("enrolledSkills") != undefined){
      enrolledSkills = window.sessionStorage.getItem("enrolledSkills")
    }
    skillsByRoleData = []
    for (const oneSkill of data){
      // console.log("oneSkill", oneSkill)
      // if user has already saved courses into lj then set it as "Enrolled", otherwise show "None"
      oneSkill["EnrollmentStatus"] = enrolledSkills.indexOf(oneSkill.Skill_ID) !== -1 ? "Enrolled" : "None";
      skillsByRoleData.push(oneSkill)
    }
    setRows(skillsByRoleData)
  }

  const handleRouteToCourse = (skill) => {
    routeToCourse(skill["Skill_ID"]);
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
      <Container sx={{ my: 10 }}>
        <Typography variant="h5" gutterBottom>
          Skills Required
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {roleName} Learning Journey
        </Typography>
        <Table
          // tableName={tableName}
          actionBtns={buttons}
          headers={headers}
          rows={rows}
          // routeToCourse={handleRouteToCourse}
        />
      </Container>
    </>
  );
};
