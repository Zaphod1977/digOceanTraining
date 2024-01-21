import React from 'react';

const ListTodo = ({ todos, deleteTodo }) => {
  console.log('Todos:', todos);

  return (
    <ul>
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <li key={todo._id} onClick={() => deleteTodo(todo._id)}>
            {todo.text} {/* Ensure you use the correct field name */}
          </li>
        ))
      ) : (
        <li>No todo(s) left</li>
      )}
    </ul>
  );
};

export default ListTodo;
