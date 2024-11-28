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
import PDFExportComponent from "./components/PDFExportComponent";
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
          <Box
            sx={{
              display: "flex",
              boxSizing: "border-box",
              alignItems: "center",
              width: "500px",
            }}
          >
            <Typography
              display="flex"
              variant="h5"
              textAlign="center"
              fontFamily={"Roboto"}
              sx={{ color: "#9b1313" }}
            >
              KiCoM Box
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "500px",
            }}
          >
            <Typography
              display="flex"
              variant="h3"
              textAlign="center"
              sx={{ color: "black" }}
            >
              Einsatz Konsole
            </Typography>
          </Box>

          <Box
            sx={{
              width: "500px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <PDFExportComponent />
            <RunDemoComponent />
          </Box>
        </Toolbar>
      </AppBar>
      <OperationSection />
    </Box>
  );
};

export default OperationInputPage;
