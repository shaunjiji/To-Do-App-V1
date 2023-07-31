
export interface ToDoInterface {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
}

export interface ToDoPropsInterface{
    todo: ToDoInterface;
    toggleComplete: (id: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string) => void;
}

export interface ToDoFormInterface {
    addTodo: (todo: string) => void;
    handleSearchAlert: (todo: string) => void;
}

export interface EditToDoFormInterface {
    updateTodo: (task: string, id: string) => void;
    todo: ToDoInterface;
}

export interface ToDoContainerInterface {
    addTodo: (todo: string) => void;
}


export interface AlertProps {
  message: string;
  severity: "warning";
  onClose: () => void;
}

export interface DialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}
  