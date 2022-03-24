import { ListItem, ListItemText, IconButton } from "@mui/material";
import moment from "moment";
import "moment/locale/tr";
import { Delete, MoreVert } from "@mui/icons-material";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { TodoContext } from "../contexts/TodoContext";
import { useContext } from "react";
import { useRouter } from "next/router";

const Todo = ({ todo }) => {
  const { id, title, description, createdAt } = todo;

  const { showAlert, setTodo } = useContext(TodoContext);

  const router = useRouter();

  const handleDelete = async (id, e) => {
    e.preventDefault();

    const ref = doc(db, "todos", id);
    await deleteDoc(ref);

    showAlert("warning", `${id}'s deleted!`);
  };

  const handleMore = (id, e) => {
    router.push(`/todos/${id}`);
  };

  return (
    <ListItem
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: "#fafafa" }}
      onClick={() => setTodo({ id, title, description, createdAt })}
      secondaryAction={
        <>
          <IconButton onClick={(e) => handleDelete(id, e)}>
            <Delete />
          </IconButton>
          <IconButton onClick={(e) => handleMore(id, e)}>
            <MoreVert />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={title}
        secondary={moment(createdAt).format("LLL")}
      />
    </ListItem>
  );
};
export default Todo;
