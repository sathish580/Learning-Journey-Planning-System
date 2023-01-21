import React, { useState, useEffect } from "react";
import axios from "axios";

import useWindowSize from "../../../useWindowSize";

import TextField from "@mui/material/TextField";
import { CircularProgress, Container } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const HRCreateSkill = () => {
  const [skillName, setSkillName] = useState("");
  const [skillStatus, setSkillStatus] = React.useState("Pending");
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState({ type: "", msg: "" });
  const { screenWidth } = useWindowSize();
  var dbSkillsList = [];


  function formatData(data) {
    var formattedData = [];
    // for (const oneSkill of data) {
    //   formattedData.push(oneSkill["Skill_Name"]);
    // }
    // dbSkillsList = formattedData;
    for (const skillIDKey in data){
      // console.log(allRoles[jobRoleNameKey].Job_Role_ID)
      formattedData.push(data[skillIDKey].Skill_Name)
    }
    dbSkillsList = formattedData;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleNameChange(event) {
    setSkillName(event.target.value);
  }

  const handleStatusChange = (event) => {
    setSkillStatus(event.target.value);
  };

  function handleSave(event) {
    console.log("Skill Name: " + skillName + "\nStatus: " + skillStatus)
    document.getElementById("saveLoading").style.display = "inline";
    var url = "http://localhost:5200/Skill";
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        formatData(response.data);
      })
      .then((response) => {
        if (skillName.trim() == "") {
          setOpen(true);
          console.log("give error msg");
          setAlert((alert) => ({
            ...alert,
            type: "error",
            msg: "Skill name cannot be empty",
          }));
          document.getElementById("saveLoading").style.display = "none";
        } else if (skillStatus == "") {
          setOpen(true);
          console.log("give error msg");
          setAlert((alert) => ({
            ...alert,
            type: "error",
            msg: "Skill status cannot be empty",
          }));
          document.getElementById("saveLoading").style.display = "none";
        } else if (dbSkillsList.indexOf(skillName) !== -1) {
          console.log("skill already exists");
          // if role name already exists, show error message
          setOpen(true);
          setAlert((alert) => ({
            type: "error",
            msg: "Skill name already exists",
          }));
          document.getElementById("saveLoading").style.display = "none";
        }
        else{
          console.log("save skill into db");
          url = "http://localhost:5200/Create_Skill";
          var reqData = {
            Skill_ID: "",
            Skill_Name: skillName,
            Status: skillStatus,
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
                msg: "Skill successfully created",
              }));
            })
            .catch((error) => {
              console.log("Error:", error.message);
              document.getElementById("saveLoading").style.display = "none";
              setOpen(true);
              setAlert((alert) => ({
                type: "error",
                msg: "Skill not created successfully",
              }));
            });
        }

      })
      .catch((error) => {
        console.log("Error:", error.message);
        document.getElementById("saveLoading").style.display = "none";
        setOpen(true);
        setAlert((alert) => ({
          type: "error",
          msg: "Skill not created successfully",
        }));
      });



  }

  return (
    <>
      <Container sx={{ my: 10 }}>
        <h1>Create skill</h1>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Skill Name"
              style={{ marginBottom: "2em" }}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth disabled>
              <InputLabel id="skillStatusLabel">Status</InputLabel>
              <Select
                labelId="skillStatusLabel"
                id="skillStatus"
                value={skillStatus}
                onChange={handleStatusChange}
                input={<OutlinedInput label="Name" />}
              >
                <MenuItem selected value={"Pending"}>Pending</MenuItem>
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
            variant="contained"
            fullWidth={screenWidth < 900 ? true : false}
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
