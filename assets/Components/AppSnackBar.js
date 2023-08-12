import { Button, Snackbar, SnackbarContent } from "@material-ui/core";
import React, { Fragment, useContext } from "react";
import { TodoContext } from "../Contexts/TodoContexts";

function checkLevel(level) {
  switch (level) {
    case 'success':
      return 'green';
    case 'error':
      return 'red';
    default:
      return 'white';
  }
}

function AppSnackBar(props) {
  const context = useContext(TodoContext);

  return (
    <Snackbar autoHideDuration={6000} open={context.message.text !== undefined}>
      {context.message.text && (
        <SnackbarContent
          style={{ backgroundColor: checkLevel(context.message.level), whiteSpace: 'pre' }}
          message={
            Array.isArray(context.message.text) ? (
              context.message.text.map((text, index) => (
                <Fragment key={index + ' ' + text}>
                  <span>{text}</span>
                  <br />
                </Fragment>
              ))
            ) : (
              <span>{context.message.text}</span>
            )
          }
          action={[
            <Button
              onClick={() => {
                context.setMessage({});
              }}
              key="dismiss"
              color="inherit"
            >
              dismiss
            </Button>,
          ]}
        />
      )}
    </Snackbar>
  );
}

export default AppSnackBar;
