import React from "react";
import Table from "../../../Components/Table";
import { Container } from "@mui/material";
import axios from "axios";
import LoadingCircle from "../../../Components/LoadingCircle";

export const HRSkills = () => {
  const [rows, setRows] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Using fetch to fetch the api from
    var url = "http://localhost:5200/Skill";
    axios
      .get(url)
      .then((response) => {
        // setRows(staffList);
        console.log(response.data);
        formatData(Object.values(response.data));
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }, []);

  function formatData(data) {
    setRows(data);
    setLoading(false);
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
        <Table
          tableName='Skills Repository'
          actionBtns={[
            ["Assign / Unassign", "Skill_ID"],
            ["Delete / Edit", "Skill_ID", "Edit"],
          ]}
          headers={["Skill ID", "Skill Name", "Status"]}
          rows={rows}
          tableButton={["Create Skill", "/hr/skills/create"]}
        />
      </Container>
    </>
  );
};
