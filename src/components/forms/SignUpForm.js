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
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    }, this.validateField(name))
  }

  validateField = name => _ => {
  switch(name) {
    case 'nickname' :
      return this.validateNickname()
    case 'email' :
      return this.validateEmail()
    case 'password' :
      return this.validatePassword()
    case 'passwordConfirmation' :
      return this.validatePasswordConfirmation()
    default :
      return this.validateAll()
  }
}

  render() {
  const { validateNickname, validateEmail, validatePassword, validatePasswordConfirmation, setFirstName, setLastName, handleDialogClose, submitSignUpForm, nicknameError, emailError, passwordError, passwordConfirmationError} = this.props

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
          label="Your first Name"
          type="text"
          onChange={setFirstName} />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="lastName"
          label="Your last Name"
          type="lastName"
          onChange={setLastName} />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="nickname"
          label={nicknameError || "Your nickname"}
          type="nickname"
          onChange={this.handleChange('nickname')}
          error={!!nicknameError} />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="email"
          label={emailError || "Email Address"}
          type="email"
          onChange={this.handleChange('email')}
          error={!!emailError} />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="password"
          label={passwordError || "Password"}
          type="password"
          onChange={this.handleChange('password')}
          error={!!passwordError} />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="passwordConfirmation"
          label={passwordConfirmationError || "Repeat Password"}
          type="password"
          onChange={this.handleChange('passwordConfirmation')}
          error={!!passwordConfirmationError} />
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
