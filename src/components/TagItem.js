import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
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
import ShowAllIcon from 'material-ui-icons/FilterNone'
import './styles/TagItem.css'

class TagItem extends PureComponent {
  // static propTypes = {
  //   id: PropTypes.number.isRequired,
  //   name: PropTypes.string.isRequired,
  //   description: PropTypes.string.isRequired,
  //   todays_mentions: PropTypes.number.isRequired,
  //   handleClick: PropTypes.func.isRequired,
  // }

  renderIcon = () => {
    const { name } = this.props
    if (name === "All") return <ShowAllIcon />
    if (name === "Analysis") return <AssessmentIcon />
    if (name === "News") return <PublicIcon />
    if (name === "Technical") return <ImportantDevicesIcon />
    if (name === "Political") return <AccountBalanceIcon />
    if (name === "Business") return <BusinessCenterIcon />
    if (name === "Random") return <ShuffleIcon />
    if (name === "Social") return <FaceIcon />
  }

  render() {
    const { id, name, description, todays_mentions, handleClick, small } = this.props

    return (


      small ? <div className="tag-post-detail" style={{display: "flex"}}>
                  <Chip
                    style={{marginRight:10}}
                    avatar={
                      <Avatar>
                        {this.renderIcon()}
                      </Avatar>
                    }
                    label={name}
                    id={id}
                    className="tag-info"
                  />
              </div>
              :
              <div className="tag-details" style={{display: "flex"}}>
                <IconButton style={{width: 'auto'}}>
                  <Badge className="badge" badgeContent={todays_mentions} color="primary" children="">
                    <Tooltip id="tooltip-top" title={description} placement="top-end">
                      <Chip
                        avatar={
                          <Avatar>
                            {this.renderIcon()}
                          </Avatar>
                        }
                        label={name}
                        id={id}
                        onClick={
                          () => handleClick(id)}
                        className="tag-info"
                      />
                    </Tooltip>
                  </Badge>
                </IconButton>
              </div>
    )
  }
}

export default TagItem
