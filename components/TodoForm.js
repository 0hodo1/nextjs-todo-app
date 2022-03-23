import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const TodoForm = () => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();

    if (todo.title == "" || todo.description == "") {
      return;
    }
    const ref = collection(db, "todos");
    const docRef = await addDoc(ref, { ...todo, createdAt: serverTimestamp() });
    console.log(docRef.id);
    setTodo({ title: "", description: "" });
    alert(`${docRef.id} created!`);
  };

  return (
    <div>
      <Typography
        variant="h5"
        color="darkgrey"
        sx={{ mt: 3, fontWeight: "bold" }}
        gutterBottom
      >
        Add New Todo
      </Typography>
      <TextField
        value={todo.title}
        fullWidth
        label="Title"
        margin="normal"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      ></TextField>
      <TextField
        value={todo.description}
        fullWidth
        label="Description"
        margin="normal"
        multiline
        maxRows
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      ></TextField>
      <Button
        variant="outlined"
        sx={{ mt: 3 }}
        color="success"
        onClick={handleClick}
      >
        Add Todo
      </Button>
    </div>
  );
};
export default TodoForm;
