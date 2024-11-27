import axios from "axios";

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

    categorizedInputs.all.sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return 1;
      }
      if (a.timestamp > b.timestamp) {
        return -1;
      }
      return 0;
    });

    if (input.is_new) {
      setTimeout(async () => {
        try {
          await axios.post("http://127.0.0.1:8000/api/mark-as-read/", {
            ids: [input.id],
          });
          console.log("Marked as read:");
        } catch (error) {
          console.error("Error:", error.response || error.message);
        }
      }, 5000);
    }
  });
  return categorizedInputs;
};
