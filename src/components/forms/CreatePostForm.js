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
import Send from 'material-ui-icons/Send'

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

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       // width: 250,
//     },
//   },
// };

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
      tags: [],
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

    if (this.validateContent() && this.validateTags() && this.validateLink()) {
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
    } else if (content.length > 5000 ) {
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

    if (tags.length > 0) {
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
    const { loading } = this.props

    return (
      <Card className="card" elevation={0}>
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onDrop.bind(this)}
          style={{border: "none"}}>
          <div style={{ position: 'relative' }}>
            <CardMedia
              className="cover-upload"
              image={this.props.uploadedFileCloudinaryUrl || 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png'}
            />
            <div className="progress-circle">{loading ? <CircularProgress /> : null }</div>
          </div>
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
                />
                <div className="error-text">{this.state.contentError}</div>

                <FormControl className="formControl">
                  <InputLabel htmlFor="select-multiple-tags">Tags</InputLabel>
                  <Select
                    style={{marginBottom: 10}}
                    margin="none"
                    multiple
                    value={this.state.tags}
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
                    >
                    {tags.map(tag => (
                      <MenuItem
                        key={tag}
                        value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                  </Select>
                  <div className="error-text">{this.state.tagError}</div>
                </FormControl>
                <div className="bottom-input">
                  <div className="link">
                    <TextField
                       id="link"
                       label="Link"
                       margin="none"
                       fullWidth={true}
                       className="link-input"
                       onChange={this.handleChange('link')}
                    />
                    <div className="error-text">{this.state.linkError}</div>
                  </div>

                  <Button
                    style={{height: 30, width: 30, marginTop: 'auto'}}
                    color="default"
                    onClick={this.submitForm.bind(this)} >
                    <Send style={{ width: 20, height: 20}}/>
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    )
  }
}


const mapStateToProps = state => ({
  uploadedFileCloudinaryUrl: state.posts.uploadedFileCloudinaryUrl,
  loading: state.loading
})

CreatePostForm = withStyles(styles, { name: 'CreatePostForm' })(CreatePostForm)

export default connect(mapStateToProps, { createPost, uploadImage })(CreatePostForm)
