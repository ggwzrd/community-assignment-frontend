import { FETCHED_TAGS } from '../actions/tags/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_TAGS :
      return payload

    default :
      return state
  }
}
