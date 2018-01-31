import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import PostItem from '../components/PostItem'

// import Tag from './Tag'
import './styles/PostsOverview.css'
import { fetchPosts } from '../actions/posts/fetch'

class PostsOverview extends PureComponent {
  // static propTypes = {
  //   posts: PropTypes.arrayOf(postShape).isRequired,
  //   tags: PropTypes.arrayOf(tagShape).isRequired
  // }

  componentWillMount() {
    this.props.fetchPosts()
  }

  render() {
    return (
        <div className="posts-container">
          {this.props.posts && this.props.posts.map(post =>
            <PostItem
              id={post.id}
              content={post.content}
              images={post.images}
              trusts={post.trusts}
              reports={post.reports} />)}
        </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps, { fetchPosts })(PostsOverview)
