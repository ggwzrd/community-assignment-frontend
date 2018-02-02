import { FETCHED_POSTS, FETCHED_USER_POSTS, FETCHED_ONE_POST, FETCHED_SOURCES } from '../actions/posts/fetch'
import { CREATED_POST } from '../actions/posts/create'
import { CREATED_REPORT } from '../actions/posts/report'
import { CREATED_TRUST } from '../actions/posts/trust'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_SOURCES :
      return payload

    default :
      return state
  }
}
