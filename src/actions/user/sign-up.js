// src/actions/user/sign-up.js
import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import signIn from './sign-in'

export const USER_SIGNED_UP = 'USER_SIGNED_UP'

const api = new API()

export default (user) => {
  console.log(user);
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    const signupUser = {
      user:
      {
        email:user.email,
        password:user.password,
        password_confirmation: user.passwordConfirmation
      }
    }

    api.post('/users', signupUser)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        const profileData = {
          nickname: user.nickname,
        }
        
        api.post(`/users/${result.body.id}/profiles`, profileData)
        .then((result) => {
          dispatch({ type: APP_DONE_LOADING })
          dispatch({type: USER_SIGNED_UP, payload: user})
        })
        .catch((error) => {
          dispatch({ type: APP_DONE_LOADING })
          dispatch({
            type: LOAD_ERROR,
            payload: error.message
          })
        })

        dispatch(signIn(signupUser)) // Sign in when sign up succeeded
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
