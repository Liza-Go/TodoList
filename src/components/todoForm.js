import React, { useState } from "react";

export function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  /* handle input value change */
  const handleChange = (evnt) => {
    setValue(evnt.target.value);
  };

  /* handle form submission */
  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    addTodo(value);
    setValue("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input add-task"
        value={value}
        placeholder="What is the task for today?"
        onChange={handleChange}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
}
