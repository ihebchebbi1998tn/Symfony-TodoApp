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
          todos: [...prevState.todos, response.data.todo],
        }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateTodo = (data) => {
    axios.put(`/api/todo/update/${data.id}`, data)
      .then(response => {
        let todos = [...this.state.todos];
        let updatedTodos = todos.map(todo => {
          if (todo.id === data.id) {
            return { ...todo, name: data.name };
          }
          return todo;
        });

        this.setState({
          todos: updatedTodos,
        });
      })
      .catch(error => {
        console.error('Read Todo Error:', error);

      });
  }

  deleteTodo = (data) => {
    axios.delete(`/api/todo/delete/${data.id}`)
      .then(() => {
        let todos = this.state.todos.filter(todo => todo.id !== data.id);
        this.setState({
          todos: todos,
        });
      })
      .catch(error => {
        console.error('Read Todo Error:', error);

      });
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
