// src/actions/user/sign-up.js
import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
// import signIn from './sign-in'

export const USER_SIGNED_UP = 'USER_SIGNED_UP'

const api = new API()

export default (user) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/users', user)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        console.log("signup succesful");
        // dispatch(signIn(user)) // Sign in when sign up succeeded
        // api.authenticate(result.body).then((res) =>{
        //   console.log(res)
        // })
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
