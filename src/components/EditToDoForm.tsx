import React, { useState, FormEvent, ChangeEvent } from "react";
import { EditToDoFormInterface } from "../interface";


const EditToDoForm: React.FC<EditToDoFormInterface>= ({ updateTodo, todo }) => {
  const [value, setValue] = useState<string>(todo.task);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodo(value, todo.id);
    setValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form className="to-do-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="to-do-input"
        placeholder="Update Task"
        value={value}
        onChange={handleChange}
      />
      <button type="submit" className="to-do-btn">
        Update Task
      </button>
    </form>
  );
};

export default EditToDoForm;
