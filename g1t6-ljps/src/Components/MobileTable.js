import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import FilterIcon from "@mui/icons-material/FilterListOutlined";
import { IconButton, Box, Typography, Container } from "@mui/material";
import FilterList from "./FilterList";
import Dropdown from "./Dropdown";
import Searchbar from "./Searchbar";
import Popup from "./Popup";

export default function BasicTable(props) {
  const {
    tableName,
    actionBtns,
    headers,
    rows,
    tableButton,
    noButtonKey,
    buttonPaths,
    onAddCourse,
    onRemoveCourse,
    routeToCourse,
  } = props;
  const actionButtons = actionBtns ? actionBtns : [];

  // Filter table by column
  const [filterRows, setFilterRows] = React.useState(rows.slice(0, 5));

  React.useEffect(() => {
    setFilterRows(rows.slice(0, 5));
  }, [rows]);

  // Pagination functions
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleFilter = (columnName, columnData) => {
    let cleanRows = [];
    const headerIndex = headers.indexOf(columnName);
    const key = Object.keys(rows[0])[headerIndex];

    for (let row of rows) {
      console.log(row[key]);
      if (columnData.includes(row[key])) {
        cleanRows.push(row);
      }
    }

    setFilterRows(cleanRows);
    // setRowsPerPage(filterRows.length);
    setPage(0);
  };

  useEffect(() => {});

  const handleClearFilter = () => {
    setFilterRows(rows);
    setRowsPerPage(rows.length);
    setPage(0);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm == "") {
      setFilterRows(rows.slice(0, 5));
      setRowsPerPage(5);
      setPage(0);
    } else {
      let cleanSearchRows = [];

      for (let row of rows) {
        for (let value of Object.values(row)) {
          if (String(value).toLowerCase().includes(searchTerm.toLowerCase())) {
            cleanSearchRows.push(row);
            break;
          }
        }
      }
      setFilterRows(cleanSearchRows);
      // setRowsPerPage(filterRows.length);
      setPage(0);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const lowerLimit = newPage * rowsPerPage;
    const upperLimit = lowerLimit + rowsPerPage;
    setFilterRows(rows.slice(lowerLimit, upperLimit));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setFilterRows(rows.slice(0, parseInt(event.target.value, 10)));
  };

  return (
    <>
      <Container disableGutters>
        <h2>{tableName}</h2>
        <Box>
          <Searchbar onSearch={handleSearch} />
          {tableButton && (
            <Link
              to={tableButton[1]}
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                sx={{ my: 2, backgroundColor: "#3f51b5" }}
              >
                {typeof tableButton == "string" ? tableButton : tableButton[0]}
              </Button>
            </Link>
          )}
        </Box>
      </Container>
      {/* Table for screen size > md */}
      {/* <TableHead>
            <TableRow> */}
      {/* Render the headers, if there is an action button leave the header name empty */}
      {/* {headers.map((headerName, index) => (
                <TableCell key={index}>
                  <Box
                    sx={{ m: 0, p: 0, display: "flex", alignItems: "center" }}
                  >
                    <b>{headerName}</b>
                    <Dropdown
                      headers={headers}
                      rows={rows}
                      header={headerName}
                      onFilter={handleFilter}
                      onClearFilter={handleClearFilter}
                    />
                  </Box>
                </TableCell>
              ))}
              {actionButtons.length !== 0 && (
                <TableCell>
                <b>Actions</b>
                </TableCell>
              )} */}
      {/* </TableRow>
          </TableHead> */}
      {filterRows.map((rowItems, rowIndex) => (
        <TableContainer component={Paper} sx={{ marginBottom: "1em" }}>
          <Table aria-label="simple table">
            <TableBody>
              {Object.entries(rowItems).map(([cellKey, cellItem], index) => (
                <>
                  <TableRow
                    key={rowIndex}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* Render cell values */}
                    <TableCell
                      component="th"
                      scope="index"
                      key={index}
                      sx={{ width: "30%", fontWeight: "bold" }}
                    >
                      {headers[index]}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="index"
                      key={cellKey}
                      sx={{ width: "50%" }}
                    >
                      {cellItem}
                    </TableCell>
                  </TableRow>
                </>
              ))}
              {/* Render the action buttons */}
              {!noButtonKey && !routeToCourse && actionButtons.length !== 0 && (
                <TableCell component="th" scope="index" colSpan={2}>
                  {actionButtons.map((oneBtn, index) => (
                    <>
                      {oneBtn[0] === "Delete" && (
                        <Popup
                          buttonText="Delete"
                          header="Confirm deletion"
                          body={
                            'You are soft deleting the skill "' +
                            Object.values(rowItems)[1] +
                            '". Are you sure you want to delete it?'
                          }
                          onConfirm = {oneBtn[2] + "/" + String(rowItems[oneBtn[1]])}
                        />
                      )}
                      {oneBtn[0] !== "Delete" && (
                        <Link
                          to={
                            oneBtn[2]
                              ? oneBtn[2] + rowItems[oneBtn[1]]
                              : String(rowItems[oneBtn[1]])
                          }
                          style={{
                            textDecoration: "none",
                            marginLeft: index === 0 ? 0 : 10,
                          }}
                          state={rowItems}
                          key={index}
                        >
                          <Button fullWidth variant="contained">
                            {oneBtn[0]}
                          </Button>
                        </Link>
                      )}
                    </>
                  ))}
                </TableCell>
              )}
              {!routeToCourse && noButtonKey && actionButtons.length !== 0 && (
                <TableCell component="th" scope="index">
                  {actionButtons.map((oneBtn, index) => (
                    <>
                      {oneBtn[0] === "Delete" && <Popup />}
                      {oneBtn[0] === "Add Course" && (
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => onAddCourse(rowItems)}
                        >
                          {oneBtn[0]}
                        </Button>
                      )}
                      {oneBtn[0] === "Remove Course" && (
                        <Button
                          fullWidth
                          variant="contained"
                          style={{ backgroundColor: "red" }}
                          onClick={() => onRemoveCourse(rowItems)}
                        >
                          {oneBtn[0]}
                        </Button>
                      )}
                      {oneBtn[0] !== "Delete" &&
                        oneBtn[0] !== "Add Course" &&
                        oneBtn[0] !== "Remove Course" && (
                          <Link
                            to={{
                              pathname: buttonPaths[index],
                              hash: rowItems[Object.keys(rowItems)[0]].replace(
                                /\s+/g,
                                "_"
                              ),
                            }}
                            style={{ textDecoration: "none" }}
                            key={index}
                          >
                            <Button fullWidth variant="contained">
                              {oneBtn[0]}
                            </Button>
                          </Link>
                        )}
                    </>
                  ))}
                </TableCell>
              )}

              {routeToCourse && !noButtonKey && actionButtons.length !== 0 && (
                <TableCell component="th" scope="index">
                  {actionButtons.map((oneBtn, index) => (
                    <>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => routeToCourse(rowItems)}
                      >
                        {oneBtn[0]}
                      </Button>
                    </>
                  ))}
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ))}

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {props.rows.length == 0 && (
        <h4 style={{ textAlign: "center" }}>Nothing here.</h4>
      )}
    </>
  );
}
