import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { updateTask } from "../firebase/todoService";

/**
 * Component representing a single todo item.
 * @param {Object} task - The todo item object containing task details.
 * @param {function} toggleComplete - Function to toggle completion status of the task.
 * @param {function} deleteTask - Function to delete the task.
 */

export function Todo({ task, toggleComplete, deleteTask }) {
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.task);

  /* update edited task when task prop changes */
  useEffect(() => {
    setEditedTask(task.task);
  }, [task]);

  /* handle editing mode */
  const handleEdit = () => {
    setEditing(true);
  };

  /* handle saving edited task */
  const handleSave = () => {
    updateTask(task.id, { task: editedTask });
    setEditing(false);
  };

  /* handle saving edited task on pressing Enter key */
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
