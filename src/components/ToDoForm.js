import React, { useState } from "react";

const ToDoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo(value.trim());

    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        required
        maxLength={50}
        className="todo-input"
        placeholder="What do you need to get done today?"
        value={value}
        onChange={handleChange}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};

export default ToDoForm;
