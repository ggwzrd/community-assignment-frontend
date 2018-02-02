import { FETCHED_ONE_POST } from '../actions/posts/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    // case FETCHED_ONE_POST :
    //   return { ...payload, ...state }

    default :
      return state
  }
}
