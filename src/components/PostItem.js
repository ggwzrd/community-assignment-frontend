import React, { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import './styles/PostItem.css'
import Card, { CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import Avatar from 'material-ui/Avatar'
import Badge from 'material-ui/Badge';
import VerifiedUserIcon from 'material-ui-icons/VerifiedUser';
import ReportIcon from 'material-ui-icons/Report';


import './styles/PostItem.css'

class PostItem extends PureComponent {

  render() {
    const { id, content, images, trusts, reports, createdAt } = this.props
    const date = new Date(createdAt).toLocaleString("UTC", { hour12: false,
                                                             year:   'numeric',
                                                             month:  'numeric',
                                                             day:    'numeric',
                                                             hour:   'numeric',
                                                             minute: 'numeric' })

    return (
      <Card className="post-item" raised="false" elevation="0">
        <CardMedia
          className="cover"
          image={images}
          />
        <div className="details">
          <CardHeader className="card-header"
            avatar={
              <Badge className="badge" badgeContent={100} color="primary ">
              <Avatar
                alt="Remy Sharp"
                src="https://cdn2.f-cdn.com/files/download/24619452/natural+background.png"
                />
              </Badge>

            }
            action={
              <Fragment>
              <IconButton>
                <Badge className="badge trust" badgeContent={trusts.length} color="default">
                  <VerifiedUserIcon fontSize="true"/>
                </Badge>
              </IconButton>
              <IconButton>
                <Badge className="badge report" badgeContent={reports.length} color="default">
                  <ReportIcon fontSize="true" className="badgeIcon"/>
                </Badge>
              </IconButton>
            </Fragment>
            }
            title="Name Lastname"
            subheader={date}
          />
          <CardContent className="content">

            <Typography type="body1" >
              {content}
            </Typography>
          </CardContent>
        </div>
      </Card>
    )
  }
}

export default PostItem



//
//
// <div className="post-item">
//   <div className="post-info">
//     <p>Trusts: {trusts.length}</p>
//     <p>Reports: {reports.length}</p>
//   </div>
//   <p>{content}</p>
//   <div className="post-img">
//     <img src={images} alt='' />
//   </div>
//   <Link to={ `/posts/${id}` }>
//     <div className="read-more-box"><p className="read-more">Read more</p></div>
//   </Link>
// </div>
