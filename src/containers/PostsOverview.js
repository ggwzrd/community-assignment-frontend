import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostItem from './PostItem'
// import Tag from './Tag'
import './styles/PostsOverview.css'
import fetchPosts from '../actions/posts/fetch'

class PostsOverview extends PureComponent {
  // static propTypes = {
  //   posts: PropTypes.arrayOf(postShape).isRequired,
  //   tags: PropTypes.arrayOf(tagShape).isRequired
  // }

  componentWillMount() {
    this.props.fetchPosts()
  }

  render() {
    console.log(this.props.posts)
    return (
      <div className="container">
        <div className="tags-container">
          <p>Tags here</p>
          <p>Tags here</p>
          <p>Tags here</p>
          <p>Tags here</p>
          <p>Tags here</p>
          <p>Tags here</p>
          <p>Tags here</p>
        </div>
        <div className="posts-container">
          {this.props.posts.map(post =>
            <PostItem
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
  posts: state.posts
})

export default connect(mapStateToProps, { fetchPosts })(PostsOverview)
