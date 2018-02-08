import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import uuid4 from 'uuid4'
import { push } from 'react-router-redux'
import PostItem from '../components/PostItem'
import TagItem from '../components/TagItem'
import PostPage from './PostPage'
import CreatePostForm from '../components/forms/CreatePostForm'
import { fetchPosts } from '../actions/posts/fetch'
import { fetchTags } from '../actions/tags/fetch'

import Dialog from 'material-ui/Dialog'
// import uuid4 from 'uuid4'
// import PostPage from './PostPage'
// import CreatePostForm from '../components/forms/CreatePostForm'
// import API from '../api/client'
import './styles/PostsOverview.css'
// const api = new API()

class PostsOverview extends PureComponent {
  state = {
    open: false,
    selectedTagId: null,
    postId: null

  }

  selectTag(tagId) {
    if (tagId === this.state.selectedTagId) {
      this.setState({ selectedTagId: null })
    } else {
      this.setState({ selectedTagId: tagId })
    }
  }

  handleClick = (id) => {
    this.selectTag(id)
  }

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

  handleTagChange = event => {
    this.setState({ tag: event.target.value });
  }

  goToUser = userId => event => {
    this.props.push(`/users/${userId}`)
  }

  render() {
    const { selectedTagId } = this.state
    const { posts, tags } = this.props
    const todays_posts = tags ? tags.reduce((subTotal, tag) => subTotal + tag.todays_mentions, 0) : null

    console.log(this.state);
    return (
      <div className="container">
        { this.props.currentUser && <CreatePostForm tags={tags}/> }
        <div className="tags-container">
          <TagItem
            id={null}
            name={"All"}
            todays_mentions={todays_posts}
            description={"Show all posts"}
            handleClick={this.handleClick} />
          {tags && tags.map(tag =>
            <TagItem
              key={uuid4()}
              id={tag.id}
              name={tag.name}
              todays_mentions={tag.todays_mentions}
              description={tag.description}
              handleClick={this.handleClick}
              />)}
        </div>

        <div className="posts-container">
          {posts && (selectedTagId === null ? posts : posts.filter(post =>
            post.tags && post.tags.some(tag => {

              return tag.id === selectedTagId
            })
          ))
          .map(post =>
            <PostItem
              id={post.id}
              key={uuid4()}
              tags={post.tags}
              content={post.content}
              summary={post.summary}
              images={post.images}
              trusts={post.trusts}
              reports={post.reports}
              createdAt={post.created_at}
              trustiness={post.user.trustiness}
              picture={ post.user.profile.picture}
              nickname={post.user.profile.nickname}
              comments={post.comments}
              onClick={this.handleDialogOpen(post.id)}
              onProfileClick={this.goToUser(post.user_id)}
              />)}
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
          style={{ overflowY: "scroll" }}
        >
          <PostPage postId={this.state.postId}/>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.allPosts,
  tags: state.tags,
  currentUser: state.currentUser
})

export default connect(mapStateToProps, { fetchPosts, fetchTags, push })(PostsOverview)
