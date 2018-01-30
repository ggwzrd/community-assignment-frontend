//renders ProfileInfo, Button, PostItems
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import fetchUser from '../actions/users/fetch'

class ProfilePage extends PureComponent {
  componentWillMount() {
    this.props.fetchUser()
  }

  render() {
    // console.log(this.props.posts);
    return (
      <div className="posts-container">

        Hello User

      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { fetchUser })(ProfilePage)
