// this page renders all the components that need to be displayed in the Manager Homepage
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";
// import Searchbar from "../../Components/Searchbar";
import Grid from "@mui/material/Grid";
import CollapsibleTable from "../../../Components/CollapsibleTable";
import Table from "../../../Components/Table";
import { AppContext } from "../../context";

import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import LoadingCircle from "../../../Components/LoadingCircle";

const staffCourseDetails = {
  staffId: "1234567",
  outerRows: [
    {
      skillId: "s1",
      skillName: "Time Management",
      skillType: "Sales",
      status: "In progress",
      innerRows: [
        {
          courseName: "Managing meeting schedules",
          status: "In progress",
        },
      ],
    },
    {
      skillId: "s2",
      skillName: "Discipline",
      skillType: "Discipline",
      status: "Achieved",
      innerRows: [
        {
          courseName: "Losing motivation? 10 steps to overcome this",
          status: "Completed",
        },
      ],
    },
    {
      skillId: "s3",
      skillName: "Negotiating Strategically",
      skillType: "Communication",
      status: "In Progress",
      innerRows: [
        {
          courseName: "Negotiation 101",
          status: "In Progress",
        },
      ],
    },
    {
      skillId: "s4",
      skillName: "Prioritising top customers",
      skillType: "Sales",
      status: "In Progress",
      coursesTaken: [
        {
          courseName: "Clients you should place your focus on",
          status: "In Progress",
        },
      ],
    },
    {
      skillId: "s5",
      skillName: "Writing good proposals and quotations",
      skillType: "Sales",
      status: "In Progress",
      coursesTaken: [
        {
          courseName: "Important sales documents",
          status: "In Progress",
        },
      ],
    },
  ],
};

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

const LJSkills = () => {
  const [rows, setRows] = useState(staffCourseDetails);
  const data = useContext(AppContext);
  console.log("LJProgress: ", data);
  const [skillsData, setSkillsData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  window.sessionStorage.setItem("LJProgress", JSON.stringify(data));
  // const [uncompletedCourses, setUncompletedCourses] = useState(
  //   data.mySkillData.uncompleted_courses
  // );

  useEffect(() => {
    var formattedData = [];
    var skillsList = [];
    // get the registered skills at the top of the list
    for (const oneRegisteredSkill of data.mySkillData.registered_skills) {
      var skillObj = {
        Skill_ID: oneRegisteredSkill[2],
        Skill_Name: oneRegisteredSkill[0],
        EnrollmentStatus: "Enrolled",
        Status: oneRegisteredSkill[1],

      };
      // dont display the same skill again if user has registered for >1 course for one skill
      if (skillsList.indexOf(oneRegisteredSkill[2]) == -1) {
        skillsList.push(oneRegisteredSkill[2])
        formattedData.push(skillObj);
      }
    }

    // then get the unregistered skills
    for (const oneUnregisteredSkill of data.mySkillData.unregistered_skills) {
      formattedData.push({
        Skill_ID: oneUnregisteredSkill[1],
        Skill_Name: oneUnregisteredSkill[0],
        EnrollmentStatus: "None",
        Status: "None",
      });
    }
    setRows(formattedData);
    setLoading(false);

    console.log("LJSkills formattedData", formattedData);
  }, []);

  function getFilteredRows(searched) {
    var filteredRows = {
      outerRows: [],
    };
    rows["outerRows"].forEach((oneCourseDetail) => {
      if (oneCourseDetail["skillId"].toLowerCase().includes(searched)) {
        filteredRows["outerRows"].push(oneCourseDetail);
      } else if (
        oneCourseDetail["skillName"].toLowerCase().includes(searched)
      ) {
        filteredRows["outerRows"].push(oneCourseDetail);
      } else if (
        oneCourseDetail["skillType"].toLowerCase().includes(searched)
      ) {
        filteredRows["outerRows"].push(oneCourseDetail);
      }
    });
    return filteredRows;
  }

  function handleSearch(e) {
    console.log(e.target.value);
    if (e.target.value == "") {
      setRows(staffCourseDetails);
    } else {
      setRows(getFilteredRows(e.target.value.toLowerCase()));
    }
  }

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }

    return false;
  }

  if (isLoading) {
    return (
      <>
        <Container>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Search
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                margin: "2em 0",
                width: "20%",
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
          <LoadingCircle />
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        {/* staff skills attained */}
        {/* <Grid container spacing={2}> */}

        {/* <Searchbar /> */}
        {/* <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Search
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              margin: "2em 0",
              width: "20%",
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
        </Box> */}

        {/* <CollapsibleTable
          rows={rows}
          mainTableHeaders={["Skill ID", "Skill Name", "Skill Type", "Status"]}
          innerTableHeaders={["Course Taken", "Status"]}
        /> */}
        <Table
          tableName=""
          headers={["Skill ID", "Skill Name", "Courses enrolled?", "Skill Status"]}
          rows={rows}
          actionBtns={[
            ["Edit Courses", "Skill_ID", "/learner/"], //not sure what to put as the url
          ]}
        />
      </Container>
    </>
  );
};

export default LJSkills;
