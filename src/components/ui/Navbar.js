import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchUser } from '../../actions/user/fetch'
import signOut from '../../actions/user/sign-out'
import SignUpForm from '../forms/SignUpForm'
import SignInForm from '../forms/SignInForm'
//material-ui & styling
import Button from 'material-ui/Button'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Menu, { MenuItem } from 'material-ui/Menu'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import './Navbar.css'

class Navbar extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    signUpFormIsOpen: false,
    signInFormIsOpen: false,
  }

  componentWillMount() {
    this.props.fetchUser()
  }

  goHome = () => {
    this.props.push('/')
  }

  goToUser = userId => event => {
    this.handleClose()
    this.props.push(`/users/${userId}`)
  }

  renderPicture = () => {
    const { user } = this.props
    return user.picture === null ?
     "https://weareworldchallenge.com/wp-content/themes/world-challenge/img/avatar-placeholder.png" : user.picture
  }

//handle menu items
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

//handle dialogs
  handleDialogOpen = () => {
    !this.state.signUpFormIsOpen ? this.setState({ signUpFormIsOpen: true }) : null
    !this.state.signInFormIsOpen ? this.setState({ signInFormIsOpen: true }) : null
  }

  handleDialogClose = () => {
    this.state.signUpFormIsOpen ? this.setState({ signUpFormIsOpen: false }) : null
    this.state.signInFormIsOpen ? this.setState({ signInFormIsOpen: false }) : null
  }

  setSignInState = () => {
    this.state.signInFormIsOpen && this.setState({ signInFormIsOpen: false})
    this.setState({
      signInFormIsOpen: !this.state.signInFormIsOpen,
    })
  }

  setSignUpState = () => {
    this.state.signOutFormIsOpen && this.setState({ signOutFormIsOpen: false})
    this.setState({
      signUpFormIsOpen: !this.state.signUpFormIsOpen,
    })
  }

//sign-out
  signOut = (event) => {
    event.preventDefault()
    this.props.signOut()
    this.handleClose()
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

//sign-in
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

    this.handleDialogClose()
  }

//sign-up
  validateAll() {
    return this.validateNickname() &&
      this.validateEmail() &&
      this.validatePassword() &&
      this.validatePasswordConfirmation()
  }

  submitSignUpForm(event) {
    event.preventDefault()
    if (this.validateAll()) {
      const user = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        nickname: this.refs.nickname.getValue(),
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue()
      }
      this.props.signUp(user)
    }
    this.handleDialogClose()
  }

  setFirstName(event) {
    this.setState({
      first_name: event.target.value
    })
  }

  setLastName(event) {
    this.setState({
      last_name: event.target.value
    })
  }

  validateNickname() {
    const { nickname } = this.refs
    if (nickname.getValue().length > 1) {
      this.setState({
        nicknameError: null
      })
      return true
    }

    this.setState({
      nicknameError: 'Please provide your nickname'
    })
    return false
  }

  validateEmail() {
    const { email } = this.refs

    if (email.getValue().match(/^[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+$/)) {
      this.setState({
        emailError: null
      })
      return true
    }

    if (email.value === '') {
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
    const { password } = this.refs

    if (password.getValue().length < 6) {
      this.setState({
        passwordError: 'Password is too short'
      })
      return false
    }

    if (password.getValue().match(/[a-zA-Z]+/) && password.getValue().match(/[0-9]+/)) {
      this.setState({
        passwordError: null
      })
      return true
    }

    this.setState({
      passwordError: 'Password should contain both letters and numbers'
    })
    return false
  }

  validatePasswordConfirmation() {
    const { password, passwordConfirmation } = this.refs

    if (password.value === passwordConfirmation.value) {
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

  renderFullname = () => {
    return this.props.user === undefined
      ? null
      : <span className="username">Hi, {this.props.user.nickname}</span>
  }

  render() {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    const { signedIn, user } = this.props
    return (
      <div className="navbar">
        <AppBar position="static" style={{backgroundColor: "#3b7680"}}>
          <Toolbar>
            <Typography onClick={this.goHome} type="title" color="inherit" className="title">
              <img onClick={this.goHome} className="home-logo" src="http://res.cloudinary.com/dyyxiefx5/image/upload/v1517396145/coinmunity-logos/logo.svg" alt="Coinmunity" />
              Coinmunity
            </Typography>
            {signedIn ?
                        <div className="user-menu">
                             {this.renderFullname()}
                          <Avatar
                            alt="Remy Sharp"
                            src={this.renderPicture()}
                            onClick={this.handleMenu}
                          />
                          <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                            transformOrigin={{
                              vertical: -74,
                              horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}>
                            <MenuItem onClick={this.goToUser(user.id)}>Profile</MenuItem>
                            <MenuItem onClick={this.signOut.bind(this)}>Sign out</MenuItem>
                          </Menu>
                        </div>
                        :
                        <div className="signUp-signIn">
                          <Button color="primary" className="menuButton" onClick={this.setSignUpState}>Sign up</Button>
                          <Button color="primary" className="menuButton" onClick={this.setSignInState}>Sign in</Button>
                        </div>
                        }
          </Toolbar>
        </AppBar>

        <div className="formwrapper">
          <div>
          <Dialog
            open={this.state.signUpFormIsOpen}
            onClose={this.handleDialogClose}
            aria-labelledby="signUp-form-dialog">
              <SignUpForm
                handleDialogClose={this.handleDialogClose.bind(this)}/>
          </Dialog>
          </div>

          <div>
              <Dialog
                open={this.state.signInFormIsOpen}
                onClose={this.handleDialogClose}
                aria-labelledby="signIn-form-dialog">
              <SignInForm
                handleDialogClose={this.handleDialogClose.bind(this)} />
              </Dialog>
          </div>
        </div>
                handleDialogClose={this.handleDialogClose}
                submitSignUpForm={this.submitSignUpForm.bind(this)}
                validateNickname={this.validateNickname.bind(this)}
                validateEmail={this.validateEmail.bind(this)}
                validatePassword={this.validatePassword.bind(this)}
                validatePasswordConfirmation={this.validatePasswordConfirmation.bind(this)}/>
          </Dialog>

          <Dialog
            open={this.state.signInFormIsOpen}
            onClose={this.handleDialogClose}
            aria-labelledby="signIn-form-dialog">
              <SignInForm
                handleDialogClose={this.handleDialogClose}
                submitSignInForm={this.submitSignInForm.bind(this)}
                updatePassword={this.updatePassword.bind(this)}
                updateEmail={this.updateEmail.bind(this)} />
          </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({currentUser}) => ({
  signedIn: !!currentUser && !!currentUser.token,
  user: currentUser
})

export default connect(mapStateToProps, { signOut, push, fetchUser })(Navbar)
