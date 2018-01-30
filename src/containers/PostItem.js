import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './styles/PostItem.css'
// import Tag from './Tag'

class PostItem extends PureComponent {
  // static propTypes = {
  //
  // }

  render() {
    const { id, content, images, trusts, reports } = this.props

    return (
        <div className="post-item">
          <div className="post-info">
            <p>Trusts: {trusts.length}</p>
            <p>Reports: {reports.length}</p>
          </div>
          <p>{content}</p>
          <div className="post-img">
            <img src={images} alt='' />
          </div>
          <Link to={ `/posts/${id}` }>
            <div className="read-more-box"><p className="read-more">Read more</p></div>
          </Link>
        </div>
    )
  }
}

export default PostItem
