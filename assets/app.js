import React, { Component } from 'react'
import  ReactDOM  from 'react-dom'
import TodoContextsProvider from './Contexts/TodoContexts'
import TodoTable from './Components/TodoTable';
import { CssBaseline } from '@mui/material';
import AppSnackBar from './Components/AppSnackBar';

class App extends React.Component {
  render() {
    return (
      <TodoContextsProvider> 
        <TodoTable/>
        <AppSnackBar/>
      </TodoContextsProvider>
    )
  } ;
}

ReactDOM.render(<App /> , document.getElementById('root'));