import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PostsOverview from './containers/PostsOverview'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={PostsOverview} />
      </div>
    )
  }
}


// <Route path="/sign-in" component={SignIn} />
// <Route path="/sign-up" component={SignUp} />
// <Route exact path="/posts" component={PostsOverview} />
// <Route exact path="/posts/:postId" component={PostPage} />
