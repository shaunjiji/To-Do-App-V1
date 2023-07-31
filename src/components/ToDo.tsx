import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faSquareCheck,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

import { ToDoPropsInterface } from "../interface";

const ToDo: React.FC<ToDoPropsInterface> = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  const handleToggleComplete = () => {
    toggleComplete(todo.id);
  };

  const handleEdit = () => {
    editTodo(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleChecked = () => {
    toggleComplete(todo.id);
  };
  return (
    <div className="to-do">
      <div>
        {todo.completed ? (
          <FontAwesomeIcon icon={faSquareCheck} onClick={handleChecked} />
        ) : (
          <FontAwesomeIcon icon={faSquare} onClick={handleChecked} />
        )}
      </div>
      <p
        onClick={handleToggleComplete}
        className={`${todo.completed ? "completed" : ""}`}
      >
        {todo.task}
      </p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={handleEdit} />
        <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
      </div>
    </div>
  );
};

export default ToDo;
