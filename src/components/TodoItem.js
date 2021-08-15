import React from 'react';

const TodoItem = ({title, content}) => {
    return (
        <li className="todo-item">
            <h2>{title}</h2>
            <h4>{content}</h4> 
        </li>
    );
}

export default TodoItem;
