import React, { useEffect, useState } from "react";
import { TodoForm } from "./todoForm";
import { Todo } from "./todo";
import {
  addTask,
  getTasksListener,
  deleteTask as deleteTaskFb,
} from "../firebase/todoService";
import { SearchBar } from "./searchbar";
import { useAuth } from "../providers/authProvider";

/* Component representing the container for managing todo items */

export function TodoBox() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const user = useAuth();
  const uid = user && user.uid;

  /* add a new todo item */

  const addTodo = (task) => {
    addTask(user.uid, task);
  };

  /* toggle completion status of a todo item */
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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

  /* fetch and update todo items from Firebase based on user ID and search term */
  useEffect(() => {
    const unSubscribe = getTasksListener(uid, searchTerm, (tasks) => {
      setTodos(tasks);
    });
    return unSubscribe;
  }, [searchTerm, uid]);

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
      </div>
    </div>
  );
}
