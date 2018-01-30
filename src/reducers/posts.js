import { FETCHED_POSTS, FETCHED_USER_POSTS, FETCHED_ONE_POST } from '../actions/posts/fetch'
import { CREATED_POST } from '../actions/posts/create'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_POSTS :
      return payload

    case FETCHED_ONE_POST :
      return {...payload}

    case FETCHED_USER_POSTS :
      return payload

    case CREATED_POST :
      return payload

    default :
      return state
  }
}
