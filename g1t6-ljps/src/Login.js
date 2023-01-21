import React, { useState } from "react";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Link, Route, useNavigate } from "react-router-dom";

const Background = styled("div")({
  backgroundColor: "#b5ecfb",
  // paddingRight: '35%',
  // paddingLeft: '35%',
  // paddingTop: '15%',
  // paddingBottom: '22%'
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const MuiCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 50,
});

const MuiTextField = styled(TextField)({
  margin: 15,
  width: "300px",
});

const Form = ({ handleClose }) => {
  //   const classes = useStyles();
  // create state variables for each input
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(user, password);
    handleClose();
  };

  const userPaths = {
    learner: "/learner",
    Learner: "/learner",
    manager: "/manager",
    Manager: "/manager",
    hr: "/hr",
    HR: "/hr",
  };
  const navigate = useNavigate();
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    navigate(userPaths[user]);
  };

  // clear all sessionStorage items
  window.sessionStorage.clear();
  return (
    <>
      <Background>
        <MuiCard onSubmit={handleSubmit}>
          <Typography gutterBottom variant="h4" component="div">
            Login
          </Typography>
          <MuiTextField
            label="Username"
            variant="filled"
            type="username"
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onKeyPress={handleKeypress}
          />
          <MuiTextField
            label="Password"
            variant="filled"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Link to={userPaths[user]} style={{ textDecoration: "none" }}>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </Link>
          </div>
        </MuiCard>
      </Background>
    </>
  );
};

export default Form;
