import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const CREATED_TRUST = 'CREATED_TRUST'

const api = new API()

export const reportPost = (newTrust) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/trusts')
      .send(newTrust)
      .then((result) => {

        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: CREATED_TRUST,
          payload: result.body
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
