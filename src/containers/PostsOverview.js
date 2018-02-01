import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import PostItem from '../components/PostItem'
import TagItem from '../components/TagItem'
// import Tag from './Tag'
import './styles/PostsOverview.css'
import { fetchPosts } from '../actions/posts/fetch'
import Dialog from 'material-ui/Dialog'
import uuid4 from 'uuid4'


class PostsOverview extends PureComponent {
  state = {
    open: false,
  }
  // static propTypes = {
  //   posts: PropTypes.arrayOf(postShape).isRequired,
  //   tags: PropTypes.arrayOf(tagShape).isRequired
  // }

  componentWillMount() {
    this.props.fetchPosts()
  }

  handleDialogOpen = () => {
    this.setState({ open: true })
  }

  handleDialogClose = () => {
    this.setState({ open: false })
  }

  render() {

    console.log(this.props)

    let tagsArray = this.props.posts.map(post => post.tags)
    console.log(tagsArray)
    let mergedtagArray = [].concat.apply([],tagsArray)
    console.log(mergedtagArray)
    let tagIdArray = mergedtagArray.map(item => item.id)
    console.log(tagIdArray)

    return (
      <div className="container">
        <div className="tags-container">
          {mergedtagArray.map(tag =>
            <TagItem
              key={uuid4()}
              name={tag.name}
              total_mentions={tagIdArray.filter(id => id === tag.id).length}
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
              onClick={this.handleDialogOpen}
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
  posts: state.posts
})

export default connect(mapStateToProps, { fetchPosts })(PostsOverview)
