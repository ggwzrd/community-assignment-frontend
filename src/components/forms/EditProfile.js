import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

import { createPost } from '../../actions/posts/create'
import { uploadImage } from '../../actions/upload'
import Dropzone from 'react-dropzone'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import { CardMedia } from 'material-ui/Card'
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
    }

  onDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })

    this.props.uploadImage('uploadedFileCloudinaryUrl', files[0])
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


  submitForm(event) {
    event.preventDefault()

    if (this.validateFirstname() && this.validateLastname() && this.validateBio()) {
      const newPost = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        bio: this.state.bio,
        images: this.props.uploadedFileCloudinaryUrl
      }

      // this.props.createPost(newPost)
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


  render() {
    const { loading } = this.props
    return (
      <Fragment>
        <Paper className='profile-info'>

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
                image={this.props.uploadedFileCloudinaryUrl || 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png'}
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
        </Paper>
      </Fragment>
    )
  }
}


const mapStateToProps = state => ({
  uploadedFileCloudinaryUrl: state.posts.uploadedFileCloudinaryUrl,
  loading: state.loading
})

export default connect(mapStateToProps, { createPost, uploadImage })(EditProfile)




// <Card className="card" elevation={2}>
// <Dropzone
// multiple={false}
// accept="image/*"
// onDrop={this.onDrop.bind(this)}
// style={{border: "none"}}>
// <div style={{ position: 'relative', height: '100%' }}>
// <CardMedia
// className="cover-upload"
// image={this.props.uploadedFileCloudinaryUrl || 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png'}
// />
// <div className="progress-circle">{loading ? <CircularProgress /> : null }</div>
// </div>
// </Dropzone>
//
// <div>
// <CardContent className="content">
// <form onSubmit={this.submitForm.bind(this)}>
// <div className="post-form">
// <TextField
// style={{marginBottom: 10}}
// id="multiline-flex"
// label="Your post here"
// fullWidth={true}
// multiline
// rowsMax="4"
// margin="none"
// onChange={this.handleChange('content')}
// />
// <div className="error-text">{this.state.contentError}</div>
//
// <FormControl className="formControl">
// <InputLabel htmlFor="select-multiple-tags">Tags</InputLabel>
// <Select
// style={{marginBottom: 10}}
// margin="none"
// multiple
// value={this.state.tags}
// onChange={this.handleTagChange}
// input={<Input id="select-multiple-tags" />}
// renderValue={selected => (
//   <div className="chips">
//   {selected.map(value => <Chip
//     key={value}
//     label={value}
//     className="chip"
//     style={{height: 20}}
//     />)}
//     </div>
//   )}
//   >
//   {tags.map(tag => (
//     <MenuItem
//     key={tag}
//     value={tag}>
//     {tag}
//     </MenuItem>
//   ))}
//   </Select>
//   <div className="error-text">{this.state.tagError}</div>
//   </FormControl>
//   <div className="bottom-input">
//   <div className="link">
//   <TextField
//   id="link"
//   label="Link"
//   margin="none"
//   fullWidth={true}
//   className="link-input"
//   onChange={this.handleChange('link')}
//   />
//   <div className="error-text">{this.state.linkError}</div>
//   </div>
//
//   <Button
//   style={{height: 30, width: 30, marginTop: 'auto'}}
//   color="default"
//   onClick={this.submitForm.bind(this)} >
//   <Send style={{ width: 20, height: 20}}/>
//   </Button>
//   </div>
//   </div>
//   </form>
//   </CardContent>
//   </div>
//   </Card>
