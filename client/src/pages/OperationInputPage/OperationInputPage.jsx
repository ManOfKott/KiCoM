import { Typography, Stack, Container, Button } from "@mui/material";
import React from "react";
import OperationSection from "./components/OperationSection";

const OperationInputPage = () => {
  return (
    <Stack spacing={2}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "lightgrey",
          width: "100%",
        }}
      >
        <Typography variant="h4" textAlign="center">
          Logo
        </Typography>
        <Typography variant="h2" textAlign="center">
          Einsatz Input
        </Typography>
        <Button>Export als PDF</Button>
      </Container>

      <OperationSection />
    </Stack>
  );
};

export default OperationInputPage;
