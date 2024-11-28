import { Card, CardContent, Stack, Container } from "@mui/material";
import React from "react";
import ReportIcon from "@mui/icons-material/Report";
import InputCard from "./InputCard";

const InputLogSection = ({ inputs }) => {
  const borderColor = "#000000";
  const bgcolor = "#ffffff";

  return (
    <Card
      variant="outlined"
      sx={{
        border: "4px solid grey",
        borderRadius: "0.5rem",
        borderColor,
        bgcolor,
        height: "100%",
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          boxSizing: "border-box",
          overflow: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none", // For Firefox
          "&::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, and Edge
          },
        }}
      >
        {inputs.map((input, index) => (
          <InputCard
            key={index}
            input={input}
            prioritized={input.prioritized}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default InputLogSection;
