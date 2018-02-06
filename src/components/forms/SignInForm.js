import React, { PureComponent, Fragment } from "react"
import { connect } from 'react-redux'
import signIn from '../../actions/user/sign-in'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

class SignInForm extends PureComponent {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
    }
  }

  updateEmail(event) {
    this.setState({
      email: event.target.value
    })
 }

  updatePassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  submitSignInForm(event) {
    event.preventDefault()
    const user = {
      user: { email: this.state.email,
              password: this.state.password
            }
    }
    this.props.signIn( user )

    this.props.handleDialogClose()
  }

  render() {
  const { handleDialogClose } = this.props

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
          id="email"
          label="Email Address"
          type="email"
          onChange={this.updateEmail.bind(this)}
          fullWidth />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="password"
          type="password"
          onChange={this.updatePassword.bind(this)}
          fullWidth />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.submitSignInForm.bind(this)} color="primary">
          Sign in
        </Button>
      </DialogActions>
    </Fragment>
  )
 }
}

const mapStateToProps = ({currentUser}) => ({
  signedIn: !!currentUser && !!currentUser.token,
})

export default connect(mapStateToProps, {signIn})(SignInForm)
