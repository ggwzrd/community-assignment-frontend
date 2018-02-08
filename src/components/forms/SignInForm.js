import React, { PureComponent, Fragment } from "react"
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import signIn from '../../actions/user/sign-in'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

import '../styles/SignForms.css'

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
  const { handleDialogClose, handleDialogSignUp } = this.props

  return (
    <Fragment>
      <DialogTitle id="form-dialog-title">Sign in</DialogTitle>
      <DialogContent style={{width: 350}}>
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
          fullWidth
          />

        <TextField
          margin="dense"
          id="password"
          label="password"
          type="password"
          onChange={this.updatePassword.bind(this)}
          fullWidth
          />


      </DialogContent>

      <DialogActions style={{justifyContent: 'center'}}>

        <Button onClick={handleDialogClose} style={{marginRight: 20}}>
          Cancel
        </Button>
        <Button raised onClick={this.submitSignInForm.bind(this)} color="primary">
          Sign in
        </Button>
      </DialogActions>

      <DialogActions style={{justifyContent: 'center'}}>

        <div style={{width: '100%', textAlign: 'center', marginBottom: 24}}>
          <Link to="" onClick={handleDialogSignUp}
                      className="switchText"
                      >No account yet? Sign up here!</Link>
        </div>
      </DialogActions>
    </Fragment>
  )
 }
}

const mapStateToProps = ({currentUser}) => ({
  signedIn: !!currentUser && !!currentUser.token,
})

export default connect(mapStateToProps, {signIn})(SignInForm)
