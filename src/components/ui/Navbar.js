import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
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
import './Navbar.css'

class Navbar extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    signUpFormIsOpen: false,
    signInFormIsOpen: false,
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

            <Dialog
              open={this.state.signUpFormIsOpen}
              onClose={this.handleDialogClose}
              aria-labelledby="signUp-form-dialog">
                <SignUpForm
                  handleDialogSignIn={this.handleDialogOpen.bind(this)}
                  handleDialogClose={this.handleDialogClose.bind(this)}/>
            </Dialog>

            <Dialog
              open={this.state.signInFormIsOpen}
              onClose={this.handleDialogClose}
              aria-labelledby="signIn-form-dialog">
            <SignInForm
              handleDialogSignUp={this.handleDialogOpen.bind(this)}
              handleDialogClose={this.handleDialogClose.bind(this)} />
            </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({currentUser}) => ({
  signedIn: !!currentUser && !!currentUser.token,
  user: currentUser
})

export default connect(mapStateToProps, { signOut, push })(Navbar)
