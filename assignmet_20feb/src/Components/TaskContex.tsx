import React, { createContext, useContext, useReducer, useMemo, useCallback, ReactNode } from "react";

export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const TaskContext = createContext<any>(null);

const taskReducer = (state: Task[], action: any) => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, { id: Date.now(), text: action.payload, completed: false }];
        case "REMOVE_TASK":
            return state.filter(task => task.id !== action.payload);
        case "TOGGLE_TASK":
            return state.map(task =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
        default:
            return state;
    }
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, dispatch] = useReducer(taskReducer, []);

    const addTask = useCallback((task: string) => {
        dispatch({ type: "ADD_TASK", payload: task });
    }, []);

    const removeTask = useCallback((id: number) => {
        dispatch({ type: "REMOVE_TASK", payload: id });
    }, []);

    const toggleTask = useCallback((id: number) => {
        dispatch({ type: "TOGGLE_TASK", payload: id });
    }, []);

    const completedTasks = useMemo(() => tasks.filter(task => task.completed).length, [tasks]);

    return (
        <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask, completedTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
};
