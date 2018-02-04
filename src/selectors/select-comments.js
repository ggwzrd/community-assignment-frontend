import { createSelector, } from 'reselect';

const trustsSelector = state => state.posts.selectedPost.trusts;
const reportsSelector = state => state.posts.selectedPost.reports;

const commentType = (comment) => {
  if (comment.reason) return 'report';
  if (comment.source) return 'trust';

  return 'comment';
};

export const selectComments = createSelector(
  [trustsSelector, reportsSelector,], (trusts, reports) => {
    return [].concat(trusts, reports).map((comment) => ({
      avatar: 'https://organicthemes.com/demo/profile/files/2012/12/profile_img.png',
      commentedAt: comment.updated_at,
      content: comment.reason || '',
      source: comment.source || null,
      type: commentType(comment),
    })).sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at))
  }
);
