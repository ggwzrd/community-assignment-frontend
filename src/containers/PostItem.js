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
    const { _id, content, images, trusts, reports } = this.props

    return (
      <Link to={ `/posts/${_id}` }>
        <div className="post-item">
          <div className="post-info">
            <p>Trusts: {trusts.length}</p>
            <p>Reports: {reports.length}</p>
          </div>
          <p>{content}</p>
          <div className="post-img">
            <img src={images} alt='' />
          </div>
        </div>
      </Link>
    )
  }
}

export default PostItem
