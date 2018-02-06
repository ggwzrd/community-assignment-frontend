import React, { PureComponent, Fragment } from "react"
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

class SignUpForm extends PureComponent {

  render() {
  const { validateNickname, validateEmail, validatePassword, validatePasswordConfirmation, setFirstName, setLastName, handleDialogClose, submitSignUpForm } = this.props

  return (
    <Fragment>
      <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in your sign up information.
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="firstName"
          label="First Name"
          type="firstName"
          onChange={setFirstName} />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="lastName"
          label="Last Name"
          type="lastName"
          onChange={setLastName} />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="nickname"
          label="Nickname"
          type="nickname"
          onChange={validateNickname} />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          onChange={validateEmail} />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="password"
          label="Password"
          type="password"
          onChange={validatePassword} />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="passwordConfirmation"
          label="Repeat Password"
          type="password"
          onChange={validatePasswordConfirmation} />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={submitSignUpForm} color="primary">
          Sign up
        </Button>
      </DialogActions>

    </Fragment>
  )
 }
}

export default SignUpForm
