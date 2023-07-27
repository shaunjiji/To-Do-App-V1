
export interface ToDoInterface {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
}

export interface ToDoFormInterface {
    addTodo: (todo: string) => void;
}

