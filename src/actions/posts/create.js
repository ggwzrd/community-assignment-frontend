import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const CREATED_POST = 'CREATED_POST'

const api = new API()

export const createPost = (newPost) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/posts')
      .send(newPost)
      .then((result) => {

        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        
        dispatch({
          type: CREATED_POST,
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
