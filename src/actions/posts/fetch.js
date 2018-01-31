import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const FETCHED_POSTS = 'FETCHED_POSTS'
export const FETCHED_ONE_POST = 'FETCHED_ONE_POST'
export const FETCHED_USER_POSTS = 'FETCHED_USER_POSTS'
export const FETCHED_SOURCES = 'FETCHED_SOURCES'

const api = new API()

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get('/posts')
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_POSTS,
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

export const fetchOnePost = (postId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/posts/${postId}`)
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_POST,
          payload: res.body
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

export const fetchUserPosts = (userId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/users/${userId}/posts`)
    .then((result) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })

      dispatch({
        type: FETCHED_USER_POSTS,
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

export const fetchSources = () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get('/sources')
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_SOURCES,
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
