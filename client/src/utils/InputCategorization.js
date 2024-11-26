export const categorizeInputs = (inputList) => {
  const categorizedInputs = {};
  inputList.forEach((input) => {
    if (!categorizedInputs[input.category]) {
      categorizedInputs[input.category] = [];
    }
    categorizedInputs[input.category].push(input);
  });
  return categorizedInputs;
};
