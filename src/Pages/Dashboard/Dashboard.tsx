import { Paper } from "@mui/material";
import React from "react";

interface Props {}

const dashboard = (props: Props) => {
  return (
    <Paper sx={{ padding: "0px", border: 2, borderColor: "#1976D2" }}>
      <div
        style={{
          padding: "10px 10px 500px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        Dashboard
      </div>
    </Paper>
  );
};

export default dashboard;
