import React from "react";
import { Container } from "@mui/material";

const CenteringLayout = ({ children }) => {
  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {children}
    </Container>
  );
};

export default CenteringLayout;
