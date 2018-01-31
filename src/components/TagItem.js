import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

class TagItem extends PureComponent {

  render() {
    const { id, name, description, total_mentions } = this.props

    return (
        <div className="tag-item">
          <div className="tag-info">
            <Link to={ `/posts/${id}` }>
              <div style={{display:'flex', flexDirection:'row'}}>
                <a href="" id='tag' title={description} style={{backgroundColor:"#FFFFFF", color:"#000000", textDecoration: 'none'}}>
                  {name}
                  <div style={{width:30, height:30, backgroundColor:"#f4c842", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{total_mentions}</div>
                </a>
              </div>
            </Link>
          </div>
        </div>
    )
  }
}

export default TagItem
