//renders ProfileInfo, Button, PostItems
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'


// import { fetchUserPosts } from '../actions/posts/fetch'
import { fetchUserPosts } from '../../actions/posts/fetch'

class ProfilePage extends PureComponent {
  componentWillMount() {
    this.props.fetchUserPosts()
  }

  render() {
    return (
      <Paper>
        User profile page
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  posts: state.posts
})

export default connect(mapStateToProps, { fetchUserPosts })(ProfilePage)
