import { useState } from "react";

import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";
import EditToDoForm from "./EditToDoForm";
import AlertComponent from "./AlertComponent";
import DialogComponent from "./DialogComponent";

import { ToDoInterface } from "../interface";

import { v4 as uuidv4 } from "uuid";



const ToDoContainer = () => {
  // State to manage the list of todos
  const [todos, setTodos] = useState<ToDoInterface[]>([]);

  // State to manage the alert message
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // State to manage the dialog
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [deleteTaskId, setDeleteTaskId] = useState<string>("");
 
  const handleSearchAlert = (todo: string) => {
    if(todo.length >= 40) {
      setAlertMessage("Character limit exceeded (max 40 characters)!");
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }

  // Function to add a new todo
  const addTodo = (todo: string) => {
    // Check to see if user inputs only whitespace
    if (/^\s*$/.test(todo)){
      setAlertMessage("Please enter a task!");
      setShowAlert(true);
      return false;
    }
    const newTask: ToDoInterface = {
      id: uuidv4(), // Generate a unique ID for each todo
      task: todo,
      completed: false,
      isEditing: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTask]);
    setShowAlert(false);
  };

  // Function to mark existing todo as completed
  const toggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // Function to show Dialog component to confirm task deletion
  const deleteTodo = (id: string) => {
    setDeleteTaskId(id);
    setShowDialog(true);
    
  };
  
  // Function to delete task
  const confirmDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deleteTaskId));
    setShowDialog(false);

  }
  // Function to to toggle edit mode
  const editTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo,
      ),
    );
  };

  // Function to update an existing todo
  const updateTodo = (task: string, id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo,
      ),
    );
  };
  
  // Handle Alert component's onClose
  const handleAlertOnClose = () => {
    setShowAlert(false)
  }

  // Handle Dialog component's onClose
  const handleDialogOnClose = () => {
    setShowDialog(false);
  }

  return (
    <div className="to-do-container">
      <h1>My To-Do List</h1>
      <ToDoForm addTodo={addTodo} handleSearchAlert={handleSearchAlert}/>
      {showAlert && (
        <AlertComponent message={alertMessage} severity="warning" onClose={handleAlertOnClose} />
      )}
      {showDialog && (
        <DialogComponent open={showDialog} onClose={handleDialogOnClose} onConfirm={confirmDelete} />
      )}
      {/* Conditional rendering based on whether there are todos or not */}
      {todos.length === 0 ? (
        <p>No tasks have been added yet!</p>
      ) : (
        todos.map((todo) =>
          todo.isEditing ? (
            <EditToDoForm updateTodo={updateTodo} todo={todo} key={todo.id} />
          ) : (
            <ToDo
              todo={todo}
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
