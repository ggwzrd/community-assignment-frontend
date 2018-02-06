// src/api/client.js

import request from 'superagent'
import ActionCable from 'actioncable'

export default class ApiClient {
  defaultOptions = {
    tokenStorageKey: 'tokenKey'
  }

  constructor(host, options = {}) {
    this.host = process.env.NODE_ENV === 'production'
      ? 'https://expert-chinbone.codaisseur.cloud' // WITHOUT the / !!!
      : (host || 'http://localhost:3030')

    this.options = { ...this.defaultOptions, ...options }

    const token = this.getToken()
    this.cable = ActionCable.createConsumer(`http://localhost:3030/cable?token=${token}`)
    this.subscription = false
    // this.subscribePosts()
  }


  // Authenticate and store the token
  //
  // Example:
  //  api.authenticate('me@co.com', 'supersecret')
  //    .then(res => console.log('authenticated!'))
  //    .catch(err => console.log(err))
  //
  // Returns: Promise

  subscribePosts = ( ) => {
    this.subscription = this.cable.subscriptions.create({channel:"PostsChannel"},
      {
        connected: this.connected,
        received: this.received
      }

    )
  }

  connected = () => {
    console.log("eomone connected");
  }
  received = (data) => {
    const dat = JSON.stringify(data)
    console.log(`Received Data: ${dat}`);

  };

  broadCast = () => {
    // console.log(this.subscription);
    this.subscription.send({ sent_by: "Paul", body: "This is a cool chat app." })
    // ActionCable.server.broadCast( "PostsChannel", { sent_by: 'Paul', body: 'This is a cool chat app.' } )
  }
  //
  // cableConnect = (callback) => {
  //   const token = this.getToken()
  //   var cable = ActionCable.createConsumer(`http://localhost:3030/cable?token=${token}`)
  //   // console.log(cable);
  //   this.subscription = cable.subscriptions.create({channel: 'PostsChannel'}, {received: callback})
  //   }


  authenticate(user) {
    return this.post('/users/sign_in', user )
  }

  // Sign out (remove the token from localStorage)
  //
  // Example:
  //  api.signOut()
  //
  // Returns: void
  signOut() {
    this.removeToken()
  }

  // GET path
  //
  // Example:
  //  api.get('/recipes')
  //    .then(res => console.log(res.body))
  //    .catch(err => console.log(err))
  //
  // Returns: Promise
  get(path) {
    return request
      .get(this.createUrl(path))
      .set(this.headers())
  }

  // POST path
  //
  // Example:
  //  api.post('/recipes', { title: 'Yummy Soup', ... })
  //    .then(res => console.log(res.body))
  //    .catch(err => console.log(err))
  //
  // Returns: Promise
  post(path, data = {}) {
    return request
      .post(this.createUrl(path))
      .set(this.headers())
      .send(data)
  }

  // PUT path
  //
  // Example:
  //  api.put('/recipes/39820384', { title: 'Yummy Soup', ... })
  //    .then(res => console.log(res.body))
  //    .catch(err => console.log(err))
  //
  // Returns: Promise
  put(path, data = {}) {
    return request
      .put(this.createUrl(path))
      .set(this.headers())
      .send(data)
  }

  // PATCH path
  //
  // Example:
  //  api.patch('/recipes/39820384', { title: 'Yummy Soup', ... })
  //    .then(res => console.log(res.body))
  //    .catch(err => console.log(err))
  //
  // Returns: Promise
  patch(path, data = {}) {
    return request
      .patch(this.createUrl(path))
      .set(this.headers())
      .send(data)
  }

  // DELETE path
  //
  // Example:
  //  api.delete('/recipes/39820384')
  //    .then(res => console.log(res.body))
  //    .catch(err => console.log(err))
  //
  // Returns: Promise
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
