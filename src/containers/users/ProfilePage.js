//renders ProfileInfo, Button, PostItems
import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import PostItem from '../PostItem'



// import { fetchUserPosts } from '../actions/posts/fetch'
import { fetchUserPosts } from '../../actions/posts/fetch'

class ProfilePage extends PureComponent {
  componentWillMount() {
    const userId = this.props.match.params.userId
    this.props.fetchUserPosts(userId)
  }

  render() {
    console.log(this.props);
    return (
      <Fragment>
        <Paper>
          User profile page
        </Paper>

        <div className="posts-container">
          {this.props.posts.map(post =>
            <PostItem
              id={post.id}
              content={post.content}
              images={post.images}
              trusts={post.trusts}
              reports={post.reports} />)}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  posts: state.posts
})

export default connect(mapStateToProps, { fetchUserPosts })(ProfilePage)
