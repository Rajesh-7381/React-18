import React, { useState } from 'react';

const Todos = () => {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo = {
                id: Date.now(),
                text: inputValue,
                completed: false
            };
            setTodos([...todos, newTodo]);
            setInputValue('');
        }
    };

    const handleCheckboxChange = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const handleRemoveTodo = (id) => {
        const filteredTodos = todos.filter(todo => todo.id !== id);
        setTodos(filteredTodos);
    };

    return (
        <div>
            <h2>Todo List</h2>
            <div>
                <input type="text" name='name' value={inputValue} onChange={handleInputChange} />
                <button className='btn btn-success' onClick={handleAddTodo}>Add</button>
            </div>
            <div>
                <ul>
                    {todos.map(todo => (
                        <div key={todo.id} className="todo-item">
                            <input type="checkbox" checked={todo.completed} onChange={() => handleCheckboxChange(todo.id)} />
                            <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
                            <button className='btn btn-danger' onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Todos;
