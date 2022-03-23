import { ListItem, ListItemText } from "@mui/material";
import moment from "moment";
import "moment/locale/tr";

const Todo = ({ todo }) => {
  const { title, description, createdAt } = todo;
  return (
    <ListItem
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: "#fafafa" }}
    >
      <ListItemText
        primary={title}
        secondary={moment(createdAt).format("LLL")}
      />
    </ListItem>
  );
};
export default Todo;
