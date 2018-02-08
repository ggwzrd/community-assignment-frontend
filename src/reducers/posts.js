import { FETCHED_POSTS, FETCHED_USER_POSTS, FETCHED_ONE_POST } from '../actions/posts/fetch'
import { CREATED_POST } from '../actions/posts/create'
import { CREATED_REPORT } from '../actions/posts/report'
import { CREATED_TRUST } from '../actions/posts/trust'
import { CREATED_COMMENT } from '../actions/posts/comment'
import { UPLOADED_IMAGE } from '../actions/upload'

const INITIAL_STATE = {
  allPosts: [],
  selectedPost: {
    content: 'Oops, I think we missed it.',
    trusts: [],
    reports: [],
    created_at: new Date(),
    updated_at: new Date(),
  },
  userTrustiness: 10,
  userProfilePic: "",
  userProfileName: ""
}

const concatPostTrust = (post, trust) => {
  return Object.assign({}, post, { trusts: [].concat(post.trusts, [trust])})
}

const concatPostReport = (post, report) => {
  return Object.assign({}, post, { reports: [].concat(post.reports, [report])})
}

const concatPostComment = (post, comment) => {
  return Object.assign({}, post, { comments: [].concat(post.comments, [comment])})
}

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case FETCHED_POSTS :
      return Object.assign({}, state, { allPosts: payload})

    case FETCHED_ONE_POST :
      return { ...state, selectedPost: payload, userTrustiness: payload.user.trustiness, userProfilePic: payload.user.profile.picture, userProfileName: payload.user.profile.nickname }

    // @NB ALWAYS use Object.assign in the reducer, otherwise you are going
    // to overwrite the full post state!
    // I had to change the actions FETCHED_POSTS, FETCHED_ONE_POST and CREATED_POST to use it
    // because it was continuosly trowing error messages about attributes that were
    // not defined.
    case FETCHED_USER_POSTS :
      return Object.assign({}, state, { userPosts: payload, });

    case CREATED_POST :
    console.log(payload);
      return Object.assign({}, state, { allPosts: [payload].concat(state.allPosts) })

    // the two actions below were overwriting the full state with
    // either an array of trusts or reports! @NB I fixed this
    case CREATED_REPORT :
    const updatedReports = state.allPosts.map(post => {
      if (post.id === payload.post_id) {
        return {...post, reports: [payload].concat(post.reports)}
      }
      return post
    })
      return Object.assign({}, state, { allPosts: updatedReports, selectedPost: concatPostReport(state.selectedPost, payload), })

    case CREATED_TRUST :
    const updatedTrusts = state.allPosts.map(post => {
        if (post.id === payload.post_id) {
          return {...post, trusts: [payload].concat(post.trusts)}
        }
        return post
      })
      return Object.assign({}, state, { allPosts: updatedTrusts, selectedPost: concatPostTrust(state.selectedPost, payload), })

    case CREATED_COMMENT :
      const updatedComments = state.allPosts.map(post => {
        if (post.id === payload.post_id) {
          return {...post, comments: [payload].concat(post.comments)}
        }
        return post
      })
      return Object.assign({}, state, { allPosts: updatedComments, selectedPost: concatPostComment(state.selectedPost, payload), })

    case UPLOADED_IMAGE :
      return Object.assign({}, state, { [payload.name]: payload.image })

    default :
      return state
  }
}
