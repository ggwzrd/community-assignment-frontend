import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const CREATED_COMMENT = 'CREATED_COMMENT'

const api = new API()

export const createComment = (newComment) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/comments')
      .send(newComment)
      .then((result) => {

        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: CREATED_COMMENT,
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
