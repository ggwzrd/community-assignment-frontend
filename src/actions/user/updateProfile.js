import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const UPDATED_PROFILE = 'UPDATED_PROFILE'

const api = new API()

export const updateProfile = (updatedProfile, profileId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.patch(`/profiles/${profileId}`)
      .send(updatedProfile)
      .then((result) => {

        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: UPDATED_PROFILE,
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
