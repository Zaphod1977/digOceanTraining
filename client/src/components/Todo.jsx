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

  handleNoteSave = ({ noteText, imageUrls, editTodoId }) => {
    // Save the noteText and imageUrls

    // Get the current date and time
    const timestamp = new Date().toLocaleString();
    // You may want to send this data to a server or store it in a state management solution
    console.log('Note text:', noteText);
    console.log('Image URLs:', imageUrls);
    console.log('Timestamp:', timestamp);

    // Example: Save to server (adjust as needed)
    if (editTodoId) {
      // Editing an existing todo
      axios
        .put(`http://localhost:5000/api/todos/${editTodoId}`, {
          text: `${noteText} - ${timestamp}`,
          imageUrls,
        })
        .then((response) => {
          console.log('Server Response:', response.data);
          this.getTodos();
        })
        .catch((error) => {
          console.error('Error updating note:', error);
        });
    } else {
      // Adding a new todo
      axios
      .post('http://localhost:5000/api/todos', { text: `${noteText} - ${timestamp}`, imageUrls })
      .then((response) => {
        // Handle response
      })
      .catch((error) => {
        console.error('Error saving note:', error);
      });
    }
  };

  render() {
    let { todos } = this.state;

    return (
      <div>
        <h1>My Message Board</h1>
        <Input getTodos={this.getTodos} />
        <ListTodo todos={todos} deleteTodo={this.deleteTodo} editTodo={this.handleNoteSave} />
        <Note onNoteSave={this.handleNoteSave} />
      </div>
    );
  }
}

export default Todo;
