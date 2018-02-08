import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

import { updateProfile } from '../../actions/user/updateProfile'
import { uploadImage } from '../../actions/upload'
import Dropzone from 'react-dropzone'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Chip from 'material-ui/Chip'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import Send from 'material-ui-icons/Send'

import '../styles/EditProfile.css'

export class EditProfile extends PureComponent {

  static propTypes = {
    createPost: PropTypes.func.isRequired,
  }

  state = {
    firstname: '',
    lastname: '',
    bio: '',
    openEditProfile: false
  }

  onDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })

    this.props.uploadImage('newProfilePicture', files[0])
  }

  handleChange = name => event => {
   this.setState({
     [name]: event.target.value
   }, this.validateField(name))
  }

  validateAll() {
    return this.validateFirstname() &&
      this.validateLastname() &&
      this.validateBio()
  }

  validateField = name => _ => {
    switch(name) {
      case 'firstname' :
        return this.validateFirstname()
      case 'lastname' :
        return this.validateLastname()
      case 'bio' :
        return this.validateBio()
      default :
        return this.validateAll()
    }
  }

  clearInputFields() {
    this.setState({
      firstname: '',
      lastname: '',
      bio: '',
      images: ''
    })
  }

  submitForm(event) {
    event.preventDefault()

    if (this.validateFirstname() && this.validateLastname() && this.validateBio()) {
      const profileId = this.props.profile.id
      const updatedProfile = {
        first_name: this.state.firstname || this.props.first_name,
        last_name: this.state.lastname || this.props.last_name,
        bio: this.state.bio || this.props.bio,
        picture: this.props.newProfilePicture || this.props.picture
      }
      this.props.updateProfile(updatedProfile, profileId)
      this.clearInputFields()
      this.props.setEditProfileState()
    }

    return false
  }

  validateFirstname() {
    const firstname = this.state.firstname

    if (firstname.length <= 35) {
      this.setState({
        firstnameError: null
      })
      return true
    }
    this.setState({
      firstnameError: 'Max 35 Characters'
    })
    return false
  }

  validateLastname() {
    const lastname = this.state.lastname

    if (lastname.length <= 35) {
      this.setState({
        lastnameError: null
      })
      return true
    }
    this.setState({
      lastnameError: 'Max 35 Characters'
    })
    return false
  }

  validateBio() {
    const bio = this.state.bio

    if (bio.length <= 150) {
      this.setState({
        bioError: null
      })
      return true
    }
    this.setState({
      bioError: 'Max 150 characters'
    })
    return false
  }

  openEditProfile = () => {
    this.state.trustFormIsOpen && this.setState({ trustFormIsOpen: false})
    this.setState({ reportFormIsOpen: !this.state.reportFormIsOpen })
  }

  render() {
    const { loading } = this.props
    return (
      <Fragment>
          <div className="profile-content">
            <Dropzone
              multiple={false}
              accept="image/*"
              onDrop={this.onDrop.bind(this)}
              style={{border: "none"}}>
              <div style={{ position: 'relative', height: '100%' }}>
                <CardMedia
                className="profile-avatar"
                style={{ borderRadius: '50%', backgroundPosition: 'center center' }}
                image={this.props.newProfilePicture || 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png'}
                />
                <div className="progress-circle">{loading ? <CircularProgress /> : null }</div>
              </div>
            </Dropzone>

              <div className='profile-form'>
              <TextField
                InputLabelProps={{ shrink: !!this.props.first_name || this.state.firstname }}
                autoFocus={true}
                id="firstname"
                label="First name"
                margin="normal"
                fullWidth={false}
                className="firstname-input"
                onChange={this.handleChange('firstname')}
                placeholder={this.props.first_name}
                value={this.state.firstname}
                helperText={this.state.firstnameError}
                error={!!this.state.firstnameError}
              />

              <TextField
                InputLabelProps={{ shrink: !!this.props.last_name || this.state.lastname }}
                id="lastname"
                label="Last name"
                margin="normal"
                fullWidth={false}
                className="lastname-input"
                onChange={this.handleChange('lastname')}
                placeholder={this.props.last_name}
                value={this.state.lastname}
                helperText={this.state.lastnameError}
                error={!!this.state.lastnameError}
              />

              <TextField
                InputLabelProps={{ shrink: !!this.props.bio || this.state.bio }}
                multiline
                id="bio"
                label="Bio"
                margin="dense"
                fullWidth={false}
                className="bio-input"
                onChange={this.handleChange('bio')}
                placeholder={this.props.bio}
                value={this.state.bio}
                helperText={this.state.bioError}
                error={!!this.state.bioError}
              />

            <Button
              style={{
                height: 40,
                width: 40,
                marginTop: 'auto',
                minWidth: 40,
                borderRadius: 50,
              }}
              color="default"
              onClick={this.submitForm.bind(this)} >
              <Send style={{ width: 20, height: 20}}/>
            </Button>

            </div>
          </div>
      </Fragment>
    )
  }
}


const mapStateToProps = state => ({
  newProfilePicture: state.posts.newProfilePicture,
  loading: state.loading,
  profile: state.user.profile
})

export default connect(mapStateToProps, { updateProfile, uploadImage })(EditProfile)
