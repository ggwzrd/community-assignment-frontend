import React, { PureComponent, Fragment } from "react"
import { connect } from 'react-redux'
import signUp from '../../actions/user/sign-up'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

class SignUpForm extends PureComponent {
  constructor() {
    super()
    this.state = {
      nickname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    }
  }

  validateAll() {
    return this.validateNickname() &&
      this.validateEmail() &&
      this.validatePassword() &&
      this.validatePasswordConfirmation()
  }

  submitSignUpForm(event) {
    event.preventDefault()
    if (this.validateAll()) {
      const { nickname, email, password, passwordConfirmation } = this.state
      this.props.signUp({ nickname, email, password, passwordConfirmation })
    }
    this.validateAll() ? this.props.handleDialogClose() : null
  }


  validateNickname() {
    const { nickname } = this.state

    if (nickname.length > 1) {
      this.setState({
        nicknameError: null,
      })
      return true
    }

    this.setState({
      nicknameError: 'Please provide your nickname'
    })
    return false
  }

  validateEmail() {
    const { email } = this.state

    if (email.match(/^[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+$/)) {
      this.setState({
        emailError: null
      })
      return true
    }

    if (email === '') {
      this.setState({
        emailError: 'Please provide your email address'
      })
      return false
    }

    this.setState({
      emailError: 'Please provide a valid email address'
    })
    return false
  }

  validatePassword() {
    const { password } = this.state

    if (password.length < 6) {
      this.setState({
        passwordError: 'Password is too short'
      })
      return false
    }

    if (password.match(/[a-zA-Z]+/) && password.match(/[0-9]+/)) {
      this.setState({
        passwordError: null
      })
      return this.validatePasswordConfirmation()
    }

    this.setState({
      passwordError: 'Password should contain both letters and numbers'
    })
    return false
  }

  validatePasswordConfirmation() {
    const { password, passwordConfirmation } = this.state

    if (password === passwordConfirmation) {
      this.setState({
        passwordConfirmationError: null
      })
      return true
    }

    this.setState({
      passwordConfirmationError: 'Passwords do not match'
    })
    return false
  }

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
  const { nickname, email, password, passwordConfirmation, nicknameError, emailError, passwordError, passwordConfirmationError} = this.state

  const { handleDialogClose } = this.props

  return (
    <Fragment>
      <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
      <DialogContent style={{width: 350}}>
        <DialogContentText>
          Please fill in your sign up information.
        </DialogContentText>

        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="nickname"
          label="Your nickname"
          type="nickname"
          value={nickname}
          onChange={this.handleChange('nickname').bind(this)}
          helperText={nicknameError}
          error={!!nicknameError} />

        <TextField
          fullWidth
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          value={email}
          onChange={this.handleChange('email')}
          helperText={emailError}
          error={!!emailError} />

        <TextField
          fullWidth
          margin="dense"
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={this.handleChange('password')}
          helperText={passwordError}
          error={!!passwordError} />

        <TextField
          fullWidth
          margin="dense"
          id="passwordConfirmation"
          label="Password confirmation"
          type="password"
          value={passwordConfirmation}
          onChange={this.handleChange('passwordConfirmation')}
          helperText={passwordConfirmationError}
          error={!!passwordConfirmationError} />

      </DialogContent>

      <DialogActions style={{justifyContent: 'center', padding: 24}}>
        <Button onClick={handleDialogClose} color="default">
          Cancel
        </Button>
        <Button raised onClick={this.submitSignUpForm.bind(this)} color="primary">
          Sign up
        </Button>
      </DialogActions>

    </Fragment>
  )
 }
}

export default connect(null, {signUp})(SignUpForm)
