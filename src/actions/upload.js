// import API from '../api/client'
import request from 'superagent'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from './loading'

export const UPLOADED_IMAGE = 'UPLOADED_IMAGE'

// const api = new API()

const CLOUDINARY_UPLOAD_PRESET = 'hhstyojs'
const CLOUDINARY_UPLOAD_URL = '	https://api.cloudinary.com/v1_1/dyyxiefx5/upload'

export const uploadImage = (stateName, file) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)
                        .then((response) => {

                          dispatch({ type: APP_DONE_LOADING })
                          dispatch({ type: LOAD_SUCCESS })

                          dispatch({
                            type: UPLOADED_IMAGE,
                            payload: {name: stateName, image: response.body.secure_url }
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
