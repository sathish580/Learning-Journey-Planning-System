import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Chip from "@mui/material/Chip";

function Row(props) {
  const { row, headers } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {Object.entries(row).map(
          ([key, value]) =>
            key != "innerRows" && (
              <TableCell key={key} component="th" scope="row">
                {(key != "skill_status" && row[key]) ||
                  (row[key] == "Completed" && (
                    <Chip label={row[key]} color="success" />
                  )) || <Chip label={row[key]} color="warning" />}
              </TableCell>
            )
        )}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 3 }}>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#1976D2" }}>
                    {headers.map((headerNames) => (
                      <TableCell key={headerNames} style={{ color: "white" }}>
                        {headerNames}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row["innerRows"].map((oneCourse, index) => (
                    <TableRow key={index}>
                      {Object.entries(oneCourse).map(([key, value]) => (
                        <TableCell key={value} component="th" scope="row">
                          {oneCourse[key]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const mainHeaders = props.mainTableHeaders;
  const innerHeaders = props.innerTableHeaders;
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {mainHeaders.map((headerName) => (
                <TableCell key={headerName}>{headerName}</TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows["outerRows"].length != 0 &&
              Object.entries(props.rows["outerRows"]).map(
                ([key, value]) => (
                  <Row
                    key={key}
                    headers={innerHeaders}
                    row={props.rows["outerRows"][key]}
                  />
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      {props.rows["outerRows"].length == 0 && (
        <h4 style={{textAlign:"center"}}>Nothing here.</h4>
      )}
    </>
  );
}
