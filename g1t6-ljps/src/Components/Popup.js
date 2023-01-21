import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { CircularProgress, Container } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Popup(props) {
  const { buttonText, header, body, onConfirm, error, onError } = props;
  const smallScreen = window.innerWidth < 900 ? true : false;
  const toAddMarginLeft = !smallScreen ? "1em" : "0";
  const toAddMarginTop = smallScreen ? "1em" : "0";
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [alert, setAlert] = React.useState({ type: "", msg: "" });

  const handleOpen = () => {
    console.log(error);
    if (!error) {
      setOpen(true);
    } else {
      onError();
    }
  };
  const handleCancel = () => {
    setOpen(false);
    setLoading(true);
  };
  const handleClose = () => {
    setOpen(false);
    setLoading(true);
    if (onConfirm) {
      // user confirms something
      console.log(onConfirm);
      var reqData = onConfirm.body;
      console.log(reqData);
      if (onConfirm.method == "post") {
        if (onConfirm.api.indexOf("createLJ") !== -1) {
          setLoading(false);
          setOpenSnackbar(true);
          setAlert((alert) => ({
            type: "info",
            msg: "Adding to learning journey...",
          }));
          // create a list of courseIDs from onConfirm.body.coursesToAdd
          var courseIDList = onConfirm.coursesToAdd.map(
            (course) => course["Course_ID"]
          );
          console.log("courseIDList", courseIDList);
          // loop thru number of courses added to add to LJ table in db
          for (const courseIndex in courseIDList) {
            reqData.Course_ID = courseIDList[courseIndex];
            console.log(reqData);
            axios
              .post(onConfirm.api, JSON.stringify(reqData), {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((response) => {
                console.log("save LJ mapping successful");
                // only show the success message when all are saved into the db
                if (courseIndex == courseIDList.length - 1) {
                  setLoading(false);
                  setOpenSnackbar(true);
                  setAlert((alert) => ({
                    type: "success",
                    msg: onConfirm.message ? onConfirm.message : "Success",
                  }));
                }
              })
              .catch((error) => {
                console.log("Error:", error.message);
                setLoading(false);
                setOpenSnackbar(true);
                setAlert((alert) => ({
                  type: "error",
                  msg: "Error occurred",
                }));
              });
          }
          // save enrolled skills into sessionStorage for faster retrival in NewLJSkills page
          if (window.sessionStorage.getItem("enrolledSkills") != undefined) {
            window.sessionStorage.setItem(
              "enrolledSkills",
              window.sessionStorage
                .getItem("enrolledSkills")
                .concat([onConfirm.body.Skill_ID])
            );
          } else {
            window.sessionStorage.setItem("enrolledSkills", [
              onConfirm.body.Skill_ID,
            ]);
          }
        } else {
          axios
            .post(onConfirm.api, JSON.stringify(reqData), {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              setLoading(false);
              setOpenSnackbar(true);
              setAlert((alert) => ({
                type: "success",
                msg: onConfirm.message ? onConfirm.message : "Success",
              }));
            })
            .catch((error) => {
              console.log("Error:", error.message);
              setLoading(false);
              setOpenSnackbar(true);
              setAlert((alert) => ({
                type: "error",
                msg: "Error occurred",
              }));
            });
        }
      } else if (onConfirm.method == "put") {
        if (onConfirm.api.indexOf("deleteLJ") !== -1) {
          setOpenSnackbar(true);
          setAlert((alert) => ({
            type: "info",
            msg: "Deleting learning journey...",
          }));
          axios
            .put(onConfirm.api, JSON.stringify(reqData), {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              console.log("success asdasdasdas");
              setOpenSnackbar(true);
              setAlert((alert) => ({
                type: "success",
                msg: onConfirm.message ? onConfirm.message : "Success",
              }));
            })
            .then((response) => {
              // reload the page after 2 seconds
              setTimeout(window.location.reload(), 2000);
            })
            .catch((error) => {
              console.log("Error:", error.message);
              setOpenSnackbar(true);
              setAlert((alert) => ({
                type: "error",
                msg: "Error occurred",
              }));
            });
        } else {
          axios
            .put(onConfirm.api, JSON.stringify(reqData), {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              setOpenSnackbar(true);
              setAlert((alert) => ({
                type: "success",
                msg: onConfirm.message ? onConfirm.message : "Success",
              }));
            })
            .catch((error) => {
              console.log("Error:", error.message);
              setOpenSnackbar(true);
              setAlert((alert) => ({
                type: "error",
                msg: "Error occurred",
              }));
            });
        }
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Button
        sx={{
          backgroundColor:
            buttonText.toLowerCase() === "delete" ? "red" : "default",
          mx: toAddMarginLeft,
          my: toAddMarginTop,
        }}
        fullWidth={smallScreen}
        variant='contained'
        onClick={handleOpen}
      >
        {buttonText}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {header}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {body}
          </Typography>
          <Box sx={{ display: "flex", mt: 5 }}>
            <Button sx={{ color: "red", mr: 2 }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant='contained' onClick={handleClose}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
