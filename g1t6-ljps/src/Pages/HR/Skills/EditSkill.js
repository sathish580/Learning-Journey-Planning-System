import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import useWindowSize from "../../../useWindowSize";

import TextField from "@mui/material/TextField";
import { CircularProgress, Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import LoadingCircle from "../../../Components/LoadingCircle";
import Popup from "../../../Components/Popup";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export const EditSkill = () => {
  const loc = useLocation().pathname;
  const skill_id = loc.slice(loc.lastIndexOf("Edit") + 4, loc.length);

  const [skillName, setSkillName] = React.useState("");
  const [skillStatus, setSkillStatus] = React.useState("Pending");
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState({ type: "", msg: "" });
  const { screenWidth } = useWindowSize();
  const [isLoading, setLoading] = React.useState(true);

  // Variables to check if any changes were made after save
  const [original, setOriginal] = React.useState();
  const [savedNoChange, setSavedNoChange] = React.useState(false);
  const [allSkills, setAllSkills] = React.useState([]);
  const [sameName, setSameName] = React.useState(false);
  const [sameNameError, setSameNameError] = React.useState(false);

  var dbSkillsList = [];

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
    setAllSkills(data);
    for (let skill of data) {
      if (skill["Skill_ID"] === parseInt(skill_id)) {
        setSkillName(skill["Skill_Name"]);
        setSkillStatus(skill["Skill_Status"]);
        setOriginal(skill);
      }
    }
    // {
    //     "Skill_ID": 90,
    //     "Skill_Name": "Medicine",
    //     "Skill_Status": "Active"
    // }
    setLoading(false);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleNameChange(event) {
    setSavedNoChange(false);
    setSkillName(event.target.value);

    var tempSameName = false;
    for (let skill of allSkills) {
      if (skill["Skill_Name"] === event.target.value) {
        setSameName(true);
        tempSameName = true;
      }
    }
    if (!tempSameName) {
      setSameName(false);
      setSameNameError(false);
    }
  }

  const handleStatusChange = (event) => {
    setSavedNoChange(false);
    setSkillStatus(event.target.value);
  };

  const handleError = () => {
    console.log("Skill Name: " + skillName + "\nStatus: " + skillStatus);
    console.log(original);
    if (
      skillName === original["Skill_Name"] &&
      skillStatus === original["Skill_Status"]
    ) {
      setSavedNoChange(true);
      setOpen(true);
      setAlert((alert) => ({
        ...alert,
        type: "error",
        msg: "No changes made",
      }));
    } else if (sameName) {
      setSameNameError(true);
      setOpen(true);
      setAlert((alert) => ({
        ...alert,
        type: "error",
        msg: "Skill name exists",
      }));
    }
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
        <h1>Edit {original["Skill_Name"]} skill</h1>
        <Grid
          container
          spacing={2}
          sx={{
            border: savedNoChange || sameNameError ? "1px solid red" : "none",
            pr: 2,
          }}
        >
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id='outlined-required'
              // label='Skill Name'
              style={{ marginBottom: "2em" }}
              onChange={handleNameChange}
              value={skillName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='skillStatusLabel'>Status</InputLabel>
              <Select
                labelId='skillStatusLabel'
                id='skillStatus'
                value={skillStatus}
                onChange={handleStatusChange}
                input={<OutlinedInput label='Name' />}
              >
                <MenuItem
                  selected={skillStatus === "Pending"}
                  value={"Pending"}
                >
                  Pending
                </MenuItem>
                <MenuItem selected={skillStatus === "Active"} value={"Active"}>
                  Active
                </MenuItem>
                <MenuItem
                  selected={skillStatus === "Retired"}
                  value={"Retired"}
                >
                  Retired
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {savedNoChange && (
          <Typography variant='subtitle1' color='red'>
            You have not made any changes.
          </Typography>
        )}
        {sameNameError && (
          <Typography variant='subtitle1' color='red'>
            This skill name already exists.
          </Typography>
        )}
        <Container
          disableGutters
          style={{ display: "flex", justifyContent: "end", marginTop: "3em" }}
        >
          <CircularProgress
            id='saveLoading'
            style={{ marginRight: "1em", display: "none" }}
          />
          <Popup
            buttonText='Save Changes'
            header='Confirm Edit Skill'
            body={
              <>
                The "{original["Skill_Name"]}" skill will be updated to have the
                following properties:
                <ul>
                  <li>Skill Name: {skillName}</li>
                  <li>Skill Status: {skillStatus}</li>
                </ul>
                Confirm edit?
              </>
            }
            onConfirm={{
              body: {
                Skill_ID: parseInt(skill_id),
                Skill_Name: skillName,
                Skill_Status: skillStatus,
              },
              method: "put",
              api: "http://localhost:5200/edit_skill/" + skill_id,
              message: "Update Successful",
            }}
            error={
              (skillName === original["Skill_Name"] &&
                skillStatus === original["Skill_Status"]) ||
              sameName
            }
            onError={handleError}
          />
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
