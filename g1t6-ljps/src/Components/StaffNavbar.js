import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  Paper,
  CssBaseline,
  LinearProgress,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";

import BodyElement from "./BodyElement.js";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RocketIcon from "@mui/icons-material/Rocket";
import PeopleIcon from "@mui/icons-material/People";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";

import { useLocation, Link } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function StaffNavbar(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const loc = useLocation().pathname;
  var userName = window.sessionStorage.getItem("userName")
  var sideNavItems = loc.includes("manager")
    ? [[userName, "My Learning Journeys", "Roles", "My Team(s)"]]
    : loc.includes("hr")
    ? [
        [userName, "My Learning Journeys", "Roles"],
        [
          "Course Repository",
          "Skills Repository",
          "Role Repository",
        ],
      ]
    : [[userName, "My Learning Journeys", "Roles", "Courses"]];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{
          backgroundColor: loc.includes("manager")
            ? "#9C27B0"
            : loc.includes("learner")
            ? "#3f51b5"
            : "#ED6C02",
          color: "white",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Learning Journey Planning System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideNavItems[0].map((text, index) => (
            <Link
              style={{
                textDecoration: "initial",
                color: "rgba(0, 0, 0, 0.87)",
              }}
              to={
                text == "My Learning Journeys"
                  ? "/learner"
                  : text == "Roles"
                  ? "/learner/roles"
                  : text == "Courses"
                  ? "/learner/courses"
                  : text == "My Team(s)"
                  ? "/manager"
                  : "#"
              }
            >
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index == 0 ? (
                      <AccountCircleIcon />
                    ) : text == "My Learning Journeys" ? (
                      <RocketIcon />
                    ) : text == "Roles" ? (
                      <PeopleIcon />
                    ) : text == "Courses" ? (
                      <SchoolIcon />
                    ) : (
                      <Diversity3Icon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        {loc.includes("hr") && (
          <>
            <List>
              {sideNavItems[1].map((text, index) => (
                <Link
                  style={{
                    textDecoration: "initial",
                    color: "rgba(0, 0, 0, 0.87)",
                  }}
                  to={
                    text == "Course Repository"
                      ? "/hr"
                      : text == "Skills Repository"
                      ? "/hr/skills"
                      : text == "Role Repository"
                      ? "/hr/roles"
                      : text == "Staff Directory" 
                      ? "/hr/staff" 
                      : "#"
                  }
                >
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {text == "Staff Directory" ? (
                          <ApartmentIcon />
                        ) : text == "Skills Repository" ? (
                          <WorkIcon />
                        ) : text == "Course Repository" ? (
                          <SchoolIcon />
                        ) : (
                          <PeopleIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
          </>
        )}
        <List>
          {["Logout"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton to="/">
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <BodyElement />
      </Main>
    </Box>
  );
}
