import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CategorySection from "./CategorySection";
import inputList from "../../../assets/mockInputList";
import { categorizeInputs } from "../../../utils/InputCategorization";
import { categoryDisplay } from "../../../assets/categories";

const OperationSection = () => {
  // const [operator, setOperator] = useState("");
  const [categorizedInputs, setCategorizedInputs] = React.useState({});

  React.useEffect(() => {
    setCategorizedInputs(categorizeInputs(inputList));
  }, []);

  return (
    <Box sx={{ padding: "40px" }}>
      <Grid container spacing={2}>
        {Object.entries(categorizedInputs).map(([category, inputs]) => (
          <Grid item size={{ xs: 12, md: 6 }}>
            <CategorySection
              key={category}
              category={categoryDisplay[category]}
              inputs={inputs}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OperationSection;
