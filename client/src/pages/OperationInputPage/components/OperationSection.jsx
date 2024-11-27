import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PrioSection from "./PrioSection";
import inputList from "../../../assets/mockInputList";
import { categorizeInputs } from "../../../utils/InputCategorization";

const OperationSection = () => {
  // const [operator, setOperator] = useState("");
  const [categorizedInputs, setCategorizedInputs] = React.useState({
    prioritized: [],
    nonPrioritized: [],
  });

  React.useEffect(() => {
    setCategorizedInputs(categorizeInputs(inputList));
  }, []);

  return (
    <Box sx={{ padding: "40px" }}>
      <Grid container spacing={2}>
        <Grid item size={12}>
          <PrioSection prioritized inputs={categorizedInputs.prioritized} />
        </Grid>
        <Grid item size={12}>
          <PrioSection inputs={categorizedInputs.nonPrioritized} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OperationSection;
