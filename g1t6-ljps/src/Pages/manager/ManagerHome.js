// this page renders all the components that need to be displayed in the Manager Homepage
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import Table from "../../Components/Table";
import Searchbar from "../../Components/Searchbar";
import Grid from "@mui/material/Grid";
import LoadingCircle from "../../Components/LoadingCircle";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

// const staffList = [
//   {
//     staffId: "1234567",
//     staffFirstName: "John",
//     staffLastName: "Doe",
//     staffEmail: "john.doe@gmail.com",
//   },
//   {
//     staffId: "123134141",
//     staffFirstName: "Sally",
//     staffLastName: "Ha",
//     staffEmail: "sally.ha@gmail.com",
//   },
//   {
//     staffId: "0123812",
//     staffFirstName: "Tom",
//     staffLastName: "Mee",
//     staffEmail: "tom.mee@gmail.com",
//   },
// ];

var staffList = [];
const ManagerHome = () => {
  // todo: get manager id from login screen
  var managerID = parseInt(window.sessionStorage.getItem("userID"));
  const [rows, setRows] = useState(staffList);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5100/manager";
    var reqData = { manager_id: managerID };
    axios
      .post(url, JSON.stringify(reqData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.data)
        staffList = response.data.data;
        // setRows(staffList);
        formatData(staffList);
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  function formatData(data) {
    var formattedData = [];
    for (const oneStaff of data) {
      formattedData.push({
        staff_id: oneStaff["staff_id"],
        fullname: oneStaff["f_name"] + " " + oneStaff["l_name"],
        email: oneStaff["email"],
      });
    }
    setRows(formattedData);
    setLoading(false);
  }

  function getFilteredRows(searched) {
    var filteredRows = [];
    rows.forEach((oneStaff) => {
      if (oneStaff["staff_id"].toString().includes(searched)) {
        filteredRows.push(oneStaff);
      } else if (oneStaff["fullname"].toLowerCase().includes(searched)) {
        filteredRows.push(oneStaff);
      }  else if (oneStaff["email"].toLowerCase().includes(searched)) {
        filteredRows.push(oneStaff);
      }
    });
    console.log("filteredRows", filteredRows);
    return filteredRows;
  }

  function handleSearch(e) {
    console.log(e.target.value);
    if (e.target.value == "") {
      setRows(staffList);
    } else {
      setRows(getFilteredRows(e.target.value.toLowerCase()));
    }
  }

  if (isLoading) {
    return (
      <Container>
        <Grid
          container
          direction="row"
          style={{ justifyContent: "space-between" }}
        >
          <Grid item>
            <h1>My Team(s)</h1>
          </Grid>
        </Grid>
        <LoadingCircle />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 10 }}>
      <Table
        tableName="My Team(s)"
        headers={["Staff ID", "Full Name", "Email"]}
        actionBtns={[["View Profile", "staff_id", "/manager/"]]}
        rows={rows}
        style={{
          height: "400px",
        }}
      />
    </Container>
  );
};

export default ManagerHome;
