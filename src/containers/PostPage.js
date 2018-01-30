import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchOnePost } from '../actions/posts/fetch'
import { reportPost } from '../actions/posts/report'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

export const postShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  is_spam: PropTypes.bool,
  // user: PropTypes.arrayOf(userShape),
  trusts: PropTypes.array,
  reports: PropTypes.array
})

class PostPage extends PureComponent {
  static propTypes = {
    ...postShape.isRequired,
  }

  componentWillMount() {
    this.props.fetchOnePost(this.props.match.params.postId)
  }

  state = {
    open: false,
    user_id: "1"
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleClick = () => {
    const postId = this.props.post.id
    const newReport = {
      reason: this.state.reason,
      link: this.state.link,
      screenshot: this.state.screenshot,
      user_id: this.state.user_id,
      post_id: postId
    }

    this.handleClose()

    this.props.reportPost(newReport)
  }

  handleChange = name => event => {
   this.setState({
     [name]: event.target.value
   })
  }

  render() {
    const { id, content, link, is_spam, trusts, reports, images } = this.props.post

    return (
      <div className="post-page">
        <Paper className="post-details" elevation={4}>
          <Typography type="headline" component="h3">
            Post# {id}
            {is_spam}
            Trust Count: {trusts && trusts.length}
            Report Count: {reports && reports.length}
          </Typography>
          <img src={images} alt="Something"/>
          <Typography component="p">
            {content}
            {link}
          </Typography>
          <Button
            raised
            color="primary"
            className="trust"
            onClick={this.trustPost}>
            TRUST
          </Button>
          <Button
            raised
            onClick={this.handleClickOpen}
            color="secondary"
            className="report">Report</Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
          <DialogTitle id="form-dialog-title">Report Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To report a post you need to fill in a reason.
            </DialogContentText>
            <TextField
              onChange={this.handleChange('reason')}
              autoFocus
              margin="dense"
              id="reason"
              label="Reason"
              type="email"
              fullWidth
            />
            <TextField
              onChange={this.handleChange('link')}
              autoFocus
              margin="dense"
              id="link"
              label="Link"
              type="link"
              fullWidth
            />
            <TextField
              onChange={this.handleChange('screenshot')}
              autoFocus
              margin="dense"
              id="screenshot"
              label="Screenshot"
              type="screenshot"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClick} color="primary">
              Report
            </Button>
          </DialogActions>
        </Dialog>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.posts
})

export default connect(mapStateToProps, { fetchOnePost, reportPost })(PostPage)
