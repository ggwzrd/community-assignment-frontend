import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PostsOverview from './containers/PostsOverview'
import ProfilePage from './containers/users/ProfilePage'

export default class Routes extends Component {
  render() {
    return (
      <main className="mainContainer">
        <Switch>
          <Route exact path="/" component={PostsOverview} />
          <Route path="/posts" component={PostsOverview} />
          <Route exact path="/users/:userId" component={ProfilePage} />
        </Switch>
      </main>
    )
  }
}


// <Route path="/sign-in" component={SignIn} />
// <Route path="/sign-up" component={SignUp} />
