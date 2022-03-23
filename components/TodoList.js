import {
  query,
  orderBy,
  collection,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const ref = collection(db, "todos");
    const q = query(ref, orderBy("createdAt", "desc"));

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
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
export default TodoList;
