import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import signOut from '../../actions/user/sign-out'
import signIn from '../../actions/user/sign-in'
import SignInForm from '../forms/SignInForm'

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
    email: "",
    password: "",
  }

  handleChange = (event, checked) => {
    this.setState({ signedInSwitch: checked })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleDialogOpen = () => {
    this.setState({ open: true })
  }

  handleDialogClose = () => {
    this.setState({ open: false })
  }

  signOut = (event) => {
    event.preventDefault()
    this.props.signOut()
    this.handleClose()
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

  signUp = () => {
    this.props.push('/sign-up')
  }

  goHome = () => {
    this.props.push('/')
  }

  submitForm(event) {
    event.preventDefault()

    const user = {
      user: { email: this.state.email,
              password: this.state.password
            }
    }
    this.props.signIn( user )

    this.handleDialogClose()
  }

  renderPicture = () => {
    const { user } = this.props
    if (user.picture === null) {
      return "https://weareworldchallenge.com/wp-content/themes/world-challenge/img/avatar-placeholder.png"
    } else {
    return user.picture
    }
  }

  render() {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    const { signedIn } = this.props

    return (
      <div className="navbar">
        <AppBar position="static" style={{backgroundColor: "#3b7680", color:"#ffffff"}}>
          <Toolbar>
            <Typography type="title" color="inherit" className="navbar logo">
              <IconButton onClick={this.goHome}><img className="home-logo" src="http://res.cloudinary.com/dyyxiefx5/image/upload/v1517396145/coinmunity-logos/logo.svg" alt="Coinmunity" /></IconButton>
              Coinmunity
            </Typography>
            {signedIn ?
                        <div className="user-menu">
                          <Avatar
                            alt="Remy Sharp"
                            src={this.renderPicture()}
                            onMouseEnter={this.handleMenu}
                            />

                          <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}
                          >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.signOut.bind(this)}>Sign out</MenuItem>
                          </Menu>
                        </div>
                        :
                          // <Button color="secondary" className="menuButton" onClick={this.signUp}>Sign up</Button>
                          <Button color="primary" className="menuButton" onClick={this.handleDialogOpen}>Sign in</Button>
                        }

          </Toolbar>
        </AppBar>

        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >

        <SignInForm
          handleDialogClose={this.handleDialogClose}
          submitForm={this.submitForm.bind(this)}
          updatePassword={this.updatePassword.bind(this)}
          updateEmail={this.updateEmail.bind(this)}
          />

        </Dialog>

      </div>
    )
  }
}

const mapStateToProps = ({currentUser}) => ({
  signedIn: !!currentUser && !!currentUser.token,
  user: currentUser
})

export default connect(mapStateToProps, { signIn, signOut, push })(Navbar)
