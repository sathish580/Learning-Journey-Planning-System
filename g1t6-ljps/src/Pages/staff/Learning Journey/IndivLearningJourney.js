import React, { useState, useEffect, createContext } from "react";
import { Typography, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import LJTabs from "./LJTabs";
import ProgressBar from "../../../Components/ProgressBar";
import { RolesData } from "../RolesData";
import axios from "axios";
import Popup from "../../../Components/Popup";
import Grid from "@mui/system/Unstable_Grid";
import LoadingCircle from "../../../Components/LoadingCircle";

import { AppContext } from "../../context";

const IndivLearningJourney = () => {
  const loc = useLocation().pathname;
  const role_id = parseInt(loc.slice(loc.lastIndexOf("/") + 1, loc.length));
  const [isLoading, setLoading] = useState(true);

  const [staffData, setStaffData] = React.useState([]);
  const [LJData, setLJData] = React.useState({
    staff_id: window.sessionStorage.getItem("userID"),
    role_id: role_id,
    myProgressData: null,
    mySkillData: null,
  });

  // var reqData = {"staff_id": null, "role_id": null}
  // const [myProgressData, setProgressData] = React.useState([]);
  // const [mySkillData, setSkillData] = React.useState([]);

  // Indiv LJ data
  React.useEffect(() => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5011/learning_journey";
    var reqData = { staff_id: LJData.staff_id };
    axios
      .post(url, JSON.stringify(reqData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const staffLJ = response.data.data;
        console.log("in indivlj page");
        console.log("staffLJ:", staffLJ);
        setStaffData(staffLJ);

        // console.log(staffLJ)
      })
      .then((response) => {
        // get data for "My Progress" tab
        url = "http://localhost:5011/learning_journey/progress";
        reqData = { staff_id: LJData.staff_id, role_id: LJData.role_id };
        axios
          .post(url, JSON.stringify(reqData), {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("myProgressData:", response.data);
            setLJData((prevLJData) => {
              return { ...prevLJData, myProgressData: response.data };
            });
          })
          .then((response) => {
            url = "http://localhost:5011/learning_journey/progress/skills";
            axios
              .post(url, JSON.stringify(reqData), {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((response) => {
                console.log("mySkillData:", response.data);

                setLJData((prevLJData) => {
                  return { ...prevLJData, mySkillData: response.data };
                });
                window.sessionStorage.setItem("roleName", role_name);
              })
              .then((response) => {
                setLoading(false);
                window.sessionStorage.setItem(
                  "LJProgress",
                  JSON.stringify(LJData)
                );
                console.log("LJData:", LJData);
              });
          });
      });
  }, []);

  let role_name = "";
  let progress = 0;
  for (let role of staffData) {
    if (String(role["role_id"]) === String(role_id)) {
      role_name = role["role"];
      progress = role["progress"];
    }
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
        <Grid container spacing={2} justifyContent="space-between">
          <Grid xs={12} md={6}>
            <Typography variant="h5">{role_name} Learning Journey</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Embarked on 24th Sept 2022
            </Typography>
          </Grid>

          <ProgressBar progress={progress} />
        </Grid>
      </Container>

      <AppContext.Provider value={LJData}>
        <Container>
          <LJTabs />
        </Container>
      </AppContext.Provider>
    </>
  );
};

export default IndivLearningJourney;
