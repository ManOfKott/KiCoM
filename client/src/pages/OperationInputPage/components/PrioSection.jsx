import {
  CardHeader,
  Card,
  CardContent,
  Stack,
  Typography,
  Avatar,
  Container,
  Slide,
} from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { troopColors } from "../../../assets/troops";
import ReportIcon from "@mui/icons-material/Report";

const PrioSection = ({ inputs, prioritized }) => {
  const borderColor = prioritized ? "#cd1c18" : "black";
  const bgcolor = prioritized ? "#ffa896" : "white";
  const containerRef = React.useRef(null);

  return (
    <Card
      variant="outlined"
      sx={{
        border: "1px solid grey",
        borderRadius: "0.5rem",
        borderColor,
        bgcolor,
      }}
      ref={containerRef}
    >
      <CardContent>
        <Container
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "content",
            padding: "5px",
          }}
        >
          {prioritized && (
            <ReportIcon sx={{ fontSize: "4rem", color: "#cd1c18" }} />
          )}
        </Container>

        <Stack spacing={1}>
          {inputs.map((input) => (
            <Slide direction="left" in={true} container={containerRef.current}>
              <Card
                key={input._id}
                variant="outlined"
                sx={{
                  border: "1px solid grey",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                  borderColor: borderColor,
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
                        bgcolor: troopColors[input.sender],
                      }}
                    >
                      {input.sender}
                    </Avatar>
                    <ArrowForwardIosIcon />
                    <Avatar
                      sx={{
                        width: 35,
                        height: 35,
                        bgcolor: troopColors[input.reciever],
                      }}
                    >
                      {input.reciever}
                    </Avatar>
                  </Stack>

                  <Stack spacing={1} direction="row" alignItems="center">
                    <Typography variant="h6">{input.value}</Typography>
                    <Typography variant="subtitle1">
                      {dayjs(input.timestamp).format("HH:mm:ss")}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Slide>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PrioSection;
