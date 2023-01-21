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

export const AssignSkillToRole = (props) => {
  const { skillID, skillName, routeToSelect } = props;

  const [isLoading, setLoading] = React.useState(true);

  const [addedRoles, setAddedRoles] = React.useState([]);
  const [rolesData, setRolesData] = React.useState([]);
  const [emptyError, setEmptyError] = React.useState(false);

  React.useEffect(() => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5200/assign_role";
    var reqData = { Skill_ID: parseInt(skillID) };
    axios
      .post(url, JSON.stringify(reqData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data)
        formatData(response.data.Roles);
        // console.log(staffLJ)
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  function formatData(data) {
    setRolesData(data);
    setLoading(false);
  }

  const headers = ["Role ID", "Role Name"];

  const buttons = [["Add Role"]];

  const tableName = "Roles you can Assign " + skillName + " to";

  const handleAddRole = (newRow) => {
    setEmptyError(false);
    const rownew = newRow;
    if (!containsObject(rownew, addedRoles)) {
      setAddedRoles([...addedRoles, rownew]);
    }
  };

  const handleRemoveRole = (removeRow) => {
    setAddedRoles(addedRoles.filter((row) => row !== removeRow));
  };

  const addedRoleNames = [];
  for (let role of addedRoles) {
    // console.log(addedRoles);
    addedRoleNames.push(role["Job_Role_Name"]);
  }

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
          Assign {skillName} skill to roles
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
          rows={rolesData}
          onAddCourse={handleAddRole}
          noButtonKey
        />
      </Container>

      <Container sx={{ mt: 10, border: emptyError ? "1px solid red" : "none" }}>
        <Table
          tableName={"Roles you have selected for assignment"}
          headers={headers}
          rows={addedRoles}
          actionBtns={[["Remove Role"]]}
          noButtonKey
          onRemoveCourse={handleRemoveRole}
        />
      </Container>
      {emptyError && (
        <Typography sx={{ mb: 3 }} variant='subtitle1' color='red'>
          You have not selected any roles for assignment!
        </Typography>
      )}

      <Container sx={{ mb: 10 }}>
        <Popup
          buttonText='Confirm Assignment'
          header='Assign Skill to Roles'
          body={
            <>
              You are about to assign the "{skillName}" skill to the following
              roles:
              <ul>
                {addedRoleNames.map((roleName, index) => (
                  <li key={index}>{roleName}</li>
                ))}
              </ul>
              Confirm assignment?
            </>
          }
          onConfirm={{
            body: {
              Skill_ID: parseInt(skillID),
              Roles: addedRoles.map((a) => a.Job_Role_ID),
            },
            method: "post",
            api: "http://localhost:5200/assign_role/save",
            message: "Assignment Successful",
          }}
          error={addedRoles.length === 0}
          onError={handleEmpty}
        />
      </Container>
    </>
  );
};
