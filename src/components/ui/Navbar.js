import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../../actions/user/sign-out'
import PropTypes from 'prop-types'
import './Navbar.css'

import Button from 'material-ui/Button'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Switch from 'material-ui/Switch'
import { FormControlLabel, FormGroup } from 'material-ui/Form'
import Menu, { MenuItem } from 'material-ui/Menu'
import Avatar from 'material-ui/Avatar'
import AddIcon from 'material-ui-icons/Add'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'


class Navbar extends React.Component {
  state = {
    signedIn: true,
    anchorEl: null,
    open: false,
  }

  handleChange = (event, checked) => {
    this.setState({ signedIn: checked })
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
  }

  signUp = () => {
    this.props.push('/sign-up')
  }

  goHome = () => {
    this.props.push('/')
  }

  render() {

    const { signedIn, anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div className="navbar">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={signedIn} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={signedIn ? 'Logout' : 'Login'}
          />
        </FormGroup>

        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit" className="navbar logo">
              Coinmunity
            </Typography>
            {signedIn ?
                        <div className="user-menu">
                          <Button fab mini
                            color="primary"
                            aria-label="add"
                            className="button add"
                            onClick={this.handleDialogOpen}
                            >
                            <AddIcon />
                          </Button>

                          <Avatar
                            alt="Remy Sharp"
                            src="https://cdn2.f-cdn.com/files/download/24619452/natural+background.png"
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
                            <MenuItem onClick={this.signOut.bind(this), this.handleClose}>Sign out</MenuItem>
                          </Menu>
                        </div>
                        :
                          <Button color="secondary" className="menuButton" onClick={this.signUp}>Sign up</Button>
                        }

          </Toolbar>
        </AppBar>

        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
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
        </Dialog>

      </div>
    )
  }
}


const mapStateToProps = state => ({
  signedIn: !!state.currentUser && !!state.currentUser._id
})

export default connect(mapStateToProps, { signOut, push })(Navbar)
