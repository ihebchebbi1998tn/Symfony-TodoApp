import React, { Component, createContext } from "react";
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.readTodo();
  }

  readTodo = () => {
    axios.get('/api/todo/read')
      .then(response => {
        console.log(response.data);
        this.setState({
          todos: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  createTodo = (event, todo) => {
    event.preventDefault();
    axios.post('/api/todo/create', todo)
      .then(response => {
        console.log(response.data);
        this.setState(prevState => ({
          todos: [...prevState.todos, response.data.todo], // Corrected response data property
        }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateTodo = (data) => {
    let todos = [...this.state.todos];
    let todo = todos.find(todo => todo.id === data.id);

    if (todo) {
      todo.name = data.name;
      this.setState({
        todos: todos,
      });
    }
  }

  deleteTodo = (data) => {
    let todos = [...this.state.todos];
    let todo = todos.find(todo => todo.id === data.id);

    if (todo) {
      todos.splice(todos.indexOf(todo), 1);
      this.setState({
        todos: todos,
      });
    }
  }

  render() {
    return (
      <TodoContext.Provider value={{
        ...this.state,
        createTodo: this.createTodo,
        readTodo: this.readTodo,
        updateTodo: this.updateTodo,
        deleteTodo: this.deleteTodo,
      }}>
        {this.props.children}
      </TodoContext.Provider>
    );
  }
}

export default TodoContextsProvider;
