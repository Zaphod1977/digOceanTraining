// import React from 'react';

// const ListTodo = ({ todos, deleteTodo, editTodo }) => {
//   console.log('Todos:', todos);

//   const handleEdit = (todoId) => {
//     // Add your logic for handling edit here
//     console.log('Edit Todo with ID:', todoId);
//     // You can call the editTodo function passed as a prop
//     // and pass the todoId to indicate which todo to edit
//     if (editTodo) {
//       editTodo(todoId);
//     }
//   };

//   return (
//     <ul>
//       {todos && todos.length > 0 ? (
//         todos.map((todo, index) => (
//           <div key={index}>
//             <p>{todo.text}</p>
//             <p>Timestamp: {todo.timestamp}</p>
//             <button onClick={() => deleteTodo(todo._id)}>Delete</button>
//             <button onClick={() => handleEdit(todo._id)}>Edit</button>
//           </div>
//         ))
//       ) : (
//         <li>No todo(s) left</li>
//       )}
//     </ul>
//   );
// };

// export default ListTodo;
import React, { useState } from 'react';

const ListTodo = ({ todos, deleteTodo, editTodo }) => {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleEdit = (todoId) => {
    setEditingTodoId(todoId);
    const todoToEdit = todos.find((todo) => todo._id === todoId);
    setEditedText(todoToEdit.text);
  };

  const handleSaveEdit = () => {
    editTodo({
      noteText: editedText,
      editTodoId: editingTodoId,
    });
    setEditingTodoId(null);
    setEditedText('');
  };  

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditedText('');
  };

  return (
    <ul>
      {todos && todos.length > 0 ? (
        todos.map((todo, index) => (
          <div key={index}>
            {editingTodoId === todo._id ? (
              <div>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{todo.text}</p>
                <p>Timestamp: {todo.timestamp}</p>
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                <button onClick={() => handleEdit(todo._id)}>Edit</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <li>No todo(s) left</li>
      )}
    </ul>
  );
};

export default ListTodo;
