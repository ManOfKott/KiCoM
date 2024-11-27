import { Typography, useTheme } from "@mui/material";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const AnimatedTypography = ({ animate, children }) => {
  const theme = useTheme();
  const typographyTheme = theme.typography.body1;

  if (animate) {
    return (
      <TypeAnimation sequence={[children]} speed={80} style={typographyTheme} />
    );
  } else {
    return <Typography>{children}</Typography>;
  }
};

export default AnimatedTypography;
