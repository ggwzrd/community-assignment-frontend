//renders AuthorItem (author details...), Post, TrustButton, ReportButton, TrustNumber and ReportNumber
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchOnePost } from '../actions/posts/fetch'
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
    console.log(this.props)
    const { id, content, link, is_spam, trusts, reports, images } = this.props
    if (!id) return null

    return (
      //authorItem (name, trustiness, silenced if true)
      //post (content, link, image, is_spam)
      //trustCount & reportCount
      <div className="post-page">
        <Paper className="post-details" elevation={4}>
          <Typography type="headline" component="h3">
            {id}
            {is_spam}
            Trust Count: {trusts.length}
            Report Count: {reports.length}
          </Typography>
          <img src={images} alt="Something"/>
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

const mapStateToProps = ({ posts }, { match }) => {
  const post = posts.reduce((prev, next) => {
    if (next.id === match.params.postId) {
      return next
    }
    return prev
  }, {})
  console.log(post)

  return {
    ...post
  }
}

export default connect(mapStateToProps, { fetchOnePost })(PostPage)
