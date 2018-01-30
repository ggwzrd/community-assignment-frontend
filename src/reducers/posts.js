// src/reducers/games.js
import { FETCHED_POSTS, FETCHED_USER_POSTS } from '../actions/posts/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_POSTS :
      return payload

    case FETCHED_USER_POSTS :
      return payload

    default :
      return state

  }
}
