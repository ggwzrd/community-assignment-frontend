import { USER_SIGNED_IN } from '../actions/user/sign-in'
import { USER_SIGNED_OUT } from '../actions/user/sign-out'

const CURRENT_USER_KEY = 'currentUserCoiNerd'
// const currentUserFromLocalStorage = JSON.parse(
//   window.localStorage.getItem(CURRENT_USER_KEY) || 'null'
// )

export default (state = {}, { type, payload } = {}) => {
  switch (type) {
    case USER_SIGNED_IN :
      const currentUser = { state, ...payload }
      return currentUser

    case USER_SIGNED_OUT :
      window.localStorage.removeItem(CURRENT_USER_KEY)
      return null

    default :
      return state
  }
}
