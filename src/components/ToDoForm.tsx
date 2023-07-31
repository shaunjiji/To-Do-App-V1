import React, { useState, FormEvent, ChangeEvent } from "react";

import { ToDoFormInterface } from "../interface";

const ToDoForm: React.FC<ToDoFormInterface> = ({ addTodo, handleAddTodoCharAlert  }) => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(value.trim());
    setValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleAddTodoCharAlert(e.target.value); 
  };

  return (
    <form className="to-do-form" onSubmit={handleSubmit}>
      <input
        type="text"
        maxLength={40}
        className="to-do-input"
        placeholder="What do you need to get done today?"
        value={value}
        onChange={handleChange}
      />
      <button type="submit" className="to-do-btn">
        Add Task
      </button>
    </form>
  );
};

export default ToDoForm;
