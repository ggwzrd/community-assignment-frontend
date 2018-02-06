import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const FETCHED_USER = 'FETCHED_USER'

const api = new API()

export const fetchUser = (userId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/users/${userId}`)
      .then((res) => {

        dispatch({
          type: FETCHED_USER,
          payload: res.body
        })
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
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
