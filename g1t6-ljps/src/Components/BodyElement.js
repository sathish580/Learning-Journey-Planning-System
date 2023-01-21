import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import LoadingCircle from "../Components/LoadingCircle";
import { Container } from "@mui/material";

import Staffhome from "../Pages/staff/staffhome";
import ManagerHome from "../Pages/manager/ManagerHome";
import ManagerStaffProfile from "../Pages/manager/ManagerStaffProfile";
import IndivLearningJourney from "../Pages/staff/Learning Journey/IndivLearningJourney";
import { Roles } from "../Pages/staff/Roles/Roles";
import { IndivRole } from "../Pages/staff/Roles/IndivRole";
import { Courses } from "../Pages/staff/Courses/Courses";
import { HRHome } from "../Pages/HR/HRHome";
import { HRSkills } from "../Pages/HR/Skills/HRSkills";
import { HRCreateSkill } from "../Pages/HR/Skills/HRCreateSkill";
import { NewRole } from "../Pages/staff/New LJ/NewRole";
import { NewLJ } from "../Pages/staff/New LJ/NewLJ";
import { NewLJSkills } from "../Pages/staff/New LJ/NewLJSkills";
import { NewLJCourses } from "../Pages/staff/New LJ/NewLJCourses";
import { LJCourses } from "../Pages/staff/Learning Journey/LJCourses";

import { AssignSkill } from "../Pages/HR/Skills/AssignSkill";
import { EditSkill } from "../Pages/HR/Skills/EditSkill";

import { AllSkillsData } from "../Pages/staff/AllSkillsData";
import { RolesData } from "../Pages/staff/RolesData";
import { HRRoles } from "../Pages/HR/HRRoles";
import { HRCreateRole } from "../Pages/HR/HRCreateRole";
import { IndivCourse } from "../Pages/staff/Courses/IndivCourse";
import { EditRoles } from '../Pages/HR/EditRoles';

