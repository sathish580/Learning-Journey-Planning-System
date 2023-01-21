import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import Table from "../../../Components/Table";
// import Datagrid from '../../../Components/Datagrid';
import MuiDropdown from "../../../Components/Dropdown";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
const rolesData = [
  {
    Role_ID: "TCH001",
    Role_Name: "Repair Engineer",
    Role_Desc: "Repair Engineers repair things",
    Role_Category: "Technical",
  },
  {
    Role_ID: "MGT001",
    Role_Name: "Operations Planner",
    Role_Desc: "Operations planners plan operations",
    Role_Category: "Management",
  },
  {
    Role_ID: "SAL001",
    Role_Name: "Sales Manager",
    Role_Desc: "Sales Managers manage their team of salespeople",
    Role_Category: "Sales",
  },
  {
    Role_ID: "SAL002",
    Role_Name: "Sales Representative",
    Role_Desc: "Sales Representatives sell things",
    Role_Category: "Sales",
  },
  {
    Role_ID: "FIN001",
    Role_Name: "Accountant",
    Role_Desc: "Accountants manage our finances",
    Role_Category: "Finance",
  },
  {
    Role_ID: "HR001",
    Role_Name: "Huamn Resources Administrator",
    Role_Desc: "HR Admin manage employees",
    Role_Category: "HR",
  },
];

export const Roles = () => {
  const headers = ["Role ID", "Role Name"];
  const buttons = [["View Role", "Job_Role_ID"]];
  const [rows, setRows] = useState(null);
  const [isLoading, setLoading] = useState(true);

  // let rows = []
  // for (const role of rolesData) {
  //     rows.push({
  //         Role_ID: role.Role_ID,
  //         Role_Name: role.Role_Name,
  //         Role_Category: role.Role_Category
  //     })
  // }
  // console.log(rows)

  useEffect(() => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5003/viewAllRoles";
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        formatData(response.data);
      })
      .then((response) => {
        url = "http://localhost:5011/learning_journey";
        var reqData = { staff_id: window.sessionStorage.getItem("userID") };
        axios
          .post(url, JSON.stringify(reqData), {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response.data)
          });
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  function formatData(data) {
    var formattedData = [];
    for (const jobRoleNameKey in data) {
      // check that role status is active, not pending/retired
      if (data[jobRoleNameKey].Status == "Active") {
        formattedData.push({
          Job_Role_ID: data[jobRoleNameKey].Job_Role_ID,
          Job_Role_Name: data[jobRoleNameKey].Job_Role_Name,
        });
      }
    }
    setRows(formattedData);
    setLoading(false);
  }
  if (isLoading) {
    return (
      <>
        <Container sx={{ my: 10 }}>
          <CircularProgress />
        </Container>
      </>
    );
  }
  return (
    <>
      <Container sx={{ my: 10 }}>
        <Table
          tableName="All Roles"
          headers={headers}
          // actionBtns={buttons}
          rows={rows}
          // noButtonKey
          // buttonPaths={["/learner/roles/individual_role"]}
        />
      </Container>
    </>
  );
};
