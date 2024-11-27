import React from "react";
import { Card, Stack, Typography, Avatar, Slide, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { troopColors } from "../../../assets/troops";
import dayjs from "dayjs";
import AnimatedTypography from "./AnimatedTypography";

const InputCard = ({ input, prioritized }) => {
  const borderColor = prioritized ? "#cd1c18" : "black";
  const bgcolor = "white";
  const borderSize = prioritized ? "5px" : "1px";

  const card = (
    <Card
      key={input.id}
      variant="outlined"
      sx={{
        marginTop: "0.5rem",
        border: "1px solid",
        borderRadius: "0.5rem",
        padding: "0.5rem",
        borderColor: borderColor,
        borderWidth: borderSize,
        bgcolor: bgcolor,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            sx={{
              width: 35,
              height: 35,
              border: "1px solid",
              borderColor: troopColors[input.sender],
              bgcolor: "white",
              color: troopColors[input.sender],
            }}
          >
            {input.sender}
          </Avatar>
          <ArrowForwardIosIcon />
          <Avatar
            sx={{
              width: 35,
              height: 35,
              border: "1px solid",
              borderColor: troopColors[input.reciever],
              bgcolor: "white",
              color: troopColors[input.reciever],
            }}
          >
            {input.reciever}
          </Avatar>
        </Stack>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <AnimatedTypography animate={input.is_new}>
            {input.summary_message}
          </AnimatedTypography>

          <Typography variant="subtitle1" color="grey">
            {dayjs(input.timestamp).format("HH:mm:ss")}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );

  if (input.is_new) {
    return (
      <Slide
        direction="right"
        in={true}
        timeout={500}
        mountOnEnter
        unmountOnExit
      >
        {card}
      </Slide>
    );
  } else {
    return card;
  }
};

export default InputCard;
