import React from 'react';
import TodoItem from './TodoItem';

const TodoContainer = ({todos}) => {

    const showTodos = () => {
        return todos.map(todo => <TodoItem key={todo.id} {...todo} /> )
    }

    return (
        <div>
            <ul className="todo-list">
                {showTodos()}
            </ul>
        </div>
    );
}

export default TodoContainer;
