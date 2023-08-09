import React, { useContext } from "react";
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

  return (
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
                <TextField/>
            </TableCell>
            <TableCell>
                <IconButton><AddIcon/></IconButton>
            </TableCell>
        </TableRow>
        {context.todos.map((todo) => (
          <TableRow>
            <TableCell>{todo.name}</TableCell>
            <TableCell align="right"><IconButton><EditIcon/></IconButton>
            <IconButton><DeleteIcon/></IconButton>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TodoTable;
