import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import PostItem from '../components/PostItem'
import TagItem from '../components/TagItem'
import { fetchPosts } from '../actions/posts/fetch'
import { fetchTags } from '../actions/tags/fetch'
import './styles/PostsOverview.css'
import Dialog from 'material-ui/Dialog'
import uuid4 from 'uuid4'
import PostPage from './PostPage'

class PostsOverview extends PureComponent {
  state = {
    open: false,
    postId: null
  }
  // static propTypes = {
  //   posts: PropTypes.arrayOf(postShape).isRequired,
  //   tags: PropTypes.arrayOf(tagShape).isRequired
  // }

  componentWillMount() {
    this.props.fetchPosts()
    this.props.fetchTags()
  }

  handleDialogOpen = (postId) => (event) => {
    this.setState({
      open: true,
      postId: postId
    })
  }

  handleDialogClose = () => {
    this.setState({
      open: false,
      postId: null
    })
  }

  render() {
    console.log(this.props.tags)

    return (
      <div className="container">
        <div className="tags-container">
          {this.props.tags && this.props.tags.map(tag =>
            <TagItem
              key={uuid4()}
              name={tag.name}
              today_mentions={tag.today_mentions}
              description={tag.description}
              />)}
        </div>

        <div className="posts-container">
          {this.props.posts && this.props.posts.map(post =>
            <PostItem
              id={post.id}
              key={uuid4()}
              content={post.content}
              summary={post.summary}
              images={post.images}
              trusts={post.trusts}
              reports={post.reports}
              createdAt={post.created_at}
              onClick={this.handleDialogOpen(post.id)}
              />)}
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >

        <PostPage postId={this.state.postId}/>

        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  tags: state.tags
})

export default connect(mapStateToProps, { fetchPosts, fetchTags })(PostsOverview)
