import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import AssessmentIcon from 'material-ui-icons/Assessment'
import PublicIcon from 'material-ui-icons/Public'
import ImportantDevicesIcon from 'material-ui-icons/ImportantDevices'
import AccountBalanceIcon from 'material-ui-icons/AccountBalance'
import BusinessCenterIcon from 'material-ui-icons/BusinessCenter'
import ShuffleIcon from 'material-ui-icons/Shuffle'
import FaceIcon from 'material-ui-icons/Face'
import './styles/TagItem.css'

class TagItem extends PureComponent {

  handleClick = (event) => {
    alert('You clicked the Chip.')
    const { id, selectTag } = this.props
    event.preventDefault()
    selectTag(id)
  }

  renderIcon = () => {
    const { name } = this.props
    if (name === "Analysis") return <AssessmentIcon />
    if (name === "News") return <PublicIcon />
    if (name === "Technical") return <ImportantDevicesIcon />
    if (name === "Political") return <AccountBalanceIcon />
    if (name === "Business") return <BusinessCenterIcon />
    if (name === "Random") return <ShuffleIcon />
    if (name === "Social") return <FaceIcon />
  }

  render() {
    const { id, name, description, todays_mentions} = this.props
    console.log(this.props)

    return (
        <div className="tag-details" style={{display: "inline-block", float: "left", width: 125, justifyContent: "center", alignItem: "center"}}>
          <IconButton>
            <Tooltip id="tooltip-top" title={description} placement="top-end">
              <Chip
                avatar={
                  <Avatar>
                    {this.renderIcon()}
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
