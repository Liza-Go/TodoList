import React, { useEffect, useState } from "react";
import { TodoForm } from "./todoForm";
import { Todo } from "./todo";
import {
  addTask,
  getTasksListener,
  deleteTask as deleteTaskFb,
} from "../firebase/todoService";
import { SearchBar } from "./searchbar";

export function TodoBox() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addTodo = (task) => {
    addTask(task);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (todo) => {
    console.log(todo.id);
    var result = window.confirm("Are you sure you want to delete the task?");
    if (result) {
      deleteTaskFb(todo.id, todo.task);
      setTodos(todos.filter((t) => t.id !== todo.id));
    }
  };

  const onSearch = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const unSubscribe = getTasksListener(searchTerm, (tasks) => {
      setTodos(tasks);
    });
    return unSubscribe;
  }, [searchTerm]);

  return (
    <div>
      <div className="todo-card">
        <h2>Get Things Done!</h2>
        <SearchBar onSearch={onSearch} />
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
