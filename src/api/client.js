// src/api/client.js

import request from 'superagent'
// import ActionCable from 'actioncable'

export default class ApiClient {
  defaultOptions = {
    tokenStorageKey: 'tokenKey'
  }

  constructor(host, options = {}) {
    // this.host = 'https://api-coinmunity.herokuapp.com'
    this.host = 'http://localhost:3030'
    // console.log(process.env.NODE_ENV)

    // this.host = process.env.NODE_ENV === 'production'
    //   ? 'https://api-coinmunity.herokuapp.com'
    //   : 'http://localhost:3030'

    this.options = { ...this.defaultOptions, ...options }


  }




  authenticate(user) {
    return this.post('/users/sign_in', user )
  }


  signOut() {
    this.removeToken()
  }

  get(path) {
    return request
      .get(this.createUrl(path))
      .set(this.headers())
  }

  post(path, data = {}) {
    return request
      .post(this.createUrl(path))
      .set(this.headers())
      .send(data)
  }

  put(path, data = {}) {
    return request
      .put(this.createUrl(path))
      .set(this.headers())
      .send(data)
  }


  patch(path, data = {}) {
    return request
      .patch(this.createUrl(path))
      .set(this.headers())
      .send(data)
  }


  delete(path) {
    return request
      .delete(this.createUrl(path))
      .set(this.headers())
  }

  headers() {
    let headers = {
      Accept: 'application/json'
    }

    if (this.isAuthenticated()) {
      headers.Authorization = `Bearer ${this.getToken()}`
    }

    return headers
  }

  isAuthenticated() {
    return !!this.getToken()
  }

  // Create a full URL to our API, including the host and path
  createUrl(path) {
    return [this.host, path].join('')
  }

  getToken() {
    return localStorage.getItem(this.options.tokenStorageKey)
  }

  storeToken(token) {
    localStorage.setItem(this.options.tokenStorageKey, token)
  }

  removeToken() {
    localStorage.removeItem(this.options.tokenStorageKey)
  }
}
