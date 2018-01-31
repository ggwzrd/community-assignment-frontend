import React, { Fragment } from "react";

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

const CreatePost = props => {
  const { routes } = props;
  return (
    <Fragment>
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send
          updates occationally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleDialogClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Fragment>
  );
};

export default CreatePost;
