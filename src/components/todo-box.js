import React, { useEffect, useState } from "react";
import { TodoForm } from "./todoForm";
import { Todo } from "./todo";
import {
  addTask,
  getTasksListener,
  updateTaskStatus,
  deleteTask as deleteTaskFb,
} from "../firebase/todoService";
import { SearchBar } from "./searchbar";
import { useAuth } from "../providers/authProvider";

/* Component representing the container for managing todo items */

export function TodoBox() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState("All");

  const user = useAuth();
  const uid = user && user.uid;

  /* add a new todo item */

  const addTodo = (task) => {
    addTask(user.uid, task);
  };

  /* toggle completion status of a todo item */
  const toggleComplete = (id) => {
    const task = todos.find((todo) => todo.id === id);
    if (task) {
      updateTaskStatus(id, !task.completed);
    }
  };

  /* delete a todo item */
  const deleteTask = (todo) => {
    var result = window.confirm("Are you sure you want to delete the task?");
    if (result) {
      deleteTaskFb(todo.id, todo.task);
      setTodos(todos.filter((t) => t.id !== todo.id));
    }
  };

  /* handle search term changes */
  const onSearch = (value) => {
    setSearchTerm(value);
  };

  const handleChangedMode = () => {
    const currentMode = mode === "completed" ? "all" : "completed";
    setMode(currentMode);
  };

  /* fetch and update todo items from Firebase based on user ID and search term */
  useEffect(() => {
    const unSubscribe = getTasksListener(uid, searchTerm, mode, (tasks) => {
      setTodos(tasks);
    });
    return unSubscribe;
  }, [searchTerm, uid, mode]);

  return (
    <div>
      <div className="todo-card">
        <h2>Get Things Done!</h2>
        <SearchBar onSearch={onSearch} />
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
          <Todo
            key={index}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))}
        <input type="checkbox" onClick={handleChangedMode}></input>
      </div>
    </div>
  );
}
