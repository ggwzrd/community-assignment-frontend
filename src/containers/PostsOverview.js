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
import CreatePostForm from '../components/forms/CreatePostForm'

class PostsOverview extends PureComponent {
  state = {
    open: false,
    selectedTagId: null,
  }
  // static propTypes = {
  //   posts: PropTypes.arrayOf(postShape).isRequired,
  //   tags: PropTypes.arrayOf(tagShape).isRequired
  // }

  selectTag(tagId) {
    this.setState({ selectedTagId: tagId })
  }

  componentWillMount() {
    this.props.fetchPosts()
    this.props.fetchTags()
  }

  handleDialogOpen = () => {
    this.setState({ open: true })
  }

  handleDialogClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { selectedTagId } = this.state
    console.log(this.props)
    console.log(this.state)
    return (
      <div className="container">
        <div className="">
          <CreatePostForm />
        </div>
        <div className="tags-container">
          {this.props.tags && this.props.tags.map(tag =>
            <TagItem
              key={uuid4()}
              id={tag.id}
              name={tag.name}
              todays_mentions={tag.todays_mentions}
              description={tag.description}
              selectTag={this.selectTag}
              />)}
        </div>

        <div className="posts-container">
          {this.props.posts && (selectedTagId === null ? this.props.posts : this.props.posts.filter(post => {
            post.tags.some(tag => {
              return tag.id === selectedTagId
            })
          }))
          .map(post =>
            <PostItem
              id={post.id}
              key={uuid4()}
              content={post.content}
              summary={post.summary}
              images={post.images}
              trusts={post.trusts}
              reports={post.reports}
              createdAt={post.created_at}
              onClick={this.handleDialogOpen}
              selectedTagId={selectedTagId}
              />)}
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >

        <PostItem
          trusts={[1,2]}
          reports={[1,2]}
                />

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
