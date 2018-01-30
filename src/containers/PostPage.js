import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchOnePost } from '../actions/posts/fetch'
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

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
          <img src={ images } alt="Post's image"/>
          <Typography component="p">
            {content}
            {link}
          </Typography>
          <Button raised color="primary" className="trust">
            TRUST
          </Button>
          <Button raised color="secondary" className="report">
            REPORT
          </Button>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.posts
})

export default connect(mapStateToProps, { fetchOnePost })(PostPage)
