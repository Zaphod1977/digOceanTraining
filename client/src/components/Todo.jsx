import React, { Component } from 'react';
import axios from 'axios';
import Input from './Input';
import ListTodo from './ListTodo';
import Note from './Note';

class Todo extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    axios
      .get('http://localhost:5000/api/todos')
      .then((res) => {
        if (res.data && res.data.todos) {
          this.setState({
            todos: res.data.todos,
          });
          console.log('Updated Todos:', res.data.todos);
        }
      })
      .catch((err) => console.log(err));
  };
  
  deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then((res) => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch((err) => console.log(err));
  };

  handleNoteSave = ({ noteText, imageUrls }) => {
    // Save the noteText and imageUrls
    // You may want to send this data to a server or store it in a state management solution
    console.log('Note text:', noteText);
    console.log('Image URLs:', imageUrls);

    // Example: Save to server (adjust as needed)
    axios
      .post('http://localhost:5000/api/todos', { text: noteText, imageUrls })
      .then((response) => {
        console.log('Server Response:', response.data);
        this.getTodos();
      })
      .catch((error) => {
        console.error('Error saving note:', error);
      });
  };

// Todo.jsx
render() {
  let { todos } = this.state;

  return (
    <div>
      <h1>My Todo(s)</h1>
      <Input getTodos={this.getTodos} />
      <ListTodo todos={todos} deleteTodo={this.deleteTodo} />
      <Note onNoteSave={this.handleNoteSave} />
    </div>
  );
}

}

export default Todo;
