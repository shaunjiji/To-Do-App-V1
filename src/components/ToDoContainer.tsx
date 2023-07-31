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
  const [alert, setAlert] = useState<{ message: string; show: boolean }>({
    message: "",
    show: false,
  });
  
  // State to manage the dialog
  const [dialog, setDialog] = useState<{ showDialog: boolean; deleteTaskId: string }>({
    showDialog: false,
    deleteTaskId: "",
  });
  
  // Function to handle character limit alert
  const handleAddTodoCharAlert = (todo: string) => {
    if(todo.length >= 40) {
      setAlert({ message:  "Character limit exceeded (max 40 characters)!", show: true });;
    } else {
      setAlert({message:"",show: false});
    }
  }

  // Function to add a new todo 
  const addTodo = (todo: string) => {
    // Check to see if user inputs only whitespace
    if (/^\s*$/.test(todo)){
      setAlert({ message: "Please enter a task!", show: true });
      return false;
    }
    const newTask: ToDoInterface = {
      id: uuidv4(), // Generate a unique ID for each todo
      task: todo,
      completed: false,
      isEditing: false,
    };
    setTodos((prevTodos)=> [...prevTodos, newTask]);
    setAlert({message:"",show: false});
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
    setDialog({ showDialog: true, deleteTaskId: id });
    
  };
  
  // Function to delete task
  const confirmDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== dialog.deleteTaskId));
    setDialog({ showDialog: false, deleteTaskId: "" });

  }
  // Function to toggle edit mode
  const editTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo,
      ),
    );
  };

  // Function to update an existing todo
  const updateTodo = (task: string, id: string) => {
    if (task.length === 0) {
      setAlert({ message: "Please enter a task!", show: true });
    }
    else if (task.length > 40){
      setAlert({ message:  "Character limit exceeded (max 40 characters)!", show: true })
    }
    else{
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo,
        ),
      );
    }
  };
  
  // Handle Alert component's onClose
  const handleAlertOnClose = () => {
    setAlert({message:"",show: false});
  }

  // Handle Dialog component's onClose
  const handleDialogOnClose = () => {
    setDialog({ showDialog: false, deleteTaskId: "" });
  }
  

  return (
    <div className="to-do-container">
      <h1>My To-Do List</h1>
      <ToDoForm addTodo={addTodo} handleAddTodoCharAlert={handleAddTodoCharAlert}/>
      {alert.show && (
        <AlertComponent message={alert.message} severity="warning" onClose={handleAlertOnClose} />
      )}
      {dialog.showDialog && (
        <DialogComponent open={dialog.showDialog} onClose={handleDialogOnClose} onConfirm={confirmDelete} />
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
