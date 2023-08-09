import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { TodoContext } from "../Contexts/TodoContexts";

function DeleteDialog(props) {
  const hide = () => {
    props.setDeleteConfirmationIsShown(false);
  };

  const context = useContext(TodoContext);

  return (
    <Dialog onClose={hide} fullWidth={true} open={props.open}>
      {/* Dialog content goes here */}
      <DialogTitle>Are you sure you want to delete</DialogTitle>
      <DialogContent>{props.todo.name}</DialogContent>
      <DialogActions>
        <Button onClick={hide}>Cancel</Button>
        <Button
          onClick={() => {
            context.deleteTodo({ id: props.todo.id, name: props.todo.name });
            hide();
          }} >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setDeleteConfirmationIsShown: PropTypes.func.isRequired,
  todo: PropTypes.object,
};

export default DeleteDialog;
