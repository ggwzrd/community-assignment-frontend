// import { replace } from 'react-router-redux'
import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const USER_SIGNED_IN = 'USER_SIGNED_IN'

const api = new API()

export default ( user ) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })
    api.authenticate(user)
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        const jwt = res.body.token

        api.storeToken(jwt)
        // var sub = api.cableConnect()
        // api.subscribePosts()
        // api.broadCast()
        // Redirect programatically to the Lobby
        return res.body

      })
      .then((res) => {
        dispatch({
          type: USER_SIGNED_IN,
          payload: res
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
