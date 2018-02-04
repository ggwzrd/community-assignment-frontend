import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid4 from 'uuid4';
// import PropTypes from 'prop-types'

// components
import PostItem from '../components/PostItem';
import TagItem from '../components/TagItem';
import PostPage from './PostPage';
import CreatePostForm from '../components/forms/CreatePostForm';

// actions
import { fetchPosts } from '../actions/posts/fetch'
import { fetchTags } from '../actions/tags/fetch'

// styles
import './styles/PostsOverview.css';

class PostsOverview extends PureComponent {
  state = {
    open: false,
    selectedTagId: null,
    postId: null

  }

  selectTag(tagId) {
    if (tagId === this.state.selectedTagId) {
      this.setState({ selectedTagId: null })
    } else {
      this.setState({ selectedTagId: tagId })
    }
  }

  handleClick = (id) => {
    this.selectTag(id)
  }

  componentWillMount() {
    this.props.fetchPosts()
    this.props.fetchTags()
  }


  handleTagChange = event => {
    this.setState({ tag: event.target.value });
  }

  handlePostClick = postId => (event) => {
    const { history, } = this.props;
    history.push(`/posts/${postId}`);
  }


  render() {
    const { selectedTagId, postId, } = this.state;
    const { posts, tags } = this.props;
    const todays_posts = tags ? tags.reduce((subTotal, tag) => subTotal + tag.todays_mentions, 0) : null

    return (
      <div className="container">
        <div className="">
          <CreatePostForm />
        </div>
        <div className="tags-container">
          <TagItem
            id={null}
            name={"All"}
            todays_mentions={todays_posts}
            description={"Show all posts"}
            handleClick={this.handleClick} />
          {tags && tags.map(tag =>
            <TagItem
              key={uuid4()}
              id={tag.id}
              name={tag.name}
              todays_mentions={tag.todays_mentions}
              description={tag.description}
              handleClick={this.handleClick}
              />)}
        </div>

        <div className="posts-container">


          {posts && (selectedTagId === null ? posts : posts.filter(post =>
            post.tags && post.tags.some(tag => {

              return tag.id === selectedTagId
            })
          ))
          .map(post =>
            <PostItem
              id={post.id}
              key={uuid4()}
              content={post.content}
              summary={post.summary}
              images={post.images}
              trusts={post.trusts}
              reports={post.reports}
              createdAt={post.created_at}
              onClick={this.handlePostClick(post.id)}
              />)}
        </div>

        <Switch>
          <Route path="/posts/:postId" component={PostPage} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.allPosts,
  tags: state.tags
})

export default connect(mapStateToProps, { fetchPosts, fetchTags })(PostsOverview)
