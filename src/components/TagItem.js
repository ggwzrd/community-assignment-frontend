import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import FaceIcon from 'material-ui-icons/Face'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

class TagItem extends PureComponent {

  handleClick = () => {
    alert('You clicked the Chip.')
  }

  render() {
    const { id, name, description, today_mentions } = this.props

    return (
        <div className="tag-item">
          <IconButton>
            <Tooltip id="tooltip-top" title={description} placement="top-end">
              <Chip
                avatar={
                  <Avatar>
                    <FaceIcon />
                  </Avatar>
                }
                label={name}
                onClick={this.handleClick.bind(this)}
                className="tag-info"
              />
            </Tooltip>
            <Badge className="badge" badgeContent={today_mentions} color="primary">
            </Badge>
          </IconButton>
        </div>
    )
  }
}

export default TagItem
