//renders Dialog/Form
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import signIn from '../../actions/user/sign-in'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
})

export class SignIn extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    signedIn: PropTypes.bool,
  }

  componentWillMount() {
    const { replace, signedIn } = this.props
    if (signedIn) replace('/')
  }

  submitForm(event) {
    event.preventDefault()
    const user = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    }
    this.props.signIn(user)
  }

  signUp() {
    this.props.push('/sign-up')
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    return (
      const { classes } = this.props
      <Paper style={ dialogStyle }>
        <h2>Sign In</h2>

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <TextField
              id="email"
              label="Email address"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"/>
          </div>
          <div className="input">
            <TextField
              id="password"
              label="Password"
              className={classes.textField}
              variant="password"
              autoComplete="current-password"
              margin="normal"/>
          </div>
        </form>
        <Button
          color="primary"
          className="signup-button"
          onClick={this.signUp.bind(this)}>Sign Up</Button>
        <Button
          color="primary"
          className="signin-button"
          onClick={this.submitForm.bind(this)}>Sign In</Button>
      </Paper>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { signIn, replace, push })(SignIn)
