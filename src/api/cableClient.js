import ActionCable from 'actioncable';
import API from './client'
// 1. Configure your websocket address
const WEBSOCKET_HOST = process.env.NODE_ENV === 'production'
                         ? 'wss://api-coinmunity.herokuapp.com/cable'
                         : 'ws://localhost:3030/cable';
const api = new API()

export default class cableClient {
  // 2. Define our constructor
  constructor() {
    const token = api.getToken()
    // if (token){
      this.cable = ActionCable.createConsumer(`${WEBSOCKET_HOST}?token=${token}`);
      console.log("consumer created");
      console.log(this.cable);
    // }
    // else {
    //   this.cable = ActionCable.createConsumer(`${WEBSOCKET_HOST}`);
    //   // console.log("No user found");
    //
    // }
    this.appearanceChannel = false
    this.postsChannel = false
  }


  // 3. Define the function we will call to subscribe to our channel
  subscribeAppearance = () => {
    if(!this.appearanceChannel && this.cable){

      this.appearanceChannel = this.cable.subscriptions.create(
        { channel: "AppearanceChannel" },
        {
          connected: this.connected,
          disconnected: this.disconnected,
          received: this.received,
          rejected: this.rejectedAppearance,
        }
      )
    }
  }

  subscribePosts = () => {

    if (!this.postsChannel && this.cable){
      this.postsChannel = this.cable.subscriptions.create(
        { channel: "PostsChannel" },
        {
          connected: this.connected,
          disconnected: this.disconnected,
          received: this.received,
          rejected: this.rejectedPosts,
        }
      )
    }
  }

  findCons = () => {
    console.log(ActionCable.server);
  }

  findSub = (sub) => (event) => {

    console.log(this.cable.subscriptions.subscriptions[0]);
    console.log(ActionCable.subscriptions.subscriptions);
  }

  unsubscribePosts = () => {
    if (this.postsChannel) {
      // console.log(this.postsChannel);
      // this.cable.subscriptions.unsubscribe(this.postsChannel)
      this.postsChannel.unsubscribe()
      this.postsChannel = false
    }
  }
  unsubscribeAppearance = () => {
    if (this.appearanceChannel) {
      this.appearanceChannel.unsubscribe()
      // this.cable.subscriptions.remove(this.appearanceChannel)
      this.appearanceChannel = false
      // console.log(this.appearanceChannel);
    }
  }

  // 4. Define our default ActionCable callbacks.
  received = (data) => {
    const dat = JSON.stringify(data)
    console.log(`Received Data: ${dat}`);

  };

  connected = () => {
    console.log(`User connected`)

  };

  disconnected = () => {
    console.warn(`User disconnected.`)
  };

  rejectedAppearance = () => {
    console.warn(`I was rejected! :( `)
    // console.log(this.appearanceChannel);
    // this.unsubscribeAppearance()
    this.appearanceChannel = false

  };
  rejectedPosts = () => {
    console.warn(`I was rejected! :( `)
    // this.unsubscribePosts()
    this.postsChannel = false
  };

  broadCastPosts = (text) => (event) => {
    // console.log(text);
    if (this.postsChannel) {
      this.postsChannel.send({message: text})  }
    }
}
