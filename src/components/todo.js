import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { updateTask } from "../firebase/todoService";

export function Todo({ task, toggleComplete, deleteTask }) {
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.task);

  useEffect(() => {
    setEditedTask(task.task);
  }, [task]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    updateTask(task.id, { task: editedTask });
    setEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="todo">
      {editing ? (
        <div className="todo-edit">
          <input
            type="text"
            value={editedTask}
            onChange={(evnt) => setEditedTask(evnt.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <FontAwesomeIcon
            icon={faSave}
            className="fa-trash"
            onClick={handleSave}
          />
        </div>
      ) : (
        <>
          <p
            onClick={() => toggleComplete(task.id)}
            className={`${task.completed ? "completed task" : "task"}`}
          >
            {task.task}
          </p>
          <div>
            <FontAwesomeIcon icon={faPenToSquare} onClick={handleEdit} />
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(task)} />
          </div>
        </>
      )}
    </div>
  );
}
