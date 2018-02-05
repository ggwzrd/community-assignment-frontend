import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchOnePost, fetchSources } from '../actions/posts/fetch'
import { reportPost } from '../actions/posts/report'
import { trustPost } from '../actions/posts/trust'
// import Paper from 'material-ui/Paper'
// import Button from 'material-ui/Button'
import Card, { CardHeader, CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
// import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
// import PlayArrowIcon from 'material-ui-icons/PlayArrow';
// import SkipNextIcon from 'material-ui-icons/SkipNext';
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
// import TextField from 'material-ui/TextField'
// import Radio, { RadioGroup } from 'material-ui/Radio'
// import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'
import ReportForm from '../components/forms/ReportForm'
import TrustForm from '../components/forms/TrustForm'

// import facebook from './images/sources/facebook.svg'
// import google from './images/sources/google.jpg'
// import coinerd from './images/sources/logo.svg'
// import reddit from './images/sources/reddit.svg'
// import twitter from './images/sources/twitter.svg'
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


  render() {
    console.log(this.state);

    if (!!this.props.selectedPost) {
      var { content, trusts, reports, images, created_at } = this.props.selectedPost
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
              <Badge className="expanded-badge" badgeContent={100} color="default">
              <Avatar
                alt="Remy Sharp"
                src="https://cdn2.f-cdn.com/files/download/24619452/natural+background.png"
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
            title="Name Lastname"
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
  loading: state.loading
})

export default connect(mapStateToProps, { fetchOnePost, fetchSources, reportPost, trustPost })(PostPage)




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
