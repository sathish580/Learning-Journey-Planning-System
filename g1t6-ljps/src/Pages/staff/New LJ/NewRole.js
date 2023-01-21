import { Container, Typography } from "@mui/material";
import React from "react";
import Table from "../../../Components/Table";
import { RolesData } from "../RolesData";
import LoadingCircle from "../../../Components/LoadingCircle";
import axios from "axios";

export const NewRole = () => {
  const headers = ["Role ID", "Role Name"];
  const buttons = [["View Skills", "Role_ID"]];

  // Checking which page should be displayed
  // const [page, setPage] = React.useState()

  const [isLoading, setLoading] = React.useState(true);
  const [rolesData, setRolesData] = React.useState([]);
  // const [existingLJs, setExistingLJs] = React.useState([]);
  var existingLJs = []

  React.useEffect(() => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5011/learning_journey";
    var reqData = { staff_id: window.sessionStorage.getItem("userID") };
    axios
      .post(url, JSON.stringify(reqData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const staffLJ = response.data.data;
        console.log(staffLJ);
        var existingLJList = [];
        for (const oneLJ in staffLJ) {
          existingLJList.push(staffLJ[oneLJ].role_id);
        }
        existingLJs = existingLJList;
        // console.log("existingLJs", existingLJs);
        // setStaffData(staffLJ);
      })
      .then((response) => {
        url = "http://localhost:5003/viewAllRoles";
        axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            const rolesData = response.data;
            console.log(rolesData);
            formatData(rolesData);
            // console.log(staffLJ)
          })
          .catch((error) => {
            console.log("Error:", error.message);
          });
        // console.log(staffLJ)
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  function formatData(data) {
    var formattedData = [];
    for (const jobRoleNameKey in data) {
      // check that role status is active, not pending/retired
      // and user has not started a LJ for the role
      if (
        data[jobRoleNameKey].Status == "Active" &&
        existingLJs.indexOf(data[jobRoleNameKey].Job_Role_ID) == -1
      ) {
        formattedData.push({
          Job_Role_ID: data[jobRoleNameKey].Job_Role_ID,
          Job_Role_Name: data[jobRoleNameKey].Job_Role_Name,
        });
      }
    }
    setRolesData(formattedData);
    setLoading(false);
  }

  let rows = [];
  for (const role of rolesData) {
    rows.push({
      Role_ID: role.Job_Role_ID,
      Role_Name: role.Job_Role_Name,
    });
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
        <Typography variant="h5" gutterBottom>
          Start New Learning Journey
        </Typography>
        <Table
          tableName="All Roles"
          headers={headers}
          actionBtns={buttons}
          rows={rows}
          singlePage
        />
      </Container>
    </>
  );
};
