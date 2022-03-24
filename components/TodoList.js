import {
  query,
  orderBy,
  collection,
  onSnapshot,
  doc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState, useContext } from "react";
import Todo from "./Todo";
import { Typography } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

const TodoList = () => {
  const { currentUser } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const ref = collection(db, "todos");
    const q = query(
      ref,
      where("email", "==", currentUser?.email),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setTodos(
        snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt?.toDate().getTime(),
        }))
      );
    });
    return unsub;
  }, []);

  return (
    <div>
      {todos.length === 0 ? (
        <Typography variant="h5" sx={{ mt: 5, fontWeight: "bold" }}>
          Here not todo!
        </Typography>
      ) : (
        <Typography
          variant="h3"
          sx={{ mt: 5, fontWeight: "bold" }}
          align="center"
        >
          Todo List Here!
        </Typography>
      )}

      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
export default TodoList;
