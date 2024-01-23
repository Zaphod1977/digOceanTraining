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
// import React, { useState } from 'react';

// const ListTodo = ({ todos, deleteTodo, editTodo, addComment }) => {
//   const [editingTodoId, setEditingTodoId] = useState(null);
//   const [editedText, setEditedText] = useState('');
//   const [commentText, setCommentText] = useState('');
//   const [commentUser, setCommentUser] = useState('');

//   const handleEdit = (todoId) => {
//     setEditingTodoId(todoId);
//     const todoToEdit = todos.find((todo) => todo._id === todoId);
//     setEditedText(todoToEdit.text);
//   };

//   const handleSaveEdit = async (todoId) => {
//     try {
//       // Save the edit
//       await editTodo({
//         noteText: editedText,
//         editTodoId: todoId,
//       });

//       // Add the comment if there is one
//       if (commentText) {
//         await addComment({
//           commentText,
//           commentUser,
//           todoId,
//         });
//       }

//       // Clear state
//       setEditingTodoId(null);
//       setEditedText('');
//       setCommentText('');
//       setCommentUser('');
//     } catch (error) {
//       console.error('Error saving edit or adding comment:', error);
//       // Handle error as needed
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingTodoId(null);
//     setEditedText('');
//     setCommentText('');
//     setCommentUser('');
//   };

//   return (
//     <ul>
//       {todos && todos.length > 0 ? (
//         todos.map((todo, index) => (
//           <div key={index}>
//             {editingTodoId === todo._id ? (
//               <div>
//                 <input
//                   type="text"
//                   value={editedText}
//                   onChange={(e) => setEditedText(e.target.value)}
//                 />
//                 <button onClick={() => handleSaveEdit(todo._id)}>Save</button>
//                 <button onClick={handleCancelEdit}>Cancel</button>

//                 {/* Comment input fields */}
//                 <input
//                   type="text"
//                   placeholder="Comment Text"
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Comment User"
//                   value={commentUser}
//                   onChange={(e) => setCommentUser(e.target.value)}
//                 />

//                 {/* Save Comment Button */}
//                 <button onClick={() => addComment({
//                   commentText,
//                   commentUser,
//                   todoId: todo._id,
//                 })}>Add Comment</button>
//               </div>
//             ) : (
//               <div>
//                 <p>{todo.text}</p>
//                 <p>Timestamp: {todo.timestamp}</p>
//                 <button onClick={() => deleteTodo(todo._id)}>Delete</button>
//                 <button onClick={() => handleEdit(todo._id)}>Edit</button>
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <li>No todo(s) left</li>
//       )}
//     </ul>
//   );
// };

// export default ListTodo;

