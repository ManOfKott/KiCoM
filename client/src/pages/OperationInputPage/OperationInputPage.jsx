import {
  Typography,
  Stack,
  Container,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import React from "react";
import OperationSection from "./components/OperationSection";
import AudioUpload from "./components/AudioUpload";
import RunDemoComponent from "./components/RunDemoComponent";
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
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <Box></Box>
          <Typography
            display="flex"
            variant="h3"
            textAlign="center"
            sx={{ color: "black" }}
          >
            Operation Input
          </Typography>
          <Box sx={{ width: "250px" }}>
            <RunDemoComponent />
          </Box>
        </Toolbar>
      </AppBar>
      <OperationSection />
    </Box>
  );
};

export default OperationInputPage;
