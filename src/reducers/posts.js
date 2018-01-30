// src/reducers/games.js
import { FETCHED_POSTS } from '../actions/posts/fetch'

const posts = [{
  content: "textterdetext",
  user_id: "asdhjklafs897a9w4hkjq12h",
  tag_ids: [
            "id_1",
            "id_2",
            "id_3",
            "id_4",
            "id_5",
            "id_6",
            "id_7",
          ],
  place_id: "text",
  link: "text",
  images: "text",
  video: "text",
  trust_ids: [
              "id_1",
              "id_2",
              "id_3",
              "id_4",
              "id_5",
              "id_6",
              "id_7",
            ],
  report_ids: [
              "id_1",
              "id_2",
              "id_3",
              "id_4",
              "id_5",
              "id_6",
              "id_7",
            ],
  is_spam: false},
]

export default (state = posts, { type, payload } = {}) => {
  switch (type) {
    case FETCHED_POSTS :
      return payload

    default :
      return state

  }
}
