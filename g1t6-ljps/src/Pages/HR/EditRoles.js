import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import useWindowSize from "../../useWindowSize";

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
import LoadingCircle from "../../Components/LoadingCircle";
import Popup from "../../Components/Popup";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export const EditRoles = () => {
  const loc = useLocation().pathname;
  const role_id = loc.slice(loc.lastIndexOf("Edit") + 4, loc.length);

  const [roleName, setRoleName] = React.useState("");
  const [roleStatus, setRoleStatus] = React.useState("Pending");
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState({ type: "", msg: "" });
  const { screenWidth } = useWindowSize();
  const [isLoading, setLoading] = React.useState(true);

  // Variables to check if any changes were made after save
  const [original, setOriginal] = React.useState();
  const [savedNoChange, setSavedNoChange] = React.useState(false);
  const [allRoles, setAllRoles] = React.useState([]);
  const [sameName, setSameName] = React.useState(false);
  const [sameNameError, setSameNameError] = React.useState(false);

  var dbRolesList = [];

  React.useEffect(() => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5003/viewAllRoles";
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
    setAllRoles(data);
    for (let role of data) {
      if (role["Job_Role_ID"] === parseInt(role_id)) {
        setRoleName(role["Job_Role_Name"]);
        setRoleStatus(role["Status"]);
        setOriginal(role);
      }
    }
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
    setRoleName(event.target.value);

    var tempSameName = false;
    for (let role of allRoles) {
      if (role["Job_Role_Name"] === event.target.value) {
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
    setRoleStatus(event.target.value);
  };

  const handleError = () => {
    // console.log("Role Name: " + roleName + "\nStatus: " + roleStatus);
    // console.log(original);
    if (
      roleName === original["Job_Role_Name"] &&
      roleStatus === original["Status"]
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
        msg: "Role name exists",
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
        <h1>Edit {original["Job_Role_Name"]} role</h1>
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
              // label='Role Name'
              style={{ marginBottom: "2em" }}
              onChange={handleNameChange}
              value={roleName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='roleStatusLabel'>Status</InputLabel>
              <Select
                labelId='roleStatusLabel'
                id='roleStatus'
                value={roleStatus}
                onChange={handleStatusChange}
                input={<OutlinedInput label='Name' />}
              >
                <MenuItem
                  selected={roleStatus === "Pending"}
                  value={"Pending"}
                >
                  Pending
                </MenuItem>
                <MenuItem selected={roleStatus === "Active"} value={"Active"}>
                  Active
                </MenuItem>
                <MenuItem
                  selected={roleStatus === "Retired"}
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
            This role name already exists.
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
            header='Confirm Edit Role'
            body={
              <>
                The "{original["Job_Role_Name"]}" role will be updated to have the
                following properties:
                <ul>
                  <li>Role Name: {roleName}</li>
                  <li>Role Status: {roleStatus}</li>
                </ul>
                Confirm edit?
              </>
            }
            onConfirm={{
              body: {
                Job_Role_ID: parseInt(role_id),
                Job_Role_Name: roleName,
                Status: roleStatus,
              },
              method: "put",
              api: "http://localhost:5003/viewAllRoles/edit_role/" + role_id,
              message: "Update Successful",
            }}
            error={
              (roleName === original["Job_Role_Name"] &&
                roleStatus === original["Status"]) ||
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
