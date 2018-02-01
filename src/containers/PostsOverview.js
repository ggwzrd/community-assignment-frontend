import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import PostItem from '../components/PostItem'
import TagItem from '../components/TagItem'
import { fetchPosts } from '../actions/posts/fetch'
import { fetchTags } from '../actions/tags/fetch'
import './styles/PostsOverview.css'

class PostsOverview extends PureComponent {
  // static propTypes = {
  //   posts: PropTypes.arrayOf(postShape).isRequired,
  //   tags: PropTypes.arrayOf(tagShape).isRequired
  // }

  componentWillMount() {
    this.props.fetchPosts()
    this.props.fetchTags()
  }

  render() {
    console.log(this.props.tags)

    return (
      <div className="container">
        <div className="tags-container">
          {this.props.tags && this.props.tags.map(tag =>
            <TagItem
              name={tag.name}
              today_mentions={tag.today_mentions}
              description={tag.description}
              />)}
        </div>

        <div className="posts-container">
          {this.props.posts && this.props.posts.map(post =>
            <PostItem
              id={post.id}
              content={post.content}
              images={post.images}
              trusts={post.trusts}
              reports={post.reports} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  tags: state.tags
})

export default connect(mapStateToProps, { fetchPosts, fetchTags })(PostsOverview)
