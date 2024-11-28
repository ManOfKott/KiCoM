import React from "react";
import { Button } from "@mui/material";

const PDFExportComponent = () => {
  return (
    <Button
      sx={{
        color: "#cd1c18",
        borderColor: "#cd1c18",
        height: "50px",
        fontSize: "1rem",
        width: "40%",
      }}
      variant="outlined"
    >
      Zu PDF
    </Button>
  );
};

export default PDFExportComponent;
