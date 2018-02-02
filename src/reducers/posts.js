import { FETCHED_POSTS, FETCHED_USER_POSTS, FETCHED_ONE_POST, FETCHED_SOURCES } from '../actions/posts/fetch'
import { CREATED_POST } from '../actions/posts/create'
import { CREATED_REPORT } from '../actions/posts/report'
import { CREATED_TRUST } from '../actions/posts/trust'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_POSTS :
      return { allPosts: payload}

    case FETCHED_ONE_POST :
      return { ...state, selectedPost: payload }

    case FETCHED_USER_POSTS :
      return { ...payload }

    case CREATED_POST :
      return { allPosts: [payload].concat(state.allPosts) }

    case CREATED_REPORT :
      return [{ ...state.reports}].concat(payload)

    case CREATED_TRUST :
      return [{...state.trusts}].concat(payload)

    default :
      return state
  }
}
