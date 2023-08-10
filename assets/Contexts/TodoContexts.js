import React, { Component, createContext } from "react";
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [], // Ajout d'une propriété "id"
    };
    this.readTodo();
  }

  readTodo = () => {
    axios.get('/api/todo/read')
      .then(response => {
        console.log(response.data); // Log the data received from the API
        this.setState({
          todos: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  // Créer une tâche
  createTodo = (event, todo) => {
    event.preventDefault();
    let data = [...this.state.todos];
    data.push(todo);
    this.setState({
      todos: data,
    });
  }

  // Mettre à jour une tâche
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

  // Supprimer une tâche
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
