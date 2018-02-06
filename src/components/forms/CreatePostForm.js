import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { createPost } from '../../actions/posts/create'
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

import '../styles/CreatePostForm.css'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 60,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: 10,
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
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
      tags: []
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
   })
  }

  handleTagChange = event => {
    this.setState({
      tags: event.target.value
    })
  }

  submitForm(event) {
    event.preventDefault()

    if (this.validateContent() && this.validateLink() && this.validateTags()) {
      const newPost = {
        content: this.state.content,
        link: this.state.link,
        tags: this.state.tags || [],
        images: this.props.uploadedFileCloudinaryUrl
      }

      this.props.createPost(newPost)
    }

    return false
  }

  validateContent() {
    const content = this.state.content

    if (content.length > 1 && content.length <= 5000) {
      this.setState({
        contentError: null
      })

      return true
    } else if (content.length <= 0) {
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

  validateTags() {
    const tags = this.state.tags

    if (tags.length >= 1) {
      this.setState({
        tagError: null
      })

      return true
    }

    this.setState({
      tagError: 'Tag is required'
    })

    return false
  }

  render() {
    const { classes, loading } = this.props

    return (
      <Card className="card" elevation={0}>
        <div className="details">

          <div className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-tags">Tags</InputLabel>
              <Select
                multiple
                value={this.state.tags}
                onChange={this.handleTagChange}
                input={<Input id="select-multiple-tags" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => <Chip key={value}
                                                 label={value}
                                                 className={classes.chip}
                                                 style={{height: 20}}/>
                     )}
                  </div>
                )}
                MenuProps={MenuProps}>
                {tags.map(tag => (
                  <MenuItem
                    key={tag}
                    value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
              <p className="error-text">{this.state.tagError}</p>
            </FormControl>
          </div>

          <CardContent className="content">
            <form onSubmit={this.submitForm.bind(this)}>
              <div className="input-fields">
                <Dropzone
                  multiple={false}
                  accept="image/*"
                  onDrop={this.onDrop.bind(this)}
                  style={{border: "none"}}>
                  <div style={{ position: 'relative' }}>
                    <CardMedia
                      className="cover"
                      image={this.props.uploadedFileCloudinaryUrl || 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png'}
                      />
                    <div className="progress-circle">{loading ? <CircularProgress /> : null }</div>
                  </div>
                </Dropzone>

                <div className="text-fields">
                  <TextField
                     id="multiline-flex"
                     label="Your post here"
                     fullWidth={true}
                     multiline
                     rows="3"
                     margin="normal"
                     onChange={this.handleChange('content')}
                  />
                  <p className="error-text">{this.state.contentError}</p>

                <TextField
                     id="link"
                     label="Link"
                     margin="none"
                     fullWidth={true}
                     onChange={this.handleChange('link')}
                  />
                  <p className="error-text">{this.state.linkError}</p>
                </div>
              </div>

              <div className="submit-button">
                <Button
                  size="small"
                  flat="true"
                  color="secondary"
                  onClick={this.submitForm.bind(this)}>Submit</Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    )
  }
}

CreatePostForm = withStyles(styles, { name: 'CreatePostForm' })(CreatePostForm)

const mapStateToProps = state => ({
  uploadedFileCloudinaryUrl: state.posts.uploadedFileCloudinaryUrl,
  loading: state.loading
})

export default connect(mapStateToProps, { createPost, uploadImage })(CreatePostForm)
