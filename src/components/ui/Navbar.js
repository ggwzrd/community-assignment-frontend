// renders SignIn, SignUp, SignOut, AddPostButton, Dropdown, Profile?
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../../actions/user/sign-out'
import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import './Navbar.css'

const TITLE = 'Coinmunity'

class Navbar extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
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
    const { signedIn } = this.props

    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography type="title" color="inherit">
            {TITLE}
          </Typography>
          {signedIn ?
              <Button raised className="menuButton" onClick={this.signOut.bind(this)}>Sign out</Button>  :
              <Button raised className="menuButton" onClick={this.signUp}>Sign up</Button>
            }

        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = state => ({
  signedIn: !!state.currentUser && !!state.currentUser._id
})

export default connect(mapStateToProps, { push, signOut })(Navbar)
