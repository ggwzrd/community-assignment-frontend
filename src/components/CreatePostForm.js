import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import { createPost } from '../actions/posts/create'
import './styles/CreatePostForm.css'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

const dialogStyle = {
  width: '60%',
  marginLeft: '0',
  padding: '2rem'
}

export class CreatePostForm extends PureComponent {
  static propTypes = {
    createPost: PropTypes.func.isRequired,
  }

  state = {
    user_id: "1"
  }

  handleChange = name => event => {
   this.setState({
     [name]: event.target.value
   })
  }

  submitForm(event) {
    event.preventDefault()

    const newPost = this.state

    this.props.createPost(newPost)
  }

  // validateContent() {
  //   const { content } = this.state.content
  //
  //   if (content.getValue().length <= 500) {
  //     this.setState({
  //       contentError: null
  //     })
  //     return true
  //   }
  //
  //   this.setState({
  //     contentError: 'Max 500 characteres'
  //   })
  //   console.log('max 500 characteres')
  //   return false
  // }

  render() {
    return (
      <div className="create-post">
        <h1>Create new post</h1>
        <Paper style={ dialogStyle }>
          <form onSubmit={this.submitForm.bind(this)}>
            <div className="post-field">
              <TextField
                 id="multiline-static"
                 label="Your post here"
                 fullWidth="true"
                 multiline
                 rows="10"
                 margin="normal"
                 onChange={this.handleChange('content')}
              />
            </div>
            <div className="img-link-fields">
              <TextField
                 id="image"
                 label="Images(url)"
                 margin="normal"
                 onChange={this.handleChange('images')}
              />
              <TextField
                 id="link"
                 label="Link"
                 margin="normal"
                 onChange={this.handleChange('link')}
              />
            </div>
            <Button
              className="submit-button"
              raised
              color="secondary"
              onClick={ this.submitForm.bind(this) }>Submit</Button>
          </form>
        </Paper>
      </div>
    )
  }
}

// const mapStateToProps = ({ currentUser }) => ({ currentUser })

export default connect(null, { createPost })(CreatePostForm)
