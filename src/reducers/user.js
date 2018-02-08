import { FETCHED_USER } from '../actions/user/fetch'
import { UPDATED_PROFILE } from '../actions/user/updateProfile'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_USER :
      return Object.assign({}, state, payload);

    case UPDATED_PROFILE :
      return Object.assign({}, state, { ...state.user, profile: payload } )

    default :
      return state
  }
}
