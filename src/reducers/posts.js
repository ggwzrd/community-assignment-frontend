import { FETCHED_POSTS, FETCHED_USER_POSTS, FETCHED_ONE_POST } from '../actions/posts/fetch'
import { CREATED_POST } from '../actions/posts/create'
import { CREATED_REPORT } from '../actions/posts/report'
import { CREATED_TRUST } from '../actions/posts/trust'

const INTIAL_STATE = {
  allPosts: [],
  selectedPost: {
    content: 'lorem ipsum',
    trusts: [],
    reports: [],
    images: '',
    created_at: new Date(),
  },
};

export default (state = INTIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case FETCHED_POSTS :
      return Object.assign({}, state, { allPosts: payload});

    case FETCHED_ONE_POST :
      return Object.assign({}, state, { selectedPost: payload, });

    // @NB ALWAYS use Object.assign in the reducer, otherwise you are going
    // to overwrite the full post state!
    // I had to change the actions FETCHED_POSTS, FETCHED_ONE_POST and CREATED_POST to use it
    // because it was continuosly trowing error messages about attributes that were
    // not defined.
    case FETCHED_USER_POSTS :
      return { ...payload }

    case CREATED_POST :
      return { allPosts: [payload].concat(state.allPosts) }

    // the two actions below are going to overwrite again the full state with an
    // either an array of trust or reports! @TODO fix this using Object.assign
    case CREATED_REPORT :
      return [{ ...state.reports}].concat(payload)

    case CREATED_TRUST :
      return [{...state.trusts}].concat(payload)

    default :
      return state
  }
}
