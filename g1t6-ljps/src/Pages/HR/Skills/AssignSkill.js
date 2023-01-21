import React from "react";
import RadioButtons from "../../../Components/RadioButtons";
import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { AllSkillsData } from "../AllSkillsData";
import { AssignSkillToRole } from "./AssignSkillToRole";
import { AssignSkillToCourse } from "./AssignSkillToCourse";
import { UnassignSkillFromRole } from "./UnassignSkillFromRole";
import { UnassignSkillFromCourse } from "./UnassignSkillFromCourse";
import axios from "axios";
import LoadingCircle from "../../../Components/LoadingCircle";

export const AssignSkill = () => {
  const loc = useLocation().pathname;
  const skill_id = loc.slice(loc.lastIndexOf("/") + 1, loc.length);
  let skill_name = "";

  const [allSkillsData, setAllSkillsData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5200/Skill";
    axios
      .get(url)
      .then((response) => {
        // setRows(staffList);
        formatData(Object.values(response.data));
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  function formatData(data) {
    setAllSkillsData(data);
    setLoading(false);
  }

  for (let skill of allSkillsData) {
    if (String(skill["Skill_ID"]) === skill_id) {
      skill_name = skill["Skill_Name"];
    }
  }

  // To check if user selected assign or unassign
  const [assign, setAssign] = React.useState();

  // To check if user selected role or course
  const [roleCourse, setRoleCourse] = React.useState();

  // Track the page
  const [page, setPage] = React.useState();

  const [toFrom, setToFrom] = React.useState('')
  const handleAssignSubmit = (ass) => {
    setAssign(ass);
    if ((ass = "Assign")) {
      setToFrom("to");
    } else if ((ass = "Unassign")) {
      setToFrom("from");
    }
  };
  const header2 =
    "Would you like to " +
    assign +
    " " +
    skill_name +
    " " +
    toFrom +
    " roles, or " +
    toFrom +
    " courses?";

  const handleSubmit = (rc) => {
    setRoleCourse(rc);
    if (assign === "Assign" && rc === "Roles") {
      setPage("atr");
    } else if (assign === "Unassign" && rc === "Roles") {
      setPage("ufr");
    } else if (assign === "Assign" && rc === "Courses") {
      setPage("atc");
    } else if (assign === "Unassign" && rc === "Courses") {
      setPage("ufc");
    }
  };

  const handleBack = () => {
    setPage();
    setAssign();
    setRoleCourse();
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
        {!page && (
          <>
            <Typography variant='h5'>
              Assign / Unassign {skill_name} skill
            </Typography>
            <RadioButtons
              header={
                'Do you wish to Assign, or Unassign "' + skill_name + '"?'
              }
              options={["Assign", "Unassign"]}
              onSubmit={handleAssignSubmit}
            />
            {assign && (
              <RadioButtons
                header={header2}
                options={["Courses", "Roles"]}
                onSubmit={handleSubmit}
              />
            )}
          </>
        )}

        {page && (
          <>
            {page === "atr" && (
              <AssignSkillToRole
                skillID={String(skill_id)}
                skillName={skill_name}
                routeToSelect={handleBack}
              />
            )}
            {page === "atc" && (
              <AssignSkillToCourse
                skillID={String(skill_id)}
                skillName={skill_name}
                routeToSelect={handleBack}
              />
            )}
            {page === "ufr" && (
              <UnassignSkillFromRole
                skillID={String(skill_id)}
                skillName={skill_name}
                routeToSelect={handleBack}
              />
            )}
            {page === "ufc" && (
              <UnassignSkillFromCourse
                skillID={String(skill_id)}
                skillName={skill_name}
                routeToSelect={handleBack}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
};
