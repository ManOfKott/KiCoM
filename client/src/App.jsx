import { List, Typography, ListItem, Container } from "@mui/material";
import inputList from "./assets/mockInputList";
import CenteringLayout from "./layouts/CenteringLayout";
import { priorityDisplay } from "./assets/Priorities";

function App() {
  // const [inputList, setInputList] = useState([]);
  // useEffect(() => {
  //   //fetch operator inputs from backend
  // }, []);

  return (
    <>
      <Typography variant="h2" textAlign="center">
        Einsatz Input
      </Typography>
      <CenteringLayout>
        <Container maxWidth="25%">
          <List>
            {inputList.map((input) => (
              <ListItem key={input.id}>
                <Typography variant="h5">
                  {input.value} priority: {priorityDisplay[input.priority]}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Container>
      </CenteringLayout>
    </>
  );
}

export default App;
