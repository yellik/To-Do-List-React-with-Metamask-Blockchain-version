import { useState } from "react";
import { addTodo } from "../scripts/handlers";

export const AddTodo = ({ todos, setTodos, todoId, todoText, completed }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddTodo = async () => {
        if (inputValue.trim() !== '') {
            try {
                // Add the new todo locally
                const newTodo = {
                    todoId: todoId, // Use the provided todoId
                    todoText: inputValue,
                    completed: completed // Use the provided completed status
                };
                
                // Update the todo list state
                setTodos([...todos, newTodo]);
                addTodo(newTodo)
                // Clear the input field
                setInputValue('');
            } catch (error) {
                console.log("There was an error in adding todo", error);
            }
        }
    };
    
     
    const onChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div>
            <div>
                <label htmlFor="todoText">Task:</label>
                <input
                    type="text"
                    onChange={onChange}
                    value={inputValue}
                    placeholder="Write your task here"
                />
               <button onClick={() => handleAddTodo(todoId, todoText, completed)}>Add Item</button>
            </div>
            <p>You typed: {inputValue}</p>
        </div>
    );
};