const BodyElement = (props) => {
  const loc = useLocation().pathname;
  const managerStaffPageRegex = /\/manager\/(\d+)/g;

  const [isLoading, setLoading] = useState(true);

  const [indivLJ, setIndivLJ] = useState(false);
  const [LJCourse, setLJCourse] = useState(false);
  const [indivRole, setIndivRole] = useState(false);
  const [indivCourse, setIndivCourse] = useState(false);
  const [newLJ, setNewLJ] = useState(false);
  const [newLJCourse, setNewLJCourse] = useState(false);
  const [assignSkill, setAssignSkill] = useState(false);
  const [editSkill, setEditSkill] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [allRoleIDs, setAllRoleIDs] = useState([]);
  const [allSkillIDs, setAllSkillsIDs] = useState([]);
  // const allRoleIDs = RolesData.map((value) => value.Job_Role_ID);
  // const allSkillIDs = AllSkillsData.map((value) => value.Skill_ID);

  // var allRoleIDs = [];
  // var allSkillIDs = [];

  // set userID and userName in sessionStorage
  if (loc.indexOf("learner") !== -1) {
    window.sessionStorage.setItem("userID", 130002);
    window.sessionStorage.setItem("userName", "Jack");
    // window.sessionStorage.setItem("userID", 140004);
    // window.sessionStorage.setItem("userName", "Mary");
  } else if (loc.indexOf("manager") !== -1) {
    window.sessionStorage.setItem("userID", 140001);
    window.sessionStorage.setItem("userName", "Derek");
  } else if (loc.indexOf("hr") !== -1) {
    window.sessionStorage.setItem("userID", 160008);
    window.sessionStorage.setItem("userName", "Sally");
  }

  const isRoleID = (id) => {
    // console.log(allRoleIDs)
    var roleIDList = window.sessionStorage.getItem("allRoleList");
    // need to parseInt because id passed in is string type whereas allRoleIDs contains integers
    return roleIDList.indexOf(parseInt(id)) !== -1;
  };

  const isSkillID = (id) => {
    var skillIDList = window.sessionStorage.getItem("allSkillsList");
    // need to parseInt because id passed in is string type whereas allSkillIDs contains integers
    return skillIDList.indexOf(parseInt(id)) !== -1;
  };

  // get all role and skill ids so that we can check where to route the user to
  useEffect(() => {
    // need to set all these to false in the event the user goes to the prev page
    // for existing LJs
    setIndivLJ(false);
    setLJCourse(false);
    setIndivRole(false);
    setIndivCourse(false);
    // for new LJs
    setNewLJ(false);
    setNewLJCourse(false);
    setAssignSkill(false);
    setEditSkill(false);
    setEditRole(false)

    if (loc.indexOf("/learner") !== -1 || loc.indexOf("/hr") !== -1) {
      // Using fetch to fetch the api from
      var url = "http://localhost:5003/viewAllRoles";
      axios
        .get(url)
        .then((response) => {
          const allRoles = response.data;
          var allRoleList = [];
          for (const jobRoleNameKey in allRoles) {
            // console.log(allRoles[jobRoleNameKey].Job_Role_ID)
            allRoleList.push(allRoles[jobRoleNameKey].Job_Role_ID);
          }
          // console.log(allRoleList);
          setAllRoleIDs(allRoleList);
          window.sessionStorage.setItem("allRoleList", allRoleList);
        })
        .then((response) => {
          url = "http://localhost:5200/Skill";
          axios.get(url).then((response) => {
            const allSkills = response.data;
            var allSkillsList = [];
            for (const skillIDKey in allSkills) {
              // console.log(allRoles[jobRoleNameKey].Job_Role_ID)
              allSkillsList.push(skillIDKey);
            }
            setAllSkillsIDs(allSkillsList);
            window.sessionStorage.setItem("allSkillsList", allSkillsList);
          });
        })
        .then((response) => {
          // if (loc.slice(0, 9) === "/learner/") {
          if (loc.indexOf("/learner/") !== -1) {
            console.log(loc.indexOf("courses/") !== -1);
            const tail = loc.slice(9, loc.length);
            // console.log("tail", tail);

            if (isRoleID(tail)) {
              // url: /learner/:Role_ID
              setIndivLJ(true);
              console.log("indivLJ");
            } else if (isSkillID(tail)) {
              console.log("existing lj, edit course");
              setLJCourse(true);
            } else if (loc.indexOf("roles") !== -1) {
              // url: /learner/roles/:Role_ID
              const tail2 = loc.slice(15, loc.length);
              // const tail2 = loc.split("/")[loc.split("/").length - 1]
              // console.log("tail2", tail2);

              if (isRoleID(tail2)) {
                setIndivRole(true);
                console.log("indivRole");
              }
            } else if (loc.indexOf("new_lj") !== -1) {
              // url: /learner/new_lj/:Role_ID
              // const tail3 = loc.slice(16, loc.length);
              const tail3 = loc.split("/")[loc.split("/").length - 1];
              // console.log("tail3", tail3);

              // check the last part of the pathname
              // if its a roleID, direct user to newLJSkills
              // otherwise, direct user to newLJCourse
              if (isRoleID(tail3)) {
                setNewLJ(true);
                console.log("newLJSkills");
              } else if (isSkillID(tail3)) {
                setNewLJCourse(true);
                console.log("newLJCourse");
              }
            } else if (loc.indexOf("courses/") !== -1) {
              console.log("indiv course")
              setIndivCourse(true)
            }
          }

          if (loc.slice(0, 11) === "/hr/skills/") {
            const tail4 = loc.slice(11, loc.length);

            if (isSkillID(tail4)) {
              setAssignSkill(true);
            } else if (tail4.startsWith("Edit")) {
              const delSkillID = tail4.slice(
                tail4.lastIndexOf("Edit") + 4,
                tail4.length
              );
              if (isSkillID(delSkillID)) {
                setEditSkill(true);
              }
            }
          }

          if (loc.slice(0, 14) === "/hr/roles/Edit") {
            const tail5 = loc.slice(14, loc.length);

            if (isRoleID(tail5)) {
              setEditRole(true)
            }
          }
        })
        .then((response) => {
          setLoading(false);
          console.log(
            "indivLJ: " +
              indivLJ +
              "\nLJCourse: " + 
              LJCourse + 
              "\nindivCourse: " +
              indivCourse +
              "\nnewLJ: " +
              newLJ +
              "\nnewLJCourse: " +
              newLJCourse
          );
        })
        .catch((error) => {
          console.log("Error:", error.message);
        });
    } else {
      setLoading(false);
    }
  }, [loc]);

  // indivLJ = true;

  if (isLoading) {
    return (
      <Container>
        <LoadingCircle />
      </Container>
    );
  }

  // Checks path, renders relevant component
  return (
    <>
      {/* Learner pages */}
      {loc == "/learner" && <Staffhome />}

      {indivLJ && <IndivLearningJourney />}

      {LJCourse && <LJCourses />}

      {loc == "/learner/roles" && <Roles />}

      {/* {indivRole && <IndivRole />} */}

      {loc == "/learner/courses" && <Courses />}

      {indivCourse && <IndivCourse/>}

      {loc == "/learner/new_lj" && <NewRole />}

      {newLJ && <NewLJSkills />}

      {newLJCourse && <NewLJCourses />}

      {/* Manager pages */}

      {loc == "/manager" && <ManagerHome />}

      {loc.match(managerStaffPageRegex) && <ManagerStaffProfile />}

      {/* HR pages */}

      {loc == "/hr" && <HRHome />}

      {loc == "/hr/skills" && <HRSkills />}

      {loc == "/hr/skills/create" && <HRCreateSkill />}

      {assignSkill && <AssignSkill />}

      {editSkill && <EditSkill />}

      {loc == "/hr/roles" && (
        <>
          <HRRoles />
        </>
      )}

      {loc == "/hr/roles/create" && (
        <>
          <HRCreateRole />
        </>
      )}

      {editRole && <EditRoles />}
    </>
  );
};

export default BodyElement;
