export const categorizeInputs = (inputList) => {
  const categorizedInputs = { prioritized: [], all: [], marked: [] };
  inputList.forEach((input) => {
    if (input.prioritized) {
      categorizedInputs.prioritized.push(input);
    }
    if (input.marked) {
      categorizedInputs.marked.push(input);
    }
    categorizedInputs.all.push(input);
  });
  return categorizedInputs;
};
