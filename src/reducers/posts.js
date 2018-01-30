import { FETCHED_POSTS, FETCHED_USER_POSTS, FETCHED_ONE_POST } from '../actions/posts/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_POSTS :
      return payload

    case FETCHED_ONE_POST :
      const postIds = state.map(p => p.id)
      if (postIds.indexOf(payload.id) < 0) {
      return [{ ...payload }].concat(state)
      }
      return state.map((post) => {
      if (post.id === payload.id) {
        return { ...payload }
      }
      return post
      })

    case FETCHED_USER_POSTS :
      return payload

    default :
      return state
  }
}
