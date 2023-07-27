import React, { useState } from "react";

import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";
import EditToDoForm from "./EditToDoForm";

import { v4 as uuidv4 } from "uuid";

const ToDoContainer = () => {
  // State to manage the list of todos
  const [todos, setTodos] = useState([]);

  // Function to add a new todo
  const addTodo = (todo: string) => {
    const newTask = {
      id: uuidv4(), // Generate a unique ID for each todo
      task: todo,
      completed: false,
      isEditing: false,
    };
    setTodos([...todos, newTask]);
  };

  // Function to mark existing todo as completed
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Function to to toggle edit mode
  const editTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo,
      ),
    );
  };

  // Function to update an existing todo
  const updateTodo = (task, id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo,
      ),
    );
  };

  return (
    <div className="TodoContainer">
      <h1>My Task List</h1>
      <ToDoForm addTodo={addTodo} />

      {/* Conditional rendering based on whether there are todos or not */}
      {todos.length === 0 ? (
        <p>No tasks have been added yet!</p>
      ) : (
        todos.map((todo) =>
          todo.isEditing ? (
            <EditToDoForm updateTodo={updateTodo} todo={todo} key={todo.id} />
          ) : (
            <ToDo
              task={todo}
              key={todo.id}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ),
        )
      )}
    </div>
  );
};

export default ToDoContainer;
