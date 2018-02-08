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
  const signupUser = {
    user:
    {
      email: user.email,
      nickname: user.nickname,
      password: user.password,
      password_confirmation: user.passwordConfirmation
    }
  }

  const profileData = {
    nickname: user.nickname
  }

  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/users', signupUser)

      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        console.log(user);

        api.storeToken(result.body.token)

        api.post('/profiles', profileData)
        //
        .then((result) => {
          dispatch({ type: APP_DONE_LOADING })
          dispatch({type: USER_SIGNED_UP, payload: user})

          dispatch(signIn(signupUser)) // Sign in when sign up succeeded

        })
        .catch((error) => {
          console.log();
          dispatch({ type: APP_DONE_LOADING })
          dispatch({
            type: LOAD_ERROR,
            payload: error.message
          })
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
