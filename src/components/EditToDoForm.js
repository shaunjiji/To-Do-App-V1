import React, { useState } from "react";

const EditToDoForm = ({ updateTodo, todo }) => {
  const [value, setValue] = useState(todo.task);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateTodo(value, todo.id);

    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Update Task"
        value={value}
        onChange={handleChange}
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};

export default EditToDoForm;
