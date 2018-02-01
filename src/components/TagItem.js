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
    const { id, name, description, todays_mentions, icon } = this.props

    return (
        <div style={{display: "inline-block", float: "left", width: 125, justifyContent: "center", alignItem: "center"}}>
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
            <Badge className="badge" badgeContent={todays_mentions} color="primary">
            </Badge>
          </IconButton>
      </div>
    )
  }
}

export default TagItem
