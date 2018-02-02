import React, { Fragment } from "react";
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

const SignInForm = props => {
  const { updateEmail, updatePassword, handleDialogClose, submitForm } = props;
  return (
    <Fragment>
      <DialogTitle id="form-dialog-title">Sign in</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in your sign in information.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          onChange={updateEmail}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="password"
          type="password"
          onChange={updatePassword}

          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={submitForm} color="primary">
          Sign in
        </Button>
      </DialogActions>
    </Fragment>
  );
};

export default SignInForm;
