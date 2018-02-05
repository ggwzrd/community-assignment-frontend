import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import { createPost } from '../../actions/posts/create'
import '../styles/CreatePostForm.css'
import TextField from 'material-ui/TextField'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Chip from 'material-ui/Chip'
import { withStyles } from 'material-ui/styles'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import Icon from 'material-ui/Icon'
import Send from 'material-ui-icons/Send'


const CLOUDINARY_UPLOAD_PRESET = 'hhstyojs'
const CLOUDINARY_UPLOAD_URL = '	https://api.cloudinary.com/v1_1/dyyxiefx5/upload'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
};

const tags = [
  'Analysis',
  'News',
  'Technical',
  'Political',
  'Business',
  'Random',
  'Social'
]

export class CreatePostForm extends PureComponent {
  static propTypes = {
    createPost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }

  state = {
      content: '',
      link: '',
      uploadedFileCloudinaryUrl: '',
      tag: []
    }

  onDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })

    this.handleImageUpload(files[0])
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        })
      }
    })
  }

  handleChange = name => event => {
   this.setState({
     [name]: event.target.value
   })
  }

  handleTagChange = event => {
    this.setState({ tag: event.target.value });
  }

  submitForm(event) {
    event.preventDefault()
    if (this.validateContent(event) && this.validateLink()) {
      const newPost = {
        content: this.state.content,
        link: this.state.link,
        tags: this.state.tag || [],
        images: this.state.uploadedFileCloudinaryUrl
      }

      this.props.createPost(newPost)
    }

    return false
  }

  validateContent(event) {
    const content = this.state.content

    if (content.length > 1 && content.length <= 5000) {
      this.setState({
        contentError: null
      })
      return true
    } else if (content.length <= 0){
      this.setState({
        contentError: 'Content is required'
      })
      return false
    } else if (content.length < 5000 ) {
      this.setState({
        contentError: 'Max 5000 characteres'
      })
      return false
    }
  }

  validateLink() {
    const link = this.state.link

    if (link.length > 1) {
      this.setState({
        linkError: null
      })

      return true
    }

    this.setState({
      linkError: 'Link is required'
    })

    return false
  }

  render() {

    return (
      <Card className="card" elevation={0}>
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onDrop.bind(this)}
          style={{border: "none"}}>
          <CardMedia
            className="cover-upload"
            image={this.state.uploadedFileCloudinaryUrl || 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png'}
            />
        </Dropzone>

        <div>
        <CardContent className="content">

            <form onSubmit={this.submitForm.bind(this)}>
              <div className="post-form">
                <TextField
                  style={{marginBottom: 10}}
                  id="multiline-flex"
                  label="Your post here"
                  fullWidth={true}
                  multiline
                  rowsMax="4"
                  margin="none"
                  onChange={this.handleChange('content')}
                  helperText={this.state.contentError}
                />

                <FormControl className="formControl">
                  <InputLabel htmlFor="select-multiple-tags">Tags</InputLabel>
                  <Select
                    style={{marginBottom: 10}}
                    margin="none"
                    multiple
                    value={this.state.tag}
                    onChange={this.handleTagChange}
                    input={<Input id="select-multiple-tags" />}
                    renderValue={selected => (
                      <div className="chips">
                        {selected.map(value => <Chip
                                                  key={value}
                                                  label={value}
                                                  className="chip"
                                                  style={{height: 20}}
                                                />)}
                      </div>
                    )}
                    // MenuProps={MenuProps}
                    >
                    {tags.map(tag => (
                      <MenuItem
                        key={tag}
                        value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                   id="link"
                   label="Link"
                   margin="none"
                   fullWidth={false}
                   className="link-input"
                   onChange={this.handleChange('link')}
                   helperText={this.state.linkError}
                />
                <Button
                  style={{height: 30, width: 30, marginTop: 'auto'}}
                  color="default"
                  onClick={this.submitForm.bind(this)} >
                  <Send style={{ width: 20, height: 20}}/>
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    )
  }
}

export default connect(null, {createPost})(CreatePostForm)
