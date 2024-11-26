import { List, Typography, ListItem } from "@mui/material";
import "./App.css";
import inputList from "./assets/mockInputList";

function App() {
  return (
    <>
      <Typography variant="h2">Einsatz Input</Typography>
      <List>
        {inputList.map((input) => (
          <ListItem key={input.id}>
            <Typography>{input.value}</Typography>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
