import React, { Component } from 'react'
import  ReactDOM  from 'react-dom'
import TodoContextsProvider from './Contexts/TodoContexts'
import TodoTable from './Components/TodoTable';

class App extends React.Component {
  render() {
    return (
      <TodoContextsProvider> 
        <TodoTable/>
      </TodoContextsProvider>
    )
  } ;
}

ReactDOM.render(<App /> , document.getElementById('root'));