import React, { PureComponent, Fragment } from 'react'
import './styles/PostItem.css'
import Card, { CardHeader, CardContent, CardMedia } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Badge from 'material-ui/Badge'
import VerifiedUserIcon from 'material-ui-icons/VerifiedUser'
import ReportIcon from 'material-ui-icons/Report'
import Tooltip from 'material-ui/Tooltip'
import './styles/PostItem.css'

class PostItem extends PureComponent {

  renderPicture = () => {
    const { picture } = this.props
    if (picture === null) {
      return "https://weareworldchallenge.com/wp-content/themes/world-challenge/img/avatar-placeholder.png"
    } else {
    return picture
    }
  }

  render() {
    const { summary, images, trusts, reports, createdAt, onClick, nickname, trustiness } = this.props

    const date = new Date(createdAt).toLocaleString("UTC", { hour12: false,
                                                             year:   'numeric',
                                                             month:  'numeric',
                                                             day:    'numeric',
                                                             hour:   'numeric',
                                                             minute: 'numeric' })

    return (
      <Card className="post-item"  elevation={0} onClick={onClick}>
        <CardMedia
          className="cover"
          image={images}
          />
        <div className="details">
          <CardHeader className="card-header"
            avatar={
              <Badge className="badge" badgeContent={trustiness} color="default">
                <Avatar
                  alt={nickname}
                  src={this.renderPicture()}
                  />
              </Badge>

            }
            action={
              <Fragment>
              <IconButton>
                <Tooltip id="tooltip-top" title="Trust this post" placement="top" className="tooltip">
                  <Badge className="badge trust" badgeContent={trusts && trusts.length} color="default">
                    <VerifiedUserIcon fontSize="true"/>
                  </Badge>
              </Tooltip>

              </IconButton>
              <IconButton>
                <Tooltip id="tooltip-top" title="Report this post" placement="top" className="tooltip">
                  <Badge className="badge report" badgeContent={reports && reports.length} color="default">
                    <ReportIcon fontSize="true" className="badgeIcon"/>
                  </Badge>
              </Tooltip>

              </IconButton>
            </Fragment>
            }
            title={nickname}
            subheader={date}
          />
          <CardContent className="content">

            <Typography type="body1" >
              {summary}
            </Typography>
          </CardContent>
        </div>
      </Card>
    )
  }
}

export default PostItem
