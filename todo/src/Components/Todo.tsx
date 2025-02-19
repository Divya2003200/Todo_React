import React, { useEffect, useState } from "react";
import './Todo.css';

const Todo = () => {
    const [todos, setTodos] = useState<string[]>([]);

   
    useEffect(() => {
        const storedTodos = localStorage.getItem('Todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    const AddData = (e: React.FormEvent) => {
        e.preventDefault(); 
        const inputElement = document.getElementById("todo-input") as HTMLInputElement;  
        const inputValue = inputElement.value;  

        if (inputValue.trim()) {
            setTodos(prevTodos => {
                const updatedTodos = [...prevTodos, inputValue];
                localStorage.setItem('Todos', JSON.stringify(updatedTodos)); 
                return updatedTodos; 
            })
         
            inputElement.value = ""; 
        }

        console.log(localStorage.getItem('Todos'))
    };

    const EditData = (index: number) => {
        const storedTodos = JSON.parse(localStorage.getItem('Todos') || '[]');
        const todoToEdit = storedTodos[index];

        const newValue = prompt("Edit your todo:", todoToEdit);
        if (newValue !== null) {
            storedTodos[index] = newValue; 
            localStorage.setItem('Todos', JSON.stringify(storedTodos));
            setTodos(storedTodos);
        }
    }


    const DeleteData = (index: number) => {
        
        const storedTodos = JSON.parse(localStorage.getItem('Todos') || '[]');
        storedTodos.splice(index, 1); 
        localStorage.setItem('Todos', JSON.stringify(storedTodos)); 

       
        setTodos(storedTodos);
    }

    return (
        <>
            <div className="todo-container">
                <h2>To-Do List</h2>
                <form id="todo-form" className="input-container" onSubmit={AddData}>
                    <input type="text" id="todo-input" placeholder="Enter a task" required />
                    <button type="submit" className="add-btn">Add</button>
                </form>
                <ul id="todo-list">
                    {todos.map((todo, index) => (
                        <li key={index}>{todo}     <button  className="edit-btn" onClick={()=>EditData(index)}>Edit</button>    
                        <button className="delete-btn" onClick={()=>DeleteData(index)}>Delete</button></li> 
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Todo;
