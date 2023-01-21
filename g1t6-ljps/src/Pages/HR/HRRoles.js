import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../Components/Table";
import { Container } from "@mui/material";
import LoadingCircle from "../../Components/LoadingCircle";

export const HRRoles = () => {
  const [rows, setRows] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5003/viewAllRoles";
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        formatData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  function formatData(data) {
    var formattedData = [];
    for (const jobRoleNameKey in data) {
      formattedData.push({
        Job_Role_ID: data[jobRoleNameKey].Job_Role_ID,
        Job_Role_Name: data[jobRoleNameKey].Job_Role_Name,
        Status: data[jobRoleNameKey].Status,
      });
    }
    setRows(formattedData);
    setLoading(false);
  }
  const handleDeleteClick = (colIndex) => {
    // console.log(e.currentTarget)
    console.log(colIndex["Job_Role_ID"]);
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
        <Table
          tableName='Role Repository'
          actionBtns={[
            ["Edit / Delete", "Job_Role_ID", "Edit"],
          ]}
          headers={["Role ID", "Role Name", "Status"]}
          rows={rows}
          tableButton={["Create Role", "/hr/roles/create"]}
          buttonPaths={["/roles/editrole"]}
          onDeleteClick={handleDeleteClick}
        />
      </Container>
    </>
  );
};
