import React, { useState } from "react";
import { useTasks } from "./TaskContex";
import { Task } from "./TaskContex";
import '/Users/Lenovo/Desktop/New folder/assignmet_20feb/src/Styles/Task.css'
const TaskManager = () => {
    const { tasks, addTask, removeTask, toggleTask, completedTasks } = useTasks();
    const [taskText, setTaskText] = useState("");

    const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskText.trim()) {
            addTask(taskText);
            setTaskText("");
        }
    };

    return (
        <>
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Add Task..."
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
            <p>Completed Tasks: {completedTasks}</p>
            <ul>
                {tasks.map((task: Task) => (
                    <li key={task.id}>
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.text}
                        </span>
                        <button onClick={() => toggleTask(task.id)}>Toggle</button>
                        <button onClick={() => removeTask(task.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default TaskManager;
