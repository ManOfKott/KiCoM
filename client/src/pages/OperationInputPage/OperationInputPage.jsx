import { Typography, Stack, Container, AppBar, Toolbar } from "@mui/material";
import React from "react";
import OperationSection from "./components/OperationSection";

const OperationInputPage = () => {
  return (
    <>
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
            justifyContent: "space-between",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <Container />
          <Container>
            <Typography variant="h3" textAlign="center" sx={{ color: "black" }}>
              Operation Input
            </Typography>
          </Container>
          <Container />
        </Toolbar>
      </AppBar>
      <Stack spacing={2} sx={{ paddingTop: "70px" }}>
        <OperationSection />
      </Stack>
    </>
  );
};

export default OperationInputPage;
