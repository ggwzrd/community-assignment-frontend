import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchOnePost, fetchSources, fetchUserPosts } from '../actions/posts/fetch'
import { reportPost } from '../actions/posts/report'
import { trustPost } from '../actions/posts/trust'

import ReportForm from '../components/forms/ReportForm'
import TrustForm from '../components/forms/TrustForm'

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

import './styles/PostPage.css'

export const postShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  is_spam: PropTypes.bool,
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
    reportFormIsOpen: false,
    reportReason: '',
    trustReason: '',
    trustLink: '',
    trustScreenshot: '',
    source_id: ''
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

  validateReportReason() {
    const reason = this.state.reportReason

    if (reason.length > 1) {
      this.setState({
        reportError: null
      })

      return true
    }

    this.setState({
      reportError: `You can't report a post without a reason`
    })

    return false
  }

  handleReportClick = () => {
    if (this.validateReportReason()) {
      const postId = this.props.selectedPost.id

      const newReport = {
        reason: this.state.reportReason,
        link: this.state.link,
        screenshot: this.state.reportScreenshot || null,
        user_id: this.state.user_id,
        post_id: postId
      }

      this.props.reportPost(newReport)
      this.setReportState()
    }

    return false
  }

  validateTrust() {
    const reason = this.state.trustReason
    const link = this.state.trustLink

    if (reason.length > 1 && link.length > 1) {
      this.setState({
        reportError: null
      })

      return true
    }

    if (reason.length <= 1) {
      this.setState({
        trustReasonError: `You can't trust a post without a reason`
      })
      return false
    }

    if (link.length <= 1) {
      this.setState({
        trustLinkError: `You can't trust a post without a link`
      })

      return false
    }
  }

  handleChange = name => event => {
   this.setState({
     [name]: event.target.value
   })
  }

  getSource = event => {
    const sourceId = event.target.getAttribute('data-id')

    this.setState({
      source_id: sourceId
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
    console.log(this.props.selectedPost);

  handleTrustClick = () => {
    if (this.validateTrust()) {
      const postId = this.props.selectedPost.id

      const newTrust = {
        source_id: this.state.source_id,
        comment: this.state.trustReason,
        link: this.state.link,
        screenshot: this.state.trustScreenshot,
        user_id: this.state.user_id,
        post_id: postId
      }

      this.props.trustPost(newTrust)
      this.setTrustState()
    }

    return false
  }

  render() {
    if (!!this.props.selectedPost) {
      var { user, content, trusts, reports, images, created_at } = this.props.selectedPost
      var { trustiness, profile } = user
      var { nickname } = profile
    }

    console.log(user);

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
                                            reportError={this.state.reportError}
                                            handleReportClick={this.handleReportClick}/> : null}

            {this.state.trustFormIsOpen ? <TrustForm
                                            handleChange={this.handleChange}
                                            setTrustState={this.setTrustState}
                                            handleTrustClick={this.handleTrustClick}
                                            sources={this.props.sources}
                                            getSource={this.getSource}
                                            trustScreenshotError={this.state.trustScreenshotError}
                                            trustLinkError={this.state.trustLinkError}
                                            trustReasonError={this.state.trustReasonError}
                                            sourceIdState={this.state.source_id}/> : null}
          </div>

          <CardHeader className="expanded-card-header"
            title="Name Lastname"
            subheader={date}
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
            <Typography type="body1" >{content}</Typography>
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




// <div className="post-page">
//   <Paper className="post-details" elevation={4}>
//     <Typography type="headline" component="h3">
//       Post# {id}
//       {is_spam}
//       Trust Count: {trusts && trusts.length}
//       Report Count: {reports && reports.length}
//     </Typography>
//     <img src={images} alt="Something"/>
//     <Typography component="p">
//       {content}
//       {link}
//     </Typography>
//
//
//     <Button
//       raised
//       onClick={this.handleClickOpen}
//       color="secondary"
//       className="report">Report</Button>
//
//
//
//
//
//
//     <Dialog
//       open={this.state.open}
//       onClose={this.handleClose}
//       aria-labelledby="form-dialog-title"
//     >
//     <DialogTitle id="form-dialog-title">Report Post</DialogTitle>
//     <DialogContent>
//       <DialogContentText>
//         To report a post you need to fill in a reason.
//       </DialogContentText>
//       <TextField
//         onChange={this.handleChange('reason')}
//         autoFocus
//         margin="dense"
//         id="reason"
//         label="Reason"
//         type="email"
//         fullWidth
//       />
//       <TextField
//         onChange={this.handleChange('link')}
//         autoFocus
//         margin="dense"
//         id="link"
//         label="Link"
//         type="link"
//         fullWidth
//       />
//       <TextField
//         onChange={this.handleChange('screenshot')}
//         autoFocus
//         margin="dense"
//         id="screenshot"
//         label="Screenshot"
//         type="screenshot"
//         fullWidth
//       />
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={this.handleClose} color="primary">
//         Cancel
//       </Button>
//       <Button onClick={this.handleReportClick} color="primary">
//         Report
//       </Button>
//     </DialogActions>
//   </Dialog>import Card, { CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';
//
//
//   <Button
//     raised
//     onClick={this.handleClickOpen}
//     color="primary"
//     className="trust">Trust</Button>
//
//
//
//
//
//
// <Dialog
//     open={this.state.open}
//     onClose={this.handleClose}
//     aria-labelledby="form-dialog-title"
//   >
//     <DialogTitle id="form-dialog-title">Trust Post</DialogTitle>
//     <DialogContent>
//       <DialogContentText>
//         To trust a post you need to fill in a source.
//       </DialogContentText>
//       <FormControl component="fieldset" required>
//         <FormLabel component="legend">Source</FormLabel>
//         <RadioGroup
//           aria-label="source"
//           name="source"
//           value={this.state.source}
//           onChange={this.handleChange}
//         >
//           <div className="radio-buttons">
//             <FormControlLabel value="facebook" control={<Radio />} label={<img src='' alt='' />} />
//             <FormControlLabel value="google" control={<Radio />} label={<img src='' alt='' />} />
//             <FormControlLabel value="reddit" control={<Radio />} label={<img src='' alt='' />} />
//             <FormControlLabel value="coinerd" control={<Radio />} label={<img src='' alt='' />} />
//             <FormControlLabel value="twitter" disabled control={<Radio />} label={<img src='' alt='' />} />
//           </div>
//         </RadioGroup>
//       </FormControl>
//       <TextField
//         onChange={this.handleChange('link')}
//         autoFocus
//         margin="dense"
//         id="link"
//         label="Link"
//         type="link"
//         fullWidth
//       />
//       <TextField
//         onChange={this.handleChange('screenshot')}
//         autoFocus
//         margin="dense"
//         id="screenshot"
//         label="Screenshot"
//         type="screenshot"
//         fullWidth
//       />
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={this.handleClose} color="primary">
//         Cancel
//       </Button>
//       <Button onClick={this.handleTrustClick} color="primary">
//         Trust
//       </Button>
//     </DialogActions>
//   </Dialog>
//   </Paper>
//
//
// </div>