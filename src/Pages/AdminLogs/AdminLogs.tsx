import { Paper } from "@mui/material";
import React from "react";

interface Props {}

const AdminLog = (props: Props) => {
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
        Admin log page
      </div>
    </Paper>
  );
};

export default AdminLog;
