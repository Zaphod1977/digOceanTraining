import React, { Component } from 'react';
import axios from 'axios';

class Input extends Component {
  state = {
    action: '',
  };

  handleInputChange = (e) => {
    this.setState({ action: e.target.value });
  };

  addTodo = () => {
    const todo = { text: this.state.action };

    if (todo.text && todo.text.length > 0) {
      axios
        .post('http://localhost:5000/api/saveNote', todo)
        .then((res) => {
          if (res.data) {
            this.props.getTodos();
            this.setState({ action: '' }); // Clear the input field
            console.log('way to go');
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log('text field required');
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.action}
          onChange={this.handleInputChange}
          placeholder="Add a new todo..."
        />
        <button onClick={this.addTodo}>Add Todo</button>
      </div>
    );
  }
}

export default Input;

