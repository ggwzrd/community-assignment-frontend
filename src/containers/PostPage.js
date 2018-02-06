import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchOnePost, fetchSources, fetchUserPosts } from '../actions/posts/fetch'
import { reportPost } from '../actions/posts/report'
import { trustPost } from '../actions/posts/trust'

// material-ui
import Card, { CardHeader, CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar'
import Badge from 'material-ui/Badge';
import VerifiedUserIcon from 'material-ui-icons/VerifiedUser';
import ReportIcon from 'material-ui-icons/Report';
import Tooltip from 'material-ui/Tooltip';
// import Dialog, {
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from 'material-ui/Dialog'

// components
import ReportForm from '../components/forms/ReportForm'
import TrustForm from '../components/forms/TrustForm'

// styles
import './styles/PostPage.css'

export const postShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  is_spam: PropTypes.bool,
  // user: PropTypes.arrayOf(userShape),
  trusts: PropTypes.array,
  reports: PropTypes.array
})

class PostPage extends PureComponent {
  static propTypes = {
    ...postShape.isRequired,
  }

  componentWillMount() {
    this.props.fetchOnePost(this.props.postId)
    this.props.fetchSources()
  }

  state = {
    open: false,
    user_id: "1",
    trustFormIsOpen: false,
    reportFormIsOpen: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  setTrustState = () => {
    this.state.reportFormIsOpen && this.setState({ reportFormIsOpen: false})
    this.setState({ trustFormIsOpen: !this.state.trustFormIsOpen })
  }

  setReportState = () => {
    this.state.trustFormIsOpen && this.setState({ trustFormIsOpen: false})
    this.setState({ reportFormIsOpen: !this.state.reportFormIsOpen })
  }

  handleReportClick = () => {
    const postId = this.props.selectedPost.id
    const newReport = {
      reason: this.state.reason,
      link: this.state.link,
      screenshot: this.state.screenshot,
      user_id: this.state.user_id,
      post_id: postId
    }

    this.props.reportPost(newReport)
    this.setReportState()
  }

  handleTrustClick = () => {
    const postId = this.props.selectedPost.id
    const newTrust = {
      source_id: "1",
      link: this.state.link,
      screenshot: this.state.screenshot,
      user_id: this.state.user_id,
      post_id: postId
    }

    this.props.trustPost(newTrust)
    this.setTrustState()
  }

  handleChange = name => event => {
   this.setState({
     [name]: event.target.value
   })
  }

  renderPicture = () => {

    const { userProfilePic } = this.props
    if (userProfilePic === null) {
      return "https://weareworldchallenge.com/wp-content/themes/world-challenge/img/avatar-placeholder.png"
    } else {
    return userProfilePic
    }
  }

  render() {

    if (!!this.props.selectedPost) {
      var { user, content, trusts, reports, images, created_at } = this.props.selectedPost
      var { trustiness, profile } = user
      var { nickname } = profile
    }

    const date = new Date(created_at).toLocaleString("UTC", { hour12: false,
                                                             year:   'numeric',
                                                             month:  'numeric',
                                                             day:    'numeric',
                                                             hour:   'numeric',
                                                             minute: 'numeric' })

    return (
      <Card className="expanded-post-item"  elevation={0}>
        <CardMedia
          className="expanded-cover"
          image={images}
          />
        <div className="expanded-details">

          <div className="formwrapper">
            {this.state.reportFormIsOpen ? <ReportForm
                                            handleChange={this.handleChange}
                                            setReportState={this.setReportState}
                                            handleReportClick={this.handleReportClick}/> : null}

            {this.state.trustFormIsOpen ? <TrustForm
                                            handleChange={this.handleChange}
                                            setReportState={this.setTrustState}
                                            handleReportClick={this.handleTrustClick}
                                            sources={this.props.sources}
                                            sourceIdState={this.state.source_id}/> : null}
          </div>

          <CardHeader className="expanded-card-header"
            avatar={
              <Badge className="expanded-badge" badgeContent={this.props.userTrustiness} color="default">
              <Avatar
                alt="Remy shape"
                src={this.renderPicture()}
                />
              </Badge>
            }
            action={
              <Fragment>
              <IconButton onClick={this.setTrustState}>
                <Tooltip id="tooltip-top" title="Trust this post" placement="top" className="tooltip">
                  <Badge className="badge trust" badgeContent={!!trusts ? trusts.length : 0} color="default">
                    <VerifiedUserIcon fontSize="true"/>
                  </Badge>
              </Tooltip>

              </IconButton>
              <IconButton onClick={this.setReportState}>
                <Tooltip id="tooltip-top" title="Report this post" placement="top" className="tooltip">
                  <Badge className="badge report" badgeContent={!!reports ? reports.length : 0} color="default">
                    <ReportIcon fontSize="true" className="badgeIcon"/>
                  </Badge>
              </Tooltip>

              </IconButton>
            </Fragment>
            }

            title={this.props.userProfileName}
            subheader={date}
          />
          <CardContent className="expanded-content">

            <Typography type="body1" >
              {content}
            </Typography>
          </CardContent>
        </div>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  selectedPost: state.posts.selectedPost,
  sources: state.sources,
  loading: state.loading,
  userTrustiness: state.posts.userTrustiness,
  userProfilePic: state.posts.userProfilePic,
  userProfileName: state.posts.userProfileName,
})

export default connect(mapStateToProps, { fetchOnePost, fetchSources, reportPost, trustPost, fetchUserPosts })(PostPage)
