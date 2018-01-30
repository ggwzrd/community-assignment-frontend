import { FETCHED_POSTS, FETCHED_ONE_POST } from '../actions/posts/fetch'

// const posts = [{
//   content: "textterdetext",
//   user_id: "asdhjklafs897a9w4hkjq12h",
//   tag_ids: [
//             "id_1",
//             "id_2",
//             "id_3",
//             "id_4",
//             "id_5",
//             "id_6",
//             "id_7",
//           ],
//   place_id: "text",
//   link: "text",
//   images: "text",
//   video: "text",
//   trust_ids: [
//               "id_1",
//               "id_2",
//               "id_3",
//               "id_4",
//               "id_5",
//               "id_6",
//               "id_7",
//             ],
//   report_ids: [
//               "id_1",
//               "id_2",
//               "id_3",
//               "id_4",
//               "id_5",
//               "id_6",
//               "id_7",
//             ],
//   is_spam: false},
// ]

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_POSTS :
      return payload

    case FETCHED_ONE_POST :
      const postIds = state.map(p => p._id)
      if (postIds.indexOf(payload._id) < 0) {
      return [{ ...payload }].concat(state)
      }
      return state.map((post) => {
      if (post._id === payload._id) {
        return { ...payload }
      }
      return post
      })

    default :
      return state
  }
}
