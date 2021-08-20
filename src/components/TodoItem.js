import React, { useState } from 'react';
import TodoForm from './TodoForm';


export default function TodoItem({ id, title, content, urgent, done, deleteTodo, updateTodo }) {
    const todo = { id, title, urgent, done, content }
    const [isToggled, setIsToggled] = useState(false)
    const handleClick = (event) => deleteTodo(id)
    const handleToggle = (event) => setIsToggled(!isToggled)
    const todoCard = () => (
        <li className="todo-item">
            <h2>{title}</h2>
            <h4>{content}</h4>
            <button className="delete-button" onClick={handleClick}>Delete</button>
            <button className="edit-button" onClick={handleToggle}>EDIT</button>
        </li>
    )

    return isToggled
        ?
        <TodoForm
            handleToggle={handleToggle}
            submitAction={updateTodo}
            todo={todo}
        />
        :
        todoCard()

}


