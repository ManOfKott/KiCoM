import React from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PrioSection from "./PrioSection";
import InputLogSection from "./InputLogSection";
import MarkedSection from "./MarkedSection";
import inputList from "../../../assets/mockInputList";
import { categorizeInputs } from "../../../utils/InputCategorization";

const OperationSection = () => {
  // const [operator, setOperator] = useState("");
  const [categorizedInputs, setCategorizedInputs] = React.useState({
    prioritized: [],
    all: [],
    marked: [],
  });

  React.useEffect(() => {
    setCategorizedInputs(categorizeInputs(inputList));
  }, []);

  return (
    <Grid container spacing={2} sx={{ height: "100%" }}>
      <Grid item size={6} sx={{ height: "100%" }}>
        <InputLogSection inputs={categorizedInputs.all} />
      </Grid>

      <Grid item container spacing={0} size={6} sx={{ height: "100%" }}>
        <Grid item size={12} sx={{ height: "50%", boxSizing: "border-box" }}>
          <PrioSection inputs={categorizedInputs.prioritized} />
        </Grid>

        <Grid
          item
          size={12}
          sx={{ height: "50%", paddingTop: "10px", boxSizing: "border-box" }}
        >
          <MarkedSection inputs={categorizedInputs.marked} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OperationSection;
