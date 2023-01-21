import { Container, Typography } from "@mui/material";
import React from "react";
import ItemList from "../../../Components/ItemList";
import { useLocation } from "react-router-dom";
import Table from "../../../Components/Table";
import { SkillsData } from "../SkillsData";
import { RolesData } from "../RolesData";
import Grid from "@mui/material/Grid";
import LoadingCircle from "../../../Components/LoadingCircle";
// import { RoleSkills } from './RoleSkills';
// import { SkillCourses } from './SkillCourses';

export const IndivRole = () => {
  const loc = useLocation().pathname;
  const role_id = loc.slice(loc.lastIndexOf("/") + 1, loc.length);
  let role_name = "";
  for (let role of RolesData) {
    if (role["Job_Role_ID"] === role_id) {
      role_name = role["Job_Role_Name"];
    }
  }

  const [page, setPage] = React.useState("skills");
  const [skill, setSkill] = React.useState();

  const handleRouteToCourse = (skillID) => {
    setPage("courses");
    setSkill(skillID);
  };

  const handleRouteToSkills = () => {
    setPage("skills");
  };

  console.log(page);

  return (
    <>
      {/* {page === 'skills' && <RoleSkills routeToCourse={handleRouteToCourse} />} */}
      {/* {page === 'courses' && (
        <SkillCourses
          skillID={skill}
          routeToSkills={handleRouteToSkills}
          roleName={role_name}
        />
      )} */}
      <Container>
        <Grid
          container
          direction="row"
          style={{ justifyContent: "space-between" }}
        >
          <Grid item>
            <h1>Role Details</h1>
          </Grid>
        </Grid>
        {/* <LoadingCircle /> */}
      </Container>
    </>
  );
};
