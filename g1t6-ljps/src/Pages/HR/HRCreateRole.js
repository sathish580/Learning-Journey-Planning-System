import React, { useState, useEffect } from "react";
import axios from "axios";
import useWindowSize from "../../useWindowSize";

import TextField from "@mui/material/TextField";
import { CircularProgress, Container } from "@mui/material";
import LoadingCircle from "../../Components/LoadingCircle";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";

import { AllSkillsData } from "../HR/AllSkillsData";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const HRCreateRole = () => {
  const [roleName, setRoleName] = useState("");
  const [roleStatus, setRoleStatus] = React.useState("Pending");
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState({ type: "", msg: "" });
  const { screenWidth } = useWindowSize();
  var dbRolesList = [];

  function formatData(data) {
    var formattedData = [];
    for (const jobRoleNameKey in data) {
      formattedData.push(data[jobRoleNameKey].Job_Role_Name);
    }
    dbRolesList = formattedData;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleNameChange(event) {
    setRoleName(event.target.value);
  }

  const handleStatusChange = (event) => {
    setRoleStatus(event.target.value);
  };

  function handleSave(event) {
    document.getElementById("saveLoading").style.display = "inline";
    var url = "http://localhost:5003/viewAllRoles";
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        formatData(response.data);
      })
      .then((response) => {
        if (roleName.trim() == "") {
          setOpen(true);
          setAlert((alert) => ({
            type: "error",
            msg: "Role name cannot be empty",
          }));
          document.getElementById("saveLoading").style.display = "none";
        } else if (roleStatus == "") {
          setOpen(true);
          setAlert((alert) => ({
            type: "error",
            msg: "Role status cannot be empty",
          }));
          document.getElementById("saveLoading").style.display = "none";
        } else if (dbRolesList.indexOf(roleName) !== -1) {
          console.log("role already exists");

          // if role name already exists, show error message
          setOpen(true);
          setAlert((alert) => ({
            type: "error",
            msg: "Role name already exists",
          }));
          document.getElementById("saveLoading").style.display = "none";
        } else {
          console.log("save role into db");
          url = "http://localhost:5003/createJobRole";
          var reqData = {
            Job_Role_Name: roleName,
            Status: roleStatus,
          };
          axios
            .post(url, JSON.stringify(reqData), {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              document.getElementById("saveLoading").style.display = "none";
              setOpen(true);
              setAlert((alert) => ({
                type: "success",
                msg: "Role successfully created",
              }));
            })
            .catch((error) => {
              console.log("Error:", error.message);
              document.getElementById("saveLoading").style.display = "none";
              setOpen(true);
              setAlert((alert) => ({
                type: "error",
                msg: "Role not created successfully",
              }));
            });
        }
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }

  return (
    <>
      <Container sx={{ my: 10 }}>
        <h1>Create role</h1>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Role Name"
              style={{ marginBottom: "2em" }}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth disabled>
              <InputLabel id="roleStatusLabel">Status</InputLabel>
              <Select
                labelId="roleStatusLabel"
                id="roleStatus"
                value={roleStatus}
                onChange={handleStatusChange}
                input={<OutlinedInput label="Name" />}
              >
                <MenuItem selected value={"Pending"}>
                  Pending
                </MenuItem>
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Retired"}>Retired</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Container
          disableGutters
          style={{ display: "flex", justifyContent: "end", marginTop: "3em" }}
        >
          <CircularProgress
            id="saveLoading"
            style={{ marginRight: "1em", display: "none" }}
          />
          <Button
            fullWidth={screenWidth < 900 ? true : false}
            variant="contained"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Container>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alert.type}
            sx={{ width: "100%" }}
          >
            {alert.msg}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};
