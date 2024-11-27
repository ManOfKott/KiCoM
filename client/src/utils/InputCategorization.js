export const categorizeInputs = (inputList) => {
  const categorizedInputs = { prioritized: [], nonPrioritized: [] };
  inputList.forEach((input) => {
    if (input.prioritized) {
      categorizedInputs.prioritized.push(input);
    } else {
      categorizedInputs.nonPrioritized.push(input);
    }
  });
  return categorizedInputs;
};
