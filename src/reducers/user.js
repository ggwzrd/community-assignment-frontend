import { FETCHED_USER } from '../actions/user/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_USER :
      return Object.assign({}, state, payload);

    default :
      return state
  }
}
