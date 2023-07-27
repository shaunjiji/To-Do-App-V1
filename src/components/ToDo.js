import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faSquareCheck,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

const ToDo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  const handleToggleComplete = () => {
    toggleComplete(task.id);
  };

  const handleEdit = () => {
    editTodo(task.id);
  };

  const handleDelete = () => {
    deleteTodo(task.id);
  };

  const handleChecked = () => {
    toggleComplete(task.id);
  };
  return (
    <div className="Todo">
      <div>
        {task.completed ? (
          <FontAwesomeIcon icon={faSquareCheck} onClick={handleChecked} />
        ) : (
          <FontAwesomeIcon icon={faSquare} onClick={handleChecked} />
        )}
      </div>
      <p
        onClick={handleToggleComplete}
        className={`${task.completed ? "completed" : ""}`}
      >
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={handleEdit} />
        <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
      </div>
    </div>
  );
};

export default ToDo;
