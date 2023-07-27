import React, { useState, FormEvent, ChangeEvent } from "react";

import { ToDoFormInterface } from "../interface";

const ToDoForm: React.FC<ToDoFormInterface> = ({ addTodo }) => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo(value.trim());

    setValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
