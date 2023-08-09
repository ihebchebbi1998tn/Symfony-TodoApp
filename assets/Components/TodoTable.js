import React, { useContext ,useState} from "react";
import { TodoContext } from "../Contexts/TodoContexts";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { IconButton, TableCell, TextField } from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function TodoTable() {
  const context = useContext(TodoContext);
  const [addTodo, setAddTodo] = useState('');

  return (
    <form onSubmit={(event) => {context.createTodo(event, {name: addTodo})}}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Task</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
            <TableCell align="center">
                <TextField value={addTodo} onChange={(event) => {setAddTodo(event.target.value)}} fullWidth={true} label="new task"/>
            </TableCell>
            <TableCell>
                <IconButton type="submit"><AddIcon/></IconButton>
            </TableCell>
        </TableRow>
        {context.todos.slice().reverse().map((todo , index) => (
          <TableRow key={'todo ' + index}>
            <TableCell>{todo.name}</TableCell>
            <TableCell align="right"><IconButton><EditIcon/></IconButton>
            <IconButton><DeleteIcon/></IconButton>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </form>
  );
}

export default TodoTable;
