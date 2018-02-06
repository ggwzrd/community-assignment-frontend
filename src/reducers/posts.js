import { FETCHED_POSTS, FETCHED_USER_POSTS, FETCHED_ONE_POST } from '../actions/posts/fetch'
import { CREATED_POST } from '../actions/posts/create'
import { CREATED_REPORT } from '../actions/posts/report'
import { CREATED_TRUST } from '../actions/posts/trust'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_POSTS :
      return { allPosts: payload}

    case FETCHED_ONE_POST :
      return { ...state, selectedPost: payload, userTrustiness: payload.user.trustiness, userProfilePic: payload.user.profile.picture, userProfileName: payload.user.profile.nickname }

    case FETCHED_USER_POSTS :
      return Object.assign({}, state, { userPosts: payload, });

    case CREATED_POST :
      return { ...state, allPosts: [payload].concat(state.allPosts) }

    case CREATED_REPORT :
      return { ...state }

    case CREATED_TRUST :
      return

    default :
      return state
  }
}
//
// import { FETCHED_POSTS, FETCHED_USER_POSTS, FETCHED_ONE_POST } from '../actions/posts/fetch'
// import { CREATED_POST } from '../actions/posts/create'
// import { CREATED_REPORT } from '../actions/posts/report'
// import { CREATED_TRUST } from '../actions/posts/trust'
//
// const INTIAL_STATE = {
//   allPosts: [],
//   selectedPost: {
//     content: 'Ops, I think we missed it.',
//     trusts: [],
//     reports: [],
//     images: 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png',
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
// };
//
// const concatPostTrust = (post, trust) => {
//   return Object.assign({}, post, { trusts: [].concat(post.trusts, [trust])});
// }
//
// const concatPostReport = (post, report) => {
//   return Object.assign({}, post, { reports: [].concat(post.reports, [report])});
// }
//
// export default (state = INTIAL_STATE, { type, payload } = {}) => {
//   switch (type) {
//     case FETCHED_POSTS :
//       return Object.assign({}, state, { allPosts: payload});
//
//     case FETCHED_ONE_POST :
//       return Object.assign({}, state, { selectedPost: payload, });
//
//     // @NB ALWAYS use Object.assign in the reducer, otherwise you are going
//     // to overwrite the full post state!
//     // I had to change the actions FETCHED_POSTS, FETCHED_ONE_POST and CREATED_POST to use it
//     // because it was continuosly trowing error messages about attributes that were
//     // not defined.
//     case FETCHED_USER_POSTS :
//       return { ...payload }
//
//     case CREATED_POST :
//       return Object.assign({}, state, { allPosts: [payload].concat(state.allPosts) })
//
//     // the two actions below were overwriting the full state with
//     // either an array of trusts or reports! @NB I fixed this
//     case CREATED_REPORT :
//       return Object.assign({}, state, { selectedPost: concatPostReport(state.selectedPost, payload), });
//
//     case CREATED_TRUST :
//       return Object.assign({}, state, { selectedPost: concatPostTrust(state.selectedPost, payload), });
//
//     default :
//       return state
//   }
// }
