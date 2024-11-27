import { Typography, Stack, Container, AppBar, Toolbar } from "@mui/material";
import React from "react";
import OperationSection from "./components/OperationSection";
import AudioUpload from "./components/AudioUpload";
import { Box } from "@mui/system";

const OperationInputPage = () => {
  return (
    <Box sx={{ height: "95vh", padding: "70px", boxSizing: "border-box" }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#ffa896",
          height: "70px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          borderBottom: "2px solid black",
        }}
        variant="outlined"
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <Typography
            display="block"
            variant="h3"
            textAlign="center"
            sx={{ color: "black" }}
          >
            Operation Input
          </Typography>
        </Toolbar>
      </AppBar>
      <OperationSection />
    </Box>
  );
};

export default OperationInputPage;
