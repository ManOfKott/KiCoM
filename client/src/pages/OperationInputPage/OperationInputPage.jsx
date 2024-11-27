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
import { Box } from "@mui/system";

const OperationInputPage = () => {
  const [demoButtonText, setDemoButtonText] = React.useState("Run Demo");

  const runDemo = () => {
    console.log("Demo is running");
    setDemoButtonText("Demo is running...");
    setTimeout(() => {
      setDemoButtonText("Run Demo");
    }, 5000);
  };

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
            <Button
              variant="outlined"
              sx={{
                color: "#cd1c18",
                borderColor: "#cd1c18",
                height: "50px",
                fontSize: "1rem",
                width: "100%",
              }}
              onClick={runDemo}
            >
              {demoButtonText}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <OperationSection />
    </Box>
  );
};

export default OperationInputPage;
