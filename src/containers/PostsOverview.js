import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPosts } from '../actions/posts/fetch'
import { postShape } from './PostPage'
// import PostItem from './PostItem'
// import Tag from './Tag'
// import './styles/PostsOverview.css'

class PostsOverview extends PureComponent {
  static propTypes = {
    posts: PropTypes.arrayOf(postShape).isRequired,
  //   tags: PropTypes.arrayOf(tagShape).isRequired
  }

  componentWillMount() {
    this.props.fetchPosts()
  }

  render() {
    return (
      <div className="posts-container">

        {this.props.posts[0].content}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps, { fetchPosts })(PostsOverview)
