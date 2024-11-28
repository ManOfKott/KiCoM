import React from "react";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PrioSection from "./PrioSection";
import InputLogSection from "./InputLogSection";
import MarkedSection from "./MarkedSection";
// import inputList from "../../../assets/mockInputList";
import { categorizeInputs } from "../../../utils/InputCategorization";
import axios from "axios";
import AudioUpload from "./AudioUpload";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "@mui/material/styles";

const OperationSection = () => {
  const [inputList, setInputList] = React.useState([]);

  const theme = useTheme();
  const typographyTheme = theme.typography.body1;

  const [categorizedInputs, setCategorizedInputs] = React.useState({
    prioritized: [],
    all: [],
    marked: [],
    new: [],
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/summary/test-session-1/",
          {
            params: {},
          }
        );
        setInputList(response.data?.summaries || []);
      } catch (error) {
        console.error("Error:", error.response || error.message);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  React.useEffect(() => {
    const categorized = categorizeInputs(inputList);
    setCategorizedInputs(categorized);
  }, [inputList]);

  return (
    <>
      {/* <Box
        sx={{
          height: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "black",
            display: "flex",
            border: "3px solid grey",
            width: "50%",
            height: "40px",
            alignItems: "center",
            paddingLeft: "10px",
          }}
        >
          <TypeAnimation
            sequence={inputStreamList}
            style={{ ...typographyTheme, color: "white" }}
            speed={90}
          />
        </Box>
      </Box> */}
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid item size={6} sx={{ height: "100%" }}>
          <InputLogSection inputs={categorizedInputs.all} />
        </Grid>

        <Grid
          item
          container
          spacing={0}
          size={6}
          sx={{ height: "100%", blockSizing: "border-block" }}
        >
          <PrioSection inputs={categorizedInputs.prioritized} />

          {/* <Grid
            item
            size={12}
            sx={{ height: "50%", paddingTop: "10px", boxSizing: "border-box" }}
          >
            <MarkedSection inputs={categorizedInputs.marked} />
          </Grid> */}
        </Grid>
        {/* <Grid item size={12} sx={{ height: "100%" }}>
          <AudioUpload />
        </Grid> */}
      </Grid>
    </>
  );
};

export default OperationSection;
