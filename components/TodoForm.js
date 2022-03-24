import { Button, TextField, Typography } from "@mui/material";
import { useContext, useRef, useEffect } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { TodoContext } from "../contexts/TodoContext";
import { AuthContext } from "../contexts/AuthContext";

const TodoForm = () => {
  const { showAlert, todo, setTodo } = useContext(TodoContext);
  const { currentUser } = useContext(AuthContext);
  const inputRef = useRef();

  useEffect(() => {
    const clickControl = (e) => {
      if (!inputRef.current.contains(e.target)) {
        console.log("clicked inside");
        setTodo({ title: "", description: "" });
      } else {
        console.log("clicked outside");
      }
    };
    document.addEventListener("mousedown", clickControl);
    return () => {
      document.removeEventListener("mousedown", clickControl);
    };
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    if (todo.title == "" || todo.description == "") {
      showAlert("error", "Please fill all fields");
      return;
    }
    if (todo?.hasOwnProperty("id")) {
      const ref = doc(db, "todos", todo.id);
      const newTodo = {
        title: todo.title,
        description: todo.description,
        updatedAt: serverTimestamp(),
      };
      await updateDoc(ref, newTodo);
      setTodo({ title: "", description: "" });
      showAlert("success", "Todo updated");
    } else {
      const ref = collection(db, "todos");
      const docRef = await addDoc(ref, {
        ...todo,
        email: currentUser.email,
        createdAt: serverTimestamp(),
      });
      console.log(docRef.id);
      setTodo({ title: "", description: "" });
      showAlert("success", `${docRef.id} created!`);
    }
  };

  return (
    <div ref={inputRef}>
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
        maxRows={4}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      ></TextField>
      {todo?.hasOwnProperty("id") ? (
        <Button
          variant="outlined"
          sx={{ mt: 3 }}
          color="warning"
          onClick={handleClick}
        >
          Update Todo
        </Button>
      ) : (
        <Button
          variant="outlined"
          sx={{ mt: 3 }}
          color="success"
          onClick={handleClick}
        >
          Add Todo
        </Button>
      )}
    </div>
  );
};
export default TodoForm;
