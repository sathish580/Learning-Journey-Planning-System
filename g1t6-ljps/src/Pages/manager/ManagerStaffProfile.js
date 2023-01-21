// this page renders all the components that need to be displayed in the Manager Homepage
import React, { useState, useEffect } from "react";
import axios from "axios";
import useWindowSize from "../../useWindowSize";

import { useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import Searchbar from "../../Components/Searchbar";
import Grid from "@mui/material/Grid";
import CollapsibleTable from "../../Components/CollapsibleTable";
import LoadingCircle from "../../Components/LoadingCircle";

import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

// var DUMMYstaffCourseDetails = {
//   staffId: "1234567",
//   outerRows: [
//     {
//       skill_id: "s1",
//       skill_name: "Risk Managemement",
//       skill_status: "Achieved",
//       innerRows: [
//         {
//           course_name: "Managing Risk 101",
//           status: "Completed",
//         },
//       ],
//     },
//     {
//       skill_id: "s2",
//       skill_name: "Communication and Presentation",
//       skill_status: "Achieved",
//       innerRows: [
//         {
//           course_name: "Communicating with Customers",
//           status: "Completed",
//         },
//       ],
//     },
//     {
//       skill_id: "s3",
//       skill_name: "Negotiating Strategically",
//       skill_status: "In Progress",
//       innerRows: [
//         {
//           course_name: "Negotiation 101",
//           status: "In Progress",
//         },
//       ],
//     },
//   ],
// };

// const staffDetails = {
//   staff_id: "0123812",
//   f_name: "Tom",
//   l_name: "Mee",
//   email: "tom.mee@gmail.com",
// };

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const ManagerStaffProfile = (props) => {
  const location = useLocation();
  var staffDetails = location.state;
  console.log("staffDetails", staffDetails);
  var staffId = staffDetails["staff_id"];
  var oneStaffCourseDetails = {
    staffId: "",
    outerRows: [],
  };
  const [rows, setRows] = useState(oneStaffCourseDetails);
  // const [staffDetails, setStaffDetail] = useState(stateStaffDetails);
  const [isLoading, setLoading] = useState(true);
  const { screenWidth } = useWindowSize();

  useEffect(() => {
    // get a list of staffID
    var staffIdList = [];
    // staffDetails.forEach((oneStaff) => {
    //   staffIdList.push(oneStaff["staff_id"]);
    // });
    // get each staff's skill and course enrolment details
    // staffIdList.forEach((oneStaffId) => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5001/manager/" + staffId;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        formatData(staffId, response.data["course_info"]);
      })
      .catch((error) => {
        console.log("Unable to fetch staff course data bc of", error);
      });
    // });
  }, []);

  function getFilteredRows(searched) {
    var filteredRows = {
      outerRows: [],
    };
    oneStaffCourseDetails["outerRows"].forEach((oneCourseDetail) => {
      if (oneCourseDetail["skill_id"].toLowerCase().includes(searched)) {
        filteredRows["outerRows"].push(oneCourseDetail);
      } else if (
        oneCourseDetail["skill_name"].toLowerCase().includes(searched)
      ) {
        filteredRows["outerRows"].push(oneCourseDetail);
      }
    });
    return filteredRows;
  }

  function handleSearch(e) {
    console.log(e.target.value);
    if (e.target.value == "") {
      setRows(oneStaffCourseDetails);
    } else {
      setRows(getFilteredRows(e.target.value.toLowerCase()));
    }
  }

  function formatData(oneStaffId, staffCourseRegDetails) {
    // initialising object to be sent to the ManagerStaffProfile
    var tempStaffObj = {};
    tempStaffObj["staffId"] = oneStaffId;
    tempStaffObj["outerRows"] = [];
    var skillsList = [];

    // loop thru the staffCourseRegDetails to create the object that will be passed to the ManagerStaffProfile page
    for (var i = 0; i < staffCourseRegDetails.length; i++) {
      // dont display the same skill again if user has registered for >1 course for one skill
      if (skillsList.indexOf(staffCourseRegDetails[i]["skill_name"]) == -1) {
        skillsList.push(staffCourseRegDetails[i]["skill_name"]);
        var oneSkillCourseObj = {};
        oneSkillCourseObj["skill_name"] = staffCourseRegDetails[i]["skill_name"];
        // if staff completed course, skill status is "Completed",
        // if not it is "In Progress"
        oneSkillCourseObj["skill_status"] =
          staffCourseRegDetails[i]["course_status"] == "Completed"
            ? "Completed"
            : "In Progress";
        var oneCourseObj = {};
        oneCourseObj["course_name"] = staffCourseRegDetails[i]["course_name"]
          ? staffCourseRegDetails[i]["course_name"]
          : "Not Registered";
        // if staff completed course, course status is "Completed",
        // if not if there a no course_id, course status is "In Progress",
        // if there is no course_id, course status is "Not Registered"
        oneCourseObj["status"] =
          staffCourseRegDetails[i]["course_status"] == "Completed"
            ? "Completed"
            : staffCourseRegDetails[i]["course_name"]
            ? "In Progress"
            : "-";
        oneSkillCourseObj["innerRows"] = [];
        oneSkillCourseObj["innerRows"].push(oneCourseObj);
  
        // add one staff's course details into the object
        tempStaffObj["outerRows"].push(oneSkillCourseObj);
        
      }
    }

    // setting one staff course details in session storage for easy retrieval
    // oneStaffCourseDetails[oneStaffId] = tempStaffObj;
    setLoading(false);
    setRows(tempStaffObj);
  }

  if (isLoading) {
    return (
      <>
        <Container>
          <h1>
            {staffDetails["fullname"]}'s Profile
          </h1>
          {/* staff details */}
          <Grid container spacing={2}>
            <Grid item xs={4} sm={2}>
              <span style={{ fontWeight: "bold" }}>Staff ID</span>
            </Grid>
            <Grid item xs={8} sm={10}>
              <span>{staffDetails["staff_id"]}</span>
            </Grid>
            <Grid item xs={4} sm={2}>
              <span style={{ fontWeight: "bold" }}>Full Name</span>
            </Grid>
            <Grid item xs={8} sm={10}>
              <span>{staffDetails["fullname"]}</span>
            </Grid>
            <Grid item xs={4} sm={2}>
              <span style={{ fontWeight: "bold" }}>Email</span>
            </Grid>
            <Grid item xs={8} sm={10}>
              <span>{staffDetails["email"]}</span>
            </Grid>
          </Grid>
          {/* staff skills attained */}
          <Grid
            container
            spacing={2}
            direction="row"
            style={{ justifyContent: "space-between" }}
          >
            <Grid item>
              <p style={{ fontWeight: "bold", marginTop: "2.5em" }}>
                Skills Attained
              </p>
            </Grid>
            <Grid item>
              {/* <Searchbar /> */}
              <Box sx={{ flexGrow: 1 }}>
                <Search
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    margin: "2em 0",
                  }}
                >
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={handleSearch}
                  />
                </Search>
              </Box>
            </Grid>
          </Grid>
          <LoadingCircle />
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
      <h1>
            {staffDetails["fullname"]}'s Profile
          </h1>
          {/* staff details */}
          <Grid container spacing={2}>
            <Grid item xs={4} sm={2}>
              <span style={{ fontWeight: "bold" }}>Staff ID</span>
            </Grid>
            <Grid item xs={8} sm={10}>
              <span>{staffDetails["staff_id"]}</span>
            </Grid>
            <Grid item xs={4} sm={2}>
              <span style={{ fontWeight: "bold" }}>Full Name</span>
            </Grid>
            <Grid item xs={8} sm={10}>
              <span>{staffDetails["fullname"]}</span>
            </Grid>
            <Grid item xs={4} sm={2}>
              <span style={{ fontWeight: "bold" }}>Email</span>
            </Grid>
            <Grid item xs={8} sm={10}>
              <span>{staffDetails["email"]}</span>
            </Grid>
          </Grid>
        {/* staff skills attained */}
        <Grid
          container
          spacing={2}
          direction="row"
          style={{ justifyContent: "space-between" }}
        >
          <Grid item>
            <p style={{ fontWeight: "bold", marginTop: "2.5em" }}>
              Skills Attained
            </p>
          </Grid>
          <Grid item>
            {/* <Searchbar /> */}
            <Box sx={{ flexGrow: 1 }}>
              <Search
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  margin: "2em 0",
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleSearch}
                />
              </Search>
            </Box>
          </Grid>
        </Grid>
        <CollapsibleTable
          rows={rows}
          // rows={DUMMYstaffCourseDetails}
          mainTableHeaders={["Skill Name", "Status"]}
          innerTableHeaders={["Course Taken", "Status"]}
        />
      </Container>
    </>
  );
};

export default ManagerStaffProfile;
