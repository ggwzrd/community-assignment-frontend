import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import PostItem from '../components/PostItem'
import TagItem from '../components/TagItem'
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
              name={tag.name}
              total_mentions={tagIdArray.filter(id => id === tag.id).length}
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
  posts: state.posts
})

export default connect(mapStateToProps, { fetchPosts })(PostsOverview)
